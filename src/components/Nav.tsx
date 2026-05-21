import { useState, useEffect, useRef } from 'react'
import navLogo from '../navlogo.png'
import { useLang } from '../LangContext'

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLang()
  const menuRef = useRef<HTMLDivElement>(null)
  const links = [
    { id: 'services',   label: t('nav_platform'),     href: '/services' },
    { id: 'apps',       label: t('nav_apps'),          href: '/apps' },
    { id: 'about',      label: t('nav_about'),         href: '/about' },
    { id: 'process',    label: t('nav_process'),       href: '/process' },
    { id: 'industries', label: t('nav_industries'),    href: '/industries' },
    { id: 'privacy',    label: t('footer_privacy'),    href: '/privacy' },
    { id: 'support',    label: 'Support',              href: '/support' },
    { id: 'contact',    label: t('nav_contact'),       href: '/contact' },
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

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [menuOpen])

  return (
    <>
      <div className={`nav-backdrop${scrolled ? ' scrolled' : ''}`} />
      <nav ref={menuRef}>
        <a href="/" className="logo-img-link">
          <img src={navLogo} alt="mysmartsapp logo" className="nav-logo-img" />
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={l.href} className={`nav-link${active === l.id ? ' active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="lang-toggle">
            <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn${lang === 'el' ? ' active' : ''}`} onClick={() => setLang('el')}>GR</button>
          </div>
          <a href="/contact" className="btn-nav nav-cta-desktop">{t('nav_cta')}</a>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {links.map(l => (
              <a
                key={l.id}
                href={l.href}
                className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
