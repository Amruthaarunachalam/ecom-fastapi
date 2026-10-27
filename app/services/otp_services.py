import random
import os
import smtplib

from fastapi import HTTPException
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

SENDER_EMAIL_ADDRESS = os.getenv("SENDER_EMAIL_ADDRESS")
SENDER_EMAIL_PASSWORD = os.getenv("SENDER_EMAIL_PASSWORD")

otps = {}   

def send_otp(user_id: int,email:str):
    otp = str(random.randint(100000, 999999))
    otps[user_id] = otp
    print("OTP is:", otp) 

    msg = EmailMessage()
    msg["Subject"] = "Your OTP for order verification"
    msg["From"] = SENDER_EMAIL_ADDRESS
    msg["To"] = email
    msg.set_content(f"Your OTP is {otp}. Do not share it with anyone.")

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print("Email error:", e)
        raise HTTPException(status_code=500, detail="Could not send OTP email")


def verify_otp(user_id: int, otp: str):
    if otps.get(user_id) != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    del otps[user_id]           