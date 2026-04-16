import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apps, PhoneMockup } from '../components/Features'
import appScreenshot from '../app-screenshot.png'
import { useLang } from '../LangContext'

const slugMap: Record<string, number> = {
  'ai-health-tracker': 0,
  'ai-wellness-coach': 1,
  'ai-nutrition': 2,
}

function GhostPhone({ color }: { color: string }) {
  return (
    <div style={{
      position: 'absolute',
      top: 18, right: -22,
      width: 180, height: 360,
      background: 'linear-gradient(160deg, #111827, #0a0e1f)',
      border: `1px solid ${color}18`,
      borderRadius: 32,
      opacity: 0.45,
      filter: 'blur(1px)',
      zIndex: 0,
      boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${color}10`,
    }} />
  )
}

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useLang()
  const index = slug ? slugMap[slug] : undefined
  const app = index !== undefined ? apps[index] : null

  const [phoneHovered, setPhoneHovered] = useState(false)
  const [hoveredFeatured, setHoveredFeatured] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  if (!app) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 16 }}>
        <div style={{ fontSize: '2rem', color: '#fff' }}>{t('apppage_notfound')}</div>
        <button className="btn-primary" onClick={() => navigate('/')}>{t('apppage_back_home')}</button>
      </div>
    )
  }

  const isHealthTracker = index === 0

  return (
    <div style={{ paddingBottom: 56, minHeight: '80vh' }}>

      {/* Back button */}
      <div className="container" style={{ paddingTop: 88 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontWeight: 500,
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = app.color; (e.target as HTMLElement).style.color = app.color }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
        >
          {t('apppage_back')}
        </button>
      </div>

      {/* Hero */}
      <div className="container" style={{ marginTop: 14 }}>
        <div style={{
          background: app.gradient,
          border: `1px solid ${app.color}22`,
          borderRadius: 20,
          padding: '32px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Background glow blob */}
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 360, height: 360,
            background: `radial-gradient(circle, ${app.color}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Left content */}
          <div style={{ zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              {(app as any).logo
                ? <img src={(app as any).logo} alt={app.name} style={{ width: 46, height: 46, borderRadius: 12, objectFit: 'cover' }} />
                : <span style={{ fontSize: '2rem' }}>{(app as any).emoji}</span>
              }
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
                color: app.tagColor, background: app.tagBg,
              }}>{app.tag}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
              {app.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 440, marginBottom: 12 }}>
              {app.short}
            </p>

            {isHealthTracker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>{t('apppage_rating')}</span>
                <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{t('apppage_glp1')}</span>
                <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>iOS & Android</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {app.platforms.map(p => (
                <span key={p} className="acp-platform">{p}</span>
              ))}
            </div>

            {app.tag === 'Live' ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="/#contact" className="btn-primary">{t('apppage_download')}</a>
                <a href="/#contact" className="btn-ghost">{t('apppage_learn')}</a>
              </div>
            ) : (
              <a href="/#contact" className="btn-ghost">{t('apppage_notify')}</a>
            )}
          </div>

          {/* Right — phone */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
            {isHealthTracker ? (
              <>
                {/* Layered glow — outer soft + inner core */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: phoneHovered ? 320 : 280,
                  height: phoneHovered ? 520 : 480,
                  background: `radial-gradient(ellipse at 50% 60%, ${app.color}${phoneHovered ? '3a' : '28'} 0%, ${app.color}08 50%, transparent 72%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                  transition: 'width 0.45s ease, height 0.45s ease, background 0.45s ease',
                  borderRadius: '50%',
                }} />
                {/* Ghost phone behind for depth */}
                <div style={{
                  position: 'absolute',
                  top: 20, right: -20,
                  width: 168, height: 336,
                  background: 'linear-gradient(160deg, #0d1b33, #070d1a)',
                  border: `1px solid ${app.color}12`,
                  borderRadius: 34,
                  opacity: 0.4,
                  filter: 'blur(2.5px)',
                  zIndex: 0,
                }} />
                {/* Main screenshot */}
                <img
                  src={appScreenshot}
                  alt="AI Health Tracker App"
                  onMouseEnter={() => setPhoneHovered(true)}
                  onMouseLeave={() => setPhoneHovered(false)}
                  style={{
                    width: 242,
                    position: 'relative',
                    zIndex: 1,
                    display: 'block',
                    cursor: 'pointer',
                    willChange: 'transform, filter',
                    transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), filter 0.45s ease',
                    transform: phoneHovered
                      ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-4px) scale(1.04)'
                      : 'perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(0px) scale(1)',
                    filter: phoneHovered
                      ? `drop-shadow(0 2px 2px rgba(0,0,0,0.4)) drop-shadow(0 12px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 50px ${app.color}40)`
                      : `drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 16px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 28px ${app.color}22)`,
                  }}
                />
              </>
            ) : (
              <>
                <GhostPhone color={app.color} />
                <div style={{ transform: 'scale(1.5)', transformOrigin: 'center', margin: '20px 40px' }}>
                  <PhoneMockup app={app} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features — marginTop reduced ~20% (32 → 26) */}
      <div className="container" style={{ marginTop: 26 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{t('apppage_features')}</h2>

        {(() => {
          const featured = app.features.find(f => f.title === 'AI Coach with Memory')
          const rest = app.features.filter(f => f.title !== 'AI Coach with Memory')
          return (
            <>
              {/* Featured card — bigger padding, stronger border at rest */}
              {featured && (
                <div
                  onMouseEnter={() => setHoveredFeatured(true)}
                  onMouseLeave={() => setHoveredFeatured(false)}
                  style={{
                    background: hoveredFeatured
                      ? `linear-gradient(135deg, ${app.color}1e 0%, rgba(255,255,255,0.04) 100%)`
                      : `linear-gradient(135deg, ${app.color}14 0%, rgba(255,255,255,0.025) 100%)`,
                    border: `1px solid ${hoveredFeatured ? app.color + '60' : app.color + '3a'}`,
                    borderRadius: 14,
                    padding: '26px 32px',
                    marginBottom: 10,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 20,
                    alignItems: 'center',
                    cursor: 'default',
                    transition: 'transform 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                    transform: hoveredFeatured ? 'scale(1.018)' : 'scale(1)',
                    boxShadow: hoveredFeatured
                      ? `0 8px 32px rgba(0,0,0,0.28), 0 0 24px ${app.color}14`
                      : `0 2px 16px rgba(0,0,0,0.18), 0 0 8px ${app.color}08`,
                  }}
                >
                  <div style={{
                    width: 54, height: 54, borderRadius: 14,
                    background: app.color + '1c', border: `1px solid ${app.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.55rem', flexShrink: 0,
                  }}>{featured.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{featured.title}</span>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.06em',
                        textTransform: 'uppercase', padding: '2px 8px', borderRadius: 100,
                        background: app.color + '18', color: app.color, border: `1px solid ${app.color}30`,
                      }}>{t('apppage_core')}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, maxWidth: 600 }}>{featured.desc}</div>
                  </div>
                </div>
              )}

              {/* Regular feature cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {rest.map((f, i) => (
                  <div
                    key={f.title}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: hoveredCard === i ? 'rgba(255,255,255,0.042)' : 'rgba(255,255,255,0.024)',
                      border: `1px solid ${hoveredCard === i ? app.color + '42' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: 12,
                      padding: '16px 18px',
                      cursor: 'default',
                      transition: 'transform 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                      transform: hoveredCard === i ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: hoveredCard === i
                        ? `0 6px 20px rgba(0,0,0,0.22), 0 0 12px ${app.color}0d`
                        : 'none',
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: hoveredCard === i ? app.color + '1e' : app.color + '12',
                      border: `1px solid ${hoveredCard === i ? app.color + '38' : app.color + '1e'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', marginBottom: 10,
                      transition: 'background 0.25s ease-in-out, border-color 0.25s ease-in-out',
                    }}>{f.icon}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )
        })()}
      </div>

    </div>
  )
}
