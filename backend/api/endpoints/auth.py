from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.models.models import User as UserModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: str
    username: str
    role: str
    email: Optional[str] = None

@router.post("/login")
async def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(
        UserModel.username == credentials.username,
        UserModel.password == credentials.password
    ).first()
    
    if user:
        # In a real app, return a JWT token. For now, return simple user info.
        return {
            "token": "mock-token-123",
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role,
                "email": user.email
            }
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/me")
async def get_current_user(token: str, db: Session = Depends(get_db)):
    # Mock validation
    if token == "mock-token-123":
        # Return admin user for now (or first user)
        user = db.query(UserModel).first()
        if user:
            return {
                "id": user.id,
                "username": user.username,
                "role": user.role,
                "email": user.email
            }
    raise HTTPException(status_code=401, detail="Invalid token")
