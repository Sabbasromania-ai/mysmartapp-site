import './index.css'
import { useEffect } from 'react'
import { config } from './config'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Apps from './components/Apps'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 80)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav brand={config.brand} />
      <Hero config={config} />
      <Apps apps={config.apps} />
      <About bio={config.bio} tech={config.tech} name={config.name} />
      <Contact email={config.contact.email} />
      <footer>
        <span>© 2025 {config.brand}</span>
        <span>React · Vercel · Made in Greece 🇬🇷</span>
      </footer>
    </>
  )
}
