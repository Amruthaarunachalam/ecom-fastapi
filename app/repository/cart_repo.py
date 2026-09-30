from sqlalchemy.orm import Session

from app.schema.cart import CartAdd
from app.models.cart import CartItemModel

def get_cart_item(user_id: int, prod_id: int, db: Session):
    return db.query(CartItemModel).filter(
        CartItemModel.user_id == user_id,
        CartItemModel.prod_id == prod_id
    ).first()

def create_cart_item(user_id: int, data: CartAdd, db: Session):
    item_db = CartItemModel(
        user_id=user_id,
        prod_id=data.prod_id,
        quantity=data.quantity
    )
    db.add(item_db)
    db.commit()
    db.refresh(item_db)
    return item_db

def get_user_cart_items(user_id: int, db: Session):
    return db.query(CartItemModel).filter(CartItemModel.user_id == user_id).all()