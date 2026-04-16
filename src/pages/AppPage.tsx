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
        <div style={{ fontSize: '2rem' }}>404</div>
        <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  return (
    <div className="app-page">
      {/* Back button */}
      <div className="container">
        <button className="app-page-back" onClick={() => navigate('/#apps')}>
          ← Back to Apps
        </button>
      </div>

      {/* Hero section */}
      <div className="app-page-hero" style={{ background: app.gradient }}>
        <div className="container app-page-hero-inner">
          <div className="app-page-hero-left">
            <div className="app-page-icon-row">
              {(app as any).logo
                ? <img src={(app as any).logo} alt={app.name} className="app-page-logo" />
                : <span className="app-page-emoji">{(app as any).emoji}</span>
              }
              <span className="app-page-tag" style={{ color: app.tagColor, background: app.tagBg }}>
                {app.tag}
              </span>
            </div>
            <h1 className="app-page-title" style={{ color: '#fff' }}>{app.name}</h1>
            <p className="app-page-desc">{app.short}</p>
            <div className="app-page-platforms">
              {app.platforms.map(p => (
                <span key={p} className="acp-platform">{p}</span>
              ))}
            </div>
            {app.tag === 'Live' ? (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <a href="#contact" className="btn-primary">Download App</a>
                <a href="#contact" className="btn-ghost">Learn More</a>
              </div>
            ) : (
              <a href="/#contact" className="btn-ghost" style={{ marginTop: '2rem', display: 'inline-block' }}>
                Notify me when ready →
              </a>
            )}
          </div>

          <div className="app-page-hero-right">
            <PhoneMockup app={app} />
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="container app-page-features-section">
        <h2 className="app-page-features-title">Features</h2>
        <div className="app-page-features-grid">
          {app.features.map(f => (
            <div key={f.title} className="app-page-feat-card">
              <div className="app-page-feat-icon" style={{ background: app.color + '15', border: `1px solid ${app.color}25` }}>
                {f.icon}
              </div>
              <div className="app-page-feat-title">{f.title}</div>
              <div className="app-page-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
