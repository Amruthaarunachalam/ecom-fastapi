from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from ..dependencies import get_db,get_current_user,user_admin
from app.schema.orders import OrderItemResponse,OrderResponse,OrderCreate,OrderStatusUpdate

from app.services.orders_services import place_order,get_orders,get_users_order,list_all_orders,update_order_status
from app.services.otp_services import send_otp

from ..ws_manager import manager

router=APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/",response_model=OrderResponse)
async def place_order_endpoint(order:OrderCreate,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return place_order(current_user.id,order.address_id,order.payment_method,order.otp,db)

@router.get("/",response_model=List[OrderResponse])
async def get_user_order_endpoint(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return get_users_order(current_user.id,db)

@router.get("/detail/{order_id}",response_model=OrderResponse)
def get_all_orders_endpoint(order_id:int,db:Session=Depends(get_db)):
    return get_orders(order_id,db)

@router.post("/send-otp")
def send_otp_endpoint(current_user=Depends(get_current_user)):
    send_otp(current_user.id,current_user.email)
    return {"message": "OTP sent"}

@router.get("/all",response_model=List[OrderResponse],dependencies=[Depends(user_admin)])
def list_all_orders_endpoint(db:Session=Depends(get_db),skip:int=0,limit:int=100):
    return list_all_orders(db,skip,limit)

@router.put("/{order_id}/status",response_model=OrderResponse,dependencies=[Depends(user_admin)])
async def update_order_status_endpoint(order_id:int,data:OrderStatusUpdate,db:Session=Depends(get_db)):
    order=update_order_status(order_id,data.status,db)
    await manager.broadcast(order.user_id,"Status Updated")
    return order
