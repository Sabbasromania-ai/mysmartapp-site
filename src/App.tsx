import './index.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NeuralBg from './components/NeuralBg'
import AppPage from './pages/AppPage'
import AppsPage from './pages/AppsPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import IndustriesPage from './pages/IndustriesPage'
import AIHealthTrackerPage from './pages/AIHealthTrackerPage'
import ICaloriePage from './pages/ICaloriePage'
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
        <About />
        <Features />
        <HowItWorks />
        <Contact email="info@mysmartsapp.com" />
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
          <Route path="/about" element={
            <>
              <Nav />
              <AboutPage />
              <Footer />
            </>
          } />
          <Route path="/industries" element={
            <>
              <Nav />
              <IndustriesPage />
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <Nav />
              <ServicesPage />
              <Footer />
            </>
          } />
          <Route path="/apps" element={
            <>
              <Nav />
              <AppsPage />
              <Contact email="info@mysmartsapp.com" />
              <Footer />
            </>
          } />
          <Route path="/apps/ai-health-tracker" element={<Navigate to="/apps/mounjaro-tracker-ai-health" replace />} />
          <Route path="/apps/ai-wellness-coach" element={<Navigate to="/apps/ireception" replace />} />
          <Route path="/apps/ai-nutrition" element={<Navigate to="/apps/icalorie" replace />} />
          <Route path="/apps/mounjaro-tracker-ai-health" element={
            <>
              <Nav />
              <AIHealthTrackerPage />
              <Contact email="info@mysmartsapp.com" />
              <Footer />
            </>
          } />
          <Route path="/apps/icalorie" element={
            <>
              <Nav />
              <ICaloriePage />
              <Contact email="info@mysmartsapp.com" />
              <Footer />
            </>
          } />
          <Route path="/apps/:slug" element={
            <>
              <Nav />
              <AppPage />
              <Contact email="info@mysmartsapp.com" />
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
              <Footer />
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
