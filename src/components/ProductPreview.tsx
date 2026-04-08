import AnimatedNum from './AnimatedNum'

export default function ProductPreview() {
  const rows = [
    { dot: '#00d4ff', text: 'Morning weight logged', val: '94.1 kg' },
    { dot: '#6366f1', text: 'Semaglutide 2.5mg', val: 'Injected' },
    { dot: '#10b981', text: 'Calorie target met', val: '1,280 cal' },
    { dot: '#f59e0b', text: 'Step goal progress', val: '8,432' },
    { dot: '#00d4ff', text: 'AI Coach insight', val: 'View' },
  ]

  return (
    <section className="preview-section">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Product
          </div>
          <h2 className="section-title">
            See it in action.<br />
            <span className="dim">Real interface, real data.</span>
          </h2>
        </div>

        <div className="preview-card reveal">
          <div className="preview-text">
            <h3>Your health dashboard, reimagined</h3>
            <p>
              Track medications, log nutrition with AI-powered photo recognition,
              and get personalized coaching — all in one clean interface designed
              for daily use.
            </p>
            <div className="preview-stats">
              <div>
                <div className="preview-stat-num">
                  <AnimatedNum end={94} decimals={0} duration={1400} suffix="%" />
                </div>
                <div className="preview-stat-label">Adherence rate</div>
              </div>
              <div>
                <div className="preview-stat-num">
                  <AnimatedNum end={12.4} decimals={1} duration={1600} suffix=" kg" />
                </div>
                <div className="preview-stat-label">Avg. weight lost</div>
              </div>
              <div>
                <div className="preview-stat-num">
                  <AnimatedNum end={4.8} decimals={1} duration={1200} />
                </div>
                <div className="preview-stat-label">User rating</div>
              </div>
            </div>
          </div>

          <div className="preview-visual">
            <div className="preview-phone">
              <div className="preview-screen">
                {rows.map(r => (
                  <div key={r.text} className="preview-row">
                    <div className="preview-row-dot" style={{ background: r.dot }} />
                    <span className="preview-row-text">{r.text}</span>
                    <span className="preview-row-val">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
