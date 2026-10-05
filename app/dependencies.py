import jwt
from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials

from app.repository.user_repo import get_user
from app.database import SessionLocal
from app.security import SECRET_KEY,ALGORITHM

bearer_scheme = HTTPBearer()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(auth:HTTPAuthorizationCredentials=Depends(bearer_scheme),db:Session=Depends(get_db)):
    try:
        token=auth.credentials
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_id=int(payload['sub'])
    except(jwt.PyJWTError,KeyError,ValueError):
        raise HTTPException(status_code=401,detail="Invalid or expired token")

    user_db = get_user(user_id, db)
    if user_db is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user_db