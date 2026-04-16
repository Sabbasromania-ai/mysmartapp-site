import { useParams, useNavigate } from 'react-router-dom'
import { apps, PhoneMockup } from '../components/Features'

const slugMap: Record<string, number> = {
  'ai-health-tracker': 0,
  'ai-wellness-coach': 1,
  'ai-nutrition': 2,
}

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const index = slug ? slugMap[slug] : undefined
  const app = index !== undefined ? apps[index] : null

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
    <div style={{ paddingBottom: 60, minHeight: '80vh' }}>

      {/* Back button */}
      <div className="container" style={{ paddingTop: 90 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 500,
            padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = app.color; (e.target as HTMLElement).style.color = app.color }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
        >
          ← Back to Apps
        </button>
      </div>

      {/* Hero */}
      <div className="container" style={{ marginTop: 16 }}>
        <div style={{
          background: app.gradient,
          border: `1px solid ${app.color}25`,
          borderRadius: 20,
          padding: '36px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              {(app as any).logo
                ? <img src={(app as any).logo} alt={app.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
                : <span style={{ fontSize: '2rem' }}>{(app as any).emoji}</span>
              }
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
                color: app.tagColor, background: app.tagBg,
              }}>{app.tag}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
              {app.name}
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, maxWidth: 460, marginBottom: 14 }}>
              {app.short}
            </p>

            {/* Trust badges — Health Tracker only */}
            {isHealthTracker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 600 }}>★ 4.8 user rating</span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>Built for real GLP-1 users</span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>iOS & Android</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
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

          {/* Right — Phone mockup 30% larger */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'scale(1.3)', transformOrigin: 'center', margin: '0 24px' }}>
            <PhoneMockup app={app} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {app.features.map(f => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              padding: '18px 20px',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: app.color + '15', border: `1px solid ${app.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', marginBottom: 10,
              }}>{f.icon}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
