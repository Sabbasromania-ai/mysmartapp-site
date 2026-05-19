import { useLang } from '../LangContext'

export default function Contact({ email }: { email: string }) {
  const { t } = useLang()

  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-card reveal">
          <div className="cta-label">
            <span className="section-label-dot" />
            {t('cta_label')}
          </div>
          <h2 className="cta-title">{t('cta_title')}</h2>
          <p className="cta-sub">{t('cta_sub')}</p>
          <div className="cta-actions">
            <a href="/contact" className="btn-primary cta-btn">{t('cta_btn')}</a>
            <span className="cta-or">{t('cta_email_label')}</span>
            <a href={`mailto:${email}`} className="cta-email">{email}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
