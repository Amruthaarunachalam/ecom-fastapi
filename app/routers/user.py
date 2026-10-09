from typing import List
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..dependencies import get_current_user,get_db
from app.schema.user import UserCreate,UserResponse

from app.services.user_services import creating_user,check_get_user,check_get_all_user,check_update_user,check_delete_user

router=APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_current_user)]
)


#@router.get("/",response_model=List[UserResponse])
#def get_all_user_endpoint(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
#    return check_get_all_user(db,skip,limit)

@router.get("/me",response_model=UserResponse)
def get_user_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return check_get_user(current_user.id,db)

@router.put("/me",response_model=UserResponse)
def update_user_endpoint(user:UserCreate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return check_update_user(current_user.id,user,db)

#@router.delete("/{userid}")
#def delete_user_endpoint(userid:int,db:Session=Depends(get_db)):
#    return check_delete_user(userid,db)