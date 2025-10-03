import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Profile from './pages/Profile'
import BookPlayer from './pages/BookPlayer'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book/:bookId" element={<BookPlayer />} />
              </Routes>
            </main>
            <Footer />
          </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App