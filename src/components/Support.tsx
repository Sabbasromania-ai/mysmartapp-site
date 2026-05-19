import { useLang } from '../LangContext'

const IND_ICONS = ['🍽️', '🏥', '🛍️', '🏠', '💅', '🏋️', '💼', '✈️']
const IND_KEYS = [
  'ind_0', 'ind_1', 'ind_2', 'ind_3',
  'ind_4', 'ind_5', 'ind_6', 'ind_7',
] as const

export default function Support() {
  const { t } = useLang()

  return (
    <section className="industries-section" id="industries">
      <div className="container">
        <div className="col-section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            {t('ind_label')}
          </div>
          <h2 className="col-section-title">
            {t('ind_title1')}<br />
            <span className="dim">{t('ind_title2')}</span>
          </h2>
        </div>

        <div className="industries-grid">
          {IND_KEYS.map((key, i) => (
            <div key={i} className="ind-card reveal">
              <span className="ind-icon">{IND_ICONS[i]}</span>
              <span className="ind-label">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
