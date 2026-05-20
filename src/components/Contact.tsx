import { useLang } from '../LangContext'

export default function Contact({ email }: { email: string }) {
  const { t } = useLang()

  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-card reveal">

          <div className="cta-left">
            <div className="cta-label">
              <span className="section-label-dot" />
              {t('cta_label')}
            </div>
            <h2 className="cta-title">{t('cta_title')}</h2>
            <p className="cta-sub">{t('cta_sub')}</p>
          </div>

          <div className="cta-right">
            <a href="/contact" className="btn-primary cta-btn">
              {t('cta_btn')} →
            </a>
            <a href="/contact" className="cta-email">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              {email}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
