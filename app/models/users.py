from app.database import Base
from sqlalchemy import Column,Integer,String
class UserModel(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False)
    email=Column(String,unique=True,nullable=False)
    hashed_password=Column(String,nullable=False)
    