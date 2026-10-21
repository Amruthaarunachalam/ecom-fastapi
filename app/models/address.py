from app.database import Base
from sqlalchemy import Column,Integer,String,Boolean,ForeignKey

class AddressModel(Base):
    __tablename__="addresses"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"),nullable=False,index=True)
    Address_line1=Column(String,nullable=False)
    city=Column(String,nullable=False)
    state=Column(String,nullable=False)
    pincode=Column(String,nullable=False)
    is_default=Column(Boolean,nullable=False,default=False)