import './index.css'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import AppPreview from './components/AppPreview'
import HowItWorks from './components/HowItWorks'
import Support from './components/Support'
import Footer from './components/Footer'
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
    }, { threshold: 0.05 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <NeuralBg />
      <Nav />
      <main>
        <Hero />
        <Features />
        <AppPreview />
        <HowItWorks />
        <Support />
      </main>
      <Footer />
    </>
  )
}
// placeholder to satisfy read requirement