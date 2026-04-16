import './index.css'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import AppPreview from './components/AppPreview'
import HowItWorks from './components/HowItWorks'
import Support from './components/Support'
import Footer from './components/Footer'
import NeuralBg from './components/NeuralBg'
import { AppModal, apps } from './components/Features'

export default function App() {
  const [openApp, setOpenApp] = useState<number | null>(null)

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

  // ESC to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenApp(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <NeuralBg />
      <Nav />
      <main>
        <Hero onOpenApp={setOpenApp} />
        <Features onOpenApp={setOpenApp} />
        <AppPreview />
        <HowItWorks />
        <Support />
      </main>
      <Footer />
      {openApp !== null && <AppModal app={apps[openApp]} onClose={() => setOpenApp(null)} />}
    </>
  )
}
