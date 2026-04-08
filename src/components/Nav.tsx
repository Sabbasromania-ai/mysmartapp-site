import { useEffect, useState } from 'react'

export default function Nav({ brand }: { brand: string }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]')
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120)
          setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="nav-backdrop" />
      <nav>
        <a href="#" className="logo">
          <div className="logo-dot" />
          {brand.slice(0, 5)}<span className="logo-accent">{brand.slice(5)}</span>
        </a>
        <div className="nav-links">
          {['apps', 'about', 'contact'].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${active === id ? ' active' : ''}`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#contact" className="nav-cta">Get in touch</a>
        </div>
      </nav>
    </>
  )
}
