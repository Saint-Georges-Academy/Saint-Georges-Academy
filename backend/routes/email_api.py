"""
Email API Routes for Saint-Georges Academy
Provides endpoints for testing and manual email sending
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from routes.emails import (
    send_enrollment_confirmation,
    send_admin_notification,
    send_all_enrollment_emails,
    EnrollmentEmailData
)

# Create router
email_router = APIRouter(prefix="/api/emails", tags=["emails"])

# =============================================================================
# Request Models
# =============================================================================

class TestEmailRequest(BaseModel):
    recipient_email: EmailStr
    student_name: Optional[str] = "Test Student"
    course_name: str = "CCNA 1 - Introduction to Networks"
    course_format: str = "En ligne"
    session_date: str = "28 Avril - 25 Mai 2026"
    amount: float = 2290.00


class SendEnrollmentEmailRequest(BaseModel):
    student_email: EmailStr
    student_name: Optional[str] = None
    course_name: str
    course_format: str
    session_date: str
    amount: float
    transaction_id: str


# =============================================================================
# API Endpoints
# =============================================================================

@email_router.post("/test")
async def send_test_email(request: TestEmailRequest):
    """
    Send a test enrollment confirmation email.
    Use this endpoint to verify email configuration is working.
    """
    
    email_data = EnrollmentEmailData(
        student_email=request.recipient_email,
        student_name=request.student_name,
        course_name=request.course_name,
        course_format=request.course_format,
        session_date=request.session_date,
        amount=request.amount,
        currency="EUR",
        transaction_id="TEST_" + datetime.now().strftime("%Y%m%d%H%M%S"),
        payment_date=datetime.now().strftime("%d/%m/%Y à %H:%M")
    )
    
    try:
        results = await send_all_enrollment_emails(email_data)
        return {
            "status": "success",
            "message": "Test emails sent successfully",
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send test email: {str(e)}")


@email_router.post("/send-enrollment")
async def send_enrollment_email(request: SendEnrollmentEmailRequest):
    """
    Manually send an enrollment confirmation email.
    Use this for resending emails or manual enrollment confirmations.
    """
    
    email_data = EnrollmentEmailData(
        student_email=request.student_email,
        student_name=request.student_name,
        course_name=request.course_name,
        course_format=request.course_format,
        session_date=request.session_date,
        amount=request.amount,
        currency="EUR",
        transaction_id=request.transaction_id,
        payment_date=datetime.now().strftime("%d/%m/%Y à %H:%M")
    )
    
    try:
        results = await send_all_enrollment_emails(email_data)
        return {
            "status": "success",
            "message": "Enrollment emails sent successfully",
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send enrollment email: {str(e)}")


@email_router.get("/config")
async def get_email_config():
    """
    Get current email configuration status (without exposing sensitive data).
    """
    import os
    
    resend_key = os.environ.get('RESEND_API_KEY', '')
    sender_email = os.environ.get('SENDER_EMAIL', '')
    admin_emails = os.environ.get('ADMIN_EMAILS', '')
    
    return {
        "resend_configured": bool(resend_key and resend_key.startswith('re_')),
        "sender_email": sender_email,
        "admin_emails": admin_emails.split(',') if admin_emails else [],
        "status": "ready" if resend_key else "not_configured"
    }
