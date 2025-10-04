import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { books } from '../data/books'

const Home = () => {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState('')
  const [commentForm, setCommentForm] = useState({ username: '', comment: '' })
  const [comments, setComments] = useState([])
  
  // Audio player state
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [audioElement, setAudioElement] = useState(null)
  
  // Get featured books (first 4 books)
  const featuredBooks = books.slice(0, 4)
  const currentBook = books[currentBookIndex]
  
  // Initialize audio element
  useEffect(() => {
    const audio = document.getElementById('audio-player')
    if (audio) {
      setAudioElement(audio)
      audio.volume = volume
      
      // Event listeners
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      
      audio.addEventListener('ended', () => {
        handleNextTrack()
      })
      
      return () => {
        audio.removeEventListener('loadedmetadata', () => {})
        audio.removeEventListener('timeupdate', () => {})
        audio.removeEventListener('ended', () => {})
      }
    }
  }, [])
  
  // Load track when book or track changes
  useEffect(() => {
    if (audioElement && currentBook && currentBook.audioFiles[currentTrackIndex]) {
      audioElement.src = currentBook.audioFiles[currentTrackIndex]
      audioElement.load()
      if (isPlaying) {
        audioElement.play().catch(err => console.log('Playback failed:', err))
      }
    }
  }, [currentBookIndex, currentTrackIndex, audioElement])
  
  // Typing effect for hero section
  useEffect(() => {
    const text = "Discover and enjoy amazing audio books from around the world. Immerse yourself in captivating stories and knowledge at your fingertips."
    let index = 0
    
    const typeWriter = () => {
      if (index < text.length) {
        setTypedText(prev => prev + text.charAt(index))
        index++
        setTimeout(typeWriter, 50)
      }
    }
    
    const timer = setTimeout(typeWriter, 1000)
    return () => clearTimeout(timer)
  }, [])
  
  // Audio player controls
  const handlePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play().catch(err => console.log('Playback failed:', err))
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const handleNextTrack = () => {
    if (currentTrackIndex < currentBook.audioFiles.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      setCurrentTrackIndex(0)
      setIsPlaying(false)
    }
  }
  
  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      setCurrentTrackIndex(currentBook.audioFiles.length - 1)
    }
  }
  
  const handleSeek = (e) => {
    if (audioElement) {
      const seekTime = (e.target.value / 100) * duration
      audioElement.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }
  
  const handleVolumeChange = (change) => {
    if (audioElement) {
      const newVolume = Math.max(0, Math.min(1, volume + change))
      audioElement.volume = newVolume
      setVolume(newVolume)
    }
  }
  
  const handleSkip = (seconds) => {
    if (audioElement) {
      audioElement.currentTime = Math.max(0, Math.min(duration, audioElement.currentTime + seconds))
    }
  }
  
  const handleSpeedChange = (speed) => {
    if (audioElement) {
      audioElement.playbackRate = speed
      setPlaybackSpeed(speed)
    }
  }
  
  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }
  
  const handleNextBook = () => {
    const nextIndex = (currentBookIndex + 1) % books.length
    setCurrentBookIndex(nextIndex)
    setCurrentTrackIndex(0)
    setIsPlaying(false)
  }
  
  const handlePrevBook = () => {
    const prevIndex = (currentBookIndex - 1 + books.length) % books.length
    setCurrentBookIndex(prevIndex)
    setCurrentTrackIndex(0)
    setIsPlaying(false)
  }
  
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentForm.username && commentForm.comment) {
      const newComment = {
        id: Date.now(),
        username: commentForm.username,
        comment: commentForm.comment,
        date: new Date().toLocaleDateString()
      }
      setComments([newComment, ...comments])
      setCommentForm({ username: '', comment: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 relative overflow-hidden">
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

      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center px-4 relative overflow-hidden h-screen flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="hero-bg-element hero-book-icon absolute top-10 left-10 opacity-20 animate-float text-4xl">
          📚
        </div>
        <div className="hero-bg-element hero-headphone-icon absolute top-20 right-20 opacity-20 animate-float-delayed text-4xl">
          🎧
        </div>
        <div className="hero-bg-element hero-star-icon absolute bottom-20 left-20 opacity-20 animate-float text-4xl">
          ⭐
        </div>
        <div className="hero-bg-element hero-music-icon absolute bottom-10 right-10 opacity-20 animate-float-delayed text-4xl">
          🎵
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 py-8 mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            Welcome to <span className="text-green-400 animate-pulse" style={{ color: '#94d769' }}>Lisbook</span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto animate-fade-in-up-delayed mb-10">
            <span id="typed-text">{typedText}</span>
          </div>
          <div className="animate-fade-in-up-delayed-2">
            <Link
              to="/explore"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 animate-bounce-subtle mb-5"
            >
              Explore Books
            </Link>
            <p className="text-sm text-gray-400 mt-3 animate-fade-in">Discover amazing stories and knowledge</p>
            
            {/* Scroll Indicator */}
            <div className="mt-6 animate-bounce">
              <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto my-5">
        {/* Top Audio Books Section */}
        <section className="rounded-5 p-5 my-5">
          <h2 className="display-5 page-title fw-semibold" style={{ color: '#94d769', fontSize: '2.5rem', fontWeight: '600' }}>
            Top Audio Books
          </h2>

          <div className="flex flex-row gap-4 mt-4 px-4">
            {featuredBooks.map((book, index) => (
              <div key={book.id} className="flex-1" data-book={book.id}>
                <div className="features-card border rounded-5 p-4 text-center h-full">
                  <div className="card-cover-container rounded-4 d-flex align-items-center border">
                    <img 
                      src={book.coverImage || book.cover} 
                      className="card-img-top img-fluid" 
                      alt="Audio book cover"
                      onError={(e) => {
                        e.target.src = '/Images/bookify.jpg'
                      }}
                    />
                  </div>
                  <div className="card-body mt-4">
                    <h4 className="card-title h6 page-title">
                      {t(`books.${book.id}.title`) || book.title}
                    </h4>
                    <p className="card-text">
                      {t(`books.${book.id}.author`) || `By ${book.author}`}
                    </p>
                    <Link 
                      to={`/book/${book.id}`} 
                      className="btn btn-bd-primary btn-sm mt-4 px-5 rounded-5"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audio Player Section */}
        <section className="rounded-5 p-5 mt-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Book Card Display - 30% width */}
            <div className="w-full lg:w-[30%]">
              <div className="features-card border rounded-5 p-4 text-center h-full">
              {/* Cover Image */}
              <div className="card-cover-container rounded-4 d-flex align-items-center border" style={{ height: '16rem' }}>
                <img
                  src={currentBook.coverImage || currentBook.cover}
                  alt={currentBook.title}
                  className="card-img-top img-fluid"
                  onError={(e) => {
                    e.target.src = '/Images/bookify.jpg'
                  }}
                />
              </div>
              
              {/* Book Details */}
              <div className="mt-4">
                <h1 className="text-2xl font-bold" style={{ color: '#10b981' }}>
                  {currentBook.title}
                </h1>
                <h3 className="text-lg mt-2">By {currentBook.author}</h3>
                <p className="text-sm mt-2 text-gray-400">
                  {currentBook.description}
                </p>
              </div>

              <hr className="opacity-50 w-60 mt-4 mx-auto" style={{ borderColor: '#4b5563' }} />

              {/* Favorite, share, comment Buttons */}
              <div className="mt-3 flex justify-center" style={{ gap: '1rem' }}>
                <i className="bi bi-heart text-2xl cursor-pointer hover:text-green-500 transition-colors" title="Save to Favourites"></i>
                <i className="bi bi-share text-2xl cursor-pointer hover:text-green-500 transition-colors" title="Share"></i>
                <i className="bi bi-chat text-2xl cursor-pointer hover:text-green-500 transition-colors" title="View comments"></i>
              </div>
              </div>
            </div>

            {/* Playlist and Audio Player - 70% width */}
            <div className="w-full lg:w-[70%]">
              <div className="features-card border rounded-5 p-4 h-full">
              {/* Playlist */}
              <ul className="list-none text-left overflow-auto m-2 mb-4" style={{ maxHeight: '400px' }}>
                {currentBook.audioFiles.map((audioFile, index) => {
                  const trackTitle = currentBook.trackTitles[`t${index}`] || `Chapter ${index + 1}`
                  const isActive = index === currentTrackIndex
                  
                  return (
                    <li 
                      key={index}
                      onClick={() => handleTrackClick(index)}
                      className="p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" 
                      style={{ backgroundColor: isActive ? '#10b981' : '#374151' }}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300 flex items-center gap-2">
                          {isActive && isPlaying && <i className="bi bi-play-circle-fill text-white"></i>}
                          {trackTitle}
                        </p>
                        <a 
                          href={audioFile} 
                          download 
                          className="text-green-500 hover:text-green-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="bi bi-cloud-arrow-down-fill text-xl"></i>
                        </a>
                      </div>
                      <div className="mt-2 bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-white rounded-full h-1 transition-all" 
                          style={{ width: isActive ? `${(currentTime / duration) * 100}%` : '0%' }}
                        ></div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {/* Audio Player */}
              <div className="rounded-5 p-4 mt-4" style={{ backgroundColor: '#374151', borderRadius: '1.5rem' }}>
                <audio id="audio-player" className="hidden"></audio>
                
                {/* Time Display and Seek Bar */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    id="seekSlider"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-gray-600 rounded-full outline-none appearance-none"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%)`
                    }}
                  />
                  <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                  
                  {/* Speed Control */}
                  <div className="relative inline-block">
                    <select 
                      value={playbackSpeed}
                      onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                      className="cursor-pointer font-semibold rounded-lg py-1 px-3 bg-transparent text-green-300 border-none outline-none"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                </div>

                {/* Audio Player Controls */}
                <div className="flex justify-center items-center gap-6 mt-4">
                  <div 
                    className="ctrl-button-small cursor-pointer text-gray-300 hover:text-green-500 transition-colors"
                    onClick={() => handleVolumeChange(-0.1)}
                    title="Volume Down"
                  >
                    <i className="bi bi-volume-down-fill text-2xl"></i>
                  </div>
                  <div 
                    className="ctrl-button-medium cursor-pointer text-gray-300 hover:text-green-500 transition-colors"
                    onClick={() => handleSkip(-30)}
                    title="Rewind 30s"
                  >
                    <span className="text-lg font-semibold">-30</span>
                  </div>
                  <div 
                    className="cursor-pointer w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110" 
                    style={{ backgroundColor: '#10b981' }}
                    onClick={handlePlayPause}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-3xl text-white`}></i>
                  </div>
                  <div 
                    className="ctrl-button-medium cursor-pointer text-gray-300 hover:text-green-500 transition-colors"
                    onClick={() => handleSkip(30)}
                    title="Forward 30s"
                  >
                    <span className="text-lg font-semibold">+30</span>
                  </div>
                  <div 
                    className="ctrl-button-small cursor-pointer text-gray-300 hover:text-green-500 transition-colors"
                    onClick={() => handleVolumeChange(0.1)}
                    title="Volume Up"
                  >
                    <i className="bi bi-volume-up-fill text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Book Navigation Buttons */}
        <section className="d-flex justify-content-evenly align-items-stretch rounded-5 p-4 my-5 gx-5 text-center flex justify-center gap-4" style={{ borderRadius: '1.5rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <div className="flex-item w-auto" style={{ minWidth: '150px' }}>
            <button
              onClick={handlePrevBook}
              className="text-gray-300 hover:text-green-500 border p-3 d-block rounded-start-5 block cursor-pointer w-full"
              style={{ 
                borderColor: '#94d769',
                borderRadius: '1.5rem 0 0 1.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
                backgroundColor: 'transparent'
              }}
              title="Previous Book"
            >
              Previous Book
            </button>
          </div>
          <div className="flex-item w-auto" style={{ minWidth: '150px' }}>
            <button
              onClick={handleNextBook}
              className="text-gray-300 hover:text-green-500 p-3 border d-block rounded-end-5 block cursor-pointer w-full"
              style={{ 
                borderColor: '#94d769',
                borderRadius: '0 1.5rem 1.5rem 0',
                textDecoration: 'none',
                transition: 'all 0.3s',
                backgroundColor: 'transparent'
              }}
              title="Next Book"
            >
              Next Book
            </button>
          </div>
        </section>

        {/* Comments Section */}
        <section className="row rounded-5 p-5 mt-5" style={{ borderRadius: '1.5rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <div className="container mx-auto p-6 rounded-lg">
            <h2 className="display-5 page-title fw-semibold mb-6 text-center" style={{ color: '#94d769', fontSize: '2.5rem', fontWeight: '600' }}>
              Share Your Comments
            </h2>
            <form id="comment-form" className="space-y-4 mt-5" onSubmit={handleCommentSubmit}>
              <div>
                <label htmlFor="username" className="form-label block text-gray-300 mb-2">
                  Your Name:
                </label>
                <input 
                  type="text" 
                  id="username" 
                  value={commentForm.username}
                  onChange={(e) => setCommentForm({ ...commentForm, username: e.target.value })}
                  className="form-control mt-2 rounded-5 bg-body-tertiary border w-full p-3" 
                  style={{ 
                    backgroundColor: '#2a2a2a', 
                    borderColor: '#94d769', 
                    color: '#fff',
                    borderRadius: '1.5rem'
                  }}
                  required 
                />
              </div>
              <div>
                <label htmlFor="comment" className="form-label block text-gray-300 mb-2">
                  Your Comment:
                </label>
                <textarea 
                  id="comment" 
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                  className="form-control mt-2 rounded-5 bg-body-tertiary border w-full p-3" 
                  rows="6"
                  style={{ 
                    backgroundColor: '#2a2a2a', 
                    borderColor: '#94d769', 
                    color: '#fff',
                    borderRadius: '1.5rem'
                  }}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-all duration-300"
                  style={{
                    backgroundColor: '#94d769',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7bc142'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#94d769'}
                >
                  Share comment
                </button>
              </div>
            </form>

            <div id="comments-list" className="mt-10 space-y-4">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: '#181818', 
                    borderLeft: '4px solid #94d769',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold" style={{ color: '#94d769' }}>{comment.username}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-300">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home