from app.database import Base
from sqlalchemy import Column,Integer,String
class CategoryModel(Base):
    __tablename__="category"
    id=Column(Integer,primary_key=True,index=True)
    cat_name=Column(String,nullable=False)
    cat_description=Column(String,default=None)