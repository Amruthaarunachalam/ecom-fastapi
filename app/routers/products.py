from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.products import ProductCreate, ProductResponse
from app.models.products import ProductModel

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
def create_product(prod: ProductCreate, db: Session = Depends(get_db)):
    prod_db = ProductModel(
        prod_name=prod.prod_name,
        category_id=prod.category_id,
        prod_description=prod.prod_description,
        prod_color=prod.prod_color,
        prod_price=prod.prod_price,
        available_stock=prod.available_stock
    )
    db.add(prod_db)
    db.commit()
    db.refresh(prod_db)
    return prod_db

@router.get("/{prodid}", response_model=ProductResponse)
def get_product(prodid: int, db: Session = Depends(get_db)):
    prod_db = db.query(ProductModel).filter(ProductModel.id == prodid).first()
    if prod_db is None:
        raise HTTPException(status_code=404, detail="product not found")
    return prod_db

@router.get("/", response_model=List[ProductResponse])
def get_all_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(ProductModel).offset(skip).limit(limit).all()

@router.put("/{prodid}", response_model=ProductResponse)
def update_prod(prodid: int, prod: ProductCreate, db: Session = Depends(get_db)):
    prod_db = db.query(ProductModel).filter(ProductModel.id == prodid).first()
    if prod_db is None:
        raise HTTPException(status_code=404, detail="product not found")

    prod_db.prod_name = prod.prod_name
    prod_db.category_id = prod.category_id
    prod_db.prod_description = prod.prod_description
    prod_db.prod_color = prod.prod_color
    prod_db.prod_price = prod.prod_price
    prod_db.available_stock = prod.available_stock

    db.add(prod_db)
    db.commit()
    db.refresh(prod_db)
    return prod_db