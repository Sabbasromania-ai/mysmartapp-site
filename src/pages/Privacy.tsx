import { useEffect } from 'react'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'
import { pv } from '../privacyTranslations'

const accent = '#00d4ff'
const accentDim = 'rgba(0,212,255,0.15)'
const accentBorder = 'rgba(0,212,255,0.25)'

type Bullet = string | readonly [string, string]

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 16,
      padding: '28px 32px',
      marginBottom: 20,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 20, fontWeight: 700, color: accent, marginBottom: 16, marginTop: 0, letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 15, fontWeight: 600, color: accent, marginBottom: 10, marginTop: 20, opacity: 0.85 }}>
      {children}
    </h3>
  )
}

const liSt: React.CSSProperties = { marginBottom: 6, lineHeight: 1.7, color: '#c4c9d8' }
const ulSt: React.CSSProperties = { paddingLeft: 20, margin: '8px 0 0' }

function BulletList({ bullets }: { bullets: Bullet[] }) {
  return (
    <ul style={ulSt}>
      {bullets.map((b, i) =>
        typeof b === 'string'
          ? <li key={i} style={liSt}>{b}</li>
          : <li key={i} style={liSt}><strong style={{ color: '#fff' }}>{b[0]}</strong> {b[1]}</li>
      )}
    </ul>
  )
}

