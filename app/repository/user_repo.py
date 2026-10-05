from sqlalchemy.orm import Session
from app.schema.user import UserCreate,UserResponse
from app.models.user import UserModel

def create_user(user:UserCreate,db:Session):
    user_db=UserModel(
        name=user.name,
        phone_no=user.phone_no,
        email=user.email
    )
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

def get_user(userid:int,db:Session):
    return db.query(UserModel).filter(UserModel.id==userid).first()

def get_all_user(db:Session,skip:int=0,limit:int=10):
    return db.query(UserModel).offset(skip).limit(limit).all()

def get_user_by_email(email:str,db:Session):
    return db.query(UserModel).filter(UserModel.email==email).first()

def create_user_with_password(name:str,phone_no:str,email:str,hashed_password:str,db:Session):
    user_db=UserModel(name=name,phone_no=phone_no,email=email,hashed_password=hashed_password)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db