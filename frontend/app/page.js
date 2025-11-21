"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import axios from 'axios';

export default function Home() {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        // Take first 4 books as "Top Audio Books"
        const data = response.data.slice(0, 4).map(book => ({
          ...book,
          duration: book.duration || Math.floor(Math.random() * 12) + 2,
          rating: book.rating || (Math.random() * 2 + 3).toFixed(1)
        }));
        setTopBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRead = (id) => {
    alert(`Reading book ${id}`);
  };

  const handleListen = (id) => {
    alert(`Listening to book ${id}`);
  };

  const handleShare = (book) => {
    alert(`Sharing ${book.title}`);
  };

  return (
    <main className="container my-5">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center py-20 px-4 relative overflow-hidden rounded-5 mb-5">
        <div className="hero-bg-element hero-book-icon absolute top-10 left-10 opacity-20 animate-float">📚</div>
        <div className="hero-bg-element hero-headphone-icon absolute top-20 right-20 opacity-20 animate-float-delayed">🎧</div>
        <div className="hero-bg-element hero-star-icon absolute bottom-20 left-20 opacity-20 animate-float">⭐</div>
        <div className="hero-bg-element hero-music-icon absolute bottom-10 right-10 opacity-20 animate-float-delayed">🎵</div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">Welcome to <span
            className="text-green-400 animate-pulse">Lisbook</span></h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up-delayed">
            <span>Discover and enjoy amazing audio books from around the world. Immerse yourself in captivating stories and knowledge at your fingertips.</span>
          </div>
          <div className="animate-fade-in-up-delayed-2">
            <Link href="/explore"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 animate-bounce-subtle">
              Explore Books
            </Link>
            <p className="text-sm text-gray-400 mt-4 animate-fade-in">Discover amazing stories and knowledge</p>
          </div>
        </div>
      </section>

      {/* Top Audio Books Section */}
      <section className="rounded-5 p-5 my-5">
        <h2 className="display-5 page-title fw-semibold" id="top-audio-books">Top Audio Books</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4 align-items-stretch">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <div className="spinner-border text-green-500" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            topBooks.map(book => (
              <div key={book.id} className="col">
                <BookCard
                  book={book}
                  onRead={handleRead}
                  onListen={handleListen}
                  onShare={handleShare}
                />
              </div>
            ))
          )}
        </div>
      </section>


      {/* Embed gd.html placeholder - skipping iframe for now or can embed if needed */}

      {/* Book Navigation Buttons */}
      <section className="d-flex justify-content-evenly align-items-stretch rounded-5 p-4 my-5 gx-5 text-center">
        <Link href="/"><i className="fa-solid fa-arrow-left text-green-500 text-5xl"></i></Link>
        <Link href="/pbd"><i className="fa-solid fa-arrow-right text-green-500 text-5xl"></i></Link>
      </section>

      {/* Comments Section */}
      <section className="rounded-5 p-5 mt-5 w-full max-w-3xl mx-auto shadow-md shadow-green-400">
        <div className="container mx-auto p-4 sm:p-6 rounded-lg flex flex-col items-center justify-center w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl page-title fw-semibold mb-6 text-center" id="share">
            Share Your Comments
          </h2>
          <form id="comment-form" className="space-y-4 w-full">
            <div>
              <input type="text" id="username" className="form-control w-full mt-2 rounded-md text-green-300 p-2 text-sm sm:text-base" placeholder="UserName" />
            </div>
            <div>
              <textarea id="comment" className="form-control w-full mt-2 rounded-md bg-body-tertiary border p-2 text-sm sm:text-base" placeholder="Comment What You felt" rows="3" required></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 sm:px-6 rounded-md hover:bg-green-600 text-sm sm:text-base" id="share2">
                Share comment
              </button>
            </div>
          </form>

          <div id="comments-list" className="mt-10 space-y-4 w-full"></div>
        </div>
      </section>
    </main>
  );
}
