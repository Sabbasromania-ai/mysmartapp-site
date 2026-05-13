import { useEffect, useState, FormEvent } from 'react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const FAQ_ITEMS = [
  {
    category: 'Account & Subscription',
    icon: '👤',
    questions: [
      {
        q: 'How do I manage or cancel my subscription?',
        a: 'On iOS, go to Settings → Apple ID → Subscriptions → AIHealth Trackerapp. On Android, open Play Store → Profile → Payments & subscriptions → Subscriptions.',
      },
      {
        q: 'I was charged but the app still shows no subscription.',
        a: 'This usually resolves within a few minutes. Force-close and reopen the app. If it persists after 10 minutes, contact us with your purchase receipt so we can investigate.',
      },
      {
        q: 'Can I use my subscription on multiple devices?',
        a: 'Yes. Sign in with the same Google or Apple account on any device and your subscription will be restored automatically.',
      },
    ],
  },
  {
    category: 'App Usage',
    icon: '📱',
    questions: [
      {
        q: 'How do I log a dose?',
        a: 'Tap the Syringe tab → tap "Log Dose" → select your medication, date, and dose amount. Your dose history is stored securely and syncs across your devices.',
      },
      {
        q: 'The app is not syncing with Apple Health / Google Health Connect.',
        a: 'Go to Settings inside the app and check that Health Sync is enabled. On iOS, verify permissions under Settings → Privacy → Health → AIHealth Trackerapp. On Android, open Health Connect and confirm the app has read/write access.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to Settings → Account → Delete Account. All your data is permanently erased from our servers within 30 days, as required by Apple and GDPR.',
      },
    ],
  },
  {
    category: 'AI Coach',
    icon: '✨',
    questions: [
      {
        q: 'What can the AI Coach help me with?',
        a: 'The AI Coach can answer general questions about GLP-1 medications, help you understand your progress data, suggest lifestyle habits, and interpret blood test results. It is an informational tool and does not replace your doctor.',
      },
      {
        q: 'Is the AI Coach advice medically accurate?',
        a: 'The AI Coach provides general health information only. It is not a medical professional and its responses should never replace a consultation with your doctor or pharmacist.',
      },
    ],
  },
  {
    category: 'Data & Privacy',
    icon: '🔒',
    questions: [
      {
        q: 'Where is my health data stored?',
        a: 'All data is stored on secure Supabase servers in the EU. We never sell your data to third parties. Full details are in our Privacy Policy.',
      },
      {
        q: 'Is my data shared with drug manufacturers or advertisers?',
        a: 'No. We do not share your personal or health data with pharmaceutical companies, advertisers, or any third parties beyond what is required for app functionality (see Privacy Policy).',
      },
    ],
  },
]

