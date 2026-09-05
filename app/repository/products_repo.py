from sqlalchemy.orm import Session

from app.schema.products import ProductCreate, ProductResponse
from app.models.products import ProductModel

def create_product(prod: ProductCreate, db: Session):
    prod_db = ProductModel(
        prod_name=prod.prod_name,
        category_id=prod.category_id,
        prod_description=prod.prod_description,
        prod_color=prod.prod_color,
        prod_price=prod.prod_price,
        available_stock=prod.available_stock,
        image_url=prod.image_url
    )
    db.add(prod_db)
    db.commit()
    db.refresh(prod_db)
    return prod_db

def get_product(prodid: int, db: Session):
    return db.query(ProductModel).filter(ProductModel.id == prodid).first()
    

def get_all_products( db: Session,skip: int = 0, limit: int = 100, category_id: int = None):
    query = db.query(ProductModel)
    if category_id:
        query = query.filter(ProductModel.category_id == category_id)
    return query.offset(skip).limit(limit).all()

def delete_by_category(catid:int, db:Session):
    return db.query(ProductModel).filter(ProductModel.category_id==catid).delete(synchronize_session=False)