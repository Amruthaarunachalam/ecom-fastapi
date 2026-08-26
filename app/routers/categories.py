from fastapi import APIRouter,Depends,HTTPExecption
from ..database import SessionLocal
from sqlalchemy.orm import Session
from app.schema.category import CategoryCreate,CategoryResponse
from app.models.category import CategoryModel
router=APIRouter(
    prefix="/category",
    tags=["category"]
)
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/",response_model=CategoryResponse)
def create_category(cat:schema.CategoryCreate,db:Session=Depends(get_db)):
    cat_db=models.CategoryModel(cat_name=cat.cat_name,cat_description=cat.cat_description)
    db.add(cat_db)
    db.commit()
    db.refresh(cat_db)
    return cat_db

@router.get("/{catid}",response_model=CategoryResponse)
def get_category(catid:int,db:Session=Depends(get_db)):
    cat_db= db.query(models.CategoryModel).filter(models.CategoryModel.id==catid).first()
    if cat_db is None:
        raise HTTPException(status_code=404,detail="category not found")
    return cat_db

@router.get("/",response_model=CategoryResponse)
def get_all_category(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    return db.query(models.CategoryModel).offset(skip).limit(limit).all()
    

