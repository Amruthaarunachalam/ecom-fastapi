from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.products import ProductCreate, ProductResponse

from app.services.product_services import creating_products,check_get_product,check_get_all_product,update_prod,delete_product

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductResponse)
def create_product_endpoint(prod: ProductCreate, db: Session = Depends(get_db)):
    return creating_products(prod,db)


@router.get("/{prodid}", response_model=ProductResponse)
def get_product_endpoint(prodid: int, db: Session = Depends(get_db)):
    return check_get_product(prodid,db)

@router.get("/", response_model=List[ProductResponse])
def get_all_products_endpoint(skip: int = 0, limit: int = 100, category_id: int = None, db: Session = Depends(get_db)):
    return check_get_all_product(db,skip,limit,category_id)

@router.put("/{prodid}", response_model=ProductResponse)
def updating_products(prodid: int, prod: ProductCreate, db: Session = Depends(get_db)):
    return update_prod(prodid,prod,db)

@router.delete("/{prodid}")
def deleting_products(prodid: int, db: Session = Depends(get_db)):
    return delete_product(prodid,db)
