"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { en, id, Dictionary } from './dictionaries'

type Locale = 'en' | 'id'

interface LanguageContextType {
  lang: Locale
  setLang: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLang = 'en' 
}: { 
  children: React.ReactNode, 
  initialLang?: Locale 
}) {
  const [lang, setLangState] = useState<Locale>(initialLang)
  const router = useRouter()

  const setLang = useCallback((newLang: Locale) => {
    setLangState(newLang)
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000` // 1 year
    router.refresh()
  }, [router])

  // Sync state with cookie on initial mount just in case there's a mismatch
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;)\s*NEXT_LOCALE=([^;]+)/)
    const cookieLang = match ? match[1] : null
    if (cookieLang === 'en' || cookieLang === 'id') {
      if (cookieLang !== lang) {
        setLangState(cookieLang)
      }
    }
  }, [lang])

  const t = lang === 'id' ? id : en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
