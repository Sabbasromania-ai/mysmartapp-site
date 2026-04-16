export default function AppPreview() {
  return (
    <section className="platform-section" id="platform">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Platform
          </div>
          <h2 className="section-title">
            Built on a shared foundation.<br />
            <span className="dim">Every app, same quality bar.</span>
          </h2>
        </div>

        <div className="platform-grid reveal">
          {[
            { icon: '🤖', title: 'Claude AI Core', desc: 'All apps powered by Anthropic\'s Claude — context-aware, personalized, and continuously improving.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Supabase auth with row-level security. Your data is yours. No ads, no third-party sharing.' },
            { icon: '📱', title: 'Cross-Platform', desc: 'Every app ships on iOS and Android via Capacitor. One codebase, native performance.' },
            { icon: '☁️', title: 'Cloud Sync', desc: 'Real-time sync across devices. Integrates with Apple Health and Google Health Connect.' },
            { icon: '⚡', title: 'Fast & Offline', desc: 'Core features work offline. Data syncs when connection is restored.' },
            { icon: '🔄', title: 'Continuous Updates', desc: 'Apps are actively maintained and improved. User feedback drives every release.' },
          ].map((p, i) => (
            <div key={p.title} className="platform-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="pc-icon">{p.icon}</div>
              <div className="pc-title">{p.title}</div>
              <div className="pc-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
