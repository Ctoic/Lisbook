import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
  }

  return (
    <header className="sticky top-0 z-20 shadow-sm bg-[#1A1A1A] py-4">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-lg text-white hover:text-green-500 transition-colors">
            <img
              src="/Images/lisbook-logo-1.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span>Lisbook</span>
          </Link>

          {/* Menu Links and Theme Toggle */}
          <div
            id="menu"
            className={`fixed inset-0 bg-gray-900 w-full h-full flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ease-in-out lg:relative lg:flex lg:items-center lg:justify-end lg:space-y-0 lg:bg-transparent lg:scale-100 lg:flex-row lg:space-x-6 lg:h-auto z-20 ${
              isMenuOpen ? 'scale-100' : 'scale-0'
            }`}
          >
            <div
              id="menu-close"
              className="text-gray-300 lg:hidden absolute top-5 right-5 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <Link 
              to="/" 
              className="text-gray-300 hover:text-green-500 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.home')}
            </Link>
            <Link 
              to="/explore" 
              className="text-gray-300 hover:text-green-500 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.explore')}
            </Link>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-green-500 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.about')}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-green-500 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.contact')}
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-300 hover:text-green-500 transition-colors text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar.faqs')}
            </Link>

            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-green-500 transition-colors p-2 flex items-center justify-center"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                // Sun icon for light mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Language selector placed inline with menu items */}
            <div className="language-selector flex items-center">
              <select
                id="language"
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label="Language selector"
                className="bg-transparent"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="es">ES</option>
                <option value="zh">中文</option>
              </select>
            </div>

            {/* Profile Icon */}
            <Link
              to="/profile"
              className="text-gray-300 hover:text-green-500 transition-colors p-2 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Profile"
            >
              <i className="bi bi-person-circle text-xl"></i>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="menu-toggle"
            title="Menu"
            className="text-gray-300 lg:hidden cursor-pointer p-2 hover:text-green-500 transition-colors flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar