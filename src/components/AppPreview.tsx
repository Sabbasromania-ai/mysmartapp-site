export default function AppPreview() {
  return (
    <>
      <div className="col-section-header reveal">
        <div className="section-label">
          <span className="section-label-dot" />
          Platform
        </div>
        <h2 className="col-section-title">
          Your data. Always safe.<br />
          <span className="dim">Always available.</span>
        </h2>
      </div>

      <div className="platform-grid reveal">
        {[
          { icon: '🤖', title: 'AI that actually adapts to you', desc: 'Your data improves recommendations over time.' },
          { icon: '🔒', title: 'Your data is private', desc: 'No ads. No selling. You own everything.' },
          { icon: '📱', title: 'Works on all your devices', desc: 'iPhone & Android always in sync.' },
          { icon: '☁️', title: 'Never lose your progress', desc: 'Cloud backup + real-time sync.' },
          { icon: '⚡', title: 'Works even offline', desc: 'Track anytime. Sync when online.' },
          { icon: '🔄', title: 'Always improving', desc: 'Frequent updates based on real users.' },
        ].map((p, i) => (
          <div key={p.title} className="compact-card platform-compact" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="cc-top">
              <span className="cc-icon">{p.icon}</span>
              <span className="cc-name">{p.title}</span>
            </div>
            <div className="cc-desc cc-desc--clamp">{p.desc}</div>
          </div>
        ))}
      </div>

      <p className="platform-trust">Trusted by real users tracking real health data</p>
    </>
  )
}
