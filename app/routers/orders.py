from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from ..ws_manager import manager
from ..dependencies import get_db,get_current_user
from app.schema.orders import OrderItemResponse,OrderResponse

from app.services.orders_services import place_order,get_orders,get_users_order

router=APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/",response_model=OrderResponse)
async def place_order_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    await manager.broadcast(current_user.id,"order is placed")
    await manager.broadcast_all("product quantity has been updated")
    return place_order(current_user.id,db)

@router.get("/",response_model=List[OrderResponse])
async def get_user_order_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    await manager.broadcast(current_user.id,"order list/summary")
    return get_users_order(current_user.id,db)

@router.get("/detail/{order_id}",response_model=OrderResponse)
def get_all_orders_endpoint(order_id:int,db:Session=Depends(get_db)):
    return get_orders(order_id,db)