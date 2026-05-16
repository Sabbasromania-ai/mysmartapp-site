import './index.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import AppPreview from './components/AppPreview'
import HowItWorks from './components/HowItWorks'
import Support from './components/Support'
import Footer from './components/Footer'
import NeuralBg from './components/NeuralBg'
import AppPage from './pages/AppPage'
import AppsPage from './pages/AppsPage'
import AIHealthTrackerPage from './pages/AIHealthTrackerPage'
import Privacy from './pages/Privacy'
import SupportPage from './pages/SupportPage'
import ContactPage from './pages/ContactPage'

function HomePage() {
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
        <section className="combined-section" id="apps">
          <div className="container">
            <div className="combined-grid">
              <div className="combined-left">
                <Features />
              </div>
              <div className="combined-right" id="platform">
                <AppPreview />
              </div>
            </div>
          </div>
        </section>
        <section className="bottom-section" id="about">
          <div className="container">
            <div className="bottom-grid">
              <HowItWorks />
              <Support />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={
            <>
              <Nav />
              <AppsPage />
              <Footer />
            </>
          } />
          <Route path="/apps/ai-health-tracker" element={<Navigate to="/apps/mounjaro-tracker-ai-health" replace />} />
          <Route path="/apps/mounjaro-tracker-ai-health" element={
            <>
              <Nav />
              <AIHealthTrackerPage />
              <Footer />
            </>
          } />
          <Route path="/apps/:slug" element={
            <>
              <Nav />
              <AppPage />
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Nav />
              <Privacy />
              <Footer />
            </>
          } />
          <Route path="/support" element={
            <>
              <Nav />
              <SupportPage />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Nav />
              <ContactPage />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
