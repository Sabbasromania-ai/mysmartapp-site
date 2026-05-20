import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import HowItWorks from '../components/HowItWorks'

// ── Icons ────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)
const CpuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)
const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const GearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────
const whatWeBuild = [
  { icon: <PhoneIcon />, en: 'Mobile apps', el: 'Mobile apps' },
  { icon: <MonitorIcon />, en: 'Websites & landing pages', el: 'Websites & landing pages' },
  { icon: <CartIcon />, en: 'E-shops', el: 'E-shops' },
  { icon: <CpuIcon />, en: 'AI tools & automation', el: 'AI tools & automation' },
  { icon: <CalendarIcon />, en: 'Booking and customer systems', el: 'Booking and customer systems' },
]

const approachCards = [
  {
    icon: <TargetIcon />,
    color: '#4fc3f7',
    bg: 'rgba(79,195,247,0.10)',
    en: { title: 'Business-first planning', text: 'We define the business goal, scope, features, timeline, and cost before development starts.' },
    el: { title: 'Business-first σχεδιασμός', text: 'Ορίζουμε τον επιχειρηματικό στόχο, scope, features, timeline και κόστος πριν ξεκινήσει η ανάπτυξη.' },
  },
  {
    icon: <BoxIcon />,
    color: '#9c5ff7',
    bg: 'rgba(156,95,247,0.10)',
    en: { title: 'Complete product delivery', text: 'We handle UI/UX, frontend, backend, integrations, testing, deployment, and launch support.' },
    el: { title: 'Πλήρης παράδοση προϊόντος', text: 'Αναλαμβάνουμε UI/UX, frontend, backend, integrations, testing, deployment και υποστήριξη λανσαρίσματος.' },
  },
  {
    icon: <GearIcon />,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.10)',
    en: { title: 'Systems that reduce manual work', text: 'We build tools for leads, bookings, payments, dashboards, customer communication, and automation.' },
    el: { title: 'Συστήματα που μειώνουν τη χειροκίνητη εργασία', text: 'Κατασκευάζουμε εργαλεία για leads, bookings, πληρωμές, dashboards, επικοινωνία και αυτοματισμούς.' },
  },
]

const checklistItems = [
  { en: 'Complete products, not only mockups or templates.', el: 'Ολοκληρωμένα προϊόντα, όχι μόνο mockups ή templates.' },
  { en: 'Clear scope, technology, timeline, and cost before development starts.', el: 'Ξεκάθαρο scope, τεχνολογία, timeline και κόστος πριν ξεκινήσει η ανάπτυξη.' },
  { en: 'UI/UX, frontend, backend, AI integrations, automation, testing, and deployment.', el: 'UI/UX, frontend, backend, AI integrations, αυτοματισμοί, testing και deployment.' },
  { en: 'Practical workflows for leads, bookings, payments, dashboards, customer communication, and admin work.', el: 'Πρακτικά workflows για leads, bookings, πληρωμές, dashboards, επικοινωνία και admin.' },
  { en: 'Built for real users, real operations, and real growth.', el: 'Κατασκευασμένο για πραγματικούς χρήστες, πραγματικές λειτουργίες και πραγματική ανάπτυξη.' },
]

