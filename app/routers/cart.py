from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from app.schema.cart import CartAdd, CartItemResponse, CartResponse
from app.services.cart_services import add_to_cart,view_cart,update_cart_items,remove_cart_items

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{user_id}/items", response_model=CartItemResponse)
def add_to_cart_endpoint(user_id: int, data: CartAdd, db: Session = Depends(get_db)):
    return add_to_cart(user_id, data, db)

@router.get("/{user_id}", response_model=CartResponse)
def view_cart_endpoint(user_id:int,db:Session=Depends(get_db)):
    return view_cart(user_id,db)

@router.put("/{user_id}/items", response_model=CartResponse)
def update_cart_endpoint(user_id: int, data: CartAdd, db: Session = Depends(get_db)):
    return update_cart_items(user_id, data, db)

@router.delete("/{user_id}/items/{prod_id}", response_model=CartResponse)
def delete_cart_item_endpoint(user_id:int,prod_id:int,db:Session=Depends(get_db)):
    return remove_cart_items(user_id,prod_id,db)