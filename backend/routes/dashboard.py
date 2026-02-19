from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import os
from motor.motor_asyncio import AsyncIOMotorClient
from routes.auth import get_current_user

# Create router
dashboard_router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# =============================================================================
# Models
# =============================================================================
class PurchasedCourse(BaseModel):
    course_id: str
    course_title: str
    format: str  # "online" or "inclass"
    session: Optional[str] = None
    purchased_at: str
    payment_status: str
    transaction_id: Optional[str] = None
    access_url: Optional[str] = None

class VideoAccess(BaseModel):
    has_access: bool
    purchased_at: Optional[str] = None
    expires_at: Optional[str] = None
    videos_count: int = 75

class DashboardSummary(BaseModel):
    user_name: str
    total_courses: int
    active_courses: int
    has_video_access: bool
    recent_purchase: Optional[str] = None

class CourseProgress(BaseModel):
    course_id: str
    progress_percent: int = 0
    last_accessed: Optional[str] = None
    modules_completed: List[int] = []

# =============================================================================
# API Endpoints
# =============================================================================

@dashboard_router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(current_user: dict = Depends(get_current_user)):
    """Get dashboard summary for current user"""
    
    # Count purchased courses
    purchased_courses = current_user.get("purchased_courses", [])
    active_courses = len([c for c in purchased_courses if c.get("payment_status") == "paid"])
    
    # Get most recent purchase
    recent_purchase = None
    if purchased_courses:
        sorted_purchases = sorted(
            purchased_courses, 
            key=lambda x: x.get("purchased_at", ""), 
            reverse=True
        )
        if sorted_purchases:
            recent_purchase = sorted_purchases[0].get("course_title")
    
    return DashboardSummary(
        user_name=f"{current_user['first_name']} {current_user['last_name']}",
        total_courses=len(purchased_courses),
        active_courses=active_courses,
        has_video_access=current_user.get("video_access", False),
        recent_purchase=recent_purchase
    )

@dashboard_router.get("/my-courses", response_model=List[PurchasedCourse])
async def get_my_courses(current_user: dict = Depends(get_current_user)):
    """Get all purchased courses for current user"""
    
    purchased_courses = current_user.get("purchased_courses", [])
    
    # Enrich with course details
    result = []
    for purchase in purchased_courses:
        course = await db.courses.find_one({"id": purchase.get("course_id")}, {"_id": 0})
        
        result.append(PurchasedCourse(
            course_id=purchase.get("course_id"),
            course_title=course["title"] if course else purchase.get("course_title", "Unknown Course"),
            format=purchase.get("format", "online"),
            session=purchase.get("session"),
            purchased_at=purchase.get("purchased_at"),
            payment_status=purchase.get("payment_status", "pending"),
            transaction_id=purchase.get("transaction_id"),
            access_url=purchase.get("access_url")
        ))
    
    return result

@dashboard_router.get("/video-access", response_model=VideoAccess)
async def get_video_access(current_user: dict = Depends(get_current_user)):
    """Get video access status for current user"""
    
    has_access = current_user.get("video_access", False)
    video_purchase = current_user.get("video_purchase", {})
    
    return VideoAccess(
        has_access=has_access,
        purchased_at=video_purchase.get("purchased_at"),
        expires_at=video_purchase.get("expires_at"),
        videos_count=75
    )

