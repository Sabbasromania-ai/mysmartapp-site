export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="logo-dot" style={{ display: 'inline-block', marginRight: '6px' }} />
          Smart<span className="logo-accent">Apps</span>
        </div>
        <div className="footer-links">
          <a href="#support" className="footer-link">Privacy</a>
          <a href="#support" className="footer-link">Terms</a>
          <a href="mailto:sabbasromania@icloud.com" className="footer-link">Contact</a>
        </div>
        <div className="footer-copy">© 2026 SmartApps. All rights reserved.</div>
      </div>
    </footer>
  )
}
