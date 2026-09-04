from typing import List  
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from app.schema.category import CategoryCreate, CategoryResponse

from app.services.category_services import creating_category,check_get_category,check_get_all_category,update_category,delete_category

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
def create_category_endpoint(cat: CategoryCreate, db: Session = Depends(get_db)):
    return creating_category(cat,db)


@router.get("/{catid}", response_model=CategoryResponse)
def get_category_endpoint(catid: int, db: Session = Depends(get_db)):
    return check_get_category(catid,db)


@router.get("/", response_model=List[CategoryResponse])  
def get_all_category_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return check_get_all_category(db,skip,limit)


@router.put("/{catid}",response_model=CategoryResponse)
def updating_category(catid:int,cat:CategoryCreate,db:Session=Depends(get_db)):
    return update_category(catid,cat,db)

@router.delete("/{catid}")
def deleting_category(catid:int,db:Session=Depends(get_db)):
    return delete_category(catid,db)
