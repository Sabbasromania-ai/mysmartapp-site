import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apps, PhoneMockup } from '../components/Features'
import appScreenshot from '../app-screenshot.png'
import iReceptionMockup from '../iReception_mockup.png'
import iCalorieMockup from '../iCalorie_mockup.png'

const mockupMap: Record<number, string> = {
  1: iReceptionMockup,
  2: iCalorieMockup,
}
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'

const slugMap: Record<string, number> = {
  'mounjaro-tracker-ai-health': 0,
  'ai-health-tracker': 0,
  'ireception': 1,
  'icalorie': 2,
}

function GhostPhone({ color }: { color: string }) {
  return (
    <div style={{
      position: 'absolute',
      top: 18, right: -22,
      width: 180, height: 360,
      background: 'linear-gradient(160deg, #111827, #0a0e1f)',
      border: `1px solid ${color}18`,
      borderRadius: 32,
      opacity: 0.45,
      filter: 'blur(1px)',
      zIndex: 0,
      boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${color}10`,
    }} />
  )
}

export default function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const index = slug ? slugMap[slug] : undefined
  const app = index !== undefined ? apps[index] : null

  const [phoneHovered, setPhoneHovered] = useState(false)
  const [heroHovered, setHeroHovered] = useState(false)
  const [hoveredFeatured, setHoveredFeatured] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const slugSEO: Record<string, Record<string, { title: string; desc: string }>> = {
    'ireception': {
      en: {
        title: 'iReception AI Reception & Booking System | Mysmartsapp',
        desc: 'iReception is an AI reception and booking system for businesses that need automated customer communication, appointments, and support.',
      },
      el: {
        title: 'iReception AI Σύστημα Υποδοχής & Κρατήσεων | Mysmartsapp',
        desc: 'Το iReception είναι AI σύστημα υποδοχής και κρατήσεων για επιχειρήσεις που χρειάζονται αυτοματοποιημένη επικοινωνία, ραντεβού και υποστήριξη πελατών.',
      },
    },
    'icalorie': {
      en: {
        title: 'iCalorie AI Nutrition & Calorie Tracking App | Mysmartsapp',
        desc: 'iCalorie is an AI nutrition and calorie tracking app for meal scanning, macros, food logging, and personalized nutrition insights.',
      },
      el: {
        title: 'iCalorie AI Εφαρμογή Διατροφής & Θερμίδων | Mysmartsapp',
        desc: 'Το iCalorie είναι AI εφαρμογή διατροφής και παρακολούθησης θερμίδων για σάρωση γευμάτων, macros, καταγραφή φαγητού και προσωπικά insights.',
      },
    },
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!slug) return
    const seoEntry = slugSEO[slug]
    if (!seoEntry) return
    const seo = seoEntry[lang] ?? seoEntry['en']
    document.title = seo.title
    setMeta('description', seo.desc)
    setOG('og:title', seo.title)
    setOG('og:description', seo.desc)
    setCanonical(`https://mysmartsapp.com/apps/${slug}`)
  }, [slug, lang])

  if (!app) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 16 }}>
        <div style={{ fontSize: '2rem', color: '#fff' }}>{t('apppage_notfound')}</div>
        <button className="btn-primary" onClick={() => navigate('/')}>{t('apppage_back_home')}</button>
      </div>
    )
  }

  const isHealthTracker = index === 0
  const isReception = index === 1

  // ── Shared card design tokens ──────────────────────────────────
  const CARD_BG = (h: boolean) => h
    ? 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(8,16,42,0.55) 100%)'
    : 'linear-gradient(135deg, rgba(8,16,42,0.68) 0%, rgba(0,90,170,0.13) 50%, rgba(8,16,42,0.68) 100%)'
  const CARD_BORDER = (h: boolean) =>
    `1px solid rgba(0,212,255,${h ? '0.56' : '0.26'})`
  const CARD_SHADOW = (h: boolean) => h
    ? '0 0 32px rgba(0,212,255,0.14), inset 0 0 24px rgba(0,212,255,0.07)'
    : '0 0 20px rgba(0,212,255,0.06), inset 0 0 16px rgba(0,212,255,0.03)'
  const CARD_BACKDROP = 'blur(12px)'

  return (
    <div style={{ paddingBottom: 56, minHeight: '80vh' }}>

      {/* Back button */}
      <div className="container" style={{ paddingTop: 88 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontWeight: 500,
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = app.color; (e.target as HTMLElement).style.color = app.color }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
        >
          {t('apppage_back')}
        </button>
      </div>

      {/* Hero */}
      <div className="container" style={{ marginTop: 14 }}>
        <div
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
          style={{
            background: CARD_BG(heroHovered),
            border: CARD_BORDER(heroHovered),
            boxShadow: CARD_SHADOW(heroHovered),
            backdropFilter: CARD_BACKDROP,
            WebkitBackdropFilter: CARD_BACKDROP,
            borderRadius: 20,
            padding: '28px 40px',
            display: 'grid',
            gridTemplateColumns: isReception ? '34% 52%' : '55% 40%',
            gap: isReception ? 48 : 32,
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            transform: heroHovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease',
          }}
        >
          {/* Background glow blob */}
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 360, height: 360,
            background: `radial-gradient(circle, ${app.color}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Left content */}
          <div style={{ zIndex: 1, order: isReception ? 2 : 1 }}>
            {isReception ? (
              /* iReception: [logo] [iReception] [COMING SOON] — all one row */
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <img src={(app as any).logo} alt={app.name} style={{ width: 46, height: 46, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
                  {app.name}
                </span>
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
                  background: 'rgba(0,220,255,0.12)',
                  border: '1px solid rgba(0,220,255,0.45)',
                  color: '#22e6ff',
                  boxShadow: '0 0 12px rgba(0,220,255,0.18)',
                  flexShrink: 0,
                }}>Coming Soon</span>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  {(app as any).logo
                    ? <img src={(app as any).logo} alt={app.name} style={{ width: 46, height: 46, borderRadius: 12, objectFit: 'cover' }} />
                    : <span style={{ fontSize: '2rem' }}>{(app as any).emoji}</span>
                  }
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100,
                    color: app.tagColor, background: app.tagBg,
                  }}>{app.tag}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>
                  {app.name}
                </h1>
              </>
            )}
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 440, marginBottom: isReception ? 6 : 12 }}>
              {app.short}
            </p>

            {isReception && (
              <>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, maxWidth: 440, marginBottom: 14 }}>
                  Automate bookings, calls, messages, reminders, and customer follow-ups from one smart dashboard.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 16 }}>
                  {[
                    { label: 'AI Receptionist',       icon: '🤖' },
                    { label: 'Booking System',         icon: '📅' },
                    { label: 'Customer Messages',      icon: '💬' },
                    { label: 'Missed Call Handling',   icon: '📞' },
                    { label: 'Appointment Reminders',  icon: '🔔' },
                    { label: 'Customer CRM',           icon: '👥' },
                    { label: 'Business Automation',    icon: '⚙️' },
                    { label: 'Staff Calendar',         icon: '🗓️' },
                    { label: 'Follow-up Messages',     icon: '📨' },
                    { label: 'Lead Capture',           icon: '🎯' },
                    { label: 'Multi-service Booking',  icon: '🔀' },
                    { label: 'AI Assistant',           icon: '✨' },
                  ].map(chip => (
                    <span key={chip.label} className="ap-feat-chip">
                      <span>{chip.icon}</span>{chip.label}
                    </span>
                  ))}
                </div>
              </>
            )}

            {isHealthTracker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>{t('apppage_rating')}</span>
                <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{t('apppage_glp1')}</span>
                <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>iOS & Android</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {app.platforms.map(p => (
                <span key={p} className="acp-platform">{p}</span>
              ))}
            </div>

            {app.tag === 'Live' ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="/#contact" className="btn-primary">{t('apppage_download')}</a>
                <a href="/#contact" className="btn-ghost">{t('apppage_learn')}</a>
              </div>
            ) : (
              <a href="/#contact" className="btn-ghost">{t('apppage_notify')}</a>
            )}
          </div>

          {/* Right — phone */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isReception ? 'flex-start' : 'flex-end', zIndex: 1, position: 'relative', order: isReception ? 1 : 2 }}>
            {isHealthTracker ? (
              <>
                {/* Layered glow — outer soft + inner core */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: phoneHovered ? 320 : 280,
                  height: phoneHovered ? 520 : 480,
                  background: `radial-gradient(ellipse at 50% 60%, ${app.color}${phoneHovered ? '3a' : '28'} 0%, ${app.color}08 50%, transparent 72%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                  transition: 'width 0.45s ease, height 0.45s ease, background 0.45s ease',
                  borderRadius: '50%',
                }} />
                {/* Ghost phone behind for depth */}
                <div style={{
                  position: 'absolute',
                  top: 20, right: -20,
                  width: 168, height: 336,
                  background: 'linear-gradient(160deg, #0d1b33, #070d1a)',
                  border: `1px solid ${app.color}12`,
                  borderRadius: 34,
                  opacity: 0.4,
                  filter: 'blur(2.5px)',
                  zIndex: 0,
                }} />
                {/* Main screenshot */}
                <img
                  src={appScreenshot}
                  alt="AI Health Tracker App"
                  onMouseEnter={() => setPhoneHovered(true)}
                  onMouseLeave={() => setPhoneHovered(false)}
                  style={{
                    width: 242,
                    position: 'relative',
                    zIndex: 1,
                    display: 'block',
                    cursor: 'pointer',
                    willChange: 'transform, filter',
                    transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), filter 0.45s ease',
                    transform: phoneHovered
                      ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-4px) scale(1.04)'
                      : 'perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(0px) scale(1)',
                    filter: phoneHovered
                      ? `drop-shadow(0 2px 2px rgba(0,0,0,0.4)) drop-shadow(0 12px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 50px ${app.color}40)`
                      : `drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 16px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 28px ${app.color}22)`,
                  }}
                />
              </>
            ) : (
              <img
                src={mockupMap[index as number]}
                alt={app.name}
                style={{
                  maxHeight: 390,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: heroHovered
                    ? `drop-shadow(0 8px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 28px ${app.color}40)`
                    : `drop-shadow(0 8px 28px rgba(0,0,0,0.50)) drop-shadow(0 0 18px ${app.color}22)`,
                  pointerEvents: 'none',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'filter 0.3s ease',
                  display: 'block',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Features — marginTop reduced ~20% (32 → 26) */}
      <div className="container" style={{ marginTop: 26 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{t('apppage_features')}</h2>

        {(() => {
          const featured = app.features.find(f => f.title === 'AI Advisor with Memory')
          const rest = app.features.filter(f => f.title !== 'AI Advisor with Memory')
          return (
            <>
              {/* Featured card — bigger padding, stronger border at rest */}
              {featured && (
                <div
                  onMouseEnter={() => setHoveredFeatured(true)}
                  onMouseLeave={() => setHoveredFeatured(false)}
                  style={{
                    background: CARD_BG(hoveredFeatured),
                    border: CARD_BORDER(hoveredFeatured),
                    boxShadow: CARD_SHADOW(hoveredFeatured),
                    backdropFilter: CARD_BACKDROP,
                    WebkitBackdropFilter: CARD_BACKDROP,
                    borderRadius: 14,
                    padding: '26px 32px',
                    marginBottom: 10,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 20,
                    alignItems: 'center',
                    cursor: 'default',
                    transition: 'transform 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                    transform: hoveredFeatured ? 'scale(1.018)' : 'scale(1)',
                  }}
                >
                  <div style={{
                    width: 54, height: 54, borderRadius: 14,
                    background: app.color + '1c', border: `1px solid ${app.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.55rem', flexShrink: 0,
                  }}>{featured.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{featured.title}</span>
                      <span style={{
                        fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.06em',
                        textTransform: 'uppercase', padding: '2px 8px', borderRadius: 100,
                        background: app.color + '18', color: app.color, border: `1px solid ${app.color}30`,
                      }}>{t('apppage_core')}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, maxWidth: 600 }}>{featured.desc}</div>
                  </div>
                </div>
              )}

              {/* Regular feature cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {rest.map((f, i) => (
                  <div
                    key={f.title}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: CARD_BG(hoveredCard === i),
                      border: CARD_BORDER(hoveredCard === i),
                      boxShadow: CARD_SHADOW(hoveredCard === i),
                      backdropFilter: CARD_BACKDROP,
                      WebkitBackdropFilter: CARD_BACKDROP,
                      borderRadius: 12,
                      padding: '16px 18px',
                      cursor: 'default',
                      transition: 'transform 0.25s ease-in-out, border-color 0.25s ease-in-out, background 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                      transform: hoveredCard === i ? 'scale(1.03)' : 'scale(1)',
                    }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: hoveredCard === i ? app.color + '1e' : app.color + '12',
                      border: `1px solid ${hoveredCard === i ? app.color + '38' : app.color + '1e'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', marginBottom: 10,
                      transition: 'background 0.25s ease-in-out, border-color 0.25s ease-in-out',
                    }}>{f.icon}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )
        })()}
      </div>

    </div>
  )
}
