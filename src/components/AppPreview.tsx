import { useLang } from '../LangContext'
import { TKey } from '../translations'

export default function AppPreview() {
  const { t } = useLang()

  const items: { icon: string; titleKey: TKey; descKey: TKey }[] = [
    { icon: '🤖', titleKey: 'plat_0_title', descKey: 'plat_0_desc' },
    { icon: '🔒', titleKey: 'plat_1_title', descKey: 'plat_1_desc' },
    { icon: '📱', titleKey: 'plat_2_title', descKey: 'plat_2_desc' },
    { icon: '☁️', titleKey: 'plat_3_title', descKey: 'plat_3_desc' },
    { icon: '⚡', titleKey: 'plat_4_title', descKey: 'plat_4_desc' },
    { icon: '🔄', titleKey: 'plat_5_title', descKey: 'plat_5_desc' },
  ]

  return (
    <>
      <div className="col-section-header reveal">
        <div className="section-label">
          <span className="section-label-dot" />
          {t('plat_label')}
        </div>
        <h2 className="col-section-title">
          {t('plat_title1')}<br />
          <span className="dim">{t('plat_title2')}</span>
        </h2>
      </div>

      <div className="platform-grid reveal">
        {items.map((p, i) => (
          <div key={i} className="compact-card platform-compact" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="cc-top">
              <span className="cc-icon">{p.icon}</span>
              <span className="cc-name">{t(p.titleKey)}</span>
            </div>
            <div className="cc-desc cc-desc--clamp">{t(p.descKey)}</div>
          </div>
        ))}
      </div>

      <p className="platform-trust">{t('plat_trust')}</p>
    </>
  )
}
