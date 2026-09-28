from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.schema.user import UserCreate,UserResponse
from app.models.user import UserModel
from app.repository.user_repo import create_user,get_user,get_all_user

def creating_user(user:UserCreate,db:Session):
    return create_user(user,db)

def check_get_user(userid:int,db:Session):
    user_db=get_user(userid,db)
    if user_db is None:
         raise HTTPException(status_code=404,detail=f'User of id {userid} is not found')
    return user_db

def check_get_all_user(db:Session,skip:int=0,limit:int=10):
    user_db=get_all_user(db,skip,limit)
    if not user_db:
        return []
    return user_db

def check_update_user(userid:int,user:UserCreate,db:Session):
    user_id=get_user(userid,db)
    if user_id is None:
        raise HTTPException(status_code=404,detail=f'User of id {userid} is not found')
    user_id.name=user.name
    user_id.phone_no=user.phone_no
    user_id.email=user.email

    db.add(user_id)
    db.commit()
    db.refresh(user_id)

    return user_id

def check_delete_user(userid:int,db:Session):
    user_db=get_user(userid,db)
    if user_db is None:
        raise HTTPException(status_code=404,detail=f'User of id {userid} is not found')

    db.delete(user_db)
    db.commit()
    return {"message": f'the user of id {userid} is deleted successfully'}

