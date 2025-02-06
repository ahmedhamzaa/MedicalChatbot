from pydantic import BaseModel, EmailStr
import datetime
from typing import Optional

class UserCreate(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    role: str  # 'patient' or 'doctor'

class UserUpdate(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]

class UserResponse(BaseModel):
    fullname: str
    email: EmailStr
    role: str
    created_at: datetime.datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str