export default function Privacy() {
  const { lang } = useLang()
  const p = pv[lang]

  useEffect(() => {
    const title = lang === 'el' ? 'Πολιτική Απορρήτου | Mysmartsapp' : 'Privacy Policy | Mysmartsapp'
    const desc = lang === 'el'
      ? 'Διαβάστε την Πολιτική Απορρήτου της Mysmartsapp — πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα δεδομένα σας.'
      : 'Read the Mysmartsapp Privacy Policy — how we collect, use, and protect your data across our apps and services.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/privacy')
    window.scrollTo(0, 0)
  }, [lang])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px 100px', color: '#e4e4e7' }}>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', marginBottom: 32,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, color: '#e4e4e7', fontSize: 14, textDecoration: 'none',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>&larr;</span>
          <span>{p.back}</span>
        </a>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(32px,6vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.03em' }}>
          {p.title}
        </h1>
        <div style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>
          <span><strong style={{ color: '#a0aec0' }}>{p.meta.appLabel}</strong> {p.meta.appVal}</span><br />
          <span><strong style={{ color: '#a0aec0' }}>{p.meta.updatedLabel}</strong> {p.meta.updatedVal}</span><br />
          <span><strong style={{ color: '#a0aec0' }}>{p.meta.effectiveLabel}</strong> {p.meta.effectiveVal}</span>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.09)', marginBottom: 32 }} />

        {/* 1. Who We Are */}
        <Card>
          <SectionTitle>{p.s1.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>{p.s1.p1}</p>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>{p.s1.box.controllerLabel}</strong> {p.s1.box.controllerVal}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>{p.s1.box.emailLabel}</strong>{' '}
                <a href="mailto:info@mysmartsapp.com" style={{ color: accent, textDecoration: 'none' }}>info@mysmartsapp.com</a>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>{p.s1.box.jurisdictionLabel}</strong> {p.s1.box.jurisdictionVal}
              </span>
            </div>
          </div>

          <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
            {p.s1.p2}<a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>.
          </p>
          <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>{p.s1.p3}</p>
        </Card>

        {/* 2. What Data We Collect */}
        <Card>
          <SectionTitle>{p.s2.title}</SectionTitle>
          <SubTitle>{p.s2.sub1.title}</SubTitle>
          <BulletList bullets={p.s2.sub1.bullets} />

          <SubTitle>
            {p.s2.sub2.title}{' '}
            <span style={{ fontSize: 13, fontWeight: 400, color: '#f87171' }}>{p.s2.sub2.sensitiveLabel}</span>
          </SubTitle>
          <BulletList bullets={p.s2.sub2.bullets} />

          <SubTitle>{p.s2.sub3.title}</SubTitle>
          <BulletList bullets={p.s2.sub3.bullets} />

          <SubTitle>{p.s2.sub4.title}</SubTitle>
          <BulletList bullets={p.s2.sub4.bullets} />

          <SubTitle>{p.s2.sub5.title}</SubTitle>
          <BulletList bullets={p.s2.sub5.bullets} />

          <SubTitle>{p.s2.sub6.title}</SubTitle>
          <BulletList bullets={p.s2.sub6.bullets} />
        </Card>

        {/* 3. How We Use Your Data */}
        <Card>
          <SectionTitle>{p.s3.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>{p.s3.p1}</p>
          <BulletList bullets={p.s3.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>{p.s3.p2}</p>
        </Card>

        {/* 4. Legal Basis */}
        <Card>
          <SectionTitle>{p.s4.title}</SectionTitle>
          <BulletList bullets={p.s4.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>{p.s4.p2}</p>
        </Card>

        {/* 5. Third-Party Processors */}
        <Card>
          <SectionTitle>{p.s5.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 16, fontSize: 15 }}>{p.s5.p1}</p>
          <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {p.s5.tableHeaders.map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '10px 14px', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: i === 3 ? 'nowrap' : undefined }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.s5.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < p.s5.rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <td style={{ padding: '10px 14px', color: '#e4e4e7', fontWeight: 500, whiteSpace: 'nowrap' }}>{row[0]}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8' }}>{row[1]}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8' }}>{row[2]}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8', whiteSpace: 'nowrap' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#8892b0', fontSize: 13, marginTop: 14, marginBottom: 0 }}>{p.s5.p2}</p>
        </Card>

        {/* 6. Data Retention */}
        <Card>
          <SectionTitle>{p.s6.title}</SectionTitle>
          <BulletList bullets={p.s6.bullets} />
        </Card>

        {/* 7. Your Rights */}
        <Card>
          <SectionTitle>{p.s7.title}</SectionTitle>
          <BulletList bullets={p.s7.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            {p.s7.p2}<a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>.{' '}
            {lang === 'el' ? 'Απαντούμε εντός 30 ημερών (Άρθρο 12(3)).' : 'We respond within 30 days (Art. 12(3)).'}
          </p>
        </Card>

        {/* 8. Account and Data Deletion */}
        <Card>
          <SectionTitle>{p.s8.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>{p.s8.p1}</p>
          <ol style={{ paddingLeft: 22, margin: '8px 0 16px' }}>
            {p.s8.steps.map((step, i) => <li key={i} style={liSt}>{step}</li>)}
          </ol>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 10, fontSize: 15 }}>{p.s8.p2}</p>
          <BulletList bullets={p.s8.bullets} />
          <div style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
            <p style={{ color: '#fde68a', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.s8.warning}</p>
          </div>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            {p.s8.p3}<a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>.
          </p>
        </Card>

        {/* 9. Health Data */}
        <Card>
          <SectionTitle>{p.s9.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>{p.s9.p1}</p>
          <BulletList bullets={p.s9.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 8 }}>{p.s9.p2}</p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>{p.s9.p3}</p>
        </Card>

        {/* 10. AI Features */}
        <Card>
          <SectionTitle>{p.s10.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>{p.s10.p1}</p>
          <BulletList bullets={p.s10.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 8 }}>{p.s10.p2}</p>
          <p style={{ color: '#8892b0', fontSize: 13, marginBottom: 0 }}>{p.s10.p3}</p>
        </Card>

        {/* 11. Subscriptions */}
        <Card>
          <SectionTitle>{p.s11.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>{p.s11.p1}</p>
          <BulletList bullets={p.s11.bullets} />
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>{p.s11.p2}</p>
        </Card>

        {/* 12. Medical Disclaimer */}
        <Card style={{ border: '1px solid rgba(248,113,113,0.25)', background: 'rgba(239,68,68,0.06)' }}>
          <SectionTitle><span style={{ color: '#f87171' }}>{p.s12.title}</span></SectionTitle>
          <p style={{ color: '#fca5a5', fontSize: 15, lineHeight: 1.7, marginBottom: 12, fontWeight: 600 }}>{p.s12.p1}</p>
          <ul style={ulSt}>
            {p.s12.bullets.map((b, i) => (
              <li key={i} style={{ ...liSt, color: '#fca5a5' }}>{b as string}</li>
            ))}
          </ul>
          <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 14, marginBottom: 0 }}>{p.s12.p2}</p>
        </Card>

        {/* 13. Age Restriction */}
        <Card>
          <SectionTitle>{p.s13.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
            {p.s13.p1}<a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>
            {lang === 'el' ? ' και θα το διαγράψουμε άμεσα.' : ' and we will promptly delete it.'}
          </p>
        </Card>

        {/* 14. Security */}
        <Card>
          <SectionTitle>{p.s14.title}</SectionTitle>
          <BulletList bullets={p.s14.bullets} />
          <p style={{ color: '#8892b0', fontSize: 13, marginTop: 14, marginBottom: 0 }}>{p.s14.p2}</p>
        </Card>

        {/* 15. Cookies */}
        <Card>
          <SectionTitle>{p.s15.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>{p.s15.p1}</p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>{p.s15.p2}</p>
        </Card>

        {/* TikTok / Third-Party Attribution */}
        <Card>
          <SectionTitle>{p.sTikTok.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>{p.sTikTok.p1}</p>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>{p.sTikTok.p2}</p>
          <div style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
            <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.sTikTok.p3}</p>
          </div>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>{p.sTikTok.p4}</p>
        </Card>

        {/* 16. Changes */}
        <Card>
          <SectionTitle>{p.s16.title}</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>{p.s16.p1}</p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>{p.s16.p2}</p>
        </Card>

        {/* 17. Contact */}
        <Card>
          <SectionTitle>{p.s17.title}</SectionTitle>
          <ul style={ulSt}>
            {p.s17.bullets.map((b, i) => {
              const tuple = b as readonly [string, string]
              const isEmail = tuple[1] === 'info@mysmartsapp.com'
              const isUrl = typeof tuple[1] === 'string' && tuple[1].includes('www.')
              return (
                <li key={i} style={liSt}>
                  <strong style={{ color: '#fff' }}>{tuple[0]}</strong>{' '}
                  {isEmail
                    ? <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>{tuple[1]}</a>
                    : isUrl
                    ? <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>{tuple[1]}</a>
                    : tuple[1]}
                </li>
              )
            })}
          </ul>
        </Card>

        <hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '32px 0' }} />
        <p style={{ color: '#5e6888', fontSize: 13, fontStyle: 'italic', textAlign: 'center' }}>{p.bottomNote}</p>

        {/* Contact card footer */}
        <div style={{ marginTop: 48, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accentBorder}`, borderRadius: 16, padding: '32px 32px 28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: accentDim, borderRadius: 20, padding: '4px 12px', marginBottom: 14 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: accent, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.footer.label}</span>
          </div>
          <p style={{ color: '#8892b0', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{p.footer.p}</p>
          <a href="mailto:info@mysmartsapp.com" style={{ display: 'flex', alignItems: 'center', gap: 8, color: accent, fontSize: 15, textDecoration: 'none', marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@mysmartsapp.com
          </a>
          <a href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 8, background: accent, color: '#000', fontWeight: 700, fontSize: 14, textDecoration: 'none', letterSpacing: '0.01em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {p.footer.button}
          </a>
        </div>

      </div>
    </div>
  )
}
