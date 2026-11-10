from sqlalchemy.orm import Session

from app.models.orders import OrderModel

def get_order(order_id: int, db: Session):
    return db.query(OrderModel).filter(OrderModel.id == order_id).first()

def get_orders_by_user(user_id: int, db: Session):
    return (
        db.query(OrderModel)
        .filter(OrderModel.user_id == user_id)
        .order_by(OrderModel.id.desc())
        .all()
    )

def get_all_orders(db:Session,skip:int=0,limit:int=100):
    return(db.query(OrderModel)
    .order_by(OrderModel.id.desc())
    .offset(skip)
    .limit(limit)
    .all()
    )