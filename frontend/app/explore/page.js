"use client";
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';
import axios from 'axios';

export default function Explore() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        genre: '',
        duration: '',
        sort: 'title'
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // In a real scenario, use an environment variable for the API URL
                const response = await axios.get('http://localhost:8000/api/books');
                const data = response.data.map(book => ({
                    ...book,
                    // Add mock data if missing, similar to explore.js
                    duration: book.duration || Math.floor(Math.random() * 12) + 2,
                    popularity: book.popularity || Math.floor(Math.random() * 100) + 1,
                    releaseDate: book.releaseDate || new Date(2022 + Math.random() * 2, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
                    rating: book.rating || (Math.random() * 2 + 3).toFixed(1),
                    narrator: book.narrator || ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'][Math.floor(Math.random() * 5)]
                }));
                setBooks(data);
                setFilteredBooks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        let result = [...books];

        // Search
        if (filters.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term) ||
                (book.description && book.description.toLowerCase().includes(term))
            );
        }

        // Genre
        if (filters.genre) {
            result = result.filter(book => book.genre === filters.genre);
        }

        // Duration
        if (filters.duration) {
            result = result.filter(book => {
                if (filters.duration === 'short') return book.duration < 4;
                if (filters.duration === 'medium') return book.duration >= 4 && book.duration <= 8;
                if (filters.duration === 'long') return book.duration > 8;
                return true;
            });
        }

        // Sort
        switch (filters.sort) {
            case 'title':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'author':
                result.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'genre':
                result.sort((a, b) => a.genre.localeCompare(b.genre));
                break;
            case 'popularity':
                result.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            default:
                break;
        }

        setFilteredBooks(result);
    }, [filters, books]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            genre: '',
            duration: '',
            sort: 'title'
        });
    };

    const genres = [...new Set(books.map(book => book.genre).filter(Boolean))].sort();

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
        <div className="min-h-screen bg-gray-900 text-gray-300">
            {/* Search and Filter Section */}
            <section className="search-filter-section bg-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="bi bi-search text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    placeholder="Search by title, author, or genre..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                />
                                {filters.search && (
                                    <button
                                        onClick={() => handleFilterChange('search', '')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Genre</label>
                                <select
                                    value={filters.genre}
                                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                >
                                    <option value="">All Genres</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Duration</label>
                                <select
                                    value={filters.duration}
                                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                >
                                    <option value="">Any Duration</option>
                                    <option value="short">Short (&lt; 4h)</option>
                                    <option value="medium">Medium (4-8h)</option>
                                    <option value="long">Long (&gt; 8h)</option>
                                </select>
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Sort By</label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                >
                                    <option value="title">Title A-Z</option>
                                    <option value="author">Author A-Z</option>
                                    <option value="genre">Genre</option>
                                    <option value="popularity">Popularity</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600"
                                >
                                    <i className="bi bi-arrow-clockwise me-1"></i> Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Grid */}
            <main className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="spinner-border text-green-500" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="text-center py-20">
                        <i className="bi bi-search text-5xl text-yellow-500 mb-4 block"></i>
                        <h3 className="text-xl font-bold mb-2">No books found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBooks.map(book => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onRead={handleRead}
                                    onListen={handleListen}
                                    onShare={handleShare}
                                />
                            ))}
                        </div>
                        <div className="text-center mt-8 text-gray-400 text-sm">
                            Showing {filteredBooks.length} of {books.length} books
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
