import Image from 'next/image';
import { useState } from 'react';

export default function BookCard({ book, onRead, onListen, onShare }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`book-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="card-inner">
                {/* Front of the card */}
                <div className="card-front">
                    <div className="image-container relative w-full h-64">
                        <Image
                            src={book.cover.startsWith('http') ? book.cover : `/${book.cover}`}
                            alt={book.title}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x400?text=No+Cover";
                            }}
                        />
                    </div>
                    <div className="book-info p-4">
                        <h3 className="book-title text-lg font-bold truncate">{book.title}</h3>
                        <p className="book-author text-sm text-gray-400 truncate">by {book.author}</p>
                        <span className="book-genre text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full mt-2 inline-block">{book.genre}</span>
                        {book.duration && (
                            <div className="book-duration mt-2 text-xs text-gray-500">
                                <i className="bi bi-clock me-1"></i> {book.duration}h
                            </div>
                        )}
                    </div>
                </div>

                {/* Back of the card */}
                <div className="card-back p-4 bg-gray-800 rounded-lg flex flex-col justify-between h-full">
                    <div className="book-description overflow-y-auto flex-grow">
                        <h4 className="text-md font-bold mb-1">{book.title}</h4>
                        <p className="author-name text-sm text-gray-400 mb-2">by {book.author}</p>
                        <p className="description-text text-sm text-gray-300 mb-4">{book.description}</p>

                        <div className="book-meta flex flex-wrap gap-2 mb-4 text-xs text-gray-400">
                            {book.duration && (
                                <span className="meta-item"><i className="bi bi-clock me-1"></i> {book.duration}h</span>
                            )}
                            {book.rating && (
                                <span className="meta-item"><i className="bi bi-star-fill me-1 text-yellow-500"></i> {book.rating}</span>
                            )}
                            {book.narrator && (
                                <span className="meta-item"><i className="bi bi-mic me-1"></i> {book.narrator}</span>
                            )}
                        </div>
                    </div>

                    <div className="book-actions flex justify-between mt-4 gap-2">
                        <button
                            className="btn-read flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm flex items-center justify-center"
                            onClick={(e) => { e.stopPropagation(); onRead(book.id); }}
                        >
                            <i className="bi bi-book-open me-1"></i> Read
                        </button>
                        <button
                            className="btn-listen flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm flex items-center justify-center"
                            onClick={(e) => { e.stopPropagation(); onListen(book.id); }}
                        >
                            <i className="bi bi-headphones me-1"></i> Listen
                        </button>
                        <button
                            className="btn-share flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded text-sm flex items-center justify-center"
                            onClick={(e) => { e.stopPropagation(); onShare(book); }}
                        >
                            <i className="bi bi-share me-1"></i> Share
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .book-card {
          perspective: 1000px;
          height: 400px;
          cursor: pointer;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .book-card.flipped .card-inner {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .card-front {
          background-color: #1f2937;
        }
        .card-back {
          background-color: #1f2937;
          transform: rotateY(180deg);
          text-align: left;
        }
      `}</style>
        </div>
    );
}
