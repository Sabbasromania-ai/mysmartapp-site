import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { apps, PhoneMockup } from '../components/Features'
import appLogo from '../applogo.png'
import { config } from '../config'

const SLUGS = ['mounjaro-tracker-ai-health', 'ai-wellness-coach', 'ai-nutrition']

const WHY_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    titleKey: 'why_1_title' as const,
    descKey: 'why_1_desc' as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    titleKey: 'why_2_title' as const,
    descKey: 'why_2_desc' as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z"/>
      </svg>
    ),
    titleKey: 'why_3_title' as const,
    descKey: 'why_3_desc' as const,
  },
]

export default function AppsPage() {
  const { t } = useLang()
  const navigate = useNavigate()

  const featured = apps[0]
  const comingSoon = apps.slice(1)

  // Intersection observer for reveal animations
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

  // Feature chips for featured app (reuse existing tab translation keys)
  const featuredChips = [
    t('ht_tab_injection'),
    t('ht_tab_progress'),
    t('ht_tab_blood'),
    'Barcode Scanner',
    t('ht_tab_meals'),
    t('ht_tab_coach'),
  ]

  return (
    <div className="apps-page">

      {/* ── Page header ── */}
      <section className="apps-page-header">
        <div className="container">
          <div className="section-label reveal">
            <span className="section-label-dot" />
            {t('feat_label')}
          </div>
          <h1 className="apps-page-h1 reveal">{t('apps_page_title')}</h1>
          <p className="apps-page-sub reveal">{t('apps_page_sub')}</p>
        </div>
      </section>

      {/* ── Featured app card ── */}
      <section className="apps-featured-section">
        <div className="container">
          <div className="apf-card reveal" onClick={() => navigate(`/apps/${SLUGS[0]}`)}>

            {/* Phone mockup */}
            <div className="apf-phone">
              <PhoneMockup app={featured} />
            </div>

            {/* App details */}
            <div className="apf-content">
              <div className="apf-top">
                <img src={appLogo} alt={featured.name} className="apf-logo" />
                <div>
                  <div className="apf-name">{featured.name}</div>
                  <span className="apf-live-tag">{t('apps_live_tag')}</span>
                </div>
              </div>

              <p className="apf-desc">{t('app0_short')}</p>

              <div className="apf-chips">
                {featuredChips.map(chip => (
                  <span key={chip} className="apf-chip">{chip}</span>
                ))}
              </div>

              <div className="apf-actions" onClick={e => e.stopPropagation()}>
                <button className="apf-btn-view" onClick={() => navigate(`/apps/${SLUGS[0]}`)}>
                  {t('apps_view')}
                </button>
                {config.apps[0].appStore && (
                  <a
                    href={config.apps[0].appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apf-btn-store"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
                <a href="#notify" className="apf-btn-store" onClick={e => e.stopPropagation()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Google Play
                </a>
              </div>

              <div className="apf-rating">
                {'★★★★★'} <span>4.9K Ratings</span>
              </div>
            </div>
          </div>

          {/* Coming soon cards */}
          <div className="apf-soon-grid">
            {comingSoon.map((app, i) => (
              <div
                key={app.name}
                className="apf-soon-card reveal"
                onClick={() => navigate(`/apps/${SLUGS[i + 1]}`)}
              >
                <div className="apf-soon-badge">{t('apps_coming_soon')}</div>
                <div className="apf-soon-emoji">{(app as any).emoji}</div>
                <div className="apf-soon-name">{app.name}</div>
                <p className="apf-soon-desc">{t(i === 0 ? 'app1_short' : 'app2_short')}</p>
                <div className="apf-soon-cta">{t('apppage_notify')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose section ── */}
      <section className="apps-why-section">
        <div className="container">
          <h2 className="apps-why-title reveal">{t('why_title')}</h2>
          <div className="apps-why-grid">
            {WHY_CARDS.map((card, i) => (
              <div key={i} className="apps-why-card reveal">
                <div className="apps-why-icon">{card.icon}</div>
                <div className="apps-why-card-title">{t(card.titleKey)}</div>
                <p className="apps-why-card-desc">{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
