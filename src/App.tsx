import './index.css'
import { useEffect } from 'react'
import { config } from './config'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Features from './components/Features'
import ProductPreview from './components/ProductPreview'
import Apps from './components/Apps'
import About from './components/About'
import Contact from './components/Contact'
import NeuralBg from './components/NeuralBg'

export default function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 60)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.06 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <NeuralBg />
      <Nav brand={config.brand} />
      <Hero config={config} />
      <TrustStrip />
      <Features />
      <ProductPreview />
      <Apps apps={config.apps} />
      <About bio={config.bio} tech={config.tech} name={config.name} />
      <Contact email={config.contact.email} />
      <footer>
        <span>&copy; 2025 {config.brand}</span>
        <span>React &middot; Vercel &middot; Made in Greece</span>
      </footer>
    </>
  )
}
