from sqlalchemy.orm import Session
from app.schema.address import AddAddress,AddressResponse
from app.models.address import AddressModel

def get_user_address(user_id:int,db:Session):
    return db.query(AddressModel).filter(AddressModel.user_id==user_id).all()

def get_address(address_id:int,db:Session):
    return db.query(AddressModel).filter(AddressModel.id==address_id).first()

def create_address(user_id,add:AddAddress,db:Session):
    address_db=AddressModel(
        user_id=user_id,
        Address_line1=add.Address_line1,
        city=add.city,
        state=add.state,
        pincode=add.pincode,
        is_default=add.is_default
    )
    db.add(address_db)
    db.commit()
    db.refresh(address_db)
    return address_db