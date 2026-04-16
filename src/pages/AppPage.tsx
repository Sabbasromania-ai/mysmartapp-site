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

  return (
    <div style={{ paddingBottom: 80, minHeight: '80vh' }}>

      {/* Back button */}
      <div className="container" style={{ paddingTop: 100 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 500,
            padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = app.color; (e.target as HTMLElement).style.color = app.color }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
        >
          ← Back to Apps
        </button>
      </div>

      {/* Hero */}
      <div className="container" style={{ marginTop: 24 }}>
        <div style={{
          background: app.gradient,
          border: `1px solid ${app.color}25`,
          borderRadius: 24,
          padding: '48px 56px',
          display: 'grid',
          gridTemplateColumns: '1fr 220px',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              {(app as any).logo
                ? <img src={(app as any).logo} alt={app.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover' }} />
                : <span style={{ fontSize: '2.2rem' }}>{(app as any).emoji}</span>
              }
              <span style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100,
                color: app.tagColor, background: app.tagBg,
              }}>{app.tag}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>
              {app.name}
            </h1>
            <p style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 480, marginBottom: 20 }}>
              {app.short}
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
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

          {/* Right — Phone */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PhoneMockup app={app} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ marginTop: 60 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 28 }}>Features</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {app.features.map(f => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '20px 22px',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: app.color + '15', border: `1px solid ${app.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', marginBottom: 12,
              }}>{f.icon}</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