export default function SupportPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    document.title = 'Support — mysmartsapp'
    window.scrollTo(0, 0)
  }, [])

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

  function field(
    id: keyof FormState,
    label: string,
    type: 'text' | 'email' | 'textarea' = 'text',
    placeholder = '',
  ) {
    const hasError = !!errors[id]
    const base: React.CSSProperties = {
      width: '100%',
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${hasError ? '#f87171' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 10,
      color: '#f0f2f8',
      fontSize: 15,
      outline: 'none',
      transition: 'border-color 0.2s',
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <label htmlFor={id} style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#c4c9d9', letterSpacing: '0.02em' }}>
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            id={id}
            rows={5}
            placeholder={placeholder}
            value={form[id]}
            onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); if (errors[id]) setErrors(er => ({ ...er, [id]: undefined })) }}
            style={{ ...base, padding: '12px 14px', resize: 'vertical', minHeight: 120 }}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={form[id]}
            onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); if (errors[id]) setErrors(er => ({ ...er, [id]: undefined })) }}
            style={{ ...base, padding: '12px 14px', height: 46 }}
          />
        )}
        {hasError && <p style={{ marginTop: 5, fontSize: 13, color: '#f87171' }}>{errors[id]}</p>}
      </div>
    )
  }

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 120px' }}>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', marginBottom: 40,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, color: '#e4e4e7', fontSize: 14, textDecoration: 'none',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>&larr;</span>
          <span>Back to home</span>
        </a>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 60, height: 60, borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(99,102,241,0.15))',
            border: '1px solid rgba(0,212,255,0.2)', marginBottom: 20,
          }}>
            <span style={{ fontSize: 28 }}>🛟</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Mounjaro Tracker: AI Health
          </h1>
          <p style={{ color: '#8892b0', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            We're here to help. Browse the FAQ below or send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Pharmaceutical disclaimer */}
        <div style={{
          background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
          borderRadius: 12, padding: '14px 18px', marginBottom: 48,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚕️</span>
          <p style={{ fontSize: 13, color: '#fbbf24', margin: 0, lineHeight: 1.6 }}>
            <strong>Medical disclaimer:</strong> This app is an informational tracking tool only. It does not provide medical advice, diagnosis, or treatment. Always consult your doctor or pharmacist before changing your medication regimen.
          </p>
        </div>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 28, letterSpacing: '-0.01em' }}>
            Frequently Asked Questions
          </h2>

          {FAQ_ITEMS.map(section => (
            <div key={section.category} style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#00d4ff', letterSpacing: '0.02em', textTransform: 'uppercase', margin: 0 }}>
                  {section.category}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {section.questions.map(item => (
                  <details
                    key={item.q}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, overflow: 'hidden',
                    }}
                  >
                    <summary style={{
                      padding: '14px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14.5,
                      color: '#f0f2f8', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      userSelect: 'none',
                    }}>
                      <span>{item.q}</span>
                      <span style={{ color: '#5e6888', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                    </summary>
                    <div style={{ padding: '0 18px 16px', color: '#8892b0', fontSize: 14, lineHeight: 1.7 }}>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact form */}
        <section>
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20, padding: '36px 36px 40px',
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>
              Contact Us
            </h2>
            <p style={{ color: '#5e6888', fontSize: 14, marginBottom: 30 }}>
              Can't find what you need? We typically reply within 24 hours on business days.
            </p>

            {status === 'success' ? (
              <div style={{
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 12, padding: '24px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: '#4ade80', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message sent!</h3>
                <p style={{ color: '#86efac', fontSize: 14, lineHeight: 1.6 }}>
                  Thanks for reaching out. We'll reply to <strong>{form.email || 'your email'}</strong> as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: 20, padding: '10px 22px', borderRadius: 10, border: '1px solid rgba(74,222,128,0.3)',
                    background: 'rgba(34,197,94,0.1)', color: '#4ade80', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div>{field('name', 'Your Name', 'text', 'Jane Smith')}</div>
                  <div>{field('email', 'Email Address', 'email', 'jane@example.com')}</div>
                </div>
                {field('subject', 'Subject', 'text', 'e.g. Subscription not showing after purchase')}
                {field('message', 'Message', 'textarea', 'Describe your issue in as much detail as possible...')}

                {status === 'error' && serverError && (
                  <div style={{
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)',
                    borderRadius: 10, padding: '12px 16px', marginBottom: 20,
                    color: '#fca5a5', fontSize: 14,
                  }}>
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                    background: status === 'sending'
                      ? 'rgba(0,212,255,0.4)'
                      : 'linear-gradient(135deg, #00d4ff, #6366f1)',
                    color: '#fff', fontWeight: 700, fontSize: 15, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s', letterSpacing: '0.01em',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                <p style={{ marginTop: 14, textAlign: 'center', fontSize: 12, color: '#5e6888' }}>
                  By submitting this form you agree to our{' '}
                  <a href="/privacy" style={{ color: '#00d4ff', textDecoration: 'none' }}>Privacy Policy</a>.
                  Your email is used only to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Footer links */}
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Home', href: '/' },
              { label: 'Contact', href: 'mailto:info@mysmartsapp.com' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ color: '#5e6888', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#00d4ff' }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = '#5e6888' }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p style={{ color: '#5e6888', fontSize: 12 }}>
            &copy; {new Date().getFullYear()} mysmartsapp.com &mdash; Savvas Alexiou. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  )
}
