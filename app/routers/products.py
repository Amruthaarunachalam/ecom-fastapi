from fastapi import APIRouter,Depends,HTTPExecption
from ..database import SessionLocal
from sqlalchemy.orm import Session
from app.schema.category import ProductCreate,ProductResponse
from app.models.category import ProductModel
router=APIRouter(
    prefix="/products",
    tags=["products"]
)
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/",response_model=ProductResponse)
def create_product(prod:schema.ProductCreate,db:Session=Depends(get_db)):
    prod_db=models.ProductModel(prod_name=prod.prod_name,
                     category_id=prod.category_id,prod_description=prod.prod_description,
                     prod_color=prod.prod_color,prod_price=prod.prod_price,
                     available_stock=prod.available_stock)
    db.add(prod_db)
    db.commit()
    db.refresh(prod_db)
    return prod_db

@router.get("/{prodid}",response_model=ProductResponse)
def get_product(prodid:int,db:Session=Depends(get_db)):
    prod_db= db.query(models.ProductModel).filter(models.ProductModel.id==prodid).first()
    if prod_db is None:
        raise HTTPException(status_code=404,detail="product not found")
    return prod_db

@router.get("/",response_model=ProductResponse)
def get_all_products(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    return db.query(models.CategoryModel).offset(skip).limit(limit).all()

@router.put("/{prod_id}",response_model=ProductResponse)
def update_prod(prod:schema.ProductCreate,prodid:int,db:Session=Depends(get_db)):
    proid=get_product(prodid,db)
    if prodid is None:
        raise HTTPExecption(status_code=404,detail="product not found")

    prodid.prod_name=prod.prod_name
    prodid.category_id=prod.category_id
    prodid.prod_description=prod.prod_description
    prodid.prod_color=prod.prod_color
    prodid.prod_price=prod.prod_price
    prodid.available_stock=prod.prod.available_stock
    db.add(prodid)
    db.commit()
    db.refresh(prodid)
    return prodid
    

