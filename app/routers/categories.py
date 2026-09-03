from typing import List  
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.category import CategoryCreate, CategoryResponse
from app.models.category import CategoryModel

router = APIRouter(
    prefix="/category",
    tags=["category"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CategoryResponse)
def create_category(cat: CategoryCreate, db: Session = Depends(get_db)):  # Fixed: removed schema.
    cat_db = CategoryModel(cat_name=cat.cat_name, cat_description=cat.cat_description)  # Fixed: removed models.
    db.add(cat_db)
    db.commit()
    db.refresh(cat_db)
    return cat_db

@router.get("/{catid}", response_model=CategoryResponse)
def get_category(catid: int, db: Session = Depends(get_db)):
    cat_db = db.query(CategoryModel).filter(CategoryModel.id == catid).first()  
    if cat_db is None:
        raise HTTPException(status_code=404, detail="category not found")
    return cat_db

@router.get("/", response_model=List[CategoryResponse])  
def get_all_category(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(CategoryModel).offset(skip).limit(limit).all()  

@router.put("/{catid}",response_model=CategoryResponse)
def update_category(catid:int,cat:CategoryCreate,db:Session=Depends(get_db)):
    cat_db = db.query(CategoryModel).filter(CategoryModel.id == catid).first()  
    if cat_db is None:
        raise HTTPException(status_code=404, detail="category not found")
    cat_db.cat_name=cat.cat_name
    cat_db.cat_description=cat.cat_description
    db.add(cat_db)
    db.commit()
    db.refresh(cat_db)
    return cat_db

@router.delete("/{catid}")
def delete_category(catid:int,db:Session=Depends(get_db)):
    cat_db = db.query(CategoryModel).filter(CategoryModel.id == catid).first()  
    if cat_db is None:
        raise HTTPException(status_code=404, detail="category not found")
    db.delete(cat_db)
    db.commit()
    return {"message":"the category deleted succesfully"}