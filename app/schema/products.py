from pydantic import BaseModel
from typing import Optional
class ProductBase(BaseModel):
    prod_name: str
    category_id: int
    prod_description: Optional[str]=None
    prod_color: Optional[str]=None
    prod_price: int
    available_stock: Optional[int]=None
class ProductCreate(ProductBase):
    pass
class ProductResponse(ProductBase):
    id:int
    class Config:
        from_attributes=True