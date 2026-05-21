import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'

// ── Industry icons ────────────────────────────────────────────
const ClinicIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)
const ScissorsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
)
const DumbbellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/>
    <path d="M3 9.5v5"/><path d="M21 9.5v5"/>
    <path d="M3 7v2a1 1 0 0 0 1 1h1V6H4a1 1 0 0 0-1 1z"/>
    <path d="M21 7v2a1 1 0 0 1-1 1h-1V6h1a1 1 0 0 1 1 1z"/>
    <path d="M3 15v2a1 1 0 0 0 1 1h1v-4H4a1 1 0 0 0-1 1z"/>
    <path d="M21 15v2a1 1 0 0 1-1 1h-1v-4h1a1 1 0 0 1 1 1z"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
)
const UtensilsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
)
const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)
const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)
const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m3.5 11.5 1 4.5 4.5 1 8-8-5.5-5.5z"/>
    <path d="M5 9.5 4 6.5 7 5l2.5 2.5"/>
    <path d="M9.5 14.5 12.5 17.5 14 21 17 18.5Z"/>
    <path d="M14.5 9.5 14.5 9.5"/>
  </svg>
)
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

// ── Build board icons ─────────────────────────────────────────
const MonitorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="m9 16 2 2 4-4"/>
  </svg>
)
const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const BotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
)

// ── CTA icons ─────────────────────────────────────────────────
const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────
const industries = [
  {
    icon: <ClinicIcon />, color: '#4fc3f7',
    en: { title: 'Clinics & doctors', text: 'Websites, booking systems, patient communication tools, dashboards, and AI-assisted admin workflows.' },
    el: { title: 'Κλινικές & γιατροί', text: 'Websites, booking systems, εργαλεία επικοινωνίας ασθενών, dashboards και AI-υποστηριζόμενες admin ροές.' },
    tags: ['Appointments', 'Patient intake', 'Reminders', 'Dashboards'],
  },
  {
    icon: <ScissorsIcon />, color: '#f472b6',
    en: { title: 'Beauty salons', text: 'Booking websites, client reminders, service menus, online payments, and customer follow-up automation.' },
    el: { title: 'Κομμωτήρια & ινστιτούτα', text: 'Booking websites, υπενθυμίσεις πελατών, online πληρωμές και αυτοματισμοί follow-up.' },
    tags: ['Bookings', 'Services', 'Payments', 'Reminders'],
  },
  {
    icon: <DumbbellIcon />, color: '#34d399',
    en: { title: 'Gyms & personal trainers', text: 'Member dashboards, training apps, class booking, progress tracking, and client communication tools.' },
    el: { title: 'Γυμναστήρια & personal trainers', text: 'Member dashboards, training apps, class booking, παρακολούθηση προόδου και εργαλεία επικοινωνίας.' },
    tags: ['Members', 'Classes', 'Progress', 'Coaching'],
  },
  {
    icon: <UtensilsIcon />, color: '#ffb300',
    en: { title: 'Restaurants & cafés', text: 'Websites, digital menus, reservation systems, online ordering, customer messages, and local promotion tools.' },
    el: { title: 'Εστιατόρια & καφέ', text: 'Websites, ψηφιακά μενού, reservation systems, online παραγγελίες και εργαλεία τοπικής προώθησης.' },
    tags: ['Menus', 'Reservations', 'Orders', 'Local SEO'],
  },
  {
    icon: <UserIcon />, color: '#9c5ff7',
    en: { title: 'Coaches & consultants', text: 'Personal brand websites, lead forms, booking funnels, client portals, and automated onboarding.' },
    el: { title: 'Coaches & σύμβουλοι', text: 'Personal brand websites, lead forms, booking funnels, client portals και αυτοματισμοί onboarding.' },
    tags: ['Leads', 'Bookings', 'Client portal', 'Automation'],
  },
  {
    icon: <BriefcaseIcon />, color: '#38bdf8',
    en: { title: 'Local service businesses', text: 'Lead-generation websites, quote request forms, scheduling systems, CRM flows, and follow-up automations.' },
    el: { title: 'Τοπικές επιχειρήσεις', text: 'Lead-generation websites, φόρμες αιτημάτων, scheduling systems, CRM flows και αυτοματισμοί follow-up.' },
    tags: ['Leads', 'Quotes', 'Scheduling', 'CRM'],
  },
  {
    icon: <RocketIcon />, color: '#fb923c',
    en: { title: 'Startups', text: 'Fast MVP launch, product prototypes, landing pages, app dashboards, backend systems, and AI features.' },
    el: { title: 'Startups', text: 'Γρήγορο MVP launch, product prototypes, landing pages, app dashboards, backend systems και AI features.' },
    tags: ['MVP', 'Prototype', 'SaaS', 'AI'],
  },
  {
    icon: <CartIcon />, color: '#a78bfa',
    en: { title: 'Online stores', text: 'E-shops, product catalogs, payment flows, order management, customer emails, and conversion-focused landing pages.' },
    el: { title: 'Online stores', text: 'E-shops, product catalogs, payment flows, διαχείριση παραγγελιών, customer emails και conversion landing pages.' },
    tags: ['Catalog', 'Payments', 'Orders', 'Conversion'],
  },
]

