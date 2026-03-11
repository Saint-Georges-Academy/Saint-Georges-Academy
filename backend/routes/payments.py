from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime, timezone
import os
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, 
    CheckoutSessionResponse, 
    CheckoutStatusResponse, 
    CheckoutSessionRequest
)

# Create router
payment_router = APIRouter(prefix="/api/payments", tags=["payments"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# Stripe API Key
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')

# =============================================================================
# FIXED PRODUCT PACKAGES - Amounts defined server-side only (security)
# =============================================================================
PRODUCTS = {
    # Formations CCNA
    "ccna1_online": {
        "name": "CCNA 1 - Introduction to Networks (En ligne)",
        "amount": 2290.00,
        "currency": "eur",
        "category": "formation"
    },
    "ccna1_inclass": {
        "name": "CCNA 1 - Introduction to Networks (Présentiel)",
        "amount": 3290.00,
        "currency": "eur",
        "category": "formation"
    },
    "ccna2_online": {
        "name": "CCNA 2 - Switching, Routing, and Wireless Essentials (En ligne)",
        "amount": 2290.00,
        "currency": "eur",
        "category": "formation"
    },
    "ccna2_inclass": {
        "name": "CCNA 2 - Switching, Routing, and Wireless Essentials (Présentiel)",
        "amount": 3290.00,
        "currency": "eur",
        "category": "formation"
    },
    "ccna3_online": {
        "name": "CCNA 3 - Enterprise Networking, Security, and Automation (En ligne)",
        "amount": 2290.00,
        "currency": "eur",
        "category": "formation"
    },
    "ccna3_inclass": {
        "name": "CCNA 3 - Enterprise Networking, Security, and Automation (Présentiel)",
        "amount": 3290.00,
        "currency": "eur",
        "category": "formation"
    },
    # Extreme CCNA Boot Camp
    "extreme-ccna-bootcamp_inclass": {
        "name": "Extreme CCNA Boot Camp (Présentiel - 75 Labs)",
        "amount": 3290.00,
        "currency": "eur",
        "category": "formation"
    },
    # CyberOps
    "cyberops_online": {
        "name": "CyberOps Associate (En ligne)",
        "amount": 2290.00,
        "currency": "eur",
        "category": "formation"
    },
    "cyberops_inclass": {
        "name": "CyberOps Associate (Présentiel)",
        "amount": 3290.00,
        "currency": "eur",
        "category": "formation"
    },
    # Unreal Engine
    "unreal_inclass": {
        "name": "Unreal Engine Fundamentals (Présentiel)",
        "amount": 3750.00,
        "currency": "eur",
        "category": "formation"
    },
    # Videos
    "ccna_videos": {
        "name": "75 Vidéos de Préparation CCNA",
        "amount": 150.00,
        "currency": "eur",
        "category": "videos"
    },
    # Certification
    "certification_ccna": {
        "name": "Voucher Examen CCNA (200-301)",
        "amount": 630.00,
        "currency": "eur",
        "category": "certification"
    },
    "certification_cyberops": {
        "name": "Voucher Examen CyberOps Associate",
        "amount": 630.00,
        "currency": "eur",
        "category": "certification"
    }
}

# =============================================================================
# Request/Response Models
# =============================================================================
class CreateCheckoutRequest(BaseModel):
    product_id: str = Field(..., description="Product identifier")
    origin_url: str = Field(..., description="Frontend origin URL")
    customer_email: Optional[str] = Field(None, description="Customer email")
    customer_name: Optional[str] = Field(None, description="Customer name")
    exam_date: Optional[str] = Field(None, description="Exam date for certification")
    session_date: Optional[str] = Field(None, description="Selected session date")

class CheckoutResponse(BaseModel):
    url: str
    session_id: str

class PaymentStatusResponse(BaseModel):
    status: str
    payment_status: str
    amount_total: float
    currency: str
    product_name: str
    metadata: Dict

# =============================================================================
# API Endpoints
# =============================================================================

@payment_router.get("/products")
async def get_products():
    """Get all available products with prices"""
    return {
        "products": [
            {
                "id": product_id,
                "name": product["name"],
                "amount": product["amount"],
                "currency": product["currency"],
                "category": product["category"]
            }
            for product_id, product in PRODUCTS.items()
        ]
    }

@payment_router.post("/checkout", response_model=CheckoutResponse)
async def create_checkout_session(request: CreateCheckoutRequest, http_request: Request):
    """Create a Stripe checkout session"""
    
    # Validate product exists
    if request.product_id not in PRODUCTS:
        raise HTTPException(status_code=400, detail=f"Invalid product: {request.product_id}")
    
    product = PRODUCTS[request.product_id]
    
    # Build URLs from frontend origin (NEVER hardcode)
    success_url = f"{request.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{request.origin_url}/payment/cancel"
    
    # Initialize Stripe checkout
    host_url = str(http_request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Build metadata
    metadata = {
        "product_id": request.product_id,
        "product_name": product["name"],
        "category": product["category"],
        "source": "saint_georges_academy"
    }
    
    if request.customer_email:
        metadata["customer_email"] = request.customer_email
    if request.customer_name:
        metadata["customer_name"] = request.customer_name
    if request.exam_date:
        metadata["exam_date"] = request.exam_date
    if request.session_date:
        metadata["session_date"] = request.session_date
    
    try:
        # Create checkout session with FIXED amount from server
        checkout_request = CheckoutSessionRequest(
            amount=product["amount"],
            currency=product["currency"],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record BEFORE redirect
        transaction = {
            "id": str(uuid.uuid4()),
            "session_id": session.session_id,
            "product_id": request.product_id,
            "product_name": product["name"],
            "amount": product["amount"],
            "currency": product["currency"],
            "customer_email": request.customer_email,
            "customer_name": request.customer_name,
            "exam_date": request.exam_date,
            "session_date": request.session_date if hasattr(request, 'session_date') else None,
            "status": "initiated",
            "payment_status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.payment_transactions.insert_one(transaction)
        
        return CheckoutResponse(url=session.url, session_id=session.session_id)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")

@payment_router.get("/status/{session_id}", response_model=PaymentStatusResponse)
async def get_payment_status(session_id: str, http_request: Request):
    """Get payment status and update database"""
    
    # Find the transaction
    transaction = await db.payment_transactions.find_one(
        {"session_id": session_id},
        {"_id": 0}
    )
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    # Initialize Stripe checkout
    host_url = str(http_request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        # Get checkout status from Stripe
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction status in database (only if changed)
        if transaction["payment_status"] != checkout_status.payment_status:
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "status": checkout_status.status,
                        "payment_status": checkout_status.payment_status,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
        
        return PaymentStatusResponse(
            status=checkout_status.status,
            payment_status=checkout_status.payment_status,
            amount_total=checkout_status.amount_total / 100,  # Convert from cents
            currency=checkout_status.currency,
            product_name=transaction.get("product_name", ""),
            metadata=checkout_status.metadata
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get payment status: {str(e)}")

@payment_router.get("/transactions")
async def get_transactions(limit: int = 50):
    """Get recent payment transactions"""
    transactions = await db.payment_transactions.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    return {"transactions": transactions}
