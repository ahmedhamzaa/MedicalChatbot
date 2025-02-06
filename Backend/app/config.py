import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "MedicalChatbot")
SECRET_KEY = os.getenv("SECRET_KEY", "8F8TWU0bf_cRrzl6q6pEPJlDxNgWQxzcrtJCk1JqaJA")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30