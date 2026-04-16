import { useState, useEffect } from 'react'
import navLogo from '../navlogo.png'

const links = [
  { id: 'apps', label: 'Apps' },
  { id: 'platform', label: 'Platform' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <a href="#contact" className="btn-nav">Get Started</a>
      </nav>
    </>
  )
}
