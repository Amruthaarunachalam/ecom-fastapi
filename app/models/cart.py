from app.database import Base
from sqlalchemy import Column,Integer,ForeignKey,UniqueConstraint

class CartItemModel(Base):
    __tablename__="cart_items"
    
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    prod_id=Column(Integer,ForeignKey("products.id"))
    quantity=Column(Integer,nullable=False,default=1)
