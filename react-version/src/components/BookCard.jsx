import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const BookCard = ({ book }) => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleRead = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/book/${book.id}`)
  }

  const handleListen = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/book/${book.id}`)
  }

  return (
    <div className="card">
      <div className="card-inner">
        {/* Front of card */}
        <div className="card-front">
          <div className="image-container">
            <img
              src={book.coverImage}
              alt={book.title}
              onError={(e) => {
                e.target.style.display = 'none'
                const placeholder = document.createElement('div')
                placeholder.className = 'image-placeholder'
                placeholder.innerHTML = `
                  <div class="placeholder-content">
                    <i class="bi bi-book" style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"></i>
                    <p style="font-size: 0.9rem; text-align: center; margin: 0;">${book.title}</p>
                  </div>
                `
                e.target.parentNode.appendChild(placeholder)
              }}
            />
          </div>
          <div className="book-info">
            <h3 className="book-title">
              {t(`books.${book.id}.title`) || book.title}
            </h3>
            <p className="book-author">
              by {t(`books.${book.id}.author`) || book.author}
            </p>
            <span className="book-genre">{book.genre}</span>
          </div>
        </div>

        {/* Back of card */}
        <div className="card-back">
          <div className="book-description">
            <h4>{t(`books.${book.id}.title`) || book.title}</h4>
            <p className="author-name">
              by {t(`books.${book.id}.author`) || book.author}
            </p>
            <p className="description-text">
              {t(`books.${book.id}.description`) || book.description}
            </p>
            <div className="book-actions">
              <button className="btn-read" onClick={handleRead}>
                <i className="bi bi-book-open"></i> Read
              </button>
              <button className="btn-listen" onClick={handleListen}>
                <i className="bi bi-headphones"></i> Listen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard