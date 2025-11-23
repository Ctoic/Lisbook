import json
import os
import sys

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from backend.core.database import engine, Base, SessionLocal
from backend.models.models import User, Book, Chapter

def migrate_data():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Migrate Users
        users_file = "backend/data/users.json"
        if os.path.exists(users_file):
            with open(users_file, "r") as f:
                users_data = json.load(f)
                for user_data in users_data:
                    # Check if user exists
                    existing_user = db.query(User).filter(User.id == user_data["id"]).first()
                    if not existing_user:
                        user = User(
                            id=user_data["id"],
                            username=user_data["username"],
                            email=user_data.get("email"),
                            password=user_data["password"],
                            role=user_data["role"]
                        )
                        db.add(user)
            print("Users migrated successfully.")

        # Migrate Books
        books_file = "backend/data/books.json"
        if os.path.exists(books_file):
            with open(books_file, "r") as f:
                books_data = json.load(f)
                for book_data in books_data:
                    # Check if book exists
                    existing_book = db.query(Book).filter(Book.id == book_data["id"]).first()
                    if not existing_book:
                        book = Book(
                            id=book_data["id"],
                            title=book_data["title"],
                            author=book_data["author"],
                            cover=book_data["cover"],
                            genre=book_data["genre"],
                            description=book_data["description"]
                        )
                        db.add(book)
                        
                        # Migrate Chapters
                        for chapter_data in book_data.get("chapters", []):
                            chapter = Chapter(
                                id=chapter_data["id"],
                                book_id=book.id,
                                index=chapter_data["index"],
                                title=chapter_data["title"],
                                audio_file=chapter_data["audio_file"]
                            )
                            db.add(chapter)
            print("Books migrated successfully.")
        
        db.commit()
        print("Migration completed successfully.")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    migrate_data()
