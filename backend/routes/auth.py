from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, timezone, timedelta
import os
import uuid
import bcrypt
import jwt
from motor.motor_asyncio import AsyncIOMotorClient

# Create router
auth_router = APIRouter(prefix="/api/auth", tags=["authentication"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'saint-georges-academy-secret-key-2026')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# =============================================================================
# Models
# =============================================================================
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    phone: Optional[str] = None
    company: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    company: Optional[str] = None
    role: str
    created_at: str
    email_verified: bool

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)

class ChangePassword(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8)

class UpdateProfile(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None

# =============================================================================
# Helper Functions
# =============================================================================
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(user_id: str, email: str, role: str) -> str:
    """Create a JWT access token"""
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    """Decode and validate a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = decode_token(token)
    
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current admin user from JWT token"""
    user = await get_current_user(credentials)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# =============================================================================
# API Endpoints
# =============================================================================

@auth_router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister):
    """Register a new user"""
    
    # Check if email already exists
    existing_user = await db.users.find_one({"email": user_data.email.lower()})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    user = {
        "id": user_id,
        "email": user_data.email.lower(),
        "password_hash": hash_password(user_data.password),
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "phone": user_data.phone,
        "company": user_data.company,
        "role": "student",
        "email_verified": False,
        "created_at": now,
        "updated_at": now,
        "purchased_courses": [],
        "video_access": False
    }
    
    await db.users.insert_one(user)
    
    # Create token
    token = create_access_token(user_id, user["email"], user["role"])
    
    # Build response
    user_response = UserResponse(
        id=user["id"],
        email=user["email"],
        first_name=user["first_name"],
        last_name=user["last_name"],
        phone=user["phone"],
        company=user["company"],
        role=user["role"],
        created_at=user["created_at"],
        email_verified=user["email_verified"]
    )
    
    return TokenResponse(access_token=token, user=user_response)

