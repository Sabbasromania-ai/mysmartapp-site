import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appLogo from '../applogo.png'
import appScreenshot from '../app-screenshot.png'
import { useLang } from '../LangContext'
import { TKey } from '../translations'

const slugs = ['ai-health-tracker', 'ai-wellness-coach', 'ai-nutrition']

export default function Hero() {
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()
  const { t } = useLang()

  const previewApps = [
    {
      logo: appLogo,
      emoji: null,
      nameKey: 'app0_name' as TKey,
      tagKey: 'app0_tag' as TKey,
      descKey: 'app0_desc' as TKey,
      rowKeys: ['app0_row0', 'app0_row1', 'app0_row2'] as TKey[],
      isLive: true,
      appIndex: 0,
    },
    {
      logo: null,
      emoji: '🧘',
      nameKey: 'app1_name' as TKey,
      tagKey: 'app1_tag' as TKey,
      descKey: 'app1_desc' as TKey,
      rowKeys: ['app1_row0', 'app1_row1', 'app1_row2'] as TKey[],
      isLive: false,
      appIndex: 1,
    },
    {
      logo: null,
      emoji: '🍎',
      nameKey: 'app2_name' as TKey,
      tagKey: 'app2_tag' as TKey,
      descKey: 'app2_desc' as TKey,
      rowKeys: ['app2_row0', 'app2_row1', 'app2_row2'] as TKey[],
      isLive: false,
      appIndex: 2,
    },
  ]

  return (
    <section className="hero-platform" id="home">
      <div className="container hero-inner">

        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            {t('hero_badge')}
          </div>
          <h1 className="hero-h1">
            {t('hero_h1_1')}<br />
            {t('hero_h1_2')} <span className="text-gradient">{t('hero_h1_3')}</span>
          </h1>
          <p className="hero-p">{t('hero_p')}</p>
          <div className="hero-actions">
            <a href="#apps" className="btn-primary">{t('hero_btn_explore')}</a>
            <a href="#platform" className="btn-ghost">{t('hero_btn_platform')}</a>
          </div>
          <div className="hero-trust">
            <span className="trust-dot" />
            <span>{t('hero_trust_ios')}</span>
            <span className="trust-sep">·</span>
            <span>{t('hero_trust_ai')}</span>
            <span className="trust-sep">·</span>
            <span>{t('hero_trust_dev')}</span>
          </div>
        </div>

        {/* RIGHT — Phone mockup + App Cards */}
        <div className="hero-right hero-right-split">

          <div className="hero-mockup-col" onClick={() => navigate('/apps/ai-health-tracker')} style={{ cursor: 'pointer', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 220, height: 380,
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.28) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <img
              src={appScreenshot}
              alt="AI Health Tracker App"
              style={{
                width: 210,
                filter: 'drop-shadow(0 0 28px rgba(0,212,255,0.22)) drop-shadow(0 24px 48px rgba(0,0,0,0.6))',
                position: 'relative',
                zIndex: 1,
                display: 'block',
              }}
            />
          </div>

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
                    {app.logo
                      ? <img src={app.logo} alt={t(app.nameKey)} style={{ width: 20, height: 20, borderRadius: 5, objectFit: 'cover' }} />
                      : <span>{app.emoji}</span>
                    }
                  </span>
                  <div>
                    <div className="hac-name">{t(app.nameKey)}</div>
                    <div className={`hac-tag${app.isLive ? ' hac-tag-live' : ''}`}>{t(app.tagKey)}</div>
                  </div>
                </div>
                <p className="hac-desc">{t(app.descKey)}</p>
                <div className="hac-rows">
                  {app.rowKeys.map(rk => (
                    <div key={rk} className="hac-row">
                      <span className="hac-dot" />
                      <span>{t(rk)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
