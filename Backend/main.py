from fastapi import FastAPI, HTTPException, Depends ,WebSocket, WebSocketDisconnect

from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Optional
import datetime
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Header
import asyncio



app = FastAPI()
#app.mount('/', app=sio_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins. Replace "*" with specific origins for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)
# MongoDB Connection
MONGO_URL = "mongodb+srv://ahmedhamza0601:DqmILxA9Os6BPikH@cluster0.hpmu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" # Replace this with your MongoDB connection string
DB_NAME = "MedicalChatbot"
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# JWT Configuration
SECRET_KEY = "8F8TWU0bf_cRrzl6q6pEPJlDxNgWQxzcrtJCk1JqaJA"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user_old(token: str = Depends(lambda token: token)):
    credentials_exception = HTTPException(
        status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email

def get_current_user(authorization: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=401, detail="Could not validate credentials"
    )
    try:
        # Extract token from "Bearer <token>"
        if not authorization.startswith("Bearer "):
            raise credentials_exception
        token = authorization.split(" ")[1]
        
        # Decode and validate token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email

# User Schema
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


@app.post("/auth/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    existing_user = await db["User"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    new_user = {
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "created_at": datetime.datetime.utcnow(),
        "updated_at": datetime.datetime.utcnow()
    }
    result = await db["User"].insert_one(new_user)
    return UserResponse(**new_user)


@app.post("/auth/login", response_model=Token)
async def login_user(user: LoginRequest):
    existing_user = await db["User"].find_one({"email": user.email})
    if not existing_user or not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/me", response_model=UserResponse)
async def get_me(token: str = Depends(get_current_user)):
    user = await db["User"].find_one({"email": token}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{email}")
async def update_user(email: str, user_update: UserUpdate):
    update_data = {k: v for k, v in user_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db["User"].update_one({"email": email}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User updated successfully"}

@app.delete("/users/{email}")
async def delete_user(email: str):
    result = await db["User"].delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

def get_ai_response(user_message):

    return ( "I have no response for your message !! : " + user_message)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Accepting client connection...')
    await websocket.accept()
    while True:
        try:
            
            data=await websocket.receive_text()
            print(data)
            
            await asyncio.sleep(1)

            await websocket.send_text("resp")
            print("Sending")
            
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')

