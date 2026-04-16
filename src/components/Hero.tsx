import { useState } from 'react'
import { apps, PhoneMockup } from './Features'

const previewApps = [
  {
    icon: '🏥',
    name: 'AI Health Tracker',
    tag: 'Live · iOS & Android',
    tagColor: '#22d3ee',
    desc: 'GLP-1 tracking, AI health coach, blood tests & real-time insights.',
    rows: ['Weight: 94.1 kg', 'Mounjaro 5mg ✓', 'AI Coach active'],
    appIndex: 0,
  },
  {
    icon: '🧘',
    name: 'AI Wellness Coach',
    tag: 'Coming Soon',
    tagColor: '#22d3ee',
    desc: 'Stress tracking, sleep analysis, and mental wellness guidance.',
    rows: ['Sleep: 7.2h', 'Stress: Low', 'Mood tracked'],
    appIndex: 1,
  },
  {
    icon: '🍎',
    name: 'AI Nutrition',
    tag: 'In Development',
    tagColor: '#22d3ee',
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

          <div className="hero-mockup-col" onClick={() => onOpenApp(0)}>
            <PhoneMockup app={apps[0]} />
          </div>

          <div className="hero-cards-col">
            {previewApps.map((app, i) => (
              <div
                key={app.name}
                className={`hac${hovered === i ? ' hovered' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onOpenApp(app.appIndex)}
              >
                <div className="hac-top">
                  <span className="hac-icon">{app.icon}</span>
                  <div>
                    <div className="hac-name">{app.name}</div>
                    <div className="hac-tag">{app.tag}</div>
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
