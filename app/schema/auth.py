from pydantic import BaseModel

class RegisterRequest(BaseModel):
    name:str
    phone_no:str
    email:str
    password:str

class LoginRequest(BaseModel):
    email:str
    password:str

class TokenResponse(BaseModel):
    access_token:str
    token_type:str="bearer"

class OtpVerifyRequest(BaseModel):
    email: str
    otp: str

class MessageResponse(BaseModel):
    message: str