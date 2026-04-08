import { config } from '../config'
import { AppStoreBadge, PlayStoreBadge } from './Badges'

type App = typeof config.apps[0]

export default function Apps({ apps }: { apps: App[] }) {
  return (
    <section className="apps-section" id="apps">
      <div className="container">
        <div className="apps-header reveal">
          <div>
            <div className="sec-eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Portfolio</span>
            </div>
            <h2 className="sec-title">
              My applications.<br />
              <span>Built to solve real problems.</span>
            </h2>
          </div>
        </div>

        <div className="app-list">
          {apps.map(app => (
            <div key={app.id} className="app-row reveal">
              <div className="app-row-left">
                <div className="app-row-icon-wrap">
                  <div className="app-row-icon">{app.icon}</div>
                  <div className="app-row-num">0{app.id}</div>
                </div>
              </div>

              <div className="app-row-body">
                <div className="app-row-name">
                  {app.name}
                  <span className={`status-chip ${app.status === 'live' ? 'chip-live' : 'chip-dev'}`}>
                    {app.status === 'live' ? 'Live' : 'In Dev'}
                  </span>
                </div>
                <div className="app-row-desc">{app.desc}</div>
                <div className="app-row-tags">
                  {app.tags.map(t => <span key={t} className="rtag">{t}</span>)}
                </div>
              </div>

              <div className="app-row-right">
                <div className="arrow-icon">↗</div>
                {(app.appStore || app.playStore) && (
                  <div className="store-links">
                    {app.appStore && (
                      <a href={app.appStore} className="slink" target="_blank" rel="noopener">
                        <AppStoreBadge />
                      </a>
                    )}
                    {app.playStore && (
                      <a href={app.playStore} className="slink" target="_blank" rel="noopener">
                        <PlayStoreBadge id={`${app.id}`} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
