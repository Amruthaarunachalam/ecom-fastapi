import time
import math
from fastapi import FastAPI,Request,HTTPException,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.database import Base, engine
from fastapi.responses import JSONResponse
from app.exception_handler import register_exception_handlers

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

from app.rate_limiter import limiter

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Commerce Backend")


register_exception_handlers(app)

API_PREFIX = "/v1"
api_v1 = APIRouter(prefix=API_PREFIX)

api_v1.include_router(categories_router.router)
api_v1.include_router(products_router.router)
api_v1.include_router(user_router.router)
api_v1.include_router(cart_router.router)
api_v1.include_router(orders_router.router)
api_v1.include_router(auth_router.router)
api_v1.include_router(address_router.router)
api_v1.include_router(ws_router.router)

app.include_router(api_v1)


EXCLUDED_PATHS = {
    "/",
    "/docs",
    "/openapi.json",
    "/redoc",
    f"{API_PREFIX}/auth/login",
    f"{API_PREFIX}/auth/register",
    f"{API_PREFIX}/auth/verify-otp",
    f"{API_PREFIX}/auth/google",
}

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

@app.middleware("http")
async def rate_limit(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    key = request.client.host if request.client else "unknown"

    if not limiter.is_allowed(key):
        return JSONResponse(
            status_code=429,
            headers={"Retry-After": "60 seconds"},
            content={"detail": f"Too many requests. Try again in 60 seconds."},
        )

    return await call_next(request)

@app.middleware("http")
async def log_request_time(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    print(f"Request: {request.method} {request.url.path} - Response: {response.status_code} - Time: {process_time:.4f}s)")
    return response


app.add_middleware(GZipMiddleware, minimum_size=1000) 
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "API is running..."}