from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.orders import OrderItemModel, OrderModel

from app.repository.orders_repo import get_order, get_orders_by_user,get_all_orders
from app.repository.cart_repo import get_user_cart_items, clear_cart
from app.repository.user_repo import get_user
from app.repository.products_repo import get_product
from app.repository.address_repo import get_address
from app.services.otp_services import verify_otp
from app.exceptions import NotFoundException,OutOfStockException,OrderStatusException,BadRequestException

def place_order(user_id: int,address_id:int,payment_method:str,otp: str, db: Session):
    verify_otp(user_id, otp)
    user_db = get_user(user_id, db)
    if user_db is None:
        raise NotFoundException(f'The user of id {user_id} is not found')

    cart_items = get_user_cart_items(user_id, db)
    if not cart_items:
        raise BadRequestException('The cart is empty')
    
    address_db = get_address(address_id, db)
    if address_db is None or address_db.user_id != user_id:
        raise NotFoundException("Address not found")

    if not user_db.phone_no:
        raise BadRequestException("Please add your phone number before placing an order")

    shipping_text = (
        f"{user_db.name}, {user_db.phone_no}, "
        f"{address_db.Address_line1}, {address_db.city}, "
        f"{address_db.state} - {address_db.pincode}"
    )

    pay_status="paid" if payment_method=="card" else "pending"

    try:
        order_db = OrderModel(user_id=user_id, total_amount=0,shipping_address=shipping_text,payment_method=payment_method,payment_status=pay_status)
        db.add(order_db)
        db.flush()

        total = 0

        for item in cart_items:
            prod_db = get_product(item.prod_id, db)
            if prod_db is None:
                raise NotFoundException(f'The product of id {item.prod_id} is not found')

            if item.quantity > (prod_db.available_stock or 0):
                raise OutOfStockException(f"Not enough stock for '{prod_db.prod_name}'")

            prod_db.available_stock = prod_db.available_stock - item.quantity

            orderItem_db = OrderItemModel(
                order_id=order_db.id,
                prod_id=item.prod_id,
                quantity=item.quantity,
                price=prod_db.prod_price,
            )
            db.add(orderItem_db)

            total = total + (prod_db.prod_price * item.quantity)

        order_db.total_amount = round(total, 2)
        clear_cart(user_id, db)

        db.commit()
        db.refresh(order_db)
        return order_db

    except Exception:
        db.rollback()
        raise

def get_users_order(user_id:int,db:Session):
    user_db=get_user(user_id,db)
    if user_db is None:
        raise NotFoundException(f'the user of id {user_id} is not found')
    return get_orders_by_user(user_id,db)

def get_orders(order_id:int,db:Session):
    return get_order(order_id,db)

def list_all_orders(db: Session, skip: int = 0, limit: int = 100):
    return get_all_orders(db, skip, limit)

def update_order_status(order_id: int, new_status: str, db: Session):
    order_db = get_order(order_id, db)
    
    if order_db is None:
        raise NotFoundException("Order not found")
        
    if order_db.status == new_status:
        raise OrderStatusException("status is up-to-date")
        
    if order_db.status == "placed":
        if new_status != "shipped":
            raise OrderStatusException("the status should go from placed to shipped")
            
    elif order_db.status == "shipped":
        if new_status != "delivered":
            raise OrderStatusException("the status should go from shipped to delivered")
            
    elif order_db.status == "delivered":
        raise OrderStatusException("the order is already delivered and cannot be changed")

    order_db.status = new_status

    if new_status == "delivered" and order_db.payment_method == "cod":
        order_db.payment_status = "paid"
    
    db.commit()
    db.refresh(order_db)
    return order_db