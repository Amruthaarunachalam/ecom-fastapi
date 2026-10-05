from fastapi import HTTPException 
from sqlalchemy.orm import Session

from app.schema.category import CategoryCreate, CategoryResponse

from app.repository.products_repo import delete_by_category
from app.repository.category_repo import create_category,get_category,get_all_category

def creating_category(cat: CategoryCreate, db: Session):
    return create_category(cat,db)

def check_get_category(catid: int, db: Session):
    cat_id = get_category(catid,db)
    if cat_id is None:
         raise HTTPException(status_code=404, detail="category not found")
    return cat_id

def check_get_all_category( db: Session,skip: int = 0, limit: int = 10):
    cat_db=get_all_category(db,skip,limit)
    if cat_db is None:
        return {"Message":"Categories is Empty"}
    return cat_db

def update_category(catid:int,cat:CategoryCreate,db:Session):
    cat_db = get_category(catid,db)
    if cat_db is None:
        raise HTTPException(status_code=404, detail="category not found")
    cat_db.cat_name=cat.cat_name
    cat_db.cat_description=cat.cat_description
    db.add(cat_db)
    db.commit()
    db.refresh(cat_db)
    return cat_db

def delete_category(catid:int,db:Session):
    cat_db = get_category(catid,db) 
    if cat_db is None:
        raise HTTPException(status_code=404, detail="category not found")
    delete_by_category(catid,db)
    db.delete(cat_db)
    db.commit()
    return {"message":"the category deleted succesfully"}
