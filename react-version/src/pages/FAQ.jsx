import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const FAQ = () => {
  const { t } = useLanguage()
  const [openItems, setOpenItems] = useState({})
  const [typingText, setTypingText] = useState({})
  const [isTyping, setIsTyping] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)

  const toggleItem = (answerId) => {
    setOpenItems(prev => ({
      ...prev,
      [answerId]: !prev[answerId]
    }))
  }

  const handleMouseEnter = (faqId, answer) => {
    if (!openItems[faqId]) {
      setOpenItems(prev => ({ ...prev, [faqId]: true }))
      setHoveredItem(faqId)
      setTypingText(prev => ({ ...prev, [faqId]: '' }))
      setIsTyping(prev => ({ ...prev, [faqId]: true }))
      
      // Start typing effect
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < answer.length) {
          setTypingText(prev => ({
            ...prev,
            [faqId]: answer.substring(0, index + 1)
          }))
          index++
        } else {
          clearInterval(typingInterval)
          setIsTyping(prev => ({ ...prev, [faqId]: false }))
        }
      }, 30) // Speed of typing (30ms per character)
      
      return () => clearInterval(typingInterval)
    }
  }

  const handleMouseLeave = (faqId) => {
    // Optional: Keep the answer visible after typing completes
    // Remove this function call if you want answers to stay visible
  }

  const faqData = [
    {
      id: 'faq1-answer',
      profile: 'https://randomuser.me/api/portraits/men/1.jpg',
      question: 'What is Lisbook?',
      answer: 'Lisbook is an audiobook and music streaming platform that helps users access a variety of books and playlists from different genres and authors.'
    },
    {
      id: 'faq2-answer',
      profile: 'https://randomuser.me/api/portraits/women/2.jpg',
      question: 'How can I create an account?',
      answer: "You can create an account by clicking on the 'Sign Up' button on the home page, and filling in your email and password details."
    },
    {
      id: 'faq3-answer',
      profile: 'https://randomuser.me/api/portraits/men/3.jpg',
      question: 'Is there a mobile app available?',
      answer: 'Yes, Lisbook has mobile apps for both Android and iOS that allow you to access your favorite audiobooks on the go.'
    },
    {
      id: 'faq4-answer',
      profile: 'https://randomuser.me/api/portraits/women/4.jpg',
      question: 'Can I download audiobooks for offline listening?',
      answer: 'Yes, Lisbook allows premium users to download audiobooks for offline listening.'
    },
    {
      id: 'faq5-answer',
      profile: 'https://randomuser.me/api/portraits/men/5.jpg',
      question: 'Is there a free version of Lisbook?',
      answer: 'Yes, Lisbook offers a free version with limited access to books and music, supported by ads.'
    },
    {
      id: 'faq6-answer',
      profile: 'https://randomuser.me/api/portraits/women/6.jpg',
      question: 'How do I cancel my subscription?',
      answer: "You can cancel your subscription anytime by navigating to the 'Account Settings' and selecting the 'Cancel Subscription' option."
    },
    {
      id: 'faq7-answer',
      profile: 'https://randomuser.me/api/portraits/men/7.jpg',
      question: 'Does Lisbook have a family plan?',
      answer: 'Yes, Lisbook offers a family plan that allows up to 5 members to share one subscription at a discounted price.'
    },
    {
      id: 'faq8-answer',
      profile: 'https://randomuser.me/api/portraits/women/8.jpg',
      question: 'Can I create my own playlists?',
      answer: 'Yes, Lisbook allows users to create and share personalized playlists of their favorite audiobooks and music.'
    },
    {
      id: 'faq9-answer',
      profile: 'https://randomuser.me/api/portraits/men/9.jpg',
      question: 'How do I reset my password?',
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions sent to your email."
    },
    {
      id: 'faq10-answer',
      profile: 'https://randomuser.me/api/portraits/women/10.jpg',
      question: 'What formats are supported for audiobooks?',
      answer: 'Lisbook supports a variety of audio formats, including MP3, AAC, and WAV for audiobooks.'
    },
    {
      id: 'faq11-answer',
      profile: 'https://randomuser.me/api/portraits/men/11.jpg',
      question: 'How can I share audiobooks with friends?',
      answer: 'You can share audiobooks with friends via social media or by sending them a direct link from within the app.'
    },
    {
      id: 'faq12-answer',
      profile: 'https://randomuser.me/api/portraits/women/12.jpg',
      question: 'Can I listen to audiobooks while offline?',
      answer: 'Yes, once downloaded, you can listen to your audiobooks offline without needing an internet connection.'
    },
    {
      id: 'faq13-answer',
      profile: 'https://randomuser.me/api/portraits/men/13.jpg',
      question: 'Does Lisbook offer audiobooks in different languages?',
      answer: 'Yes, Lisbook offers audiobooks in a variety of languages including English, Spanish, French, and more.'
    },
    {
      id: 'faq14-answer',
      profile: 'https://randomuser.me/api/portraits/men/15.jpg',
      question: 'How do I contact customer support?',
      answer: "You can reach customer support by going to the 'Help' section in the app or by emailing us at support@lisbook.com."
    }
  ]

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

      {/* Main Content */}
      <main className="container mx-auto my-5 px-4">
        <h1 className="page-title text-5xl font-bold mb-5">
          Frequently Asked Questions (FAQs)
        </h1>

        <section className="row faq">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {faqData.map((item) => (
              <div key={item.id} className="col-md-6 faq" style={{ padding: '7px 7px' }}>
                <div className="features-card faq-box border rounded-5 p-4 mb-4">
                  <div className="flex items-start">
                    <img
                      src={item.profile}
                      className="rounded-circle faq-profile me-3"
                      alt="Profile"
                      style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                    />
                    <div className="flex-1">
                      <h4
                        className="text-green-500 mb-2 faq-question cursor-pointer font-semibold"
                        style={{ color: '#94d769' }}
                        onMouseEnter={() => handleMouseEnter(item.id, item.answer)}
                        onMouseLeave={() => handleMouseLeave(item.id)}
                      >
                        {item.question}
                      </h4>
                      <p
                        className={`text-gray-300 faq-answer leading-relaxed ${!openItems[item.id] ? 'hidden' : ''}`}
                        id={item.id}
                        style={{ minHeight: openItems[item.id] ? '2rem' : '0' }}
                      >
                        {typingText[item.id] !== undefined ? typingText[item.id] : item.answer}
                        {isTyping[item.id] && <span className="typing-cursor">|</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default FAQ