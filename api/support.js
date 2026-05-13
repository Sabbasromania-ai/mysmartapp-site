// Vercel serverless function — POST /api/support
// CommonJS only — no import / export default / import type
// RESEND_API_KEY must be set in Vercel Environment Variables.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  var body = req.body || {}
  var name    = body.name
  var email   = body.email
  var subject = body.subject
  var message = body.message

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

  var apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[support] RESEND_API_KEY not set')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  var payload = JSON.stringify({
    from: 'Mounjaro Tracker Support <support@mysmartsapp.com>',
    to: ['info@mysmartsapp.com'],
    reply_to: email.trim(),
    subject: '[Support] ' + subject.trim(),
    text: [
      'Name:    ' + name.trim(),
      'Email:   ' + email.trim(),
      'Subject: ' + subject.trim(),
      '',
      'Message:',
      message.trim(),
    ].join('\n'),
    html:
      '<p><strong>Name:</strong> '    + escHtml(name.trim())    + '</p>' +
      '<p><strong>Email:</strong> '   + escHtml(email.trim())   + '</p>' +
      '<p><strong>Subject:</strong> ' + escHtml(subject.trim()) + '</p>' +
      '<hr/>' +
      '<p style="white-space:pre-wrap">' + escHtml(message.trim()) + '</p>',
  })

  try {
    var r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: payload,
    })

    if (!r.ok) {
      var text = await r.text().catch(function () { return '' })
      console.error('[support] Resend error:', r.status, text)
      return res.status(502).json({ error: 'Failed to send email.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[support] Fetch error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}

function escHtml(s) {
  return s
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
}
