import time
from fastapi import FastAPI,Request,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.database import Base, engine
from fastapi.responses import JSONResponse

from app.models import category as category_model
from app.models import products as product_model
from app.models import user as user_model
from app.models import cart as cart_model
from app.models import orders as orders_model
from app.models import address as address_model

from app.routers import categories as categories_router
from app.routers import products as products_router
from app.routers import user as user_router
from app.routers import cart as cart_router
from app.routers import orders as orders_router
from app.routers import auth as auth_router
from app.routers import ws as ws_router
from app.routers import address as address_router
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
app.include_router(user_router.router)
app.include_router(cart_router.router)
app.include_router(orders_router.router)
app.include_router(auth_router.router)
app.include_router(ws_router.router)
app.include_router(address_router.router)

app.add_middleware(GZipMiddleware, minimum_size=1000) 
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])

@app.middleware("http")
async def log_request_time(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    print(f"Request: {request.method} {request.url.path} - Response: {response.status_code} - Time: {process_time:.4f}s)")
    return response

EXCLUDED_PATHS = ["/", "/docs", "/openapi.json", "/login","/register","/redocs"]

@app.middleware("http")
async def authenticate_request(request: Request, call_next):
    if request.url.path in EXCLUDED_PATHS or request.method == "OPTIONS":
        return await call_next(request)
        
    if "Authorization" not in request.headers:
        return JSONResponse(
            status_code=401, 
            content={"detail": "Unauthorized"}
        )
        
    response = await call_next(request)
    return response

@app.get("/")
def root():
    return {"message": "API is running..."}