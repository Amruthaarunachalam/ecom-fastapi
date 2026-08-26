# main.py
from fastapi import FastAPI
import app.models
from app.database import engine
from app.routers import categories,products
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce Backend")

app.include_router(categories.router)
app.include_router(products.router)


@app.get("/")
def root():
    return {"message": "API is running..."}