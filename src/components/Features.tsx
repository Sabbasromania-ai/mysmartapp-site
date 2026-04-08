export default function Features() {
  const features = [
    { icon: '🧠', title: 'AI Health Coach', desc: 'Personalized guidance with memory. Your AI coach remembers your history and adapts recommendations over time.' },
    { icon: '💉', title: 'Injection Tracker', desc: 'Smart site rotation, dose logging, and drug level visualization for GLP-1 medications like Ozempic and Mounjaro.' },
    { icon: '📸', title: 'Photo Nutrition', desc: 'Snap a photo of your meal and get instant calorie and macro breakdown powered by Google Vision AI.' },
    { icon: '📈', title: 'Trend Analytics', desc: 'Beautiful charts showing weight trends, medication effectiveness, and health metrics over any time period.' },
    { icon: '🔔', title: 'Smart Reminders', desc: 'Never miss a dose. Intelligent notifications based on your schedule and medication half-life curves.' },
    { icon: '🔒', title: 'Private & Secure', desc: 'Your health data stays yours. End-to-end encryption with Supabase auth and row-level security.' },
  ]

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Features
          </div>
          <h2 className="section-title">
            Everything you need.<br />
            <span className="dim">Nothing you don't.</span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={f.title} className="feature-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
