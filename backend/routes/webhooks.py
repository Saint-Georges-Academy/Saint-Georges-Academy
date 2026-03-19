from fastapi import APIRouter, Request, HTTPException
from datetime import datetime, timezone
import os
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout
from services.email_service import send_purchase_confirmation_email

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
            
            # Send confirmation email on successful payment
            if webhook_response.payment_status == "paid" or webhook_response.event_type == "checkout.session.completed":
                # Get transaction details from database
                transaction = await db.payment_transactions.find_one(
                    {"session_id": webhook_response.session_id},
                    {"_id": 0}
                )
                
                if transaction:
                    # Get course details
                    product_id = transaction.get("product_id", "")
                    course_id = product_id.replace("_online", "").replace("_inclass", "")
                    course_format = "En ligne" if "_online" in product_id else "Présentiel"
                    
                    course = await db.courses.find_one(
                        {"id": course_id},
                        {"_id": 0, "title": 1}
                    )
                    course_title = course.get("title", "Formation") if course else "Formation Saint-Georges Academy"
                    
                    # Send email
                    await send_purchase_confirmation_email(
                        customer_name=transaction.get("customer_name", transaction.get("customer_email", "Étudiant")),
                        customer_email=transaction.get("customer_email", ""),
                        course_title=course_title,
                        course_format=course_format,
                        session_date=transaction.get("session_date", "À confirmer"),
                        price=transaction.get("amount", 0),
                        transaction_id=webhook_response.session_id[:16].upper()
                    )
        
        return {"status": "success", "event_type": webhook_response.event_type}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")
