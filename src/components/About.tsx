import { useState } from 'react'
import { useLang } from '../LangContext'
import { TKey } from '../translations'

const SVC_ICONS = [
  // Mobile Apps — blue phone
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4FC3F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
  </svg>,
  // Websites — teal globe
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4DB6AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  // E-shops — gold cart
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>,
  // AI Tools — purple brain
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CE93D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/>
  </svg>,
  // Booking Systems — blue calendar
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#90CAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>,
  // Business Automation — orange bolt
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB74D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
]

const SVC_KEYS: [TKey, TKey][] = [
  ['svc_0_title', 'svc_0_desc'],
  ['svc_1_title', 'svc_1_desc'],
  ['svc_2_title', 'svc_2_desc'],
  ['svc_3_title', 'svc_3_desc'],
  ['svc_4_title', 'svc_4_desc'],
  ['svc_5_title', 'svc_5_desc'],
]

export default function About() {
  const { t } = useLang()
  const [hovered, setHovered] = useState<number | null>(null)

  const cardStyle = (i: number): React.CSSProperties => ({
    background: hovered === i
      ? 'linear-gradient(180deg, rgba(0, 210, 255, 0.13) 0%, rgba(8, 18, 38, 0.48) 100%)'
      : 'linear-gradient(180deg, rgba(0, 210, 255, 0.08) 0%, rgba(8, 18, 38, 0.36) 100%)',
    border: hovered === i
      ? '1px solid rgba(0, 220, 255, 0.48)'
      : '1px solid rgba(0, 220, 255, 0.32)',
    boxShadow: hovered === i
      ? '0 0 24px rgba(0, 220, 255, 0.18), inset 0 0 18px rgba(0, 220, 255, 0.05)'
      : '0 0 12px rgba(0, 212, 255, 0.05), inset 0 0 0 1px rgba(0, 212, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.5rem',
    transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
    cursor: 'default',
  })

  const iconStyle = (i: number): React.CSSProperties => ({
    filter: hovered === i
      ? 'drop-shadow(0 0 10px rgba(0, 220, 255, 0.65))'
      : 'none',
    transition: 'filter 0.25s ease',
  })

  return (
    <section
      className="services-section"
      id="services"
      style={{ paddingTop: '1rem', paddingBottom: '2rem' }}
    >
      <div className="container">

        {/* Title — no 'reveal' class so it is always visible */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.55rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            {t('svc_title1')}
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#00dcff',
            margin: 0,
          }}>
            {t('svc_subtitle')}
          </p>
        </div>

        {/* 6-column grid on desktop, responsive via CSS */}
        <div
          className="services-grid"
          style={{
            gap: '0.85rem',
            alignItems: 'stretch',
          }}
        >
          {SVC_KEYS.map(([titleKey, descKey], i) => (
            <div
              key={i}
              className="svc-card"
              style={cardStyle(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="svc-icon" style={iconStyle(i)}>{SVC_ICONS[i]}</div>
              <div className="svc-title">{t(titleKey)}</div>
              <p className="svc-desc" style={{ margin: 0 }}>{t(descKey)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
