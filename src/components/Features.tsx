import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appLogo from '../applogo.png'
import iReceptionLogo from '../ireception-logo.png'
import iCalorieLogo from '../icalorie-logo.png'
import iHealthMockup from '../iHealth_mockup.png'
import iReceptionMockup from '../iReception_mockup.png'
import iCalorieMockup from '../iCalorie_mockup.png'
import { useLang } from '../LangContext'
import { TKey } from '../translations'

// Same color system for ALL cards
const CYAN = '#00d4ff'
const GRADIENT = 'linear-gradient(135deg, #0a1628 0%, #0c2040 50%, #0e2d52 100%)'
const GLOW = 'rgba(0,212,255,0.15)'

export const apps = [
  {
    logo: appLogo,
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'Mounjaro Tracker : AI Health',
    tag: 'Live',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.12)',
    short: 'GLP-1 dose tracking with real injection logging, an AI Advisor that remembers your data, blood test analysis, and progress charts — built for Mounjaro and Ozempic users.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '💉', title: 'Injection Tracking', desc: 'Log every dose with date, time, body site, and history. Track Mounjaro, Ozempic, and Wegovy with drug level curves.' },
      { icon: '🤖', title: 'AI Advisor with Memory', desc: 'AI Advisor powered by Claude that remembers your full health history and adapts recommendations based on real data — not generic advice.' },
      { icon: '📈', title: 'Weight & Progress Charts', desc: 'Visualize weight loss, BMI, glucose trends, and dose effectiveness over time. See real progress, not just numbers.' },
      { icon: '📸', title: 'Photo Meal Logging', desc: 'Photograph any meal and get an instant AI breakdown of ingredients, calories, and macros — no manual input needed.' },
      { icon: '🩸', title: 'Blood Test Tracking', desc: 'Upload lab results and track key health markers over time. Get AI interpretation tailored to your medication and history.' },
      { icon: '🔔', title: 'Smart Reminders', desc: 'Timely notifications for injections, weight check-ins, and hydration — based on your schedule and real usage patterns.' },
    ],
    pmFooter: 'AI Advisor Active ✦',
    phone: [
      { dot: CYAN, label: 'Weight', value: '94.1 kg' },
      { dot: '#6366f1', label: 'Mounjaro 5mg', value: 'Injected ✓' },
      { dot: '#10b981', label: 'Calories', value: '1,280 kcal' },
      { dot: '#f59e0b', label: 'Steps', value: '8,432' },
      { dot: CYAN, label: 'AI Advisor', value: 'Active 🟢' },
    ],
  },
  {
    logo: iReceptionLogo,
    emoji: null,
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'iReception',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.12)',
    short: 'AI receptionist, booking, and customer communication system for businesses.',
    platforms: ['iOS', 'Android', 'Web'],
    features: [
      { icon: '📞', title: 'AI Receptionist', desc: 'Handles customer messages, questions, and booking requests automatically.' },
      { icon: '📅', title: 'Booking Management', desc: 'Organizes appointments, availability, and customer scheduling.' },
      { icon: '💬', title: 'Customer Communication', desc: 'Supports automated replies, reminders, and follow-up messages.' },
      { icon: '⚙️', title: 'Business Automation', desc: 'Reduces repetitive admin work for service-based businesses.' },
    ],
    pmFooter: 'AI receptionist active ✦',
    phone: [
      { dot: CYAN, label: "Today's bookings", value: '5' },
      { dot: '#6366f1', label: 'New calls', value: '3' },
      { dot: '#10b981', label: 'Pending messages', value: '2' },
      { dot: CYAN, label: 'AI receptionist', value: 'Active 🟢' },
    ],
  },
  {
    logo: iCalorieLogo,
    emoji: null,
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'iCalorie',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.12)',
    short: 'AI nutrition and calorie tracking app for meal scanning, macros, and personalized nutrition insights.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '📷', title: 'Meal Scan', desc: 'Scan meals and estimate calories and nutrients.' },
      { icon: '📊', title: 'Macro Tracking', desc: 'Track protein, carbs, fats, and daily nutrition goals.' },
      { icon: '📋', title: 'Food Log', desc: 'Save meals and monitor eating habits over time.' },
      { icon: '🧠', title: 'AI Nutrition Insights', desc: 'Get personalized suggestions based on logged meals and goals.' },
    ],
    pmFooter: 'AI Nutrition Insights active ✦',
    phone: [
      { dot: CYAN, label: 'Protein', value: '142g' },
      { dot: CYAN, label: 'Calories', value: '1,820 kcal' },
      { dot: '#10b981', label: 'Meal logged', value: '✓' },
      { dot: CYAN, label: 'AI Insights', value: 'View →' },
    ],
  },
]

