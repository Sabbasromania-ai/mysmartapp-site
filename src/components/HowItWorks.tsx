import { useLang } from '../LangContext'

const PROC_KEYS = [
  ['proc_0_num', 'proc_0_title', 'proc_0_desc'],
  ['proc_1_num', 'proc_1_title', 'proc_1_desc'],
  ['proc_2_num', 'proc_2_title', 'proc_2_desc'],
  ['proc_3_num', 'proc_3_title', 'proc_3_desc'],
  ['proc_4_num', 'proc_4_title', 'proc_4_desc'],
  ['proc_5_num', 'proc_5_title', 'proc_5_desc'],
] as const

export default function HowItWorks() {
  const { t } = useLang()

  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="col-section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            {t('proc_label')}
          </div>
          <h2 className="col-section-title">
            {t('proc_title1')}<br />
            <span className="dim">{t('proc_title2')}</span>
          </h2>
        </div>

        <div className="process-grid">
          {PROC_KEYS.map(([numKey, titleKey, descKey], i) => (
            <div key={i} className="proc-card reveal">
              <div className="proc-num">{t(numKey)}</div>
              <div className="proc-title">{t(titleKey)}</div>
              <p className="proc-desc">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
