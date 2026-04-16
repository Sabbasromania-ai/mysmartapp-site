import { useState, useEffect } from 'react'
import navLogo from '../navlogo.png'
import { useLang } from '../LangContext'

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const links = [
    { id: 'apps', label: t('nav_apps') },
    { id: 'platform', label: t('nav_platform') },
    { id: 'about', label: t('nav_about') },
    { id: 'contact', label: t('nav_contact') },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 140)
          setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className={`nav-backdrop${scrolled ? ' scrolled' : ''}`} />
      <nav>
        <a href="#" className="logo-img-link">
          <img src={navLogo} alt="mysmartsapp logo" className="nav-logo-img" />
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link${active === l.id ? ' active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="lang-toggle">
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
            <button
              className={`lang-btn${lang === 'el' ? ' active' : ''}`}
              onClick={() => setLang('el')}
            >GR</button>
          </div>
          <a href="#contact" className="btn-nav">{t('nav_cta')}</a>
        </div>
      </nav>
    </>
  )
}
