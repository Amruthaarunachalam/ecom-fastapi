# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

from app.models import category as category_model
from app.models import products as product_model

from app.routers import categories as categories_router
from app.routers import products as products_router
from app.routers import users as reg_login_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories_router.router)
app.include_router(products_router.router)
app.include_router(reg_login_router.router)


@app.get("/")
def root():
    return {"message": "API is running..."}