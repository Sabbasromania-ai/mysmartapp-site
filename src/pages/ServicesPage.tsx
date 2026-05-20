import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'

const el_services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    titleKey: 'svc_0_title',
    descKey: 'svc_0_desc',
    bullets: ['svc_b0_0', 'svc_b0_1', 'svc_b0_2', 'svc_b0_3'],
    ctaKey: 'svc_cta_0',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    titleKey: 'svc_1_title',
    descKey: 'svc_1_desc',
    bullets: ['svc_b1_0', 'svc_b1_1', 'svc_b1_2', 'svc_b1_3'],
    ctaKey: 'svc_cta_1',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    titleKey: 'svc_2_title',
    descKey: 'svc_2_desc',
    bullets: ['svc_b2_0', 'svc_b2_1', 'svc_b2_2', 'svc_b2_3'],
    ctaKey: 'svc_cta_2',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
      </svg>
    ),
    titleKey: 'svc_3_title',
    descKey: 'svc_3_desc',
    bullets: ['svc_b3_0', 'svc_b3_1', 'svc_b3_2', 'svc_b3_3'],
    ctaKey: 'svc_cta_3',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    titleKey: 'svc_4_title',
    descKey: 'svc_4_desc',
    bullets: ['svc_b4_0', 'svc_b4_1', 'svc_b4_2', 'svc_b4_3'],
    ctaKey: 'svc_cta_4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    titleKey: 'svc_5_title',
    descKey: 'svc_5_desc',
    bullets: ['svc_b5_0', 'svc_b5_1', 'svc_b5_2', 'svc_b5_3'],
    ctaKey: 'svc_cta_5',
  },
]

export default function ServicesPage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const el = lang === 'el'

  useEffect(() => {
    const title = el
      ? 'Υπηρεσίες — Custom Εφαρμογές, Websites & AI Εργαλεία | Mysmartsapp'
      : 'Services — Custom Apps, Websites & AI Tools | Mysmartsapp'
    const desc = el
      ? 'Σχεδιάζουμε και κατασκευάζουμε mobile εφαρμογές, websites, e-shops, AI εργαλεία, booking systems και αυτοματισμούς για επιχειρήσεις.'
      : 'We design and build mobile apps, websites, e-shops, AI tools, booking systems, and business automation for businesses that want growth.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/services')
    window.scrollTo(0, 0)
  }, [lang])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '88px 24px 20px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.60rem', fontWeight: 700, letterSpacing: '0.13em',
          color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          {el ? 'ΤΙ ΚΑΤΑΣΚΕΥΑΖΟΥΜΕ' : 'WHAT WE BUILD'}
        </div>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.1,
        }}>
          {el ? 'Υπηρεσίες' : 'Services'}
        </h1>
        <p style={{
          fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', color: '#00dcff',
          maxWidth: 580, margin: '0 auto 10px', lineHeight: 1.55,
        }}>
          {el
            ? 'Ψηφιακές λύσεις που κατασκευάζουμε για επιχειρήσεις που θέλουν περισσότερους πελάτες, καλύτερη λειτουργία και κλιμακούμενα ψηφιακά συστήματα.'
            : 'Digital solutions we build for businesses that want more customers, better operations, and scalable digital systems.'}
        </p>
        <p style={{
          fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)',
          maxWidth: 520, margin: '0 auto', lineHeight: 1.65,
        }}>
          {el
            ? 'Σχεδιάζουμε και κατασκευάζουμε mobile εφαρμογές, websites, e-shops, AI εργαλεία, booking systems και αυτοματισμούς προσαρμοσμένους σε κάθε επιχείρηση.'
            : 'We design and build mobile apps, websites, e-shops, AI tools, booking systems, and business automation systems tailored to each business.'}
        </p>
      </section>

      {/* ── Service Cards ── */}
      <section style={{ padding: '0 0 20px' }}>
        <div className="container">
          <div className="svc-page-grid">
            {el_services.map((svc, i) => (
              <div key={i} className="svc-page-card">
                <div className="svc-page-icon">{svc.icon}</div>
                <h3 className="svc-page-title">{t(svc.titleKey as any)}</h3>
                <p className="svc-page-desc">{t(svc.descKey as any)}</p>
                <ul className="svc-page-bullets">
                  {svc.bullets.map((bk, j) => (
                    <li key={j}>
                      <span className="svc-bullet-dot" />
                      {t(bk as any)}
                    </li>
                  ))}
                </ul>
                <button
                  className="svc-page-cta"
                  onClick={() => navigate('/contact')}
                >
                  {t(svc.ctaKey as any)} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not sure section ── */}
      <section style={{ padding: '0 0 40px' }}>
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
                  : 'Tell us what you want to build and we\'ll suggest the right solution, technology, and launch plan.'}
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
