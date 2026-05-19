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
            Θέλεις custom εφαρμογή<br />ή website για την επιχείρησή σου;
          </div>
          <div className="contact-sub">
            Κατασκευή mobile app, website, e-shop, AI εργαλείου ή booking system — επικοινώνησε μαζί μας.
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
