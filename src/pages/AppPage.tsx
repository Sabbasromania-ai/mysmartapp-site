import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apps, PhoneMockup } from '../components/Features'
import appScreenshot from '../app-screenshot.png'

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
      width: 180,
      height: 360,
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
  const index = slug ? slugMap[slug] : undefined
  const app = index !== undefined ? apps[index] : null

  const [phoneHovered, setPhoneHovered] = useState(false)
  const [hoveredFeatured, setHoveredFeatured] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  if (!app) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 16 }}>
        <div style={{ fontSize: '2rem', color: '#fff' }}>App not found</div>
        <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
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
          ← Back to Apps
        </button>
      </div>

      {/* Hero */}
      <div className="container" style={{ marginTop: 14 }}>
        <div style={{
          background: app.gradient,
          border: `1px solid ${app.color}22`,
          borderRadius: 20,
          padding: '32px 48px 32px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Subtle glow behind phone */}
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 320, height: 320,
            background: `radial-gradient(circle, ${app.color}12 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Left */}
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

            {/* Trust badges */}
            {isHealthTracker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>★ 4.8 user rating</span>
                <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Built for real GLP-1 users</span>
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
                <a href="/#contact" className="btn-primary">Download App</a>
                <a href="/#contact" className="btn-ghost">Learn More</a>
              </div>
            ) : (
              <a href="/#contact" className="btn-ghost">Notify me when ready →</a>
            )}
          </div>

          {/* Right — Real screenshot (Health Tracker) or Phone mockup */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
            {isHealthTracker ? (
              <>
                {/* Cyan glow — intensifies on hover */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: phoneHovered ? 300 : 260,
                  height: phoneHovered ? 500 : 440,
                  background: `radial-gradient(ellipse at center, ${app.color}${phoneHovered ? '35' : '22'} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                  transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease',
                }} />
                {/* Ghost phone shadow */}
                <div style={{
                  position: 'absolute',
                  top: 22, right: -18,
                  width: 170, height: 340,
                  background: 'linear-gradient(160deg, #111827, #0a0e1f)',
                  border: `1px solid ${app.color}15`,
                  borderRadius: 34,
                  opacity: 0.35,
                  filter: 'blur(2px)',
                  zIndex: 0,
                }} />
                <img
                  src={appScreenshot}
                  alt="AI Health Tracker App"
                  onMouseEnter={() => setPhoneHovered(true)}
                  onMouseLeave={() => setPhoneHovered(false)}
                  style={{
                    width: 240,
                    position: 'relative',
                    zIndex: 1,
                    display: 'block',
                    cursor: 'pointer',
                    transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease',
                    transform: phoneHovered
                      ? 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1.04)'
                      : 'perspective(900px) rotateY(-5deg) rotateX(2deg) scale(1)',
                    filter: phoneHovered
                      ? `drop-shadow(0 0 48px ${app.color}45) drop-shadow(0 40px 80px rgba(0,0,0,0.75))`
                      : `drop-shadow(0 0 28px ${app.color}28) drop-shadow(0 28px 56px rgba(0,0,0,0.65))`,
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

      {/* Features */}
      <div className="container" style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>Features</h2>

        {(() => {
          const featured = app.features.find(f => f.title === 'AI Coach with Memory')
          const rest = app.features.filter(f => f.title !== 'AI Coach with Memory')
          return (
            <>
              {/* Featured card */}
              {featured && (
                <div
                  onMouseEnter={() => setHoveredFeatured(true)}
                  onMouseLeave={() => setHoveredFeatured(false)}
                  style={{
                    background: hoveredFeatured
                      ? `linear-gradient(135deg, ${app.color}18 0%, rgba(255,255,255,0.04) 100%)`
                      : `linear-gradient(135deg, ${app.color}10 0%, rgba(255,255,255,0.02) 100%)`,
                    border: `1px solid ${hoveredFeatured ? app.color + '55' : app.color + '30'}`,
                    borderRadius: 14,
                    padding: '24px 28px',
                    marginBottom: 10,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 20,
                    alignItems: 'center',
                    cursor: 'default',
                    transition: 'transform 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                    transform: hoveredFeatured ? 'scale(1.018)' : 'scale(1)',
                    boxShadow: hoveredFeatured
                      ? `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${app.color}12`
                      : '0 2px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 13,
                    background: app.color + '18', border: `1px solid ${app.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', flexShrink: 0,
                  }}>{featured.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{featured.title}</span>
                      <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 100, background: app.color + '18', color: app.color, border: `1px solid ${app.color}30` }}>Core Feature</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, maxWidth: 600 }}>{featured.desc}</div>
                  </div>
                </div>
              )}

              {/* Regular feature cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {rest.map((f, i) => (
                  <div
                    key={f.title}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: hoveredCard === i
                        ? 'rgba(255,255,255,0.045)'
                        : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${hoveredCard === i ? app.color + '40' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: 12,
                      padding: '16px 18px',
                      cursor: 'default',
                      transition: 'transform 0.22s ease-in-out, border-color 0.22s ease-in-out, background 0.22s ease-in-out, box-shadow 0.22s ease-in-out',
                      transform: hoveredCard === i ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: hoveredCard === i
                        ? `0 6px 24px rgba(0,0,0,0.25), 0 0 14px ${app.color}0e`
                        : 'none',
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: hoveredCard === i ? app.color + '20' : app.color + '12',
                      border: `1px solid ${hoveredCard === i ? app.color + '35' : app.color + '20'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', marginBottom: 10,
                      transition: 'background 0.22s ease-in-out, border-color 0.22s ease-in-out',
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
