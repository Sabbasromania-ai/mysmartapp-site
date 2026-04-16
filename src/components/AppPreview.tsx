export default function AppPreview() {
  const rows = [
    { dot: '#00d4ff', label: 'Weight logged', value: '94.1 kg' },
    { dot: '#6366f1', label: 'Mounjaro 5mg', value: 'Injected ✓' },
    { dot: '#10b981', label: 'Calories today', value: '1,280 kcal' },
    { dot: '#f59e0b', label: 'Steps', value: '8,432' },
    { dot: '#00d4ff', label: 'AI Coach insight', value: 'View →' },
  ]

  return (
    <section className="preview-section" id="preview">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            App Preview
          </div>
          <h2 className="section-title">
            Built for daily use.<br />
            <span className="dim">Designed to feel effortless.</span>
          </h2>
        </div>

        <div className="preview-layout reveal">
          <div className="preview-text">
            <h3 className="preview-h3">Your health data, unified.</h3>
            <p className="preview-p">
              One clean dashboard for weight, medication, nutrition, and AI coaching.
              Syncs with Apple Health and Google Health Connect automatically.
            </p>
            <div className="preview-bullets">
              {[
                'Automatic sync with Apple Health & Google Fit',
                'AI coach that remembers your full history',
                'Blood test interpretation built in',
                'Works offline — no internet required for logging',
              ].map(b => (
                <div key={b} className="preview-bullet">
                  <span className="bullet-check">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <a href="#support" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
              Try the App
            </a>
          </div>

          <div className="preview-phone-wrap">
            <div className="preview-phone">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="phone-header">
                  <span className="phone-title">Dashboard</span>
                  <span className="phone-date">Thu, 16 Apr</span>
                </div>
                {rows.map(r => (
                  <div key={r.label} className="phone-row">
                    <div className="phone-dot" style={{ background: r.dot }} />
                    <span className="phone-label">{r.label}</span>
                    <span className="phone-value">{r.value}</span>
                  </div>
                ))}
                <div className="phone-chart">
                  {[60, 80, 55, 90, 70, 85, 65].map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
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
