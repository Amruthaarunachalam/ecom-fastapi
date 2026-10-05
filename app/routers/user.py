from typing import List
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.user import UserCreate,UserResponse

from app.services.user_services import creating_user,check_get_user,check_get_all_user,check_update_user,check_delete_user

router=APIRouter(
    prefix="/users",
    tags=["users"]
)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/",response_model=UserResponse)
def create_user_endpoint(user:UserCreate,db:Session=Depends(get_db)):
    return creating_user(user,db)

@router.get("/",response_model=List[UserResponse])
def get_all_user_endpoint(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    return check_get_all_user(db,skip,limit)

@router.get("/{userid}",response_model=UserResponse)
def get_user_endpoint(userid:int,db:Session=Depends(get_db)):
    return check_get_user(userid,db)

@router.put("/{userid}",response_model=UserResponse)
def update_user_endpoint(userid:int,user:UserCreate,db:Session=Depends(get_db)):
    return check_update_user(userid,user,db)

@router.delete("/{userid}")
def delete_user_endpoint(userid:int,db:Session=Depends(get_db)):
    return check_delete_user(userid,db)