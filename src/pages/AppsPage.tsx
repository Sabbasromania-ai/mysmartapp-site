import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import appLogo from '../applogo.png'
import heroPhoneCutout from '../screens/hero-phone-cutout.png'
import { useLang } from '../LangContext'
import { config } from '../config'

const SLUG_MOUNJARO = 'mounjaro-tracker-ai-health'
const SLUG_WELLNESS = 'ai-wellness-coach'
const SLUG_NUTRITION = 'ai-nutrition'

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
  const { t } = useLang()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
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

  const chips = [
    { label: 'Injection Doses',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2 6 14"/><path d="m15 5 4 4"/><path d="m2 22 5.5-5.5"/><path d="M9 9 4 14l6 6 5-5"/></svg> },
    { label: 'Dose Schedule',     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
    { label: 'Injection Sites',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg> },
    { label: 'Injection History', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 16 4-4 4 4 4-8"/></svg> },
    { label: 'Drug Level',        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v4h-4z"/><path d="M12 6v6"/><path d="M8 10H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3"/></svg> },
    { label: 'Weight Progress',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
    { label: 'Daily Targets',     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
    { label: 'Water Tracking',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6 8 4 13 4 16a8 8 0 0 0 16 0c0-3-2-8-8-14z"/></svg> },
    { label: 'Protein / Fiber',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7"/></svg> },
    { label: 'AI Meal Scan',      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/></svg> },
    { label: 'Barcode Scanner',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5v14M7 5v14M11 5v14M15 5v9M19 5v14M23 5v14"/></svg> },
    { label: 'Blood Markers',     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> },
    { label: 'OCR Lab Upload',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg> },
    { label: 'AI Advisor',        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg> },
    { label: 'AI Insights',       icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
    { label: 'Reminders',         icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
    { label: 'Health Sync',       icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
    { label: 'Apple Health',      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
    { label: 'Health Connect',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5a7.5 7.5 0 1 1 15 0"/><path d="M4.5 12.5H2"/><path d="M22 12.5h-2.5"/><circle cx="12" cy="12.5" r="2"/></svg> },
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
                src={heroPhoneCutout}
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
                    {chip.icon}
                    {chip.label}
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

      {/* ── Coming soon cards ── */}
      <section className="ap-soon-section">
        <div className="container">
          <div className="ap-soon-grid">

            <div className="ap-soon-card reveal" onClick={() => navigate(`/apps/${SLUG_WELLNESS}`)}>
              <div className="ap-soon-icon" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div className="ap-soon-body">
                <div className="ap-soon-name">iReception</div>
                <span className="ap-soon-badge">{t('apps_coming_soon')}</span>
                <p className="ap-soon-desc">{t('app1_short')}</p>
              </div>
            </div>

            <div className="ap-soon-card reveal" onClick={() => navigate(`/apps/${SLUG_NUTRITION}`)}>
              <div className="ap-soon-icon" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8C8 10 5.9 16.17 3.82 19.11a1 1 0 0 0 1.69 1.06C7 18 8.5 16.5 10 15c2-2 4-3 7-4.5C19 9.5 20 7 20 7s-2 .5-3 1z"/>
                  <path d="M6.3 15.7C7 13 9.5 11 12 10"/>
                </svg>
              </div>
              <div className="ap-soon-body">
                <div className="ap-soon-name">iNutrition</div>
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
