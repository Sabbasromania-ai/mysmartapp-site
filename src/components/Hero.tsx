import { useState } from 'react'

const previewApps = [
  {
    icon: '🏥',
    color: '#00d4ff',
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

        {/* RIGHT — App Cards Grid, each opens modal */}
        <div className="hero-right">
          {previewApps.map((app, i) => (
            <div
              key={app.name}
              className={`hero-app-card${hovered === i ? ' hovered' : ''}`}
              style={{
                borderColor: hovered === i ? app.color + '55' : undefined,
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpenApp(app.appIndex)}
            >
              <div className="hac-top">
                <span className="hac-icon" style={{ background: app.color + '18' }}>{app.icon}</span>
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
    </section>
  )
}
