from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal

from app.schema.orders import OrderItemResponse,OrderResponse

from app.services.orders_services import place_order,get_orders,get_users_order

router=APIRouter(
    prefix="/orders",
    tags=["orders"]
)

def get_db():
        db=SessionLocal()
        try:
            yield db
        finally:
            db.close()

@router.post("/{user_id}",response_model=OrderResponse)
def place_order_endpoint(user_id:int,db:Session=Depends(get_db)):
    return place_order(user_id,db)

@router.get("/{user_id}",response_model=List[OrderResponse])
def get_user_order_endpoint(user_id:int,db:Session=Depends(get_db)):
    return get_users_order(user_id,db)

@router.get("/detail/{order_id}",response_model=OrderResponse)
def get_all_orders_endpoint(order_id:int,db:Session=Depends(get_db)):
    return get_orders(order_id,db)