const buildBoards = [
  {
    icon: <MonitorIcon />, color: '#00dcff',
    en: { title: 'Website or landing page', text: 'Modern, fast, mobile-friendly websites and landing pages that attract and convert.' },
    el: { title: 'Website ή landing page', text: 'Σύγχρονα, γρήγορα, mobile-friendly websites και landing pages που προσελκύουν και μετατρέπουν.' },
  },
  {
    icon: <CalendarIcon />, color: '#9c5ff7',
    en: { title: 'Booking or ordering system', text: 'Smart booking, reservation, and ordering systems that save time and reduce manual work.' },
    el: { title: 'Σύστημα booking ή παραγγελιών', text: 'Smart booking, reservation και ordering systems που εξοικονομούν χρόνο και μειώνουν χειρωνακτική εργασία.' },
  },
  {
    icon: <ChartIcon />, color: '#34d399',
    en: { title: 'Customer dashboard or portal', text: 'Secure dashboards and portals for clients, members, or team management.' },
    el: { title: 'Customer dashboard ή portal', text: 'Ασφαλή dashboards και portals για clients, members ή διαχείριση ομάδας.' },
  },
  {
    icon: <BotIcon />, color: '#ffb300',
    en: { title: 'AI automation and admin workflows', text: 'Automations, AI tools, and workflows that handle tasks, follow-ups, and admin work.' },
    el: { title: 'AI automation & admin workflows', text: 'Automations, AI tools και workflows που χειρίζονται tasks, follow-ups και admin εργασίες.' },
  },
]

// Accent line colors for build boards bottom bar
const buildAccents = ['#00dcff', '#9c5ff7', '#34d399', '#ffb300']

