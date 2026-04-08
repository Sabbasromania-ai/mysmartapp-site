export default function Contact({ email }: { email: string }) {
  return (
    <div className="contact-section reveal" id="contact">
      <div className="sec-eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">Contact</span>
      </div>
      <div className="contact-title">Let's build something<br />that actually ships.</div>
      <div className="contact-sub">Open to collaborations, freelance work, and interesting ideas.</div>
      <a href="mailto:sabbasromania@icloud.com" className="contact-email">sabbasromania@icloud.com</a>
    </div>
  )
}
