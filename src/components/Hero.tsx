import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appLogo from '../applogo.png'
import iReceptionLogo from '../ireception-logo.png'
import iCalorieLogo from '../icalorie-logo.png'
import heroPhoneCutout from '../screens/hero-phone-cutout.png'
import { useLang } from '../LangContext'
import { TKey } from '../translations'

const slugs = ['mounjaro-tracker-ai-health', 'ireception', 'icalorie']

const chips = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    key: 'hero_trust_ios' as TKey,
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    key: 'hero_trust_dev' as TKey,
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    key: 'hero_trust_ai' as TKey,
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    key: 'hero_trust_mvp' as TKey,
  },
]

export default function Hero() {
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()
  const { t } = useLang()

  const previewApps = [
    {
      logo: appLogo,
      nameKey: 'app0_name' as TKey,
      tagKey: 'app0_tag' as TKey,
      descKey: 'app0_desc' as TKey,
      isLive: true,
      appIndex: 0,
    },
    {
      logo: iReceptionLogo,
      nameKey: 'app1_name' as TKey,
      tagKey: 'app1_tag' as TKey,
      descKey: 'app1_desc' as TKey,
      isLive: false,
      appIndex: 1,
    },
    {
      logo: iCalorieLogo,
      nameKey: 'app2_name' as TKey,
      tagKey: 'app2_tag' as TKey,
      descKey: 'app2_desc' as TKey,
      isLive: false,
      appIndex: 2,
    },
  ]

  return (
    <section className="hero-platform" id="home">
      <div className="container">
        <div className="hero-badge" style={{ marginBottom: '12px' }}>
          <span className="badge-dot" />
          {t('hero_badge')}
        </div>
        <div className="hero-card">
          <div className="hero-inner">

            {/* LEFT */}
            <div className="hero-left">
              <h1 className="hero-h1">
                {t('hero_h1_1')}<br />
                {t('hero_h1_2')} <span className="text-gradient">{t('hero_h1_3')}</span>
              </h1>
              <p className="hero-p">{t('hero_p')}</p>
              <div className="hero-actions">
                <a href="/contact" className="btn-primary">{t('hero_btn_explore')}</a>
                <a href="/apps" className="btn-ghost">{t('hero_btn_platform')}</a>
              </div>
              <div className="hero-chips">
                {chips.map((chip, i) => (
                  <div key={i} className="hero-chip">
                    {chip.icon}
                    <span>{t(chip.key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER — Phone */}
            <div
              className="hero-phone-col homeHeroPhone"
              onClick={() => navigate('/apps/mounjaro-tracker-ai-health')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={heroPhoneCutout}
                alt="Custom mobile app development — iOS and Android app example by Mysmartsapp"
              />
            </div>

            {/* RIGHT — App Cards */}
            <div className="hero-cards-col">
              {previewApps.map((app, i) => (
                <div
                  key={i}
                  className={`hac${hovered === i ? ' hovered' : ''}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(`/apps/${slugs[app.appIndex]}`)}
                >
                  <div className="hac-top">
                    <span className="hac-icon">
                      <img src={app.logo} alt={t(app.nameKey)} style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                    </span>
                    <div>
                      <div className="hac-name">{t(app.nameKey)}</div>
                      <div className={`hac-tag${app.isLive ? ' hac-tag-live' : ''}`}>{t(app.tagKey)}</div>
                    </div>
                  </div>
                  <p className="hac-desc">{t(app.descKey)}</p>
                  <span className="hac-link">→ Δες το Project</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
