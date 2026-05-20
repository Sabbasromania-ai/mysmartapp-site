import { useLang } from '../LangContext'
import navLogo from '../navlogo.png'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-inner">

          {/* Left — logo + tagline */}
          <div className="footer-brand">
            <img src={navLogo} alt="mysmartsapp" className="footer-logo" />
            <p className="footer-tagline">
              {t('footer_tagline1')}<br />
              {t('footer_tagline2')}
            </p>
          </div>

          {/* Center — nav links */}
          <nav className="footer-links">
            <a href="/#services" className="footer-link">{t('nav_platform')}</a>
            <a href="/apps" className="footer-link">Portfolio</a>
            <a href="/#about" className="footer-link">{t('nav_about')}</a>
            <a href="/privacy" className="footer-link">{t('footer_privacy')}</a>
            <a href="/support" className="footer-link">Support</a>
            <a href="/contact" className="footer-link">{t('footer_contact')}</a>
          </nav>

          {/* Right — email + social */}
          <div className="footer-right">
            <a href="mailto:info@mysmartsapp.com" className="footer-email">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              info@mysmartsapp.com
            </a>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/mysmartsapp" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mysmartsapp" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="footer-copy">{t('footer_copy')}</div>

      </div>
    </footer>
  )
}