// ── Page ──────────────────────────────────────────────────────
export default function AboutPage() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const isEl = lang === 'el'

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
    reveals.forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = isEl
      ? 'Σχετικά με εμάς — mysmartsapp | Custom Apps, Websites & AI'
      : 'About mysmartsapp — Custom Apps, Websites & AI Tools'
    const desc = isEl
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

      {/* ── HERO ── */}
      <div className="ab2-hero">

        {/* Left */}
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            <span className="section-label-dot" />
            {isEl ? 'ΠΟΙΟΙ ΕΙΜΑΣΤΕ' : 'WHO WE ARE'}
          </div>
          <h1 className="ab2-h1">
            {isEl
              ? <>Σχετικά με τη <span style={{ color: 'var(--accent)' }}>mysmartsapp</span></>
              : <>About <span style={{ color: 'var(--accent)' }}>mysmartsapp</span></>}
          </h1>
          <p className="ab2-subtitle">
            {isEl
              ? 'Κατασκευάζουμε πρακτικά ψηφιακά προϊόντα για επιχειρήσεις που χρειάζονται περισσότερους πελάτες, καλύτερα συστήματα και λιγότερη χειρωνακτική εργασία.'
              : 'We build practical digital products for businesses that need more customers, better systems, and less manual work.'}
          </p>
          <p className="ab2-para">
            {isEl
              ? 'Η mysmartsapp σχεδιάζει και αναπτύσσει mobile apps, websites, e-shops, booking systems, AI εργαλεία και αυτοματισμούς. Εστιάζουμε σε συστήματα που βοηθούν επιχειρήσεις να αποκτούν leads, να διαχειρίζονται πελάτες, να αυτοματοποιούν εργασίες και να λανσάρουν γρηγορότερα.'
              : 'mysmartsapp designs and develops mobile apps, websites, e-shops, booking systems, AI tools, and automation workflows. We focus on working systems that help businesses capture leads, manage customers, automate tasks, and launch faster.'}
          </p>
          <button
            className="btn-primary"
            style={{ fontSize: '0.9rem', padding: '12px 28px' }}
            onClick={() => navigate('/contact')}
          >
            {isEl ? 'Ξεκίνα το Project σου' : 'Start Your Project'} →
          </button>
        </div>

        {/* Right — What We Build board */}
        <div className="ab2-what-board">
          <div className="ab2-what-header">
            <span className="section-label-dot" />
            {isEl ? 'ΤΙ ΚΑΤΑΣΚΕΥΑΖΟΥΜΕ' : 'WHAT WE BUILD'}
          </div>
          {whatWeBuild.map((item, i) => (
            <div key={i} className="ab2-what-item">
              <div className="ab2-what-icon">{item.icon}</div>
              <span className="ab2-what-text">{isEl ? item.el : item.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── APPROACH ── */}
      <div className="ab2-approach">
        <div className="ab2-section-head">
          <div className="section-label ab2-label-center">
            <span className="section-label-dot" />
            {isEl ? 'Η ΠΡΟΣΕΓΓΙΣΉ ΜΑΣ' : 'OUR APPROACH'}
          </div>
          <h2 className="ab2-section-title">
            {isEl ? 'Φτιαγμένο για πραγματική επιχειρηματική χρήση' : 'Built for real business use'}
          </h2>
        </div>
        <div className="ab2-approach-grid">
          {approachCards.map((card, i) => (
            <div key={i} className="ab2-approach-card">
              <div
                className="ab2-approach-icon"
                style={{ background: card.bg, border: `1px solid ${card.color}40`, color: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="ab2-approach-title">{isEl ? card.el.title : card.en.title}</h3>
              <p className="ab2-approach-text">{isEl ? card.el.text : card.en.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIFFERENCE ── */}
      <div className="ab2-diff">

        {/* Left */}
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            <span className="section-label-dot" />
            {isEl ? 'Η ΔΙΑΦΟΡΆ ΜΑΣ' : 'OUR DIFFERENCE'}
          </div>
          <h2 className="ab2-diff-title">
            {isEl ? <>Τι μας κάνει<br />διαφορετικούς</> : <>What Makes<br />Us Different</>}
          </h2>
          <div className="ab2-diff-underline" />
          <p className="ab2-diff-intro">
            {isEl
              ? 'Δεν κατασκευάζουμε τυχαίες οθόνες ή αποσυνδεδεμένα features. Κατασκευάζουμε ψηφιακά συστήματα γύρω από τον τρόπο που λειτουργεί πραγματικά μια επιχείρηση.'
              : 'We do not build random screens or disconnected features. We build digital systems around how a business actually works.'}
          </p>
        </div>

        {/* Right — Checklist board */}
        <div className="ab2-checklist-board">
          {checklistItems.map((item, i) => (
            <div key={i} className="ab2-check-item">
              <span className="ab2-check-icon"><CheckCircleIcon /></span>
              <span>{isEl ? item.el : item.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW WE WORK — shared component ── */}
      <HowItWorks />

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '8px 0 48px' }}>
        <div className="container">
          <div className="svc-notsure-card">
            <div className="svc-notsure-left">
              <h2 style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 800,
                color: '#fff', marginBottom: 5, letterSpacing: '-0.02em',
              }}>
                {isEl ? 'Δεν ξέρεις τι χρειάζεσαι;' : 'Not sure what you need?'}
              </h2>
              <p style={{
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                margin: 0, lineHeight: 1.6, maxWidth: 500,
              }}>
                {isEl
                  ? 'Πες μας τι θέλεις να φτιάξεις και θα σου προτείνουμε τη σωστή λύση, τεχνολογία και πλάνο λανσαρίσματος.'
                  : "Tell us what you want to build and we'll suggest the right solution, technology, and launch plan."}
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '11px 26px', flexShrink: 0 }}
              onClick={() => navigate('/contact')}
            >
              {isEl ? 'Ζήτα Προσφορά' : 'Request a Quote'} →
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
