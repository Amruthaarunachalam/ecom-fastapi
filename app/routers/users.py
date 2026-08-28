from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..Dependencies import hash_password, verify_password, create_jwt_token
from app.schema.users import UserInput, TokenResponse, UserLogin
from app.models.users import UserModel

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserInput, db: Session = Depends(get_db)):
    query = db.query(UserModel).filter(UserModel.email == user.email).first()
    if query:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_db = UserModel(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    
    return {
        "status": "User created successfully!",
        "generated_userid": user_db.id,
        "name": user_db.name,
        "email": user_db.email
    }

@router.post("/login", response_model=TokenResponse)
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user_data.email).first()
    if not db_user or not verify_password(user_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password credential")
        
    token_string = create_jwt_token(user_id=db_user.id)   
    return {"access_token": token_string, "token_type": "bearer"}