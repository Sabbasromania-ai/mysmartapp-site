import { useLang } from '../LangContext'
import { TKey } from '../translations'
import img01 from '../assets/icons/how-it-works/01_project_idea_requirements.png'
import img02 from '../assets/icons/how-it-works/02_ui_ux_design.png'
import img03 from '../assets/icons/how-it-works/03_development.png'
import img04 from '../assets/icons/how-it-works/04_testing.png'
import img05 from '../assets/icons/how-it-works/05_app_store_google_play_launch.png'
import img06 from '../assets/icons/how-it-works/06_support_improvements.png'

const STEPS: { color: string; titleKey: TKey; descKey: TKey; img: string }[] = [
  { color: '#4fc3f7', titleKey: 'proc_0_title', descKey: 'proc_0_desc', img: img01 },
  { color: '#26c6da', titleKey: 'proc_1_title', descKey: 'proc_1_desc', img: img02 },
  { color: '#ffb300', titleKey: 'proc_2_title', descKey: 'proc_2_desc', img: img03 },
  { color: '#9c5ff7', titleKey: 'proc_3_title', descKey: 'proc_3_desc', img: img04 },
  { color: '#38bdf8', titleKey: 'proc_4_title', descKey: 'proc_4_desc', img: img05 },
  { color: '#34d399', titleKey: 'proc_5_title', descKey: 'proc_5_desc', img: img06 },
]

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

        <div className="proc-timeline">
          {STEPS.map((step, i) => (
            <div key={i} className="proc-step reveal">
              <div
                className="proc-circle"
                style={{
                  borderColor: step.color,
                  boxShadow: `0 0 18px ${step.color}35, 0 0 36px ${step.color}18`,
                }}
              >
                <img
                  src={step.img}
                  alt={step.titleKey}
                  style={{ width: 48, height: 48, objectFit: 'contain', mixBlendMode: 'screen' }}
                />
              </div>
              <div className="proc-step-title">{t(step.titleKey)}</div>
              <p className="proc-step-desc">{t(step.descKey)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
