import { useState, useEffect } from 'react'

const links = [
  { id: 'features', label: 'Features' },
  { id: 'preview', label: 'App' },
  { id: 'how', label: 'How It Works' },
  { id: 'support', label: 'Support' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

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
        <a href="#" className="logo">
          <div className="logo-dot" />
          Smart<span className="logo-accent">Apps</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link${active === l.id ? ' active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#support" className="btn-nav">Get Started</a>
      </nav>
    </>
  )
}
