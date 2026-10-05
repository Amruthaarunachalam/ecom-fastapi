from typing import List  
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.category import CategoryCreate, CategoryResponse
from app.models.category import CategoryModel

def create_category(cat: CategoryCreate, db: Session):  # Fixed: removed schema.
    cat_db = CategoryModel(cat_name=cat.cat_name, cat_description=cat.cat_description)  # Fixed: removed models.
    db.add(cat_db)
    db.commit()
    db.refresh(cat_db)
    return cat_db

def get_category(catid: int, db: Session):
    return db.query(CategoryModel).filter(CategoryModel.id == catid).first()  
    
def get_all_category(db: Session,skip: int = 0, limit: int = 10 ):
    return db.query(CategoryModel).offset(skip).limit(limit).all()

