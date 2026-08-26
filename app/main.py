# app/main.py
from fastapi import FastAPI
from app.database import Base, engine

from app.models import category as category_model
from app.models import products as product_model

from app.routers import categories as categories_router
from app.routers import products as products_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce Backend")

app.include_router(categories_router.router)
app.include_router(products_router.router)


@app.get("/")
def root():
    return {"message": "API is running..."}