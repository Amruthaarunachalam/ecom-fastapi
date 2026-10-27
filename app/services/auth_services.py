from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.schema.auth import RegisterRequest,LoginRequest,OtpVerifyRequest
from app.repository.user_repo import get_user_by_email,create_user_with_password
from app.security import hash_password,verify_password,create_access_token
from app.services.otp_services import send_otp, verify_otp

def register_user(data:RegisterRequest,db:Session):
    if get_user_by_email(data.email,db) is not None:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_with_password(
        data.name,data.phone_no,data.email,hash_password(data.password),db)
    
def login_user(data: LoginRequest, db: Session):
    user_db = get_user_by_email(data.email, db)
    if (
        user_db is None
        or not user_db.hashed_password
        or not verify_password(data.password, user_db.hashed_password)
    ):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    send_otp(user_db.id, user_db.email)
    return {"message": "OTP sent to your email"}

def verify_login_otp(data: OtpVerifyRequest, db: Session):
    user_db = get_user_by_email(data.email, db)
    if user_db is None:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    verify_otp(user_db.id, data.otp)
    return {"access_token": create_access_token(user_db.id), "token_type": "bearer"}
   