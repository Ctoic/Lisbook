import React, { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
  }

  const t = (key, bookKey = null) => {
    const keys = key.split('.')
    let value = translations[currentLanguage]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    if (bookKey && value && typeof value === 'object') {
      return value[bookKey] || key
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      t,
      availableLanguages: [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'zh', name: '简体中文' }
      ]
    }}>
      {children}
    </LanguageContext.Provider>
  )
}