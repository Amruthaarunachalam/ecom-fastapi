from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.schema.auth import RegisterRequest,LoginRequest
from app.repository.user_repo import get_user_by_email,create_user_with_password
from app.security import hash_password,verify_password,create_access_token

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
    return {"access_token":create_access_token(user_db.id),"token_type":"bearer"}