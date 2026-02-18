from fastapi import APIRouter, Request, HTTPException
from datetime import datetime, timezone
import os
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout

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
        
        return {"status": "success", "event_type": webhook_response.event_type}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")
