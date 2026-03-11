from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid

# Configure logging
logger = logging.getLogger(__name__)

# Create router
quotes_router = APIRouter(prefix="/api/quotes", tags=["quotes"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sga')]


class HaikuQuoteRequest(BaseModel):
    organisation_name: str = Field(..., min_length=1)
    contact_name: str = Field(..., min_length=1)
    email: EmailStr
    country: str = Field(..., min_length=1)
    organisation_type: str = Field(..., min_length=1)
    estimated_licences: str = Field(..., min_length=1)
    intended_use: str = Field(..., min_length=1)
    message: Optional[str] = None


class HaikuQuoteResponse(BaseModel):
    id: str
    status: str
    message: str


@quotes_router.post("/haiku", response_model=HaikuQuoteResponse)
async def submit_haiku_quote(request: HaikuQuoteRequest):
    """
    Submit a quote request for World of Haiku licences.
    """
    try:
        quote_id = str(uuid.uuid4())
        
        quote_doc = {
            "id": quote_id,
            "product": "world_of_haiku",
            "organisation_name": request.organisation_name,
            "contact_name": request.contact_name,
            "email": request.email,
            "country": request.country,
            "organisation_type": request.organisation_type,
            "estimated_licences": request.estimated_licences,
            "intended_use": request.intended_use,
            "message": request.message,
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.quote_requests.insert_one(quote_doc)
        
        logger.info(f"New World of Haiku quote request submitted: {quote_id} from {request.organisation_name}")
        
        return HaikuQuoteResponse(
            id=quote_id,
            status="success",
            message="Your quote request has been submitted successfully. Our team will contact you within 24-48 hours."
        )
        
    except Exception as e:
        logger.error(f"Error submitting quote request: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit quote request")


@quotes_router.get("/haiku")
async def get_haiku_quotes():
    """
    Get all World of Haiku quote requests (admin endpoint).
    """
    try:
        quotes = await db.quote_requests.find(
            {"product": "world_of_haiku"},
            {"_id": 0}
        ).sort("created_at", -1).to_list(100)
        
        return {"quotes": quotes, "count": len(quotes)}
        
    except Exception as e:
        logger.error(f"Error fetching quote requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch quote requests")
