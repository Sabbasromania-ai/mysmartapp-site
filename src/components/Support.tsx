import { useLang } from '../LangContext'

export default function Support() {
  const { t } = useLang()

  return (
    <div className="bottom-card reveal">
      <div className="bc-label">
        <span className="section-label-dot" />
        {t('contact_label')}
      </div>
      <h3 className="bc-title">{t('contact_title')}</h3>
      <p className="bc-desc">{t('contact_desc')}</p>
      <a href="mailto:sabbasromania@icloud.com" className="bc-email">
        sabbasromania@icloud.com
      </a>
      <a href="mailto:sabbasromania@icloud.com" className="btn-primary bc-btn">
        {t('contact_btn')}
      </a>
    </div>
  )
}
