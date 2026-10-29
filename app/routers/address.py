from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from ..dependencies import get_db,get_current_user

from app.schema.address import AddAddress,AddressResponse
from app.services.address_services import creating_address,updating_address,delete_address,get_all_address

router=APIRouter(
    prefix="/addresses",
    tags=["addresses"]
)
@router.post("/",response_model=AddressResponse)
def create_address_endpoint(add:AddAddress,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return creating_address(current_user.id,add,db)

@router.get("/",response_model=List[AddressResponse])
def get_address_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return get_all_address(current_user.id,db)

@router.put("/{address_id}",response_model=AddressResponse)
def update_address_endpoint(address_id:int,add:AddAddress,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return updating_address(current_user.id,address_id,add,db)

@router.delete("/{address_id}")
def delete_address_endpoint(address_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return delete_address(current_user.id,address_id,db)