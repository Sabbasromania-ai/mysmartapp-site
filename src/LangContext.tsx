import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, TKey } from './translations'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TKey) => string
}

const LangContext = createContext<LangCtx | null>(null)

const SEO: Record<Lang, { title: string; description: string; locale: string }> = {
  en: {
    title: 'Custom App & Website Development for Businesses | Mysmartsapp',
    description: 'We build custom mobile apps, websites, e-commerce platforms, AI tools, and business automation systems for businesses from design to launch.',
    locale: 'en_US',
  },
  el: {
    title: 'Κατασκευή Εφαρμογών & Websites για Επιχειρήσεις | Mysmartsapp',
    description: 'Φτιάχνουμε custom mobile apps, websites, e-shops, AI εργαλεία και αυτοματισμούς για επιχειρήσεις. Από σχεδιασμό και ανάπτυξη μέχρι δημοσίευση και υποστήριξη.',
    locale: 'el_GR',
  },
}

export function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

export function setOG(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

export function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'canonical'); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

function applyLangToDocument(l: Lang) {
  const seo = SEO[l]
  document.documentElement.lang = l === 'el' ? 'el' : 'en'
  document.title = seo.title
  setMeta('description', seo.description)
  setOG('og:title', seo.title)
  setOG('og:description', seo.description)
  setOG('og:locale', seo.locale)
}

function detectLang(): Lang {
  const saved = localStorage.getItem('lang')
  if (saved === 'en' || saved === 'el') return saved
  const browser = (navigator.language || '').toLowerCase()
  return browser.startsWith('el') ? 'el' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    applyLangToDocument(lang)
  }, [lang])

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