@dashboard_router.get("/course/{course_id}/progress", response_model=CourseProgress)
async def get_course_progress(
    course_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get progress for a specific course"""
    
    # Check if user has access to this course
    purchased_courses = current_user.get("purchased_courses", [])
    has_access = any(
        c.get("course_id") == course_id and c.get("payment_status") == "paid"
        for c in purchased_courses
    )
    
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this course")
    
    # Get progress from database
    progress = await db.course_progress.find_one({
        "user_id": current_user["id"],
        "course_id": course_id
    }, {"_id": 0})
    
    if not progress:
        return CourseProgress(
            course_id=course_id,
            progress_percent=0,
            modules_completed=[]
        )
    
    return CourseProgress(
        course_id=course_id,
        progress_percent=progress.get("progress_percent", 0),
        last_accessed=progress.get("last_accessed"),
        modules_completed=progress.get("modules_completed", [])
    )

@dashboard_router.post("/course/{course_id}/progress")
async def update_course_progress(
    course_id: str,
    module_number: int,
    current_user: dict = Depends(get_current_user)
):
    """Mark a module as completed"""
    
    # Check if user has access to this course
    purchased_courses = current_user.get("purchased_courses", [])
    has_access = any(
        c.get("course_id") == course_id and c.get("payment_status") == "paid"
        for c in purchased_courses
    )
    
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this course")
    
    # Get course to calculate total modules
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    total_modules = len(course.get("modules", []))
    
    # Get or create progress record
    progress = await db.course_progress.find_one({
        "user_id": current_user["id"],
        "course_id": course_id
    })
    
    if progress:
        modules_completed = progress.get("modules_completed", [])
        if module_number not in modules_completed:
            modules_completed.append(module_number)
        
        progress_percent = int((len(modules_completed) / total_modules) * 100) if total_modules > 0 else 0
        
        await db.course_progress.update_one(
            {"user_id": current_user["id"], "course_id": course_id},
            {"$set": {
                "modules_completed": modules_completed,
                "progress_percent": progress_percent,
                "last_accessed": datetime.now(timezone.utc).isoformat()
            }}
        )
    else:
        modules_completed = [module_number]
        progress_percent = int((1 / total_modules) * 100) if total_modules > 0 else 0
        
        await db.course_progress.insert_one({
            "user_id": current_user["id"],
            "course_id": course_id,
            "modules_completed": modules_completed,
            "progress_percent": progress_percent,
            "last_accessed": datetime.now(timezone.utc).isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    return {"message": "Progress updated", "progress_percent": progress_percent}

@dashboard_router.get("/orders")
async def get_my_orders(current_user: dict = Depends(get_current_user)):
    """Get all orders/transactions for current user"""
    
    transactions = await db.payment_transactions.find(
        {"customer_email": current_user["email"]},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return {"orders": transactions}

# =============================================================================
# Grant Access (called after successful payment)
# =============================================================================

async def grant_course_access(
    user_email: str,
    product_id: str,
    transaction_id: str,
    session_info: Optional[str] = None
):
    """Grant course access to user after successful payment"""
    
    # Find user by email
    user = await db.users.find_one({"email": user_email.lower()})
    if not user:
        # User doesn't have an account yet - store for later
        await db.pending_access.insert_one({
            "email": user_email.lower(),
            "product_id": product_id,
            "transaction_id": transaction_id,
            "session_info": session_info,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return
    
    # Determine what was purchased
    if product_id == "ccna_videos":
        # Grant video access
        await db.users.update_one(
            {"email": user_email.lower()},
            {"$set": {
                "video_access": True,
                "video_purchase": {
                    "purchased_at": datetime.now(timezone.utc).isoformat(),
                    "expires_at": (datetime.now(timezone.utc).replace(year=datetime.now().year + 1)).isoformat(),
                    "transaction_id": transaction_id
                },
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
    else:
        # Grant course access
        # Parse product_id to get course_id and format
        parts = product_id.rsplit('_', 1)
        if len(parts) == 2:
            course_id = parts[0]
            format_type = parts[1]  # "online" or "inclass"
        else:
            course_id = product_id
            format_type = "online"
        
        # Get course title
        course = await db.courses.find_one({"id": course_id}, {"_id": 0, "title": 1})
        course_title = course["title"] if course else course_id
        
        purchase = {
            "course_id": course_id,
            "course_title": course_title,
            "format": format_type,
            "session": session_info,
            "purchased_at": datetime.now(timezone.utc).isoformat(),
            "payment_status": "paid",
            "transaction_id": transaction_id
        }
        
        await db.users.update_one(
            {"email": user_email.lower()},
            {
                "$push": {"purchased_courses": purchase},
                "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}
            }
        )

async def check_pending_access(user_email: str):
    """Check and apply any pending access grants for a user"""
    
    pending = await db.pending_access.find({"email": user_email.lower()}).to_list(100)
    
    for access in pending:
        await grant_course_access(
            user_email=user_email,
            product_id=access["product_id"],
            transaction_id=access["transaction_id"],
            session_info=access.get("session_info")
        )
        
        # Remove from pending
        await db.pending_access.delete_one({"_id": access["_id"]})
