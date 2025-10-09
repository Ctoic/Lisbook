import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getBookById } from '../data/books'

const BookPlayer = () => {
  const { bookId } = useParams()
  const { t } = useLanguage()
  const audioRef = useRef(null)
  
  const [book, setBook] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showPlaylist, setShowPlaylist] = useState(false)

  useEffect(() => {
    const bookData = getBookById(bookId)
    setBook(bookData)
  }, [bookId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (currentTrack < book.audioFiles.length - 1) {
        setCurrentTrack(currentTrack + 1)
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, book])

  const togglePlay = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipForward = () => {
    const audio = audioRef.current
    audio.currentTime = Math.min(audio.currentTime + 30, audio.duration)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    audio.currentTime = Math.max(audio.currentTime - 15, 0)
  }

  const nextTrack = () => {
    if (currentTrack < book.audioFiles.length - 1) {
      setCurrentTrack(currentTrack + 1)
    }
  }

  const previousTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1)
    }
  }

  const selectTrack = (index) => {
    setCurrentTrack(index)
    setShowPlaylist(false)
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    const progressBar = e.currentTarget
    const clickX = e.nativeEvent.offsetX
    const width = progressBar.offsetWidth
    const newTime = (clickX / width) * duration
    audio.currentTime = newTime
  }

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate)
    audioRef.current.playbackRate = rate
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="bi bi-book text-6xl text-gray-600 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">Book not found</h2>
          <Link to="/explore" className="text-green-500 hover:text-green-400">
            Return to Explore
          </Link>
        </div>
      </div>
    )
  }

  const currentTrackTitle = book.trackTitles[`t${currentTrack}`] || `Chapter ${currentTrack + 1}`

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/explore"
          className="inline-flex items-center text-gray-400 hover:text-green-500 mb-6 transition-colors"
        >
          <i className="bi bi-arrow-left mr-2"></i>
          Back to Library
        </Link>

        {/* Book Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = '/Images/default-book-cover.jpg'
              }}
            />
          </div>
          
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              {t(`books.${book.id}.title`) || book.title}
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              {t(`books.${book.id}.author`) || book.author}
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t(`books.${book.id}.description`) || book.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                {book.genre}
              </span>
              <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                {book.duration}
              </span>
              <div className="flex items-center bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                <i className="bi bi-star-fill text-yellow-400 mr-1"></i>
                {book.rating}
              </div>
            </div>

            {/* Current Track Info */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Now Playing:</h3>
              <p className="text-green-500">
                {t(`books.${book.id}.tracks.t${currentTrack}`) || currentTrackTitle}
              </p>
              <p className="text-sm text-gray-400">
                Track {currentTrack + 1} of {book.audioFiles.length}
              </p>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <audio
            ref={audioRef}
            src={book.audioFiles[currentTrack]}
            preload="metadata"
          />

          {/* Progress Bar */}
          <div className="mb-6">
            <div
              className="progress-bar bg-gray-700 h-2 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="progress-fill bg-green-500 h-full rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={previousTrack}
              disabled={currentTrack === 0}
              className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="bi bi-skip-start-fill text-2xl"></i>
            </button>

            <button
              onClick={skipBackward}
              className="text-gray-400 hover:text-white"
            >
              <i className="bi bi-arrow-counterclockwise text-xl"></i>
              <span className="text-xs ml-1">15s</span>
            </button>

            <button
              onClick={togglePlay}
              className="play-button bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white"
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-2xl`}></i>
            </button>

            <button
              onClick={skipForward}
              className="text-gray-400 hover:text-white"
            >
              <i className="bi bi-arrow-clockwise text-xl"></i>
              <span className="text-xs ml-1">30s</span>
            </button>

            <button
              onClick={nextTrack}
              disabled={currentTrack === book.audioFiles.length - 1}
              className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="bi bi-skip-end-fill text-2xl"></i>
            </button>
          </div>

          {/* Additional Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Playback Speed */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Speed:</span>
                <select
                  value={playbackRate}
                  onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                  className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <i className="bi bi-list-ul mr-2"></i>
              Playlist
            </button>
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Chapters & Tracks</h3>
            <div className="space-y-2">
              {book.audioFiles.map((_, index) => {
                const trackTitle = book.trackTitles[`t${index}`] || `Chapter ${index + 1}`
                const translatedTitle = t(`books.${book.id}.tracks.t${index}`) || trackTitle
                
                return (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentTrack === index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{translatedTitle}</span>
                        <span className="text-sm opacity-75 ml-2">Track {index + 1}</span>
                      </div>
                      {currentTrack === index && (
                        <i className="bi bi-volume-up text-xl"></i>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookPlayer