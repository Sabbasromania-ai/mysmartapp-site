import { useEffect, useRef } from 'react'
import { config as Cfg } from '../config'
import PhoneChart from './PhoneChart'
import AnimatedNum from './AnimatedNum'

export default function Hero({ config }: { config: typeof Cfg }) {
  const phoneRef = useRef<HTMLDivElement>(null)

  // JS float + subtle rotation at 60fps
  useEffect(() => {
    let raf = 0
    let t = 0
    function tick() {
      t += 0.01
      if (phoneRef.current) {
        const y = Math.sin(t) * 14
        const rx = Math.sin(t * 0.6) * 1.5
        phoneRef.current.style.transform = `translateY(${y}px) rotate(${rx}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Health Apps
          </div>

          <h1 className="hero-h1">
            Smart apps<br />
            for <span className="text-gradient">real people.</span>
          </h1>

          <p className="hero-p">
            AI coaching, health tracking, and real-time analytics. Built by a solo developer. Shipped to the App Store.
          </p>

          <div className="hero-actions">
            <a href="#apps" className="btn-primary">Explore apps</a>
            <a href="#about" className="btn-ghost">Learn more</a>
          </div>
        </div>

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
              <div className="fc-label">Streak</div>
              <div className="fc-value">
                <AnimatedNum end={14} decimals={0} duration={1200} /> days
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
                    { label: 'Injection logged', val: '✓', color: '#00d4ff' },
                    { label: 'Calories today', val: '1,240', color: '#6366f1' },
                    { label: 'Steps', val: '8,432', color: '#10b981' },
                  ].map(r => (
                    <div key={r.label} className="log-row">
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
    </section>
  )
}
