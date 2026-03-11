from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
import os
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
import jwt
import logging

# Import email service
try:
    from services.admission_emails import send_admission_email, send_admin_admission_notification, AdmissionEmailData
    EMAIL_SERVICE_AVAILABLE = True
except ImportError:
    EMAIL_SERVICE_AVAILABLE = False
    logger = logging.getLogger(__name__)
    logger.warning("Admission email service not available")

# Configure logging
logger = logging.getLogger(__name__)

# Create router
admissions_router = APIRouter(prefix="/api/admissions", tags=["admissions"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sga')]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'saint-georges-academy-secret-key-2026')
JWT_ALGORITHM = "HS256"

# Security
security = HTTPBearer(auto_error=False)

# =============================================================================
# Enums / Constants
# =============================================================================
APPLICATION_STATUSES = [
    "enquiry_received",
    "needs_analysed", 
    "prerequisites_reviewed",
    "admission_approved",
    "admission_pending",
    "admission_refused",
    "quotation_sent",
    "agreement_sent",
    "terms_accepted",
    "enrolment_confirmed",
    "training_access_sent"
]

PREREQUISITE_STATUSES = [
    "pending",
    "validated",
    "validated_with_reservation",
    "not_validated",
    "additional_info_required"
]

ORGANISATION_TYPES = [
    "company_small",
    "company_medium",
    "company_large",
    "school",
    "university",
    "training_centre",
    "public_sector",
    "other"
]

# =============================================================================
# Models - Individual Needs Analysis
# =============================================================================
class IndividualNeedsAnalysis(BaseModel):
    # Contact info
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    
    # Training needs
    target_course: str
    current_level: str = Field(..., description="Current knowledge level")
    professional_background: str
    learner_objective: str
    expected_outcomes: str
    
    # Constraints
    preferred_format: str = Field(..., description="online/in_class/hybrid")
    schedule_constraints: Optional[str] = None
    language_preference: str = "french"
    accessibility_needs: Optional[str] = None
    specific_support_needs: Optional[str] = None
    
    # Experience
    prior_experience: Optional[str] = None
    reason_for_choosing: str
    
    # Consent
    gdpr_consent: bool = Field(..., description="GDPR data processing consent")
    
class IndividualNeedsResponse(BaseModel):
    id: str
    status: str
    message: str
    reference_number: str

# =============================================================================
# Models - Organisation Needs Analysis
# =============================================================================
class OrganisationNeedsAnalysis(BaseModel):
    # Organisation info
    organisation_name: str = Field(..., min_length=2)
    contact_name: str = Field(..., min_length=2)
    contact_email: EmailStr
    contact_phone: Optional[str] = None
    country: str
    organisation_type: str
    
    # Project context
    project_context: str
    target_audience: str
    number_of_learners: str
    expected_skills: str
    current_skill_gaps: str
    
    # Deployment
    deployment_constraints: Optional[str] = None
    desired_schedule: Optional[str] = None
    preferred_format: str
    
    # Expectations
    certification_expectations: Optional[str] = None
    reporting_expectations: Optional[str] = None
    
    # Consent
    gdpr_consent: bool

class OrganisationNeedsResponse(BaseModel):
    id: str
    status: str
    message: str
    reference_number: str

# =============================================================================
# Models - Prerequisite Self-Assessment
# =============================================================================
class PrerequisiteSelfAssessment(BaseModel):
    # Link to application
    application_id: Optional[str] = None
    email: EmailStr
    
    # Course
    target_course: str
    
    # Self-assessment questions
    osi_model_knowledge: str = Field(..., description="none/basic/intermediate/advanced")
    ipv4_knowledge: str = Field(..., description="none/basic/intermediate/advanced")
    cli_experience: str = Field(..., description="none/basic/intermediate/advanced")
    networking_experience_years: int = 0
    
    # Previous training
    previous_certifications: Optional[str] = None
    previous_training: Optional[str] = None
    
    # Motivation
    motivation: str
    
    # Documents (references to uploaded files)
    cv_uploaded: bool = False
    diploma_uploaded: bool = False
    experience_proof_uploaded: bool = False
    
    # Consent
    gdpr_consent: bool

# =============================================================================
# Models - Pre-Enrolment Application
# =============================================================================
class PreEnrolmentApplication(BaseModel):
    # Personal info
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "France"
    
    # Professional info
    company: Optional[str] = None
    job_title: Optional[str] = None
    
    # Training selection
    target_course: str
    preferred_format: str
    preferred_session_date: Optional[str] = None
    
    # Funding
    funding_type: str = Field(..., description="personal/employer/opco/france_travail")
    funding_details: Optional[str] = None
    
    # Accessibility
    accessibility_needs: Optional[str] = None
    
    # Consent
    gdpr_consent: bool
    cgv_accepted: bool
    
class PreEnrolmentResponse(BaseModel):
    id: str
    status: str
    reference_number: str
    message: str
    next_steps: List[str]

# =============================================================================
# Models - Admin Operations
# =============================================================================
class AdminNote(BaseModel):
    content: str
    note_type: str = "general"  # general, prerequisite, needs, admission

class StatusUpdate(BaseModel):
    new_status: str
    notes: Optional[str] = None

class PrerequisiteReview(BaseModel):
    status: str = Field(..., description="validated/validated_with_reservation/not_validated/additional_info_required")
    reviewer_name: str
    comments: Optional[str] = None
    evidence_sources: List[str] = []  # self_assessment, cv, diploma, test, manual_validation

# =============================================================================
# Helper Functions
# =============================================================================
def generate_reference_number(prefix: str = "SGA") -> str:
    """Generate a unique reference number"""
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d")
    unique_part = str(uuid.uuid4())[:6].upper()
    return f"{prefix}-{timestamp}-{unique_part}"

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current admin user from JWT token"""
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return user
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def add_audit_entry(action: str, actor: str, details: Optional[str] = None) -> dict:
    """Create an audit trail entry"""
    return {
        "id": str(uuid.uuid4()),
        "action": action,
        "actor": actor,
        "details": details,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# =============================================================================
# PUBLIC ENDPOINTS - Application Forms
# =============================================================================

@admissions_router.post("/individual-needs", response_model=IndividualNeedsResponse)
async def submit_individual_needs_analysis(data: IndividualNeedsAnalysis):
    """Submit individual training needs analysis form"""
    
    if not data.gdpr_consent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")
    
    application_id = str(uuid.uuid4())
    reference_number = generate_reference_number("IND")
    now = datetime.now(timezone.utc).isoformat()
    
    application = {
        "id": application_id,
        "reference_number": reference_number,
        "type": "individual",
        "status": "enquiry_received",
        
        # Contact info
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email.lower(),
        "phone": data.phone,
        
        # Needs analysis data
        "needs_analysis": {
            "target_course": data.target_course,
            "current_level": data.current_level,
            "professional_background": data.professional_background,
            "learner_objective": data.learner_objective,
            "expected_outcomes": data.expected_outcomes,
            "preferred_format": data.preferred_format,
            "schedule_constraints": data.schedule_constraints,
            "language_preference": data.language_preference,
            "accessibility_needs": data.accessibility_needs,
            "specific_support_needs": data.specific_support_needs,
            "prior_experience": data.prior_experience,
            "reason_for_choosing": data.reason_for_choosing,
            "submitted_at": now
        },
        
        # Prerequisites (to be filled by admin)
        "prerequisite_review": None,
        
        # Admin tracking
        "admin_notes": [],
        "audit_trail": [add_audit_entry("enquiry_received", "system", "Individual needs analysis form submitted")],
        "documents": [],
        
        # Consent
        "gdpr_consent": data.gdpr_consent,
        "gdpr_consent_date": now,
        
        # Timestamps
        "created_at": now,
        "updated_at": now
    }
    
    await db.applications.insert_one(application)
    
    logger.info(f"New individual needs analysis submitted: {reference_number}")
    
    # Send automated emails
    if EMAIL_SERVICE_AVAILABLE:
        try:
            email_data = AdmissionEmailData(
                recipient_email=data.email,
                recipient_name=f"{data.first_name} {data.last_name}",
                reference_number=reference_number,
                application_type="individual",
                status="enquiry_received"
            )
            # Send confirmation to applicant
            await send_admission_email(email_data)
            # Send notification to admin
            await send_admin_admission_notification(email_data)
        except Exception as e:
            logger.error(f"Error sending admission emails: {str(e)}")
    
    return IndividualNeedsResponse(
        id=application_id,
        status="success",
        message="Your training needs analysis has been submitted successfully. Our team will contact you within 48 hours.",
        reference_number=reference_number
    )

@admissions_router.post("/organisation-needs", response_model=OrganisationNeedsResponse)
async def submit_organisation_needs_analysis(data: OrganisationNeedsAnalysis):
    """Submit organisation training needs analysis form"""
    
    if not data.gdpr_consent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")
    
    application_id = str(uuid.uuid4())
    reference_number = generate_reference_number("ORG")
    now = datetime.now(timezone.utc).isoformat()
    
    application = {
        "id": application_id,
        "reference_number": reference_number,
        "type": "organisation",
        "status": "enquiry_received",
        
        # Organisation info
        "organisation_name": data.organisation_name,
        "organisation_type": data.organisation_type,
        "country": data.country,
        
        # Contact info
        "contact_name": data.contact_name,
        "contact_email": data.contact_email.lower(),
        "contact_phone": data.contact_phone,
        
        # Needs analysis data
        "needs_analysis": {
            "project_context": data.project_context,
            "target_audience": data.target_audience,
            "number_of_learners": data.number_of_learners,
            "expected_skills": data.expected_skills,
            "current_skill_gaps": data.current_skill_gaps,
            "deployment_constraints": data.deployment_constraints,
            "desired_schedule": data.desired_schedule,
            "preferred_format": data.preferred_format,
            "certification_expectations": data.certification_expectations,
            "reporting_expectations": data.reporting_expectations,
            "submitted_at": now
        },
        
        # Admin tracking
        "admin_notes": [],
        "audit_trail": [add_audit_entry("enquiry_received", "system", "Organisation needs analysis form submitted")],
        "learners": [],  # Individual learners linked to this org
        "documents": [],
        
        # Consent
        "gdpr_consent": data.gdpr_consent,
        "gdpr_consent_date": now,
        
        # Timestamps
        "created_at": now,
        "updated_at": now
    }
    
    await db.applications.insert_one(application)
    
    logger.info(f"New organisation needs analysis submitted: {reference_number}")
    
    # Send automated emails
    if EMAIL_SERVICE_AVAILABLE:
        try:
            email_data = AdmissionEmailData(
                recipient_email=data.contact_email,
                recipient_name=data.contact_name,
                reference_number=reference_number,
                application_type="organisation",
                status="enquiry_received"
            )
            await send_admission_email(email_data)
            await send_admin_admission_notification(email_data)
        except Exception as e:
            logger.error(f"Error sending admission emails: {str(e)}")
    
    return OrganisationNeedsResponse(
        id=application_id,
        status="success",
        message="Your organisation's training needs analysis has been submitted. Our team will contact you within 48 hours to discuss your requirements.",
        reference_number=reference_number
    )

@admissions_router.post("/prerequisite-assessment")
async def submit_prerequisite_assessment(data: PrerequisiteSelfAssessment):
    """Submit prerequisite self-assessment form"""
    
    if not data.gdpr_consent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")
    
    assessment_id = str(uuid.uuid4())
    reference_number = generate_reference_number("PRE")
    now = datetime.now(timezone.utc).isoformat()
    
    assessment = {
        "id": assessment_id,
        "reference_number": reference_number,
        "application_id": data.application_id,
        "email": data.email.lower(),
        "target_course": data.target_course,
        
        "self_assessment": {
            "osi_model_knowledge": data.osi_model_knowledge,
            "ipv4_knowledge": data.ipv4_knowledge,
            "cli_experience": data.cli_experience,
            "networking_experience_years": data.networking_experience_years,
            "previous_certifications": data.previous_certifications,
            "previous_training": data.previous_training,
            "motivation": data.motivation
        },
        
        "documents": {
            "cv_uploaded": data.cv_uploaded,
            "diploma_uploaded": data.diploma_uploaded,
            "experience_proof_uploaded": data.experience_proof_uploaded
        },
        
        # Review status (to be filled by admin)
        "review_status": "pending",
        "review": None,
        
        # Consent
        "gdpr_consent": data.gdpr_consent,
        "gdpr_consent_date": now,
        
        # Timestamps
        "created_at": now,
        "updated_at": now
    }
    
    await db.prerequisite_assessments.insert_one(assessment)
    
    # Link to application if provided
    if data.application_id:
        await db.applications.update_one(
            {"id": data.application_id},
            {
                "$set": {"updated_at": now},
                "$push": {"audit_trail": add_audit_entry("prerequisite_assessment_submitted", "system")}
            }
        )
    
    logger.info(f"Prerequisite self-assessment submitted: {reference_number}")
    
    return {
        "id": assessment_id,
        "status": "success",
        "reference_number": reference_number,
        "message": "Your prerequisite self-assessment has been submitted. Our team will review it and contact you."
    }

@admissions_router.post("/pre-enrolment", response_model=PreEnrolmentResponse)
async def submit_pre_enrolment(data: PreEnrolmentApplication):
    """Submit pre-enrolment application form"""
    
    if not data.gdpr_consent:
        raise HTTPException(status_code=400, detail="GDPR consent is required")
    
    if not data.cgv_accepted:
        raise HTTPException(status_code=400, detail="Terms and conditions must be accepted")
    
    application_id = str(uuid.uuid4())
    reference_number = generate_reference_number("ENR")
    now = datetime.now(timezone.utc).isoformat()
    
    application = {
        "id": application_id,
        "reference_number": reference_number,
        "type": "pre_enrolment",
        "status": "enquiry_received",
        
        # Personal info
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email.lower(),
        "phone": data.phone,
        "address": data.address,
        "city": data.city,
        "postal_code": data.postal_code,
        "country": data.country,
        
        # Professional info
        "company": data.company,
        "job_title": data.job_title,
        
        # Training selection
        "training_selection": {
            "target_course": data.target_course,
            "preferred_format": data.preferred_format,
            "preferred_session_date": data.preferred_session_date
        },
        
        # Funding
        "funding": {
            "type": data.funding_type,
            "details": data.funding_details
        },
        
        # Accessibility
        "accessibility_needs": data.accessibility_needs,
        
        # Prerequisites (to be reviewed)
        "prerequisite_review": None,
        
        # Admin tracking
        "admin_notes": [],
        "audit_trail": [add_audit_entry("enquiry_received", "system", "Pre-enrolment application submitted")],
        "documents": [],
        
        # Consent
        "gdpr_consent": data.gdpr_consent,
        "gdpr_consent_date": now,
        "cgv_accepted": data.cgv_accepted,
        "cgv_accepted_date": now,
        
        # Timestamps
        "created_at": now,
        "updated_at": now
    }
    
    await db.applications.insert_one(application)
    
    logger.info(f"New pre-enrolment application submitted: {reference_number}")
    
    # Send automated emails
    if EMAIL_SERVICE_AVAILABLE:
        try:
            email_data = AdmissionEmailData(
                recipient_email=data.email,
                recipient_name=f"{data.first_name} {data.last_name}",
                reference_number=reference_number,
                application_type="pre_enrolment",
                course_name=data.target_course,
                status="enquiry_received"
            )
            await send_admission_email(email_data)
            await send_admin_admission_notification(email_data)
        except Exception as e:
            logger.error(f"Error sending admission emails: {str(e)}")
    
    return PreEnrolmentResponse(
        id=application_id,
        status="success",
        reference_number=reference_number,
        message="Your pre-enrolment application has been submitted successfully.",
        next_steps=[
            "Our team will review your application within 48 hours",
            "You may be contacted for a needs analysis interview",
            "Prerequisites will be verified for your chosen course",
            "Once approved, you will receive a formal quote and training agreement"
        ]
    )

@admissions_router.get("/status/{reference_number}")
async def check_application_status(reference_number: str):
    """Check application status by reference number"""
    
    application = await db.applications.find_one(
        {"reference_number": reference_number},
        {"_id": 0, "admin_notes": 0, "audit_trail": 0}
    )
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    status_messages = {
        "enquiry_received": "Demande reçue - En attente d'analyse",
        "needs_analysed": "Analyse des besoins effectuée",
        "prerequisites_reviewed": "Prérequis vérifiés",
        "admission_approved": "Admission approuvée",
        "admission_pending": "Admission en cours d'examen",
        "admission_refused": "Admission refusée",
        "quotation_sent": "Devis envoyé",
        "agreement_sent": "Convention envoyée",
        "terms_accepted": "Conditions acceptées",
        "enrolment_confirmed": "Inscription confirmée",
        "training_access_sent": "Accès formation envoyé"
    }
    
    return {
        "reference_number": reference_number,
        "status": application["status"],
        "status_message": status_messages.get(application["status"], application["status"]),
        "type": application["type"],
        "created_at": application["created_at"],
        "updated_at": application["updated_at"]
    }

# =============================================================================
# ADMIN ENDPOINTS - Application Management
# =============================================================================

@admissions_router.get("/admin/applications")
async def list_applications(
    status: Optional[str] = None,
    type: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    admin: dict = Depends(get_current_admin)
):
    """List all applications (admin only)"""
    
    query = {}
    if status:
        query["status"] = status
    if type:
        query["type"] = type
    
    applications = await db.applications.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    total = await db.applications.count_documents(query)
    
    return {
        "applications": applications,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@admissions_router.get("/admin/applications/{application_id}")
async def get_application_details(
    application_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Get full application details including audit trail (admin only)"""
    
    application = await db.applications.find_one(
        {"id": application_id},
        {"_id": 0}
    )
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Get linked prerequisite assessments
    assessments = await db.prerequisite_assessments.find(
        {"$or": [
            {"application_id": application_id},
            {"email": application.get("email", application.get("contact_email", ""))}
        ]},
        {"_id": 0}
    ).to_list(10)
    
    return {
        "application": application,
        "prerequisite_assessments": assessments
    }

@admissions_router.put("/admin/applications/{application_id}/status")
async def update_application_status(
    application_id: str,
    update: StatusUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Update application status (admin only)"""
    
    if update.new_status not in APPLICATION_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {APPLICATION_STATUSES}")
    
    now = datetime.now(timezone.utc).isoformat()
    admin_name = f"{admin['first_name']} {admin['last_name']}"
    
    audit_entry = add_audit_entry(
        f"status_changed_to_{update.new_status}",
        admin_name,
        update.notes
    )
    
    result = await db.applications.update_one(
        {"id": application_id},
        {
            "$set": {
                "status": update.new_status,
                "updated_at": now
            },
            "$push": {"audit_trail": audit_entry}
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    logger.info(f"Application {application_id} status updated to {update.new_status} by {admin_name}")
    
    # Send email notification for status change
    if EMAIL_SERVICE_AVAILABLE:
        try:
            # Get application details for email
            app = await db.applications.find_one({"id": application_id}, {"_id": 0})
            if app:
                recipient_email = app.get("email") or app.get("contact_email")
                recipient_name = None
                if app.get("first_name"):
                    recipient_name = f"{app.get('first_name')} {app.get('last_name', '')}"
                elif app.get("contact_name"):
                    recipient_name = app.get("contact_name")
                
                # Get course name if available
                course_name = None
                if app.get("training_selection"):
                    course_name = app["training_selection"].get("target_course")
                elif app.get("needs_analysis"):
                    course_name = app["needs_analysis"].get("target_course")
                
                if recipient_email:
                    email_data = AdmissionEmailData(
                        recipient_email=recipient_email,
                        recipient_name=recipient_name,
                        reference_number=app.get("reference_number", ""),
                        application_type=app.get("type", "individual"),
                        course_name=course_name,
                        status=update.new_status,
                        notes=update.notes
                    )
                    await send_admission_email(email_data)
        except Exception as e:
            logger.error(f"Error sending status change email: {str(e)}")
    
    return {"message": f"Status updated to {update.new_status}", "audit_entry": audit_entry}

@admissions_router.post("/admin/applications/{application_id}/notes")
async def add_admin_note(
    application_id: str,
    note: AdminNote,
    admin: dict = Depends(get_current_admin)
):
    """Add admin note to application (admin only)"""
    
    now = datetime.now(timezone.utc).isoformat()
    admin_name = f"{admin['first_name']} {admin['last_name']}"
    
    note_entry = {
        "id": str(uuid.uuid4()),
        "content": note.content,
        "type": note.note_type,
        "author": admin_name,
        "created_at": now
    }
    
    audit_entry = add_audit_entry("note_added", admin_name, f"Type: {note.note_type}")
    
    result = await db.applications.update_one(
        {"id": application_id},
        {
            "$set": {"updated_at": now},
            "$push": {
                "admin_notes": note_entry,
                "audit_trail": audit_entry
            }
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {"message": "Note added", "note": note_entry}

@admissions_router.put("/admin/applications/{application_id}/prerequisite-review")
async def review_prerequisites(
    application_id: str,
    review: PrerequisiteReview,
    admin: dict = Depends(get_current_admin)
):
    """Submit prerequisite review decision (admin only)"""
    
    if review.status not in PREREQUISITE_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {PREREQUISITE_STATUSES}")
    
    now = datetime.now(timezone.utc).isoformat()
    admin_name = f"{admin['first_name']} {admin['last_name']}"
    
    review_data = {
        "status": review.status,
        "reviewer_name": review.reviewer_name,
        "comments": review.comments,
        "evidence_sources": review.evidence_sources,
        "reviewed_at": now
    }
    
    audit_entry = add_audit_entry(
        f"prerequisite_review_{review.status}",
        admin_name,
        f"Reviewer: {review.reviewer_name}"
    )
    
    result = await db.applications.update_one(
        {"id": application_id},
        {
            "$set": {
                "prerequisite_review": review_data,
                "updated_at": now
            },
            "$push": {"audit_trail": audit_entry}
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Auto-update status based on review
    new_status = None
    if review.status == "validated":
        new_status = "prerequisites_reviewed"
    elif review.status == "not_validated":
        new_status = "admission_refused"
    elif review.status == "additional_info_required":
        new_status = "admission_pending"
    
    if new_status:
        await db.applications.update_one(
            {"id": application_id},
            {
                "$set": {"status": new_status},
                "$push": {"audit_trail": add_audit_entry(f"auto_status_change_{new_status}", "system")}
            }
        )
    
    logger.info(f"Prerequisite review completed for {application_id}: {review.status}")
    
    return {"message": f"Prerequisite review submitted: {review.status}", "review": review_data}

@admissions_router.get("/admin/prerequisite-assessments")
async def list_prerequisite_assessments(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    admin: dict = Depends(get_current_admin)
):
    """List all prerequisite assessments (admin only)"""
    
    query = {}
    if status:
        query["review_status"] = status
    
    assessments = await db.prerequisite_assessments.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    total = await db.prerequisite_assessments.count_documents(query)
    
    return {
        "assessments": assessments,
        "total": total
    }

@admissions_router.put("/admin/prerequisite-assessments/{assessment_id}/review")
async def review_prerequisite_assessment(
    assessment_id: str,
    review: PrerequisiteReview,
    admin: dict = Depends(get_current_admin)
):
    """Review a prerequisite self-assessment (admin only)"""
    
    if review.status not in PREREQUISITE_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    now = datetime.now(timezone.utc).isoformat()
    
    review_data = {
        "status": review.status,
        "reviewer_name": review.reviewer_name,
        "comments": review.comments,
        "evidence_sources": review.evidence_sources,
        "reviewed_at": now
    }
    
    result = await db.prerequisite_assessments.update_one(
        {"id": assessment_id},
        {
            "$set": {
                "review_status": review.status,
                "review": review_data,
                "updated_at": now
            }
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return {"message": "Review submitted", "review": review_data}

# =============================================================================
# ADMIN ENDPOINTS - Export & Reporting
# =============================================================================

@admissions_router.get("/admin/applications/{application_id}/export")
async def export_application_file(
    application_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Export application file for audit purposes (admin only)"""
    
    application = await db.applications.find_one(
        {"id": application_id},
        {"_id": 0}
    )
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Get linked assessments
    assessments = await db.prerequisite_assessments.find(
        {"$or": [
            {"application_id": application_id},
            {"email": application.get("email", application.get("contact_email", ""))}
        ]},
        {"_id": 0}
    ).to_list(10)
    
    # Build export document
    export_doc = {
        "export_date": datetime.now(timezone.utc).isoformat(),
        "exported_by": f"{admin['first_name']} {admin['last_name']}",
        "application": application,
        "prerequisite_assessments": assessments,
        "evidence_summary": {
            "needs_analysis_submitted": application.get("needs_analysis") is not None,
            "prerequisite_reviewed": application.get("prerequisite_review") is not None,
            "gdpr_consent_recorded": application.get("gdpr_consent", False),
            "cgv_accepted": application.get("cgv_accepted", False),
            "audit_trail_entries": len(application.get("audit_trail", [])),
            "admin_notes_count": len(application.get("admin_notes", []))
        }
    }
    
    return export_doc

@admissions_router.get("/admin/stats")
async def get_admission_stats(admin: dict = Depends(get_current_admin)):
    """Get admission statistics (admin only)"""
    
    # Count by status
    pipeline = [
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]
    status_counts = await db.applications.aggregate(pipeline).to_list(20)
    
    # Count by type
    type_pipeline = [
        {"$group": {"_id": "$type", "count": {"$sum": 1}}}
    ]
    type_counts = await db.applications.aggregate(type_pipeline).to_list(10)
    
    # Recent applications (last 30 days)
    thirty_days_ago = (datetime.now(timezone.utc) - timedelta(days=30)).isoformat()
    recent_count = await db.applications.count_documents(
        {"created_at": {"$gte": thirty_days_ago}}
    )
    
    return {
        "by_status": {item["_id"]: item["count"] for item in status_counts},
        "by_type": {item["_id"]: item["count"] for item in type_counts},
        "total_applications": await db.applications.count_documents({}),
        "recent_30_days": recent_count,
        "pending_review": await db.applications.count_documents({"status": "enquiry_received"})
    }

# Import timedelta for stats
from datetime import timedelta
