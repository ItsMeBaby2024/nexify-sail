'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, t } from './data'

interface I18nContextType {
  lang: Lang
  toggleLang: () => void
  tr: typeof t['zh']
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const toggleLang = () => setLang(l => (l === 'zh' ? 'en' : 'zh'))
  return (
    <I18nContext.Provider value={{ lang, toggleLang, tr: t[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
