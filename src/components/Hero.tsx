import { useState } from 'react'
import { apps, PhoneMockup } from './Features'

const previewApps = [
  {
    icon: '🏥',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0c2040 50%, #0e2d52 100%)',
    name: 'AI Health Tracker',
    tag: 'Live · iOS & Android',
    tagColor: '#10b981',
    desc: 'GLP-1 tracking, AI health coach, blood tests & real-time insights.',
    rows: ['Weight: 94.1 kg', 'Mounjaro 5mg ✓', 'AI Coach active'],
    appIndex: 0,
  },
  {
    icon: '🧘',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #0d0a28 0%, #130f3a 50%, #1a1450 100%)',
    name: 'AI Wellness Coach',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    desc: 'Stress tracking, sleep analysis, and mental wellness guidance.',
    rows: ['Sleep: 7.2h', 'Stress: Low', 'Mood tracked'],
    appIndex: 1,
  },
  {
    icon: '🍎',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #071a14 0%, #0a2a1e 50%, #0e3828 100%)',
    name: 'AI Nutrition',
    tag: 'In Development',
    tagColor: '#6366f1',
    desc: 'Photo-based meal analysis, macro tracking and diet optimization.',
    rows: ['Protein: 142g', 'Calories: 1,820', 'Meal logged'],
    appIndex: 2,
  },
]

interface HeroProps {
  onOpenApp: (index: number) => void
}

export default function Hero({ onOpenApp }: HeroProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="hero-platform" id="home">
      <div className="container hero-inner">

        {/* LEFT */}
        <div className="hero-left">
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

          {/* Phone mockup */}
          <div className="hero-mockup-col" onClick={() => onOpenApp(0)} style={{ cursor: 'pointer' }}>
            <PhoneMockup app={apps[0]} />
          </div>

          {/* 3 App cards */}
          <div className="hero-cards-col">
            {previewApps.map((app, i) => (
              <div
                key={app.name}
                className={`hero-app-card${hovered === i ? ' hovered' : ''}`}
                style={{
                  background: app.gradient,
                  borderColor: hovered === i ? app.color + '55' : app.color + '20',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onOpenApp(app.appIndex)}
              >
                <div className="hac-top">
                  <span className="hac-icon" style={{ background: app.color + '22' }}>{app.icon}</span>
                  <div>
                    <div className="hac-name">{app.name}</div>
                    <div className="hac-tag" style={{ color: app.tagColor }}>{app.tag}</div>
                  </div>
                </div>
                <p className="hac-desc">{app.desc}</p>
                <div className="hac-rows">
                  {app.rows.map(r => (
                    <div key={r} className="hac-row" style={{ borderColor: app.color + '22' }}>
                      <span className="hac-dot" style={{ background: app.color }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.72rem', color: app.color, marginTop: '0.6rem', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.2s' }}>
                  View details →
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
