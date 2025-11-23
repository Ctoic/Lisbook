from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import uuid
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.models.models import User as UserModel

router = APIRouter()

class UserBase(BaseModel):
    username: str
    role: str = "user"
    email: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: str
    
    class Config:
        orm_mode = True

@router.get("", response_model=List[User])
async def get_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()

@router.post("", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(UserModel).filter(UserModel.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = UserModel(
        id=str(uuid.uuid4()),
        username=user.username,
        email=user.email,
        password=user.password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.put("/{user_id}", response_model=User)
async def update_user(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}")
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
