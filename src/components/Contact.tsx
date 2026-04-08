export default function Contact({ email }: { email: string }) {
  return (
    <div className="contact-section" id="contact">
      <div className="contact-card reveal">
        <div className="contact-left">
          <div className="contact-label">
            <span className="section-label-dot" />
            Contact
          </div>
          <div className="contact-title">
            Let's build something<br />that actually ships.
          </div>
          <div className="contact-sub">
            Open to collaborations, freelance work, and interesting ideas.
          </div>
        </div>
        <div className="contact-right">
          <a href={`mailto:${email}`} className="contact-email">{email}</a>
          <a href={`mailto:${email}`} className="btn-primary">Get in touch</a>
        </div>
      </div>
    </div>
  )
}
