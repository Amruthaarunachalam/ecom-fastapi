from pydantic import BaseModel, Field
from typing import List,Optional
class CartAdd(BaseModel):
    prod_id: int
    quantity: int = Field(default=1, ge=1)

class CartItemResponse(BaseModel):
    id: int
    user_id: int
    prod_id: int
    quantity: int
    class Config:
        from_attributes = True

class CartLineResponse(BaseModel):
    prod_id:int
    prod_name:str
    image_url:Optional[str]
    prod_price:float
    quantity:int
    line_total:float

class CartResponse(BaseModel):
    items:List[CartLineResponse]
    subtotal:float