// ── Page ──────────────────────────────────────────────────────
export default function IndustriesPage() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const isEl = lang === 'el'

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = isEl
      ? 'Κλάδοι — mysmartsapp | Custom Apps, Websites & AI'
      : 'Industries — mysmartsapp | Custom Apps, Websites & AI'
    const desc = isEl
      ? 'Κατασκευάζουμε apps, websites, e-shops, booking systems, AI εργαλεία και αυτοματισμούς για επιχειρήσεις σε κάθε κλάδο.'
      : 'We build apps, websites, e-shops, booking systems, AI tools, and automations for businesses across every industry.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/industries')
  }, [lang])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ── */}
      <div className="ind-hero">

        {/* Left */}
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            <span className="section-label-dot" />
            {isEl ? 'ΚΛΑΔΟΙ' : 'INDUSTRIES'}
          </div>
          <h1 className="ind-h1">
            {isEl ? (
              <>
                Ψηφιακές λύσεις για{' '}
                <span className="ind-h1-accent">επιχειρήσεις υπηρεσιών, online stores</span>{' '}
                και <span className="ind-h1-accent">αναπτυσσόμενες ομάδες.</span>
              </>
            ) : (
              <>
                Digital solutions for{' '}
                <span className="ind-h1-accent">service businesses,<br />online stores,</span>{' '}
                and <span className="ind-h1-accent">growing teams.</span>
              </>
            )}
          </h1>
          <p className="ind-hero-sub">
            {isEl
              ? 'Κατασκευάζουμε apps, websites, e-shops, booking systems, AI εργαλεία και αυτοματισμούς για επιχειρήσεις που χρειάζονται περισσότερα leads, καλύτερη οργάνωση και λιγότερη χειρωνακτική εργασία.'
              : 'We build apps, websites, e-shops, booking systems, AI tools, and automations for businesses that need more leads, better organization, and less manual work.'}
          </p>
        </div>

        {/* Right — network visual */}
        <div className="ind-hero-visual" aria-hidden="true">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="ind-hero-svg">
            <defs>
              <radialGradient id="ig1" cx="65%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#00dcff" stopOpacity="0.14"/>
                <stop offset="100%" stopColor="#00dcff" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="ig2" cx="30%" cy="75%" r="45%">
                <stop offset="0%" stopColor="#9c5ff7" stopOpacity="0.10"/>
                <stop offset="100%" stopColor="#9c5ff7" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="ig3" cx="80%" cy="80%" r="35%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.08"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="transparent"/>
            <ellipse cx="260" cy="90" rx="160" ry="140" fill="url(#ig1)"/>
            <ellipse cx="120" cy="225" rx="120" ry="100" fill="url(#ig2)"/>
            <ellipse cx="330" cy="240" rx="90" ry="80" fill="url(#ig3)"/>
            {/* Network lines */}
            <g stroke="rgba(0,220,255,0.18)" strokeWidth="0.7" fill="none">
              <line x1="200" y1="110" x2="300" y2="65"/>
              <line x1="200" y1="110" x2="310" y2="170"/>
              <line x1="200" y1="110" x2="120" y2="65"/>
              <line x1="200" y1="110" x2="95" y2="170"/>
              <line x1="200" y1="110" x2="160" y2="210"/>
              <line x1="200" y1="110" x2="260" y2="210"/>
              <line x1="300" y1="65" x2="360" y2="120"/>
              <line x1="310" y1="170" x2="360" y2="120"/>
              <line x1="310" y1="170" x2="260" y2="210"/>
              <line x1="120" y1="65" x2="60" y2="115"/>
              <line x1="95" y1="170" x2="60" y2="115"/>
              <line x1="95" y1="170" x2="160" y2="210"/>
              <line x1="160" y1="210" x2="200" y2="250"/>
              <line x1="260" y1="210" x2="200" y2="250"/>
            </g>
            {/* Nodes */}
            <g fill="#00dcff">
              <circle cx="200" cy="110" r="4" opacity="0.9"/><circle cx="200" cy="110" r="10" opacity="0.08"/>
              <circle cx="300" cy="65" r="3" opacity="0.7"/>
              <circle cx="310" cy="170" r="3" opacity="0.7"/>
              <circle cx="360" cy="120" r="2.5" opacity="0.6"/>
              <circle cx="160" cy="210" r="2.5" opacity="0.65"/>
              <circle cx="200" cy="250" r="3" opacity="0.7"/>
            </g>
            <g fill="#9c5ff7">
              <circle cx="120" cy="65" r="3" opacity="0.75"/>
              <circle cx="95" cy="170" r="3" opacity="0.75"/>
              <circle cx="60" cy="115" r="2.5" opacity="0.6"/>
            </g>
            <g fill="#34d399">
              <circle cx="260" cy="210" r="3" opacity="0.75"/>
              <circle cx="340" cy="230" r="2.5" opacity="0.6"/>
            </g>
          </svg>
        </div>
      </div>

      {/* ── INDUSTRIES GRID ── */}
      <div className="ind-section">
        <div className="ind-grid">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="ind-card"
              style={{
                borderColor: `${ind.color}20`,
                '--ind-color': ind.color,
              } as React.CSSProperties}
            >
              <div
                className="ind-card-icon"
                style={{
                  background: `${ind.color}15`,
                  border: `1px solid ${ind.color}40`,
                  color: ind.color,
                  boxShadow: `0 0 16px ${ind.color}30`,
                }}
              >
                {ind.icon}
              </div>
              <h3 className="ind-card-title">{isEl ? ind.el.title : ind.en.title}</h3>
              <p className="ind-card-text">{isEl ? ind.el.text : ind.en.text}</p>
              <div className="ind-tags">
                {ind.tags.map((tag, t) => (
                  <span key={t} className="ind-tag" style={{ borderColor: `${ind.color}25`, color: `${ind.color}cc` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT WE CAN BUILD ── */}
      <div className="ind-section">
        <div className="ind-build-label">
          <span className="section-label-dot" />
          {isEl ? 'ΤΙ ΜΠΟΡΟΥΜΕ ΝΑ ΦΤΙΑΞΟΥΜΕ ΓΙΑ ΚΑΘΕ ΚΛΑΔΟ' : 'WHAT WE CAN BUILD FOR EACH INDUSTRY'}
        </div>
        <div className="ind-build-grid">
          {buildBoards.map((board, i) => (
            <div
              key={i}
              className="ind-build-card"
              style={{
                borderColor: `${board.color}20`,
                '--ind-build-color': board.color,
              } as React.CSSProperties}
            >
              <div
                className="ind-build-icon"
                style={{
                  background: `${board.color}15`,
                  border: `1px solid ${board.color}45`,
                  color: board.color,
                  boxShadow: `0 0 14px ${board.color}28`,
                }}
              >
                {board.icon}
              </div>
              <h3 className="ind-build-title">{isEl ? board.el.title : board.en.title}</h3>
              <p className="ind-build-text">{isEl ? board.el.text : board.en.text}</p>
              <div className="ind-build-accent" style={{ background: buildAccents[i] }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA 1 — Not sure if your business fits? ── */}
      <div className="ind-section" style={{ paddingBottom: 20 }}>
        <div className="ind-cta-card">
          <div className="ind-cta-icon-box" style={{ background: 'rgba(0,220,255,0.08)', border: '1px solid rgba(0,220,255,0.25)', color: 'var(--accent)', boxShadow: '0 0 20px rgba(0,220,255,0.20)' }}>
            <QuestionIcon />
          </div>
          <div className="ind-cta-content">
            <h2 className="ind-cta-title">
              {isEl ? 'Δεν ξέρεις αν ταιριάζει η επιχείρησή σου;' : 'Not sure if your business fits?'}
            </h2>
            <p className="ind-cta-text">
              {isEl
                ? 'Αν ο κλάδος σου δεν αναφέρεται, μπορούμε να αναλύσουμε τη ροή εργασίας σου και να προτείνουμε τη σωστή ψηφιακή λύση.'
                : "If your industry is not listed, we can still review your business workflow and suggest the right digital solution."}
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ fontSize: '0.88rem', padding: '11px 26px', flexShrink: 0 }}
            onClick={() => navigate('/contact')}
          >
            {isEl ? 'Ζήτα Προσφορά' : 'Request a Quote'} →
          </button>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '8px 0 48px' }}>
        <div className="container">
          <div className="svc-notsure-card" style={{ gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 0 }}>
              <div className="ind-cta-icon-box" style={{ background: 'rgba(156,95,247,0.10)', border: '1px solid rgba(156,95,247,0.30)', color: '#9c5ff7', boxShadow: '0 0 20px rgba(156,95,247,0.25)', flexShrink: 0 }}>
                <ChatIcon />
              </div>
              <div className="svc-notsure-left">
                <h2 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', fontWeight: 800, color: '#fff', marginBottom: 5, letterSpacing: '-0.02em' }}>
                  {isEl ? 'Πες μας τι θέλεις να φτιάξεις.' : 'Tell us what you want to build.'}
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
                  {isEl
                    ? 'Θα σου προτείνουμε το σωστό προϊόν, τεχνολογία και πλάνο λανσαρίσματος για την επιχείρησή σου.'
                    : "We'll suggest the right product, technology, and launch plan for your business."}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
              <button
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '11px 26px' }}
                onClick={() => navigate('/contact')}
              >
                {isEl ? 'Ζήτα Προσφορά' : 'Request a Quote'} →
              </button>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                </svg>
                info@mysmartsapp.com
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
