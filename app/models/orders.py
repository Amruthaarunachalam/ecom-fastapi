from datetime import datetime
from app.database import Base
from sqlalchemy import Column,Integer,ForeignKey,Float,String,DateTime
from sqlalchemy.orm import relationship

class OrderItemModel(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    prod_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    order = relationship("OrderModel", back_populates="items")

class OrderModel(Base):
    __tablename__="orders"

    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"))
    total_amount=Column(Float,nullable=False)
    status=Column(String,default="placed")
    created_at=Column(DateTime,default=datetime.utcnow)

    items=relationship("OrderItemModel",back_populates="order")