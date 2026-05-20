import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import HowItWorks from '../components/HowItWorks'

const missionCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Practical technology',
    titleEl: 'Πρακτική τεχνολογία',
    text: 'We build tools that solve real business problems.',
    textEl: 'Κατασκευάζουμε εργαλεία που λύνουν πραγματικά επιχειρηματικά προβλήματα.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Clear process',
    titleEl: 'Ξεκάθαρη διαδικασία',
    text: 'From scope and design to development, testing, and launch.',
    textEl: 'Από το scope και τον σχεδιασμό ως την ανάπτυξη, τον έλεγχο και το λανσάρισμα.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Long-term support',
    titleEl: 'Μακροπρόθεσμη υποστήριξη',
    text: 'We monitor, improve, and support products after delivery.',
    textEl: 'Παρακολουθούμε, βελτιώνουμε και υποστηρίζουμε τα προϊόντα μετά την παράδοση.',
  },
]

const diffPoints = [
  { en: 'We focus on business outcomes, not only design.', el: 'Εστιάζουμε σε επιχειρηματικά αποτελέσματα, όχι μόνο στο design.' },
  { en: 'We build complete products: frontend, backend, integrations, and AI features.', el: 'Κατασκευάζουμε ολοκληρωμένα προϊόντα: frontend, backend, integrations και AI.' },
  { en: 'We explain scope, technology, timeline, and cost before development starts.', el: 'Εξηγούμε scope, τεχνολογία, timeline και κόστος πριν ξεκινήσει η ανάπτυξη.' },
  { en: 'We support mobile apps, websites, e-shops, booking systems, and automation workflows.', el: 'Υποστηρίζουμε mobile apps, websites, e-shops, booking systems και αυτοματισμούς.' },
  { en: 'We build for real users, real operations, and real growth.', el: 'Κατασκευάζουμε για πραγματικούς χρήστες, πραγματικές λειτουργίες και πραγματική ανάπτυξη.' },
]

export default function AboutPage() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const el = lang === 'el'

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 60)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.05 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = el
      ? 'Σχετικά με εμάς — mysmartsapp | Custom Apps, Websites & AI'
      : 'About mysmartsapp — Custom Apps, Websites & AI Tools'
    const desc = el
      ? 'Σχεδιάζουμε και κατασκευάζουμε custom apps, websites, e-shops, AI εργαλεία και συστήματα αυτοματισμού για επιχειρήσεις.'
      : 'We design and build custom apps, websites, e-shops, AI tools, booking systems, and automation systems for growing businesses.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/about')
  }, [lang])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '44px 24px 16px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.60rem', fontWeight: 700, letterSpacing: '0.13em',
          color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          {el ? 'ΠΟΙΟΙ ΕΙΜΑΣΤΕ' : 'WHO WE ARE'}
        </div>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1,
        }}>
          {el ? 'Σχετικά με τη mysmartsapp' : 'About mysmartsapp'}
        </h1>
        <p style={{
          fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', color: '#00dcff',
          maxWidth: 640, margin: '0 auto 12px', lineHeight: 1.6,
        }}>
          {el
            ? 'Σχεδιάζουμε και κατασκευάζουμε custom apps, websites, e-shops, AI εργαλεία, booking systems και αυτοματισμούς για επιχειρήσεις που θέλουν περισσότερους πελάτες, καλύτερη λειτουργία και κλιμακούμενη ψηφιακή υποδομή.'
            : 'We design and build custom apps, websites, e-shops, AI tools, booking systems, and automation systems for businesses that want more customers, better operations, and scalable digital infrastructure.'}
        </p>
        <p style={{
          fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)',
          maxWidth: 560, margin: '0 auto', lineHeight: 1.7,
        }}>
          {el
            ? 'Η mysmartsapp βοηθά επιχειρήσεις να μετατρέψουν ιδέες σε λειτουργικά ψηφιακά προϊόντα. Συνδυάζουμε στρατηγική, UI/UX, ανάπτυξη, AI integration, αυτοματισμό και υποστήριξη λανσαρίσματος.'
            : 'mysmartsapp helps businesses turn ideas into working digital products. We combine strategy, UI/UX design, development, AI integration, automation, and launch support so clients get a real product, not just a design or a prototype.'}
        </p>
      </section>

      {/* ── Mission ── */}
      <section style={{ padding: '32px 0 20px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 className="about-section-title">
              {el ? 'Η Αποστολή μας' : 'Our Mission'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '8px auto 0', lineHeight: 1.65 }}>
              {el
                ? 'Η αποστολή μας είναι να βοηθάμε επιχειρήσεις να λανσάρουν πρακτικές ψηφιακές λύσεις γρηγορότερα — χωρίς περιττή πολυπλοκότητα, ασαφή timelines ή τεχνική σύγχυση.'
                : 'Our mission is to help businesses launch practical digital solutions faster — without unnecessary complexity, unclear timelines, or technical confusion.'}
            </p>
          </div>
          <div className="about-mission-grid">
            {missionCards.map((card, i) => (
              <div key={i} className="about-mission-card">
                <div className="about-mission-icon">{card.icon}</div>
                <h3 className="about-mission-card-title">{el ? card.titleEl : card.title}</h3>
                <p className="about-mission-card-text">{el ? card.textEl : card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes us different ── */}
      <section style={{ padding: '20px 0 20px' }}>
        <div className="container">
          <div className="about-diff-card">
            <h2 className="about-section-title" style={{ marginBottom: 20 }}>
              {el ? 'Τι μας κάνει διαφορετικούς' : 'What Makes Us Different'}
            </h2>
            <ul className="about-diff-list">
              {diffPoints.map((p, i) => (
                <li key={i} className="about-diff-item">
                  <span className="about-diff-dot" />
                  <span>{el ? p.el : p.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── How we work — shared component ── */}
      <HowItWorks />

      {/* ── Final CTA ── */}
      <section style={{ padding: '20px 0 48px' }}>
        <div className="container">
          <div className="svc-notsure-card">
            <div className="svc-notsure-left">
              <h2 style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 800,
                color: '#fff', marginBottom: 5, letterSpacing: '-0.02em',
              }}>
                {el ? 'Δεν ξέρεις τι χρειάζεσαι;' : 'Not sure what you need?'}
              </h2>
              <p style={{
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                margin: 0, lineHeight: 1.6, maxWidth: 500,
              }}>
                {el
                  ? 'Πες μας τι θέλεις να φτιάξεις και θα σου προτείνουμε τη σωστή λύση, τεχνολογία και πλάνο λανσαρίσματος.'
                  : "Tell us what you want to build and we'll suggest the right solution, technology, and launch plan."}
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '11px 26px', flexShrink: 0 }}
              onClick={() => navigate('/contact')}
            >
              {el ? 'Ζήτα Προσφορά' : 'Request a Quote'} →
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