function AppIcon({ app, size = 40 }: { app: typeof apps[0], size?: number }) {
  if (app.logo) {
    return <img src={app.logo} alt={app.name} style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover' }} />
  }
  return <span style={{ fontSize: size * 0.6 }}>{(app as any).emoji}</span>
}

export function PhoneMockup({ app }: { app: typeof apps[0] }) {
  return (
    <div className="phone-mockup-wrap">
      <div className="phone-glow" style={{ background: `radial-gradient(ellipse at center, ${app.color}30 0%, transparent 70%)` }} />
      <div className="phone-mockup">
        <div className="pm-notch" />
        <div className="pm-screen">
          <div className="pm-header">
            <span className="pm-title">
              {app.logo
                ? <img src={app.logo} alt="" style={{ width: 12, height: 12, borderRadius: 3, verticalAlign: 'middle', marginRight: 3 }} />
                : (app as any).emoji + ' '}
              {app.name.split(' ').slice(1).join(' ')}
            </span>
            <span className="pm-time">9:41</span>
          </div>
          <div className="pm-card" style={{ borderColor: app.color + '30' }}>
            <div style={{ fontSize: '0.55rem', color: app.color, fontWeight: 700, marginBottom: 4 }}>TODAY</div>
            {app.phone.map(r => (
              <div key={r.label} className="pm-row">
                <div className="pm-dot" style={{ background: r.dot }} />
                <span className="pm-label">{r.label}</span>
                <span className="pm-val" style={{ color: r.dot }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="pm-chart">
            {[45, 70, 50, 85, 65, 90, 60].map((h, i) => (
              <div key={i} className="pm-bar" style={{
                height: `${h}%`,
                background: `linear-gradient(to top, ${app.color}60, ${app.color})`,
                opacity: i === 5 ? 1 : 0.5,
              }} />
            ))}
          </div>
          <div className="pm-footer" style={{ color: app.color }}>{(app as any).pmFooter ?? 'AI Advisor Active ✦'}</div>
        </div>
      </div>
    </div>
  )
}

// ── Portfolio card data ─────────────────────────────────────────
const PORTFOLIO_CARDS = [
  {
    logo: appLogo,
    name: 'Mounjaro Tracker: AI Health',
    statusLabel: 'LIVE',
    statusColor: '#10b981',
    statusBg: 'rgba(16,185,129,0.13)',
    platforms: ['iOS', 'Android'],
    desc: 'GLP-1 tracking, AI health coach, blood tests & real-time insights.',
    slug: 'mounjaro-tracker-ai-health',
    appIndex: 0,
    mockupSrc: iHealthMockup,
  },
  {
    logo: iReceptionLogo,
    name: 'iReception',
    statusLabel: 'COMING SOON',
    statusColor: '#f59e0b',
    statusBg: 'rgba(245,158,11,0.13)',
    platforms: ['iOS', 'Android', 'Web'],
    desc: 'AI receptionist, booking, and customer communication system for businesses.',
    slug: 'ireception',
    appIndex: 1,
    mockupSrc: iReceptionMockup,
  },
  {
    logo: iCalorieLogo,
    name: 'iCalorie',
    statusLabel: 'COMING SOON',
    statusColor: '#f59e0b',
    statusBg: 'rgba(245,158,11,0.13)',
    platforms: ['iOS', 'Android'],
    desc: 'AI nutrition and calorie tracking app for meal scanning, macros, and personalized insights.',
    slug: 'icalorie',
    appIndex: 2,
    mockupSrc: iCalorieMockup,
  },
]

// ── Inline mini-phone (sized to fit inside card) ─────────────────
function MiniPhone({ app }: { app: typeof apps[0] }) {
  return (
    <div style={{
      width: 105,
      minWidth: 105,
      background: 'linear-gradient(180deg,#0a1628 0%,#0d2244 100%)',
      borderRadius: 20,
      border: `1px solid ${app.color}35`,
      padding: '10px 8px 8px',
      boxShadow: `0 0 18px ${app.color}18`,
    }}>
      {/* notch */}
      <div style={{ width: 28, height: 5, background: '#1a2840', borderRadius: 3, margin: '0 auto 8px' }} />
      {/* data card */}
      <div style={{
        background: 'rgba(0,212,255,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(0,212,255,0.14)',
        padding: '5px',
        marginBottom: 5,
      }}>
        <div style={{ fontSize: '0.42rem', color: app.color, fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>TODAY</div>
        {app.phone.map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: r.dot, flexShrink: 0 }} />
            <span style={{ fontSize: '0.38rem', color: 'rgba(255,255,255,0.52)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
            <span style={{ fontSize: '0.38rem', color: r.dot, fontWeight: 700 }}>{r.value}</span>
          </div>
        ))}
      </div>
      {/* mini chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 26 }}>
        {[45, 70, 50, 85, 65, 90, 60].map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h}%`,
            background: `linear-gradient(to top,${app.color}50,${app.color})`,
            borderRadius: 2,
            opacity: i === 5 ? 1 : 0.5,
          }} />
        ))}
      </div>
      <div style={{ fontSize: '0.36rem', color: app.color, marginTop: 5, textAlign: 'center', fontWeight: 600 }}>
        {(app as any).pmFooter ?? 'AI Active ✦'}
      </div>
    </div>
  )
}

// ── Portfolio section (default export) ──────────────────────────
export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()

  const cardBg = (i: number) => hovered === i
    ? 'linear-gradient(160deg,rgba(0,210,255,0.12) 0%,rgba(8,18,38,0.58) 100%)'
    : 'linear-gradient(160deg,rgba(0,210,255,0.07) 0%,rgba(8,18,38,0.42) 100%)'

  const cardBorder = (i: number) => hovered === i
    ? '1px solid rgba(0,220,255,0.52)'
    : '1px solid rgba(0,220,255,0.26)'

  const cardShadow = (i: number) => hovered === i
    ? '0 0 28px rgba(0,220,255,0.16),inset 0 0 20px rgba(0,220,255,0.04)'
    : '0 0 12px rgba(0,212,255,0.06)'

  return (
    <section style={{ padding: '1.5rem 0 3rem' }} id="portfolio">
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem,2.2vw,2rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.55rem',
            letterSpacing: '-0.02em',
          }}>
            Portfolio / Case Studies
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            Real products we built to prove what we can deliver.
          </p>
        </div>

        {/* 3-column card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}>
          {PORTFOLIO_CARDS.map((card, i) => (
            <div
              key={card.slug}
              onClick={() => navigate(`/apps/${card.slug}`)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: cardBg(i),
                border: cardBorder(i),
                boxShadow: cardShadow(i),
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '1.5rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transform: hovered === i ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
                minHeight: '260px',
              }}
            >
              {/* Top: logo + name + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.97rem', color: '#fff', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                    {card.name}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.67rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    color: card.statusColor,
                    background: card.statusBg,
                    border: `1px solid ${card.statusColor}48`,
                    borderRadius: '6px',
                    padding: '2px 9px',
                  }}>
                    {card.statusLabel}
                  </span>
                </div>
              </div>

              {/* Middle: text left, phone absolute right */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '58%' }}>
                {/* platform chips */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {card.platforms.map(p => (
                    <span key={p} style={{
                      fontSize: '0.7rem',
                      color: 'rgba(0,212,255,0.88)',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.22)',
                      borderRadius: '6px',
                      padding: '2px 9px',
                    }}>
                      · {p}
                    </span>
                  ))}
                </div>
                {/* description */}
                <p style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>

              {/* Phone mockup — absolute, large, visually dominant */}
              <img
                src={card.mockupSrc}
                alt={card.name + ' mockup'}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '0',
                  width: 'clamp(120px, 40%, 185px)',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center bottom',
                  filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.55))',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/apps')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,220,255,0.38)',
              color: 'rgba(0,220,255,0.9)',
              borderRadius: '12px',
              padding: '0.75rem 2.25rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'border-color 0.25s,box-shadow 0.25s',
            }}
          >
            View All Projects →
          </button>
        </div>

      </div>
    </section>
  )
}
