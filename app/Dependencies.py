import jwt
import os
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
load_dotenv()


Secret_Key=os.getenv("Secret_Key")
Algorithm="HS256"

pwd_context=CryptContext(schemes=["bcrypt"])
def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(plainpass:str,hashpass:str):
    return pwd_context.verify(plainpass,hashpass)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_jwt_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, Secret_Key, algorithm=Algorithm)