import { config as Cfg } from '../config'
import PhoneChart from './PhoneChart'

export default function Hero({ config }: { config: typeof Cfg }) {
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
            <span className="hl">real people.</span>
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
          <div className="phone-wrap">
            <div className="float-card float-card-1">
              <div className="fc-label">Weight lost</div>
              <div className="fc-value">−12.4 kg</div>
            </div>
            <div className="float-card float-card-2">
              <div className="fc-label">Week streak</div>
              <div className="fc-value">🔥 14 days</div>
            </div>

            <div className="phone">
              <div className="phone-screen">
                <div className="phone-header">Dashboard</div>
                <div className="phone-stat-row">
                  <div className="phone-stat">
                    <div className="phone-stat-val">94.2</div>
                    <div className="phone-stat-lbl">Weight kg</div>
                  </div>
                  <div className="phone-stat">
                    <div className="phone-stat-val" style={{ color: '#6366f1' }}>2.5mg</div>
                    <div className="phone-stat-lbl">Dose</div>
                  </div>
                </div>
                <PhoneChart />
                <div className="phone-mini-log">
                  {[
                    { label: 'Injection logged', val: '✓', color: 'var(--accent)' },
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
