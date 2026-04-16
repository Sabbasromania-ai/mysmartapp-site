export default function HowItWorks() {
  return (
    <div className="bottom-card reveal">
      <div className="bc-label">
        <span className="section-label-dot" />
        Team Developer
      </div>
      <h3 className="bc-title">Sabbas Alexiou</h3>
      <p className="bc-desc">
        Focused on building AI-powered apps for real-world use — clean UI, strong privacy, and continuous improvement.
      </p>
      <div className="bc-stats">
        {[
          { num: '2+', label: 'Apps shipped' },
          { num: 'Claude', label: 'AI engine' },
          { num: '100%', label: 'Privacy focused' },
        ].map(s => (
          <div key={s.label} className="bc-stat">
            <span className="bc-stat-num">{s.num}</span>
            <span className="bc-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
