import { useEffect, useState } from 'react'

export default function Nav({ brand }: { brand: string }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]')
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100)
          setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const half = brand.length / 2
  const first = brand.slice(0, half)
  const second = brand.slice(half)

  return (
    <nav>
      <a href="#" className="logo">
        <div className="logo-dot" />
        {first}<span className="logo-accent">{second}</span>
      </a>
      <div className="nav-center">
        {['apps', 'about', 'contact'].map(id => (
          <a key={id} href={`#${id}`} className={`nav-pill${active === id ? ' active' : ''}`}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
      <a href="#contact" className="nav-cta">Get in touch →</a>
    </nav>
  )
}
