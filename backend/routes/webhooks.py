from fastapi import APIRouter, Request, HTTPException
from datetime import datetime, timezone
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout
from routes.emails import send_all_enrollment_emails, EnrollmentEmailData

# Configure logging
logger = logging.getLogger(__name__)

# Create router
webhook_router = APIRouter(tags=["webhooks"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# Stripe API Key
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')

@webhook_router.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    
    # Get the webhook payload
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")
    
    if not sig_header:
        raise HTTPException(status_code=400, detail="Missing Stripe signature")
    
    # Initialize Stripe checkout
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        # Handle the webhook
        webhook_response = await stripe_checkout.handle_webhook(payload, sig_header)
        
        # Update transaction in database based on event
        if webhook_response.session_id:
            update_data = {
                "status": webhook_response.event_type,
                "payment_status": webhook_response.payment_status,
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "webhook_event_id": webhook_response.event_id
            }
            
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": update_data}
            )
            
            # Send enrollment emails on successful payment
            if webhook_response.event_type == "checkout.session.completed":
                await send_enrollment_emails_for_session(webhook_response.session_id)
        
        return {"status": "success", "event_type": webhook_response.event_type}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")


async def send_enrollment_emails_for_session(session_id: str):
    """Send enrollment confirmation emails for a completed payment session"""
    
    try:
        # Get transaction details from database
        transaction = await db.payment_transactions.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )
        
        if not transaction:
            logger.warning(f"Transaction not found for session: {session_id}")
            return
        
        # Prepare email data
        email_data = EnrollmentEmailData(
            student_email=transaction.get("customer_email", ""),
            student_name=transaction.get("customer_name"),
            course_name=transaction.get("product_name", "Formation Saint-Georges Academy"),
            course_format=get_format_from_product_id(transaction.get("product_id", "")),
            session_date=transaction.get("session_date", "À confirmer"),
            amount=transaction.get("amount", 0),
            currency=transaction.get("currency", "EUR").upper(),
            transaction_id=session_id[:20] + "...",
            payment_date=datetime.now().strftime("%d/%m/%Y à %H:%M")
        )
        
        # Send emails
        if email_data.student_email:
            results = await send_all_enrollment_emails(email_data)
            logger.info(f"Enrollment emails sent: {results}")
            
            # Store email status in transaction
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": {"email_status": results}}
            )
        else:
            logger.warning(f"No customer email for session: {session_id}")
            
    except Exception as e:
        logger.error(f"Error sending enrollment emails: {str(e)}")


def get_format_from_product_id(product_id: str) -> str:
    """Extract format from product ID"""
    if "online" in product_id.lower():
        return "En ligne"
    elif "inclass" in product_id.lower():
        return "Présentiel"
    elif "videos" in product_id.lower():
        return "Vidéos en ligne"
    else:
        return "Formation"
