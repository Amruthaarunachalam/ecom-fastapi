from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from ..dependencies import get_db,get_current_user
from app.schema.cart import CartAdd, CartItemResponse, CartResponse
from app.services.cart_services import add_to_cart,view_cart,update_cart_items,remove_cart_items

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)



@router.post("/items", response_model=CartItemResponse)
def add_to_cart_endpoint(data: CartAdd, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    return add_to_cart(current_user.id, data, db)

@router.get("/", response_model=CartResponse)
def view_cart_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return view_cart(current_user.id,db)

@router.put("/items", response_model=CartResponse)
def update_cart_endpoint( data: CartAdd, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    return update_cart_items(current_user.id, data, db)

@router.delete("/items/{prod_id}", response_model=CartResponse)
def delete_cart_item_endpoint(prod_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return remove_cart_items(current_user.id,prod_id,db)