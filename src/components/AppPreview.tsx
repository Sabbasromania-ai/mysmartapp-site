export default function AppPreview() {
  return (
    <>
      <div className="col-section-header reveal">
        <div className="section-label">
          <span className="section-label-dot" />
          Platform
        </div>
        <h2 className="col-section-title">
          Built on a shared foundation.<br />
          <span className="dim">Every app, same quality bar.</span>
        </h2>
      </div>

      <div className="platform-grid reveal">
        {[
          { icon: '🤖', title: 'Claude AI Core', desc: 'All apps powered by Anthropic\'s Claude — context-aware and personalized.' },
          { icon: '🔒', title: 'Privacy First', desc: 'Supabase auth with row-level security. Your data is yours. No ads.' },
          { icon: '📱', title: 'Cross-Platform', desc: 'iOS and Android via Capacitor. One codebase, native performance.' },
          { icon: '☁️', title: 'Cloud Sync', desc: 'Real-time sync. Integrates with Apple Health and Health Connect.' },
          { icon: '⚡', title: 'Fast & Offline', desc: 'Core features work offline. Data syncs when reconnected.' },
          { icon: '🔄', title: 'Continuous Updates', desc: 'Actively maintained. User feedback drives every release.' },
        ].map((p, i) => (
          <div key={p.title} className="compact-card" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="cc-top">
              <span className="cc-icon">{p.icon}</span>
              <span className="cc-name">{p.title}</span>
            </div>
            <div className="cc-desc cc-desc--clamp">{p.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}
