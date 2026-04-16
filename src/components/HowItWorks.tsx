import { useLang } from '../LangContext'

export default function HowItWorks() {
  const { t } = useLang()

  return (
    <div className="bottom-card reveal">
      <div className="bc-label">
        <span className="section-label-dot" />
        {t('dev_label')}
      </div>
      <h3 className="bc-title">{t('dev_title')}</h3>
      <p className="bc-desc">{t('dev_desc')}</p>
      <div className="bc-stats">
        {[
          { num: '2+', labelKey: 'dev_stat0_label' as const },
          { num: 'Claude', labelKey: 'dev_stat1_label' as const },
          { num: '100%', labelKey: 'dev_stat2_label' as const },
        ].map(s => (
          <div key={s.labelKey} className="bc-stat">
            <span className="bc-stat-num">{s.num}</span>
            <span className="bc-stat-label">{t(s.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
