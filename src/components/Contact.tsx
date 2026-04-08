export default function Contact({ email }: { email: string }) {
  return (
    <div className="contact-section reveal" id="contact">
      <div className="sec-eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">Contact</span>
      </div>
      <div className="contact-title">Got a project?<br />Let's talk.</div>
      <div className="contact-sub">Open to collaborations, freelance work, and interesting ideas.</div>
      <a href={`mailto:${email}`} className="contact-email">{email}</a>
    </div>
  )
}
