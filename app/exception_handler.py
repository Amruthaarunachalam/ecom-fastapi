from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from app.exceptions import AppException

app=FastAPI()

def register_exception_handlers(app:FastAPI):
    @app.exception_handler(AppException)
    async def handle_AppException(request:Request,exc:AppException):
        return JSONResponse(
        status_code=exc.status_code,
        content={"detail":f"{exc.message}"}
    )