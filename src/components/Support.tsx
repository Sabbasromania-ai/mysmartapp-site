export default function Support() {
  return (
    <section className="support-section" id="support">
      <div className="container">
        <div className="support-card reveal">
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            <span className="section-label-dot" />
            Support
          </div>
          <h2 className="support-title">We're here to help.</h2>
          <p className="support-sub">
            For any questions, feedback, or support requests, reach out directly:
          </p>
          <a href="mailto:sabbasromanaia@icloud.com" className="support-email">
            sabbasromanaia@icloud.com
          </a>
          <a href="mailto:sabbasromanaia@icloud.com" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
            Contact Support
          </a>
          <div className="support-disclaimer">
            <span className="disclaimer-icon">ℹ️</span>
            This app provides informational and tracking purposes only and does not provide medical advice.
            Always consult your healthcare provider for medical decisions.
          </div>
        </div>
      </div>
    </section>
  )
}
