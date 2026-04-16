import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Lang, TKey } from './translations'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TKey) => string
}

const LangContext = createContext<LangCtx | null>(null)

function detectLang(): Lang {
  const saved = localStorage.getItem('lang')
  if (saved === 'en' || saved === 'el') return saved
  const browser = (navigator.language || '').toLowerCase()
  return browser.startsWith('el') ? 'el' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = (l: Lang) => {
    localStorage.setItem('lang', l)
    setLangState(l)
  }

  const t = (key: TKey): string => translations[lang][key] as string

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be inside LangProvider')
  return ctx
}
