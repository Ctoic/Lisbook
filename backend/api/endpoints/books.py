from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.models.models import Book as BookModel, Chapter as ChapterModel

# Define Pydantic models
class ChapterBase(BaseModel):
    index: int
    title: str
    audio_file: str

class ChapterCreate(ChapterBase):
    id: str

class Chapter(ChapterBase):
    id: str
    book_id: str

    class Config:
        orm_mode = True

class BookBase(BaseModel):
    title: str
    author: str
    cover: str
    genre: str
    description: str

class BookCreate(BookBase):
    chapters: List[ChapterCreate] = []

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    cover: Optional[str] = None
    genre: Optional[str] = None
    description: Optional[str] = None
    chapters: Optional[List[ChapterCreate]] = None

class Book(BookBase):
    id: str
    chapters: List[Chapter]

    class Config:
        orm_mode = True

router = APIRouter()

@router.get("", response_model=List[Book])
def get_books(db: Session = Depends(get_db)):
    """
    Retrieve all books.
    """
    return db.query(BookModel).all()

@router.get("/{book_id}", response_model=Book)
async def get_book(book_id: str, db: Session = Depends(get_db)):
    """
    Retrieve a specific book by ID.
    """
    book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if book:
        return book
    raise HTTPException(status_code=404, detail="Book not found")

@router.post("", response_model=Book)
async def create_book(book: BookCreate, db: Session = Depends(get_db)):
    """
    Create a new book.
    """
    # Simple ID generation (in real app use UUID or auto-increment)
    import uuid
    new_book_id = str(uuid.uuid4())
    
    db_book = BookModel(
        id=new_book_id,
        title=book.title,
        author=book.author,
        cover=book.cover,
        genre=book.genre,
        description=book.description
    )
    db.add(db_book)
    
    for chapter_data in book.chapters:
        db_chapter = ChapterModel(
            id=chapter_data.id,
            book_id=new_book_id,
            index=chapter_data.index,
            title=chapter_data.title,
            audio_file=chapter_data.audio_file
        )
        db.add(db_chapter)
        
    db.commit()
    db.refresh(db_book)
    return db_book

@router.put("/{book_id}", response_model=Book)
async def update_book(book_id: str, book_update: BookUpdate, db: Session = Depends(get_db)):
    """
    Update an existing book by ID.
    """
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    update_data = book_update.dict(exclude_unset=True)
    
    # Handle chapters separately if needed, for now just update basic fields
    if "chapters" in update_data:
        # Logic to update chapters would go here (complex due to relationships)
        # For simplicity, we'll skip chapter updates in this basic implementation
        del update_data["chapters"]
        
    for key, value in update_data.items():
        setattr(db_book, key, value)
        
    db.commit()
    db.refresh(db_book)
    return db_book

@router.delete("/{book_id}")
async def delete_book(book_id: str, db: Session = Depends(get_db)):
    """
    Delete a book by ID.
    """
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
        
    db.delete(db_book)
    db.commit()
    return {"message": "Book deleted successfully"}
