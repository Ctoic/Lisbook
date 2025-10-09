import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [isValid, setIsValid] = React.useState(true)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setIsValid(false)
      setMessage('Please provide a valid email address.')
      return
    }

    setIsValid(true)
    setMessage('Thank you for subscribing!')
    setEmail('')

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <>
      {/* Footer */}
      <div className="container mx-auto border-t px-7" style={{ marginTop: '80px', borderColor: '#374151' }}>
        <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 py-3 mt-5 pb-5">
          {/* Brand Section */}
          <div className="mb-3">
            <div className="footer-brand">
              <Link to="/" className="brand-link text-decoration-none">
                <img src="/Images/lisbook-logo-1.png" alt="Lisbook Logo" width="84" />
              </Link>
              <div className="brand-text">
                <div className="brand-title" style={{ color: '#94d769', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem' }}>Lisbook</div>
                <p className="brand-tagline text-gray-400 mt-2">
                  LisBook is a straightforward audiobook player designed for simplicity and ease of use.
                </p>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="mb-3">
            <h5 className="font-bold mb-3 uppercase" style={{ color: '#94d769', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Important Link
            </h5>
            <ul className="flex flex-col ml-2 space-y-2">
              <li className="mb-2">
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="mb-3">
            <h5 className="font-bold mb-3 uppercase" style={{ color: '#94d769', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Features
            </h5>
            <ul className="flex flex-col ml-2 space-y-2">
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Play/Pause
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Skip Chapters
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Change Speed
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Change Volume
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors p-0">
                  Change Theme
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="mb-3">
            <h5 className="font-bold mb-3 uppercase" style={{ color: '#94d769', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Follow Us
            </h5>
            <ul className="flex flex-col ml-2 space-y-2">
              <li className="mb-2">
                <a href="https://www.instagram.com/dev_with_ctoic" className="text-gray-300 hover:text-green-400 transition-colors p-0 flex items-center" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram mr-2"></i> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="https://x.com/Ct0ic" className="text-gray-300 hover:text-green-400 transition-colors p-0 flex items-center" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter-x mr-2"></i> Twitter-X
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/ctoic/" className="text-gray-300 hover:text-green-400 transition-colors p-0 flex items-center" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin mr-2"></i> LinkedIn
                </a>
              </li>
              <li className="mb-2">
                <a href="https://github.com/Ctoic" className="text-gray-300 hover:text-green-400 transition-colors p-0 flex items-center" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github mr-2"></i> GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="mb-3">
            <h5 className="font-bold mb-3 uppercase" style={{ color: '#94d769', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Stay Updated
            </h5>
            <p className="mb-3 text-gray-400">
              Subscribe to our newsletter for updates on new features and audiobooks.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input 
                type="email" 
                className={`py-2 px-3 rounded ${!isValid ? 'border-red-500' : 'border-gray-600'}`}
                style={{
                  backgroundColor: '#374151',
                  color: '#fff',
                  border: !isValid ? '1px solid #ef4444' : '1px solid #4b5563',
                  fontSize: '0.9rem'
                }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!isValid && (
                <div className="text-red-400 text-sm">
                  Please provide a valid email address.
                </div>
              )}
              <button 
                type="submit" 
                className="py-2 px-3 w-full rounded font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
              >
                Subscribe
              </button>
            </form>
            {message && (
              <div className={`mt-2 text-sm ${message.includes('Thank') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </div>
            )}
          </div>
        </footer>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-gray-900 p-4 text-center">
        <div className="text-gray-500">© 2024 Lisbook | All Rights Reserved</div>
      </div>
    </>
  )
}

export default Footer