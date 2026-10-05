from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.schema.cart import CartAdd
from app.repository.cart_repo import get_cart_item, create_cart_item,get_user_cart_items
from app.repository.user_repo import get_user
from app.repository.products_repo import get_product

def add_to_cart(user_id: int, data: CartAdd, db: Session):
    user_db = get_user(user_id, db)
    if user_db is None:
        raise HTTPException(status_code=404, detail=f'The user of id {user_id} is not found')

    prod_db = get_product(data.prod_id, db)
    if prod_db is None:
        raise HTTPException(status_code=404, detail=f'The product of id {data.product_id} is not found')

    item_db = get_cart_item(user_id, data.prod_id, db)

    if item_db is None:
        if data.quantity > (prod_db.available_stock or 0):
            raise HTTPException(status_code=400, detail="Not enough stock")
        return create_cart_item(user_id, data, db)

    new_qty = item_db.quantity + data.quantity
    if new_qty > (prod_db.available_stock or 0):
        raise HTTPException(status_code=400, detail="Not enough stock")
    item_db.quantity = new_qty
    db.commit()
    db.refresh(item_db)
    return item_db

def view_cart(user_id:int,db:Session):
    user_db = get_user(user_id, db)
    if user_db is None:
        raise HTTPException(status_code=404, detail=f'The user of id {user_id} is not found')

    cart_items=get_user_cart_items(user_id,db)
    if cart_items is None:
        raise HTTPException(status_code=404,detail="No items in the cart")

    items=[]
    subtotal=0
    for item in cart_items:
        prod_db=get_product(item.prod_id,db)
        line_total=prod_db.prod_price*item.quantity
        items.append({
           "prod_id": prod_db.id,
           "prod_name":prod_db.prod_name,
           "image_url":prod_db.image_url,
           "prod_price": prod_db.prod_price,
            "quantity":item.quantity,
           "line_total":line_total
        })
        subtotal = subtotal + line_total

    return {"items":items,"subtotal":subtotal}

def update_cart_items(user_id:int,data:CartAdd,db:Session):
    user_db = get_user(user_id, db)
    if user_db is None:
        raise HTTPException(status_code=404, detail=f'The user of id {user_id} is not found')

    prod_db = get_product(data.prod_id, db)
    if prod_db is None:
        raise HTTPException(status_code=404, detail=f'The product of id {data.product_id} is not found')

    item_db = get_cart_item(user_id, data.prod_id, db)

    if item_db is None:
        raise HTTPException(status_code=404,detail="No items in the cart")

    if data.quantity > (prod_db.available_stock or 0):
            raise HTTPException(status_code=400, detail="Not enough stock")
    item_db.quantity=data.quantity
    db.add(item_db)
    db.commit()
    db.refresh(item_db)
    return view_cart(user_id, db)

def remove_cart_items(user_id: int, prod_id: int, db: Session):
    item_db = get_cart_item(user_id, prod_id, db)
    if item_db is None:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    db.delete(item_db)
    db.commit()
    return view_cart(user_id, db) 