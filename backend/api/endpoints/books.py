from fastapi import APIRouter, HTTPException
from typing import List, Optional
import json
import os
from pydantic import BaseModel

router = APIRouter()

# Define Pydantic models for response
class Chapter(BaseModel):
    id: str
    index: int
    title: str
    audio_file: str

class Book(BaseModel):
    id: str
    title: str
    author: str
    cover: str
    genre: str
    description: str
    chapters: List[Chapter]

# Helper to load books
def load_books():
    file_path = os.path.join(os.path.dirname(__file__), "../../data/books.json")
    with open(file_path, "r") as f:
        return json.load(f)

@router.get("/", response_model=List[Book])
def get_books():
    """
    Retrieve all books.
    """
    try:
        books = load_books()
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{book_id}", response_model=Book)
def get_book(book_id: str):
    """
    Retrieve a specific book by ID.
    """
    try:
        books = load_books()
        book = next((b for b in books if b["id"] == book_id), None)
        if book:
            return book
        raise HTTPException(status_code=404, detail="Book not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
