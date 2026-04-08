import { useEffect, useRef } from 'react'
import { config as Cfg } from '../config'
import PhoneChart from './PhoneChart'
import AnimatedNum from './AnimatedNum'

export default function Hero({ config }: { config: typeof Cfg }) {
  const phoneRef = useRef<HTMLDivElement>(null)

  // JS-driven floating animation on the phone (requestAnimationFrame)
  useEffect(() => {
    let raf = 0
    let t = 0

    function tick() {
      t += 0.015
      if (phoneRef.current) {
        const y = Math.sin(t) * 10
        const r = Math.sin(t * 0.7) * 1.2
        phoneRef.current.style.transform = `translateY(${y}px) rotate(${r}deg)`
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Parallax on mouse move (layered on top of float)
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!phoneRef.current) return
      const mx = (e.clientX / window.innerWidth - 0.5) * 14
      const my = (e.clientY / window.innerHeight - 0.5) * 10
      // We add to existing float transform via CSS custom properties
      phoneRef.current.style.setProperty('--px', `${mx}px`)
      phoneRef.current.style.setProperty('--py', `${my}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero">
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

        {/* Phone Mockup — JS-animated float + parallax */}
        <div className="hero-right">
          <div className="phone-glow" />
          <div className="phone-wrap" ref={phoneRef}>
            <div className="float-card float-card-1">
              <div className="fc-label">Weight lost</div>
              <div className="fc-value">
                −<AnimatedNum end={12.4} decimals={1} duration={1600} drift={0.3} driftInterval={2500} /> kg
              </div>
            </div>
            <div className="float-card float-card-2">
              <div className="fc-label">Week streak</div>
              <div className="fc-value fc-value-streak">
                <AnimatedNum end={14} decimals={0} duration={1200} drift={0} /> days
              </div>
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
                      <AnimatedNum end={94.2} decimals={1} duration={1400} drift={0.4} driftInterval={2000} />
                    </div>
                    <div className="phone-stat-lbl">Weight kg</div>
                  </div>
                  <div className="phone-stat">
                    <div className="phone-stat-val" style={{ color: '#6366f1' }}>
                      <AnimatedNum end={2.5} decimals={1} duration={1200} suffix=" mg" />
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
