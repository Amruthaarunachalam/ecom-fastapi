class AppException(Exception):
    status_code=500
    message="something went wrong"

    def __init__(self,message:str):
        self.message=message
        super().__init__(self.message)

class NotFoundException(AppException):
    status_code=404
    message="Not Found"

class UnauthorizedException(AppException):
    status_code=401
    message="Not Authenticated"

class ForbiddenException(AppException):
    status_code=403
    message="Not allowed to access"

class BadRequestException(AppException):
    status_code=400
    message="Bad Request"

class InvalidOtpException(BadRequestException):
    message="Invalid Otp"

class OutOfStockException(BadRequestException):
    message="not enough stock"

class OrderStatusException(BadRequestException):
    message="Invalid order status"