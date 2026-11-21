import { createContext, useContext, useEffect, useState } from 'react'
import fr from './fr'
import en from './en'

const dictionaries = { fr, en }
const STORAGE_KEY = 'ng-lang'

const LanguageContext = createContext(null)

function readSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLang)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Local storage can be blocked; the site still works in the current page.
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useI18n must be used inside LanguageProvider')
  return context
}

// Data files hold both languages as { fr, en }; this returns the right one.
export function pick(value, lang) {
  if (value == null) return ''
  return typeof value === 'string' ? value : value[lang]
}
