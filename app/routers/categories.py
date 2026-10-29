from typing import List  
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..ws_manager import manager
from app.schema.category import CategoryCreate, CategoryResponse

from app.services.category_services import creating_category,check_get_category,check_get_all_category,update_category,delete_category

from ..dependencies import get_current_user,get_db
router = APIRouter(
    prefix="/category",
    tags=["category"],
    dependencies=[Depends(get_current_user)]
)


@router.post("/", response_model=CategoryResponse)
async def create_category_endpoint(cat: CategoryCreate, db: Session = Depends(get_db)):
    await manager.broadcast_all("Category Created")
    return creating_category(cat,db)


@router.get("/{catid}", response_model=CategoryResponse)
def get_category_endpoint(catid: int, db: Session = Depends(get_db)):
    return check_get_category(catid,db)


@router.get("/", response_model=List[CategoryResponse])  
def get_all_category_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return check_get_all_category(db,skip,limit)


@router.put("/{catid}",response_model=CategoryResponse)
async def updating_category(catid:int,cat:CategoryCreate,db:Session=Depends(get_db)):
    await broadcast_all("category updated")
    return update_category(catid,cat,db)

@router.delete("/{catid}")
async def deleting_category(catid:int,db:Session=Depends(get_db)):
    await broadcast_all("category deleted")
    return delete_category(catid,db)
