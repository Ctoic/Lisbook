"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.add(savedTheme + '-theme');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(newTheme + '-theme');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  return (
    <header>
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logo-text">
          <Image src="/Images/lisbook-logo-1.png" alt="Lisbook Logo" width={26} height={26} />
          <span>Lisbook</span>
        </Link>

        {/* Navigation Menu */}
        <nav id="menu" className={isMenuOpen ? 'active' : ''}>
          {/* Close button for mobile */}
          <button id="menu-close" className="menu-close-btn" aria-label="Close menu" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Navigation Links */}
          <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/explore" className="nav-link" id="explore" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link href="/scan" className="nav-link" onClick={() => setIsMenuOpen(false)}>Scan Book</Link>
          <Link href="/about" className="nav-link" id="about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link href="/faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>FAQs</Link>

          {/* Theme Toggle */}
          <button id="theme-toggle" className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <svg id="sun-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Profile Link */}
          <Link href="/profile" className="icon-btn" aria-label="Profile" onClick={() => setIsMenuOpen(false)}>
            <i className="bi bi-person-circle"></i>
          </Link>

          {/* Language Selector */}
          <div className="language-selector">
            <select id="language" aria-label="Select language">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="zh">简体中文</option>
            </select>
          </div>

          {/* Auth Buttons */}
          <button id="signupButton" className="btn-auth">Sign up</button>
          <button id="loginButton" className="btn-auth">Login</button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button id="menu-toggle" className="menu-toggle-btn" aria-label="Menu" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
