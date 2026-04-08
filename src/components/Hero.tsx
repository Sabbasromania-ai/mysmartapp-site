import { useEffect, useRef } from 'react'
import { config as Cfg } from '../config'
import PhoneChart from './PhoneChart'
import AnimatedNum from './AnimatedNum'

export default function Hero({ config }: { config: typeof Cfg }) {
  const heroRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  // Parallax between background and phone on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!phoneRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 8
      phoneRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            {config.contact.available ? 'Available for projects' : 'Currently unavailable'}
          </div>

          <h1 className="hero-h1">
            Smart<br />
            apps<br />
            <em>built for</em><br />
            <span className="hl">
              real people.
              <span className="hl-glow" aria-hidden="true">real people.</span>
            </span>
          </h1>

          <p className="hero-p">{config.tagline}</p>

          <div className="hero-actions">
            <a href="#apps" className="btn-main">View my apps →</a>
            <a href="#about" className="btn-link">About me ↓</a>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="hero-right">
          <div className="phone-glow" />
          <div className="phone-wrap" ref={phoneRef}>
            <div className="float-card float-card-1">
              <div className="fc-label">Weight lost</div>
              <div className="fc-value">
                −<AnimatedNum end={12.4} decimals={1} duration={1600} drift={0.3} driftInterval={3500} /> kg
              </div>
            </div>
            <div className="float-card float-card-2">
              <div className="fc-label">Week streak</div>
              <div className="fc-value">🔥 14 days</div>
            </div>

            <div className="phone">
              <div className="phone-screen">
                <div className="phone-header">
                  <span>Dashboard</span>
                  <span className="phone-header-dot" />
                </div>
                <div className="phone-stat-row">
                  <div className="phone-stat">
                    <div className="phone-stat-val">
                      <AnimatedNum end={94.2} decimals={1} duration={1400} drift={0.4} driftInterval={4000} />
                    </div>
                    <div className="phone-stat-lbl">Weight kg</div>
                  </div>
                  <div className="phone-stat">
                    <div className="phone-stat-val" style={{ color: '#6366f1' }}>
                      <AnimatedNum end={2.5} decimals={1} duration={1200} suffix="mg" />
                    </div>
                    <div className="phone-stat-lbl">Dose</div>
                  </div>
                </div>
                <PhoneChart />
                <div className="phone-mini-log">
                  {[
                    { label: 'Injection logged', val: '✓', color: 'var(--accent)' },
                    { label: 'Calories today', val: '1,240', color: '#6366f1' },
                    { label: 'Steps', val: '8,432', color: '#10b981' },
                  ].map((r, i) => (
                    <div key={r.label} className="log-row" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="log-dot" style={{ background: r.color }} />
                      <span className="log-text">{r.label}</span>
                      <span className="log-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero-strip">
        <div className="container strip-grid">
          {config.stats.map(s => (
            <div key={s.label} className="strip-item">
              <div className="strip-num">{s.num}</div>
              <div>
                <div className="strip-label">{s.label}</div>
                <div className="strip-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
