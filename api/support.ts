import type { VercelRequest, VercelResponse } from '@vercel/node'

// Vercel serverless function — POST /api/support
// Sends support form data to info@mysmartsapp.com via Resend.
// RESEND_API_KEY must be set in Vercel Environment Variables (never exposed to client).

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body ?? {}

  // Server-side validation
  if (!name || typeof name !== 'string' || name.trim().length < 1) {
    return res.status(400).json({ error: 'Name is required.' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (!subject || typeof subject !== 'string' || subject.trim().length < 1) {
    return res.status(400).json({ error: 'Subject is required.' })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 1) {
    return res.status(400).json({ error: 'Message is required.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[support] RESEND_API_KEY not set')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const body = JSON.stringify({
    from: 'Mounjaro Tracker Support <support@mysmartsapp.com>',
    to: ['info@mysmartsapp.com'],
    reply_to: email.trim(),
    subject: `[Support] ${subject.trim()}`,
    text: [
      `Name:    ${name.trim()}`,
      `Email:   ${email.trim()}`,
      `Subject: ${subject.trim()}`,
      '',
      'Message:',
      message.trim(),
    ].join('\n'),
    html: `
      <p><strong>Name:</strong> ${escHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escHtml(email.trim())}</p>
      <p><strong>Subject:</strong> ${escHtml(subject.trim())}</p>
      <hr/>
      <p style="white-space:pre-wrap">${escHtml(message.trim())}</p>
    `,
  })

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body,
    })

    if (!r.ok) {
      const text = await r.text().catch(() => '')
      console.error('[support] Resend error:', r.status, text)
      return res.status(502).json({ error: 'Failed to send email.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[support] Fetch error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
