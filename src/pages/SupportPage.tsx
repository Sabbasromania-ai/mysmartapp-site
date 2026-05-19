import { useEffect, useState, FormEvent } from 'react'
import navLogo from '../navlogo.png'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'

/* ─── Types ────────────────────────────────────────────────── */
type FormState = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'sending' | 'success' | 'error'

/* ─── FAQ data ──────────────────────────────────────────────── */
const FAQ = [
  {
    id: 'account',
    title: 'Account & Subscription',
    desc: 'Questions about your account, subscription, billing, or payments.',
    answer:
      'Manage your subscription through App Store (iOS: Settings → Apple ID → Subscriptions) or Google Play (Profile → Payments & subscriptions). For billing issues, contact us with your purchase receipt and we will resolve it within 24 hours.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'usage',
    title: 'App Usage',
    desc: 'Help with using the app, features, or syncing your data.',
    answer:
      'The app syncs with Apple Health on iOS and Google Health Connect on Android. Go to Settings → Health Sync to enable. For dose logging, tap the Syringe tab → Log Dose. If sync fails, verify permissions in your phone\'s health app settings.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'ai',
    title: 'AI Advisor',
    desc: 'Questions about the AI Advisor, insights, and recommendations.',
    answer:
      'The AI Advisor provides general health information based on your tracked data. It is not a substitute for professional medical advice. Always consult your doctor for medication changes. Premium users get unlimited AI Advisor access; Pro users get a monthly allowance.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    id: 'privacy',
    title: 'Data & Privacy',
    desc: 'Information about your data, privacy, security, and account deletion.',
    answer:
      'All data is stored on secure EU-based Supabase servers. We never sell your data. You can delete your account from Settings → Account → Delete Account — all data is permanently erased within 30 days, in compliance with GDPR and Apple guidelines.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

/* ─── Chevron SVG ───────────────────────────────────────────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* ─── Component ─────────────────────────────────────────────── */
export default function SupportPage() {
  const { lang } = useLang()
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const title = lang === 'el'
      ? 'Υποστήριξη — Βοήθεια για τις Εφαρμογές σας | Mysmartsapp'
      : 'Support — Get Help with Your App | Mysmartsapp'
    const desc = lang === 'el'
      ? 'Βρείτε βοήθεια για τις εφαρμογές Mysmartsapp. Συχνές ερωτήσεις για λογαριασμό, συνδρομή, χρήση εφαρμογής και επικοινωνία υποστήριξης.'
      : 'Get help with Mysmartsapp apps. FAQs about account, subscription, app usage, and direct support contact.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/support')
    window.scrollTo(0, 0)
  }, [lang])

  /* Validation — unchanged */
  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Your name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'A valid email address is required.'
    if (!form.subject.trim()) e.subject = 'Please enter a subject.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* Submit — unchanged: POST to /api/support */
  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  /* Field helper */
  function inputStyle(id: keyof FormState): React.CSSProperties {
    return {
      width: '100%',
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${errors[id] ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
      borderRadius: 8,
      color: '#f0f2f8',
      fontSize: 14,
      outline: 'none',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s',
    }
  }

  function labelStyle(): React.CSSProperties {
    return { display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#8892b0' }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '100px 24px 48px' }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.03em', marginBottom: 10,
        }}>
          {lang === 'el' ? 'Υποστήριξη' : 'Support'}
        </h1>
        <p style={{
          fontSize: 17, fontWeight: 600, color: '#00d4ff',
          letterSpacing: '0.01em', marginBottom: 16,
        }}>
          Mounjaro Tracker : AI Health
        </p>
        <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          Need help with the app, your subscription, or your account?<br />
          Send us a message and we&rsquo;ll respond as soon as possible.
        </p>
        <a
          href="mailto:info@mysmartsapp.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: '#00d4ff', fontSize: 15, textDecoration: 'none', fontWeight: 500,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Email: info@mysmartsapp.com
        </a>
      </section>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Contact form card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 16, padding: '36px 36px 32px',
          marginBottom: 48,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Contact Us
          </h2>
          <p style={{ color: '#5e6888', fontSize: 14, marginBottom: 28 }}>
            We typically reply within 24 hours on business days.
          </p>

          {status === 'success' ? (
            <div style={{
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 12, padding: '28px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
              <h3 style={{ color: '#4ade80', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Message sent!</h3>
              <p style={{ color: '#86efac', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Thanks for reaching out. We&rsquo;ll reply as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  padding: '10px 22px', borderRadius: 8,
                  border: '1px solid rgba(74,222,128,0.3)',
                  background: 'rgba(34,197,94,0.08)', color: '#4ade80',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="name" style={labelStyle()}>Name</label>
                  <input
                    id="name" type="text" placeholder="Your name"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (errors.name) setErrors(er => ({ ...er, name: undefined })) }}
                    style={{ ...inputStyle('name'), padding: '11px 14px', height: 44 }}
                  />
                  {errors.name && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="email" style={labelStyle()}>Email</label>
                  <input
                    id="email" type="email" placeholder="Your email address"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); if (errors.email) setErrors(er => ({ ...er, email: undefined })) }}
                    style={{ ...inputStyle('email'), padding: '11px 14px', height: 44 }}
                  />
                  {errors.email && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="subject" style={labelStyle()}>Subject</label>
                <input
                  id="subject" type="text" placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={e => { setForm(f => ({ ...f, subject: e.target.value })); if (errors.subject) setErrors(er => ({ ...er, subject: undefined })) }}
                  style={{ ...inputStyle('subject'), padding: '11px 14px', height: 44 }}
                />
                {errors.subject && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="message" style={labelStyle()}>Message</label>
                <textarea
                  id="message" rows={5} placeholder="How can we help you?"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); if (errors.message) setErrors(er => ({ ...er, message: undefined })) }}
                  style={{ ...inputStyle('message'), padding: '11px 14px', resize: 'vertical', minHeight: 120 }}
                />
                {errors.message && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.message}</p>}
              </div>

              {/* Server error */}
              {status === 'error' && serverError && (
                <div style={{
                  background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
                  borderRadius: 8, padding: '11px 14px', marginBottom: 20,
                  color: '#fca5a5', fontSize: 14,
                }}>
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%', padding: '13px', borderRadius: 8, border: 'none',
                  background: status === 'sending' ? 'rgba(0,212,255,0.35)' : '#00c8f0',
                  color: '#000', fontWeight: 700, fontSize: 15,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.01em', fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {/* Secure note */}
              <p style={{
                marginTop: 12, textAlign: 'center', fontSize: 13,
                color: '#5e6888', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Your message is sent securely.
              </p>
            </form>
          )}
        </div>

        {/* FAQ */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Frequently Asked Questions
          </h2>

          <div style={{
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {FAQ.map((item, i) => {
              const isOpen = openFaq === item.id
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: i < FAQ.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  {/* Row header */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                      padding: '18px 22px', background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    {/* Icon box */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#00d4ff',
                    }}>
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: '#f0f2f8', marginBottom: 2 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#5e6888', lineHeight: 1.5 }}>
                        {item.desc}
                      </div>
                    </div>

                    {/* Chevron */}
                    <div style={{ color: '#5e6888' }}>
                      <Chevron open={isOpen} />
                    </div>
                  </button>

                  {/* Answer (expanded) */}
                  {isOpen && (
                    <div style={{
                      padding: '0 22px 20px 78px',
                      fontSize: 14, color: '#8892b0', lineHeight: 1.75,
                    }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '18px 20px',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#8892b0',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p style={{ fontSize: 13.5, color: '#5e6888', margin: 0, lineHeight: 1.7 }}>
            This app is for informational tracking only and does not provide medical advice, diagnosis, or treatment.
            Always consult a qualified healthcare professional for medical decisions.
          </p>
        </div>

      </div>

      {/* ── Footer ── */}
      {/* Using div instead of footer element to avoid global CSS footer{display:flex} override */}
      <div role="contentinfo" style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px 32px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px 48px',
            marginBottom: 40,
          }}>
            {/* Brand — flex: 2 so it takes double width vs other cols */}
            <div style={{ flex: '2 1 240px', minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <img src={navLogo} alt="mysmartsapp" style={{ height: 28, width: 'auto' }} />
              </div>
              <p style={{ fontSize: 13, color: '#5e6888', lineHeight: 1.7, maxWidth: 220 }}>
                AI-powered apps and tools for health, productivity, and real-life use. Built by independent developers.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{ flex: '1 1 140px', minWidth: 130 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f0f2f8', marginBottom: 14, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Quick Links
              </h3>
              {[
                { label: 'Home', href: '/' },
                { label: 'Support', href: '/support' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Contact', href: 'mailto:info@mysmartsapp.com' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ display: 'block', fontSize: 14, color: '#5e6888', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00d4ff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#5e6888' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ flex: '1 1 160px', minWidth: 150 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f0f2f8', marginBottom: 14, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Contact
              </h3>
              <a
                href="mailto:info@mysmartsapp.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: '#5e6888', textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00d4ff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#5e6888' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@mysmartsapp.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#5e6888' }}>
              &copy; {new Date().getFullYear()} mysmartsapp.com &mdash; All rights reserved.
            </p>
          </div>
        </div>
      </div>{/* end footer div */}

    </div>
  )
}
