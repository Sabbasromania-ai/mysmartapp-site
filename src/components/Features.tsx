export default function Features() {
  const features = [
    { icon: '🧠', title: 'AI Health Coach', desc: 'Personalized guidance with memory. Adapts recommendations based on your full history.' },
    { icon: '💉', title: 'Injection Tracker', desc: 'Smart site rotation, dose logging, and drug level curves for GLP-1 medications.' },
    { icon: '📸', title: 'Photo Nutrition', desc: 'Snap a meal photo. Get instant calorie and macro breakdown via Google Vision.' },
    { icon: '📈', title: 'Trend Analytics', desc: 'Weight trends, dose effectiveness, and health metrics visualized over any period.' },
    { icon: '🔔', title: 'Smart Reminders', desc: 'Intelligent notifications based on your schedule and medication half-life curves.' },
    { icon: '🔒', title: 'Private & Secure', desc: 'End-to-end encryption. Supabase auth with row-level security. Your data stays yours.' },
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
            <div key={f.title} className="feature-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
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
