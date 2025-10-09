import React, { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import BookCard from '../components/BookCard'
import { books } from '../data/books'

const Explore = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('title')

  // Get unique genres from books
  const genres = useMemo(() => {
    const allGenres = books.map(book => book.genre)
    return ['all', ...new Set(allGenres)]
  }, [])

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === selectedGenre)
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'rating':
          return b.rating - a.rating
        case 'duration':
          return a.duration.localeCompare(b.duration)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedGenre, sortBy])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Animated Background Circles */}
      {Array.from({ length: 22 }, (_, i) => (
        <div
          key={i}
          className="circle fixed w-6 h-6 rounded-full pointer-events-none opacity-50"
          style={{
            backgroundColor: 'transparent',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out, left 0.15s, top 0.15s'
          }}
        />
      ))}

      <main className="book-container">
        {/* Books Grid - cards will be rendered directly */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="no-books-message" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem', color: '#f59e0b' }}></i>
            <h3 style={{ margin: '20px 0 10px 0', color: '#f59e0b', fontSize: '1.5rem' }}>No books found</h3>
            <p>Try adjusting your search terms or filters to find more books.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Explore