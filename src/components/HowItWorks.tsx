export default function HowItWorks() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-card reveal">
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            <span className="section-label-dot" />
            About
          </div>
          <div className="about-grid">
            <div className="about-left">
              <h2 className="about-title">
                One developer.<br />
                <span className="text-gradient">Real products.</span>
              </h2>
              <p className="about-desc">
                SmartApps is built by a solo developer focused on creating
                AI-powered tools that actually solve real problems — not demos,
                not experiments. Apps that ship, that work, and that improve
                people's lives.
              </p>
              <p className="about-desc">
                Every app on this platform is designed with the same principles:
                clean UI, powerful AI, strong privacy, and continuous improvement
                based on real user feedback.
              </p>
            </div>
            <div className="about-stats">
              {[
                { num: '2+', label: 'Apps shipped' },
                { num: 'Claude', label: 'AI engine' },
                { num: '100%', label: 'Privacy focused' },
                { num: '1', label: 'Developer' },
              ].map(s => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
