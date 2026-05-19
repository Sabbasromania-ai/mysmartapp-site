import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import appLogo from '../applogo.png'
import iReceptionLogo from '../ireception-logo.png'
import iCalorieLogo from '../icalorie-logo.png'
import heroPhoneCutout from '../screens/hero-phone-cutout.png'
import heroPhoneApps from '../screens/hero-phone-apps.png'
import iReceptionMockup from '../iReception_mockup.png'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import { config } from '../config'

const SLUG_MOUNJARO = 'mounjaro-tracker-ai-health'
const SLUG_WELLNESS = 'ireception'
const SLUG_NUTRITION = 'icalorie'

const IdeaIcons = [
  // Design — pencil
  <svg key="design" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>,
  // Build — code brackets
  <svg key="build" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>,
  // Launch — rocket
  <svg key="launch" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m3.5 11.5 3 3"/>
    <path d="M12 2s5 2 8 8 2 12 2 12-4-2-7-5S3 7 3 7 8 2 12 2z"/>
    <circle cx="16" cy="8" r="2"/>
  </svg>,
]

export default function AppsPage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = lang === 'el'
      ? 'Οι Εφαρμογές μας — Mobile Apps & AI Εργαλεία | Mysmartsapp'
      : 'Our Apps — Mobile Apps & AI Tools | Mysmartsapp'
    const desc = lang === 'el'
      ? 'Δείτε όλες τις mobile εφαρμογές και AI εργαλεία από τη Mysmartsapp, συμπεριλαμβανομένου του Mounjaro Tracker για iOS και Android.'
      : 'Browse all mobile apps and AI tools built by Mysmartsapp — including the Mounjaro Tracker AI Health app for iOS and Android.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/apps')
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
  }, [lang])

  const chips = [
    { label: 'Injection Doses',   icon: '💉' },
    { label: 'Dose Schedule',     icon: '📅' },
    { label: 'Injection Sites',   icon: '🗺️' },
    { label: 'Injection History', icon: '📋' },
    { label: 'Drug Level',        icon: '📉' },
    { label: 'Weight Progress',   icon: '⚖️' },
    { label: 'Daily Targets',     icon: '🎯' },
    { label: 'Water Tracking',    icon: '💧' },
    { label: 'Protein / Fiber',   icon: '🥗' },
    { label: 'AI Meal Scan',      icon: '📷' },
    { label: 'Barcode Scanner',   icon: '🔍' },
    { label: 'Blood Markers',     icon: '🩸' },
    { label: 'OCR Lab Upload',    icon: '🔬' },
    { label: 'AI Advisor',        icon: '🤖' },
    { label: 'AI Insights',       icon: '💡' },
    { label: 'Reminders',         icon: '🔔' },
    { label: 'Health Sync',       icon: '❤️' },
    { label: 'Apple Health',      icon: '🍎' },
    { label: 'Health Connect',    icon: '🏃' },
  ]

  const iReceptionChips = [
    { label: 'AI Receptionist',        icon: '🤖' },
    { label: 'Booking System',         icon: '📅' },
    { label: 'Customer Messages',      icon: '💬' },
    { label: 'Missed Call Handling',   icon: '📞' },
    { label: 'Appointment Reminders',  icon: '🔔' },
    { label: 'Customer CRM',           icon: '👥' },
    { label: 'Business Automation',    icon: '⚙️' },
    { label: 'Staff Calendar',         icon: '🗓️' },
    { label: 'Follow-up Messages',     icon: '📨' },
    { label: 'Lead Capture',           icon: '🎯' },
    { label: 'Multi-service Booking',  icon: '🔀' },
    { label: 'AI Assistant',           icon: '✨' },
  ]

  const ideaCards = [
    { icon: IdeaIcons[0], titleKey: 'idea_1_title' as const, descKey: 'idea_1_desc' as const },
    { icon: IdeaIcons[1], titleKey: 'idea_2_title' as const, descKey: 'idea_2_desc' as const },
    { icon: IdeaIcons[2], titleKey: 'idea_3_title' as const, descKey: 'idea_3_desc' as const },
  ]

  return (
    <div className="ap-page">

      {/* ── Hero intro ── */}
      <section className="ap-hero">
        <div className="container">
          <div className="ap-eyebrow reveal">
            <span className="ap-eyebrow-dot" />
            {t('apps_eyebrow')}
          </div>
          <h1 className="ap-h1 reveal">{t('apps_page_title')}</h1>
          <p className="ap-sub reveal">{t('apps_page_sub')}</p>
        </div>
      </section>

      {/* ── Featured Mounjaro card ── */}
      <section className="ap-featured-section">
        <div className="container">
          <div className="ap-feat-card reveal">

            {/* Left: phone image */}
            <div className="ap-feat-phone">
              <img
                src={heroPhoneApps}
                alt="Mounjaro Tracker App"
                className="ap-feat-phone-img"
                onClick={() => navigate(`/apps/${SLUG_MOUNJARO}`)}
              />
            </div>

            {/* Right: content */}
            <div className="ap-feat-content">

              <div className="ap-feat-icon-row">
                <img src={appLogo} alt="Mounjaro Tracker" className="ap-feat-logo" />
                <div>
                  <div className="ap-feat-name">Mounjaro Tracker : iHealth</div>
                  <span className="ap-feat-live">{t('apps_live_tag')}</span>
                </div>
              </div>

              <p className="ap-feat-desc">{t('apps_feat_desc')}</p>

              <div className="ap-feat-chips">
                {chips.map(chip => (
                  <span key={chip.label} className="ap-feat-chip">
                    <span>{chip.icon}</span>{chip.label}
                  </span>
                ))}
              </div>

              <div className="ap-feat-actions">
                <button
                  className="ap-feat-btn-primary"
                  onClick={() => navigate(`/apps/${SLUG_MOUNJARO}`)}
                >
                  {t('apps_view')}
                </button>

                {config.apps[0].appStore && (
                  <a
                    href={config.apps[0].appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-store-badge"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <span className="ap-store-badge-text">
                      <span className="ap-store-badge-sub">Download on the</span>
                      <span className="ap-store-badge-main">App Store</span>
                    </span>
                  </a>
                )}

                <span className="ap-store-badge ap-store-badge--disabled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.3.17.65.19.96.04l13.08-7.56-2.76-2.76-11.28 10.28zm16.7-9.64-2.82-2.82 2.82-2.82c.78.78.78 2.05 0 2.82l-2.82 2.82zm-16.7-7.88L14.46 16.52l2.76-2.76L4.14 6.2a.97.97 0 0 0-.96.04zm1.42-1.24 13.08 7.56-2.76 2.76L3.1 5.4c.3-.19.67-.21 1-.4z"/></svg>
                  <span className="ap-store-badge-text">
                    <span className="ap-store-badge-sub">Get it on</span>
                    <span className="ap-store-badge-main">Google Play</span>
                  </span>
                  <span className="ap-store-badge-soon">Soon</span>
                </span>
              </div>

              <div className="ap-feat-rating">
                <span className="ap-feat-stars">★★★★★</span>
                <span className="ap-feat-rating-text">4.9K Ratings</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── iReception featured card ── */}
      <section className="ap-featured-section">
        <div className="container">
          <div className="ap-feat-card reveal">

            {/* Left: phone mockup */}
            <div className="ap-feat-phone">
              <img
                src={iReceptionMockup}
                alt="iReception App"
                className="ap-feat-phone-img"
                onClick={() => navigate(`/apps/${SLUG_WELLNESS}`)}
              />
            </div>

            {/* Right: content */}
            <div className="ap-feat-content">

              <div className="ap-feat-icon-row">
                <img src={iReceptionLogo} alt="iReception" className="ap-feat-logo" />
                <div>
                  <div className="ap-feat-name">iReception</div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'rgba(0,220,255,0.12)',
                    border: '1px solid rgba(0,220,255,0.45)',
                    color: '#22e6ff',
                    boxShadow: '0 0 12px rgba(0,220,255,0.18)',
                    borderRadius: 100,
                    padding: '3px 10px',
                  }}>Coming Soon</span>
                </div>
              </div>

              <p className="ap-feat-desc">
                AI receptionist, booking, and customer communication system for businesses.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', marginTop: -6, lineHeight: 1.6 }}>
                Automate bookings, calls, messages, reminders, and customer follow-ups from one smart dashboard.
              </p>

              <div className="ap-feat-chips">
                {iReceptionChips.map(chip => (
                  <span key={chip.label} className="ap-feat-chip">
                    <span>{chip.icon}</span>{chip.label}
                  </span>
                ))}
              </div>

              <div className="ap-feat-actions">
                <button
                  className="ap-feat-btn-primary"
                  onClick={() => navigate(`/apps/${SLUG_WELLNESS}`)}
                >
                  Notify Me
                </button>
                <span className="acp-platform" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>iOS</span>
                <span className="acp-platform" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>Android</span>
                <span className="acp-platform" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>Web</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Coming soon cards ── */}
      <section className="ap-soon-section">
        <div className="container">
          <div className="ap-soon-grid" style={{ gridTemplateColumns: '1fr', maxWidth: 560, margin: '0 auto' }}>

            <div className="ap-soon-card reveal" onClick={() => navigate(`/apps/${SLUG_NUTRITION}`)}>
              <div className="ap-soon-icon" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <img src={iCalorieLogo} alt="iCalorie" style={{ width: 68, height: 68, borderRadius: 14 }} />
              </div>
              <div className="ap-soon-body">
                <div className="ap-soon-name">iCalorie</div>
                <span className="ap-soon-badge">{t('apps_coming_soon')}</span>
                <p className="ap-soon-desc">{t('app2_short')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── From idea to app ── */}
      <section className="ap-idea-section">
        <div className="container">
          <h2 className="ap-idea-title reveal">{t('idea_title')}</h2>
          <div className="ap-idea-grid">
            {ideaCards.map((card, i) => (
              <div key={i} className="ap-idea-card reveal">
                <div className="ap-idea-icon-wrap">{card.icon}</div>
                <div className="ap-idea-body">
                  <div className="ap-idea-card-title">{t(card.titleKey)}</div>
                  <p className="ap-idea-card-desc">{t(card.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
