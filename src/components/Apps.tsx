import { config } from '../config'

type App = typeof config.apps[0]

export default function Apps({ apps }: { apps: App[] }) {
  return (
    <section className="apps-section" id="apps">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Portfolio
          </div>
          <h2 className="section-title">
            Apps I've shipped.<br />
            <span className="dim">Built to solve real problems.</span>
          </h2>
        </div>

        <div className="apps-grid">
          {apps.map((app, i) => (
            <div
              key={app.id}
              className="app-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="app-card-icon">{app.icon}</div>
              <div className="app-card-top">
                <div className="app-card-name">{app.name}</div>
                <span className={`app-card-status ${app.status === 'live' ? 'status-live' : 'status-dev'}`}>
                  {app.status === 'live' ? 'Live' : 'In Dev'}
                </span>
              </div>
              <div className="app-card-desc">{app.desc}</div>
              <div className="app-card-tags">
                {app.tags.map(t => (
                  <span key={t} className="app-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
