import { useLang } from '../LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="logo-dot" style={{ display: 'inline-block', marginRight: '6px' }} />
          mysmartsapp
        </div>
        <div className="footer-links">
          <a href="#support" className="footer-link">{t('footer_privacy')}</a>
          <a href="#support" className="footer-link">{t('footer_terms')}</a>
          <a href="mailto:sabbasromania@icloud.com" className="footer-link">{t('footer_contact')}</a>
        </div>
        <div className="footer-copy">{t('footer_copy')}</div>
      </div>
    </footer>
  )
}
