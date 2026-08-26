from app.database import Base
from sqlalchemy import Coulmn,Integer,String,Float,ForeignKey
class ProductModel(Base):
    __tablename__="products"
    id=Column(Integer,primary_key=True,index=True)
    prod_name=Column(String,nullable=False)
    category_id=Column(String,ForeignKey("category.id"))
    prod_description=Column(String)
    prod_color=Column(String)
    prod_price=Column(Float,nullable=False)
    available_stock=(Integer)