from pydantic import BaseModel
from typing import List
from datetime import datetime

class OrderItemResponse(BaseModel):
    prod_id:int
    quantity:int
    price:float
    class Config:
        from_attributes=True

class OrderResponse(BaseModel):
    id:int
    user_id:int
    total_amount:float
    status:str
    created_at:datetime
    items:List[OrderItemResponse]
    class Config:
        from_attributes=True