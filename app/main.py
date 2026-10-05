# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

from app.models import category as category_model
from app.models import products as product_model
<<<<<<< HEAD

from app.routers import categories as categories_router
from app.routers import products as products_router
#from app.routers import users as reg_login_router
=======
from app.models import user as user_model
from app.models import cart as cart_model
from app.models import orders as orders_model

from app.routers import categories as categories_router
from app.routers import products as products_router
from app.routers import user as user_router
from app.routers import cart as cart_router
from app.routers import orders as orders_router
>>>>>>> 676f4c229b9acff1e9f6eb3e57b882ea88e0eacb

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
<<<<<<< HEAD

app.include_router(categories_router.router)
app.include_router(products_router.router)
app.include_router(reg_login_router.router)
=======
>>>>>>> 676f4c229b9acff1e9f6eb3e57b882ea88e0eacb

app.include_router(categories_router.router)
app.include_router(products_router.router)
app.include_router(user_router.router)
app.include_router(cart_router.router)
app.include_router(orders_router.router)

@app.get("/")
def root():
    return {"message": "API is running..."}