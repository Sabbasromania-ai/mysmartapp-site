import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apps } from './Features'
import appLogo from '../applogo.png'
import appScreenshot from '../app-screenshot.png'

const previewApps = [
  {
    logo: appLogo,
    name: 'AI Health Tracker',
    tag: 'Live · iOS & Android',
    desc: 'GLP-1 tracking, AI health coach, blood tests & real-time insights.',
    rows: ['Weight: 94.1 kg', 'Mounjaro 5mg ✓', 'AI Coach active'],
    appIndex: 0,
  },
  {
    logo: null,
    emoji: '🧘',
    name: 'AI Wellness Coach',
    tag: 'Coming Soon',
    desc: 'Stress tracking, sleep analysis, and mental wellness guidance.',
    rows: ['Sleep: 7.2h', 'Stress: Low', 'Mood tracked'],
    appIndex: 1,
  },
  {
    logo: null,
    emoji: '🍎',
    name: 'AI Nutrition',
    tag: 'Coming Soon',
    desc: 'Photo-based meal analysis, macro tracking and diet optimization.',
    rows: ['Protein: 142g', 'Calories: 1,820', 'Meal logged'],
    appIndex: 2,
  },
]

const slugs = ['ai-health-tracker', 'ai-wellness-coach', 'ai-nutrition']

export default function Hero() {
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()

  return (
    <section className="hero-platform" id="home">
      <div className="container hero-inner" style={{ alignItems: 'stretch' }}>

        {/* LEFT */}
        <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Platform
          </div>
          <h1 className="hero-h1">
            AI-powered apps<br />
            built for <span className="text-gradient">real&nbsp;use.</span>
          </h1>
          <p className="hero-p">
            A platform creating smart, AI-driven tools for health,
            productivity, and real-world use. Designed and built by a solo developer.
          </p>
          <div className="hero-actions">
            <a href="#apps" className="btn-primary">Explore Apps</a>
            <a href="#platform" className="btn-ghost">View Platform →</a>
          </div>
          <div className="hero-trust">
            <span className="trust-dot" />
            <span>iOS & Android</span>
            <span className="trust-sep">·</span>
            <span>Powered by Claude AI</span>
            <span className="trust-sep">·</span>
            <span>Built by 1 developer</span>
          </div>
        </div>

        {/* RIGHT — Phone mockup + App Cards */}
        <div className="hero-right hero-right-split">

          <div className="hero-mockup-col" onClick={() => navigate('/apps/ai-health-tracker')} style={{ cursor: 'pointer', position: 'relative' }}>
            {/* Glow behind screenshot */}
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
                key={app.name}
                className={`hac${hovered === i ? ' hovered' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/apps/${slugs[app.appIndex]}`)}
              >
                <div className="hac-top">
                  <span className="hac-icon">
                    {app.logo
                      ? <img src={app.logo} alt={app.name} style={{ width: 20, height: 20, borderRadius: 5, objectFit: 'cover' }} />
                      : <span>{(app as any).emoji}</span>
                    }
                  </span>
                  <div>
                    <div className="hac-name">{app.name}</div>
                    <div className={`hac-tag${app.tag.startsWith('Live') ? ' hac-tag-live' : ''}`}>{app.tag}</div>
                  </div>
                </div>
                <p className="hac-desc">{app.desc}</p>
                <div className="hac-rows">
                  {app.rows.map(r => (
                    <div key={r} className="hac-row">
                      <span className="hac-dot" />
                      <span>{r}</span>
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
