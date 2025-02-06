## router.py
from fastapi import APIRouter, Depends, HTTPException
from models import UserCreate, UserResponse, Token, LoginRequest
from auth import hash_password, verify_password, create_access_token, get_current_user
from database import db
import datetime

router = APIRouter()

@router.post("/auth/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    user_data = {
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "created_at": datetime.datetime.utcnow()
    }

    new_user = await db.users.insert_one(user_data)
    created_user = await db.users.find_one({"_id": new_user.inserted_id})

    return UserResponse(**created_user)

@router.post("/auth/login", response_model=Token)
async def login_user(login_request: LoginRequest):
    user = await db.users.find_one({"email": login_request.email})
    if not user or not verify_password(login_request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: str = Depends(get_current_user)):
    user = await db.users.find_one({"email": current_user})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(**user)
