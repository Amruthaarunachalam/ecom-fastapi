from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.schema.products import ProductCreate, ProductResponse
from app.models.products import ProductModel

from app.repository.products_repo import (
    create_product,
    get_product,
    get_all_products
)

def creating_products(prod: ProductCreate, db: Session):
    return create_product(prod, db)


def check_get_product(prodid: int, db: Session):
    prod_db = get_product(prodid, db)
    if prod_db is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod_db


def check_get_all_product(db: Session, skip: int = 0, limit: int = 100, category_id: int = None):
    check_prod = get_all_products(db=db, skip=skip, limit=limit, category_id=category_id)
    if not check_prod:
        return []
    return check_prod


def update_prod(prodid: int, prod: ProductCreate, db: Session):
    prod_db = get_product(prodid, db)
    if prod_db is None:
        raise HTTPException(status_code=404, detail="Product not found")

    prod_db.prod_name = prod.prod_name
    prod_db.category_id = prod.category_id
    prod_db.prod_description = prod.prod_description
    prod_db.prod_color = prod.prod_color
    prod_db.prod_price = prod.prod_price
    prod_db.available_stock = prod.available_stock
    prod_db.image_url = prod.image_url

    db.add(prod_db)
    db.commit()
    db.refresh(prod_db)
    return prod_db


def delete_product(prodid: int, db: Session):
    prod_db = get_product(prodid, db)
    if prod_db is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(prod_db)
    db.commit()
    return {"message": "Product deleted successfully"}