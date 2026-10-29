from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.auth import RegisterRequest, LoginRequest, TokenResponse,OtpVerifyRequest,MessageResponse,GoogleAuthRequest
from app.schema.user import UserResponse
from app.services.auth_services import register_user, login_user, verify_login_otp,google_login

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse)
def register_endpoint(data: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(data, db)

@router.post("/login", response_model=MessageResponse)
def login_endpoint(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(data, db)

@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp_endpoint(data: OtpVerifyRequest, db: Session = Depends(get_db)):
    return verify_login_otp(data, db)

@router.post("/google",response_model=TokenResponse)
def login_through_google(data:GoogleAuthRequest,db:Session=Depends(get_db)):
    return google_login(data,db)