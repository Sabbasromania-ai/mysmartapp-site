export default function TrustStrip() {
  const items = [
    { icon: '⚡', title: 'AI-powered analysis', desc: 'GPT-4o coaching with memory that adapts to your health data in real time.' },
    { icon: '👤', title: 'Built for real users', desc: 'Every feature validated by actual users. No bloat, no theory, just utility.' },
    { icon: '📊', title: 'Real data, not guesswork', desc: 'Live tracking, trend curves, and actionable insights from day one.' },
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
