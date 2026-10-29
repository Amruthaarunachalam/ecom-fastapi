from pydantic import BaseModel
class AddAddress(BaseModel):
    Address_line1:str
    city:str
    state:str
    pincode:str
    is_default:bool =False

class AddressResponse(AddAddress):
    id:int
    user_id:int
    class Config:
        from_attributes=True
