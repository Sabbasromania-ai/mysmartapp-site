export default function TrustStrip() {
  const items = [
    { icon: '⚡', title: 'AI-powered analysis', desc: 'Smart coaching driven by GPT-4o and real-time health data.' },
    { icon: '👤', title: 'Built for real users', desc: 'Every feature designed around actual user needs, not theory.' },
    { icon: '📊', title: 'Real data, not guesswork', desc: 'Live tracking, trend analysis, and actionable health insights.' },
  ]

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map(item => (
            <div key={item.title} className="trust-item reveal">
              <span className="trust-icon">{item.icon}</span>
              <div className="trust-title">{item.title}</div>
              <div className="trust-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
