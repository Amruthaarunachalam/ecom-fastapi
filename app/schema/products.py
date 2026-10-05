from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    prod_name: str
    category_id: int
    prod_description: Optional[str] = None
    prod_color: Optional[str] = None
    prod_price: float
    available_stock: Optional[int] = 0
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    class Config:
        from_attributes = True