from pydantic import BaseModel
from typing import List,Optional,Literal
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
    shipping_address: Optional[str] = None
    payment_method: Optional[str] = None
    payment_status: Optional[str] = None
    created_at:datetime
    items:List[OrderItemResponse]
    class Config:
        from_attributes=True

class OrderCreate(BaseModel):
    address_id: int
    payment_method: Literal["cod", "card"]
    otp: str