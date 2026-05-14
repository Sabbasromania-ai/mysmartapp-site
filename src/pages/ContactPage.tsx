import { useEffect, useState, FormEvent } from 'react'
import { useLang } from '../LangContext'

type FormState = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const { t } = useLang()
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    document.title = 'Contact — mysmartsapp'
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

  function inputStyle(hasError: boolean): React.CSSProperties {
    return {
      width: '100%',
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${hasError ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
      borderRadius: 8,
      color: '#f0f2f8',
      fontSize: 14,
      outline: 'none',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s',
      padding: '11px 14px',
    }
  }

  const labelSt: React.CSSProperties = {
    display: 'block', marginBottom: 6,
    fontSize: 13, fontWeight: 600, color: '#8892b0',
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 24px 48px' }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.03em', marginBottom: 10,
        }}>
          {t('contact_title')}
        </h1>
        <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          {t('contact_desc')}
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
          info@mysmartsapp.com
        </a>
      </section>

      {/* Form card */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 16, padding: '36px 36px 32px',
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            {t('contact_title')}
          </h2>
          <p style={{ color: '#5e6888', fontSize: 14, marginBottom: 28 }}>
            {t('contact_desc')}
          </p>

          {status === 'success' ? (
            <div style={{
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 12, padding: '28px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
              <h3 style={{ color: '#4ade80', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>
                Message sent!
              </h3>
              <p style={{ color: '#86efac', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Thanks for reaching out. We'll reply as soon as possible.
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
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="c-name" style={labelSt}>Name</label>
                  <input
                    id="c-name" type="text" placeholder="Your name"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (errors.name) setErrors(er => ({ ...er, name: undefined })) }}
                    style={{ ...inputStyle(!!errors.name), height: 44 }}
                  />
                  {errors.name && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="c-email" style={labelSt}>Email</label>
                  <input
                    id="c-email" type="email" placeholder="Your email address"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); if (errors.email) setErrors(er => ({ ...er, email: undefined })) }}
                    style={{ ...inputStyle(!!errors.email), height: 44 }}
                  />
                  {errors.email && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="c-subject" style={labelSt}>Subject</label>
                <input
                  id="c-subject" type="text" placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={e => { setForm(f => ({ ...f, subject: e.target.value })); if (errors.subject) setErrors(er => ({ ...er, subject: undefined })) }}
                  style={{ ...inputStyle(!!errors.subject), height: 44 }}
                />
                {errors.subject && <p style={{ marginTop: 4, fontSize: 12, color: '#f87171' }}>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="c-message" style={labelSt}>Message</label>
                <textarea
                  id="c-message" rows={5} placeholder="How can we help you?"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); if (errors.message) setErrors(er => ({ ...er, message: undefined })) }}
                  style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: 120 }}
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
                {status === 'sending' ? 'Sending…' : t('contact_btn')}
              </button>

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
      </div>

    </div>
  )
}
