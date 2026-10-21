from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repository.address_repo import get_user_address,create_address,get_address
from app.schema.address import AddAddress,AddressResponse
from app.repository.user_repo import get_user

def creating_address(user_id,add:AddAddress,db:Session):
    user_db=get_user(user_id,db)
    if user_db is None:
        raise HTTPException(status_code=404,detail=f'The user of id {user_id} is not found')

    return create_address(user_id,add,db)

def get_my_address(user_id:int,address_id:int,db:Session):
    address=get_address(address_id,db)
    if address is None:
        raise HTTPException(status_code=404,detail=f'the address of id {address_id} is not found')
    if address.user_id!=user_id:
        raise HTTPException(status_code=404,detail='the address does not belong to you')
    return address

def updating_address(user_id:int,address_id:int,add:AddAddress,db:Session):
    user_db=get_user(user_id,db)
    if user_db is None:
        raise HTTPException(status_code=404,detail=f'The user of id {user_id} is not found')

    address_db=get_my_address(user_id,address_id,db)
    if address_db is None:
        raise HTTPException(status_code=404,detail=f'the address is not found')
    address_db.Address_line1=add.Address_line1
    address_db.city=add.city
    address_db.state=add.state
    address_db.pincode=add.pincode
    address_db.is_default=add.is_default

    db.add(address_db)
    db.commit()
    db.refresh(address_db)
    return address_db

def delete_address(user_id:int,address_id:int,db:Session):
    address_db=get_my_address(user_id,address_id,db)
    if address_db is None:
        raise HTTPException(status_code=404,detail="address not found")
    db.delete(address_db)
    db.commit()
    return {"message":"address has been deleted succesfully"}

def get_all_address(user_id:int,db:Session):
    user_db=get_user(user_id,db)
    if user_db is None:
        raise HTTPException(status_code=404,detail=f'The user of id {user_id} is not found')
    return  get_user_address(user_id,db)