@auth_router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login with email and password"""
    
    # Find user
    user = await db.users.find_one({"email": credentials.email.lower()})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create token
    token = create_access_token(user["id"], user["email"], user["role"])
    
    # Build response
    user_response = UserResponse(
        id=user["id"],
        email=user["email"],
        first_name=user["first_name"],
        last_name=user["last_name"],
        phone=user.get("phone"),
        company=user.get("company"),
        role=user["role"],
        created_at=user["created_at"],
        email_verified=user.get("email_verified", False)
    )
    
    return TokenResponse(access_token=token, user=user_response)

@auth_router.get("/me", response_model=UserResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        phone=current_user.get("phone"),
        company=current_user.get("company"),
        role=current_user["role"],
        created_at=current_user["created_at"],
        email_verified=current_user.get("email_verified", False)
    )

@auth_router.put("/me", response_model=UserResponse)
async def update_profile(
    profile_data: UpdateProfile,
    current_user: dict = Depends(get_current_user)
):
    """Update current user profile"""
    
    update_data = {"updated_at": datetime.now(timezone.utc).isoformat()}
    
    if profile_data.first_name:
        update_data["first_name"] = profile_data.first_name
    if profile_data.last_name:
        update_data["last_name"] = profile_data.last_name
    if profile_data.phone is not None:
        update_data["phone"] = profile_data.phone
    if profile_data.company is not None:
        update_data["company"] = profile_data.company
    
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": update_data}
    )
    
    # Get updated user
    updated_user = await db.users.find_one({"id": current_user["id"]}, {"_id": 0, "password_hash": 0})
    
    return UserResponse(
        id=updated_user["id"],
        email=updated_user["email"],
        first_name=updated_user["first_name"],
        last_name=updated_user["last_name"],
        phone=updated_user.get("phone"),
        company=updated_user.get("company"),
        role=updated_user["role"],
        created_at=updated_user["created_at"],
        email_verified=updated_user.get("email_verified", False)
    )

@auth_router.post("/change-password")
async def change_password(
    password_data: ChangePassword,
    current_user: dict = Depends(get_current_user)
):
    """Change user password"""
    
    # Get full user with password
    user = await db.users.find_one({"id": current_user["id"]})
    
    # Verify current password
    if not verify_password(password_data.current_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Update password
    new_hash = hash_password(password_data.new_password)
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": {
            "password_hash": new_hash,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Password changed successfully"}

@auth_router.post("/request-password-reset")
async def request_password_reset(request_data: PasswordResetRequest):
    """Request a password reset email"""
    
    # Find user
    user = await db.users.find_one({"email": request_data.email.lower()})
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If an account exists with this email, a reset link will be sent"}
    
    # Create reset token
    reset_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    
    # Store reset token
    await db.password_resets.insert_one({
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "token": reset_token,
        "expires_at": expires_at.isoformat(),
        "used": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # TODO: Send email with reset link
    # For now, just log it (in production, integrate with email service)
    print(f"Password reset requested for {user['email']}. Token: {reset_token}")
    
    return {"message": "If an account exists with this email, a reset link will be sent"}

@auth_router.post("/reset-password")
async def reset_password(reset_data: PasswordResetConfirm):
    """Reset password using token"""
    
    # Find reset token
    reset_record = await db.password_resets.find_one({
        "token": reset_data.token,
        "used": False
    })
    
    if not reset_record:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check if expired
    expires_at = datetime.fromisoformat(reset_record["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update password
    new_hash = hash_password(reset_data.new_password)
    await db.users.update_one(
        {"id": reset_record["user_id"]},
        {"$set": {
            "password_hash": new_hash,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    # Mark token as used
    await db.password_resets.update_one(
        {"token": reset_data.token},
        {"$set": {"used": True}}
    )
    
    return {"message": "Password has been reset successfully"}

@auth_router.post("/verify-email")
async def verify_email(token: str):
    """Verify email address"""
    
    # Find verification token
    verification = await db.email_verifications.find_one({
        "token": token,
        "used": False
    })
    
    if not verification:
        raise HTTPException(status_code=400, detail="Invalid or expired verification token")
    
    # Check if expired
    expires_at = datetime.fromisoformat(verification["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Verification token has expired")
    
    # Update user
    await db.users.update_one(
        {"id": verification["user_id"]},
        {"$set": {
            "email_verified": True,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    # Mark token as used
    await db.email_verifications.update_one(
        {"token": token},
        {"$set": {"used": True}}
    )
    
    return {"message": "Email verified successfully"}

@auth_router.post("/resend-verification")
async def resend_verification(current_user: dict = Depends(get_current_user)):
    """Resend email verification"""
    
    if current_user.get("email_verified"):
        return {"message": "Email is already verified"}
    
    # Create verification token
    verification_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=24)
    
    # Store verification token
    await db.email_verifications.insert_one({
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "email": current_user["email"],
        "token": verification_token,
        "expires_at": expires_at.isoformat(),
        "used": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # TODO: Send verification email
    print(f"Verification email requested for {current_user['email']}. Token: {verification_token}")
    
    return {"message": "Verification email sent"}

# =============================================================================
# Admin Endpoints
# =============================================================================

@auth_router.get("/users", response_model=List[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 50,
    current_admin: dict = Depends(get_current_admin)
):
    """List all users (admin only)"""
    
    users = await db.users.find(
        {},
        {"_id": 0, "password_hash": 0}
    ).skip(skip).limit(limit).to_list(limit)
    
    return [
        UserResponse(
            id=user["id"],
            email=user["email"],
            first_name=user["first_name"],
            last_name=user["last_name"],
            phone=user.get("phone"),
            company=user.get("company"),
            role=user["role"],
            created_at=user["created_at"],
            email_verified=user.get("email_verified", False)
        )
        for user in users
    ]

@auth_router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: str,
    role: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Update user role (admin only)"""
    
    if role not in ["student", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    result = await db.users.update_one(
        {"id": user_id},
        {"$set": {
            "role": role,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"User role updated to {role}"}
