import { useEffect } from 'react'

const accent = '#00d4ff'
const accentDim = 'rgba(0,212,255,0.15)'
const accentBorder = 'rgba(0,212,255,0.25)'

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
    <h2 style={{
      fontSize: 20, fontWeight: 700, color: accent,
      marginBottom: 16, marginTop: 0,
      letterSpacing: '-0.01em',
    }}>
      {children}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 15, fontWeight: 600, color: accent,
      marginBottom: 10, marginTop: 20,
      opacity: 0.85,
    }}>
      {children}
    </h3>
  )
}

const liSt: React.CSSProperties = { marginBottom: 6, lineHeight: 1.7, color: '#c4c9d8' }
const ulSt: React.CSSProperties = { paddingLeft: 20, margin: '8px 0 0' }

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — mysmartsapp'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px 100px', color: '#e4e4e7' }}>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', marginBottom: 32,
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

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(32px,6vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.03em' }}>
          Privacy Policy
        </h1>
        <div style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>
          <span><strong style={{ color: '#a0aec0' }}>App:</strong> Mounjaro &amp; Ozempic AI Tracker (Google Play) / AIHealth Trackerapp (App Store)</span><br />
          <span><strong style={{ color: '#a0aec0' }}>Last Updated:</strong> 6 May 2026</span><br />
          <span><strong style={{ color: '#a0aec0' }}>Effective Date:</strong> Upon the App&rsquo;s first public release</span>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.09)', marginBottom: 32 }} />

        {/* 1. Who We Are */}
        <Card>
          <SectionTitle>1. Who We Are</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
            This Privacy Policy explains how <strong style={{ color: '#fff' }}>Mysmartsapp</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, protects, and shares personal data when users access or use our mobile applications and related services.
          </p>

          {/* Info box */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '18px 20px',
          }}>
            {/* Data Controller row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>Data Controller / App Publisher:</strong> Savvas Alexiou
              </span>
            </div>
            {/* Email row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>Contact email:</strong>{' '}
                <a href="mailto:info@mysmartsapp.com" style={{ color: accent, textDecoration: 'none' }}>info@mysmartsapp.com</a>
              </span>
            </div>
            {/* Jurisdiction row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ fontSize: 14, color: '#c4c9d8' }}>
                <strong style={{ color: '#fff' }}>Jurisdiction:</strong> European Union / Romania
              </span>
            </div>
          </div>

          <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
            For questions about this Privacy Policy, privacy rights, or data protection requests,
            users may contact us at{' '}
            <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>.
          </p>
          <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
            Under the EU General Data Protection Regulation (GDPR) we are the &ldquo;controller&rdquo; of the personal data you provide. Your rights are described in Section 7.
          </p>
        </Card>

        {/* 2. What Data We Collect */}
        <Card>
          <SectionTitle>2. What Data We Collect</SectionTitle>
          <SubTitle>2.1 Account data</SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>Email address (required for sign-up)</li>
            <li style={liSt}>Supabase-generated user identifier (UUID)</li>
            <li style={liSt}>Encrypted authentication tokens</li>
          </ul>

          <SubTitle>2.2 Health and therapy data <span style={{ fontSize: 13, fontWeight: 400, color: '#f87171' }}>(sensitive — special category under GDPR Art. 9)</span></SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>Body weight, height, target weight</li>
            <li style={liSt}>Medication type and dose (e.g. tirzepatide, semaglutide)</li>
            <li style={liSt}>Injection dates, times, and body sites</li>
            <li style={liSt}>Blood glucose readings</li>
            <li style={liSt}>Blood test results (HbA1c, cholesterol, liver enzymes, kidney markers, thyroid, etc.)</li>
            <li style={liSt}>Side-effects and symptom logs</li>
            <li style={liSt}>Therapy start date, injection frequency</li>
            <li style={liSt}>Data imported from Apple HealthKit or Google Health Connect (steps, weight, glucose) <strong>only if you explicitly grant permission</strong></li>
          </ul>

          <SubTitle>2.3 User-generated content</SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>Progress photos (optional, stored in encrypted backend)</li>
            <li style={liSt}>Blood test images uploaded for OCR processing</li>
            <li style={liSt}>Messages you send to the AI Advisor chat</li>
          </ul>

          <SubTitle>2.4 Subscription and purchase data</SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>Active subscription tier (PRO / PREMIUM)</li>
            <li style={liSt}>Product identifier, renewal date, transaction identifier</li>
            <li style={liSt}>RevenueCat app-user identifier (same as Supabase UUID)</li>
            <li style={liSt}>We never see, receive, or store your payment card, bank account, or any financial credentials. All billing is handled by Apple or Google.</li>
          </ul>

          <SubTitle>2.5 Technical data</SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>Device push-notification token (FCM on Android, APNs on iOS)</li>
            <li style={liSt}>App version, operating-system version</li>
            <li style={liSt}>Server-side error and crash logs (IP address may be temporarily logged by Vercel for abuse prevention, automatically rotated)</li>
          </ul>

          <SubTitle>2.6 What we DO NOT collect</SubTitle>
          <ul style={ulSt}>
            <li style={liSt}>We do not use advertising identifiers (IDFA / AAID)</li>
            <li style={liSt}>We do not track you across other apps or websites</li>
            <li style={liSt}>We do not sell or rent your data</li>
            <li style={liSt}>We do not use third-party analytics, marketing, or attribution SDKs</li>
            <li style={liSt}>We do not collect biometric identifiers, contact lists, call logs, SMS, microphone, or camera content (except blood-test images you explicitly upload)</li>
            <li style={liSt}>We do not collect data from minors (see Section 12)</li>
          </ul>
        </Card>

        {/* 3. How We Use Your Data */}
        <Card>
          <SectionTitle>3. How We Use Your Data</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>We use personal data strictly for:</p>
          <ul style={ulSt}>
            <li style={liSt}>Providing, maintaining, and improving our apps and services</li>
            <li style={liSt}>Store and display your therapy data, weights, injections, and blood tests</li>
            <li style={liSt}>Generate personalized charts and progress insights</li>
            <li style={liSt}>Produce AI-powered text explanations of your data (AI Advisor, blood-test summary)</li>
            <li style={liSt}>Extract text from uploaded blood-test images via OCR</li>
            <li style={liSt}>Send you local reminders (injection, follow-ups, refill) &mdash; scheduled on your device, not by us</li>
            <li style={liSt}>Manage your subscription and unlock paid features</li>
            <li style={liSt}>Diagnose crashes and improve reliability</li>
            <li style={liSt}>Comply with legal obligations (tax, consumer protection)</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            We <strong style={{ color: '#c4c9d8' }}>do not</strong> use your health data for advertising, profiling, or automated legal decision-making.
          </p>
        </Card>

        {/* 4. Legal Basis */}
        <Card>
          <SectionTitle>4. Legal Basis (GDPR)</SectionTitle>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>Your explicit consent (Art. 9(2)(a))</strong> &mdash; for processing sensitive health data. You consent at sign-up and again when you grant HealthKit / Health Connect access.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Performance of a contract (Art. 6(1)(b))</strong> &mdash; to deliver the subscription you paid for.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Legitimate interest (Art. 6(1)(f))</strong> &mdash; for security, abuse prevention, and crash diagnostics.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Legal obligation (Art. 6(1)(c))</strong> &mdash; for tax and accounting records of paid subscriptions.</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>You can withdraw consent at any time by deleting your account (see Section 8).</p>
        </Card>

        {/* 5. Third-Party Processors */}
        <Card>
          <SectionTitle>5. Third-Party Processors</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 16, fontSize: 15 }}>
            We share the minimum data necessary with the following sub-processors. Each is bound by a written Data Processing Agreement (DPA):
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Processor</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Purpose</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Data shared</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#fff', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Supabase, Inc.', 'Authentication + encrypted database hosting', 'Email, UUID, all user-entered records', 'EU — Ireland'],
                  ['OpenAI, L.L.C.', 'AI text generation for AI Advisor and blood-test summaries', 'Chat messages, extracted blood-test values, therapy context', 'United States'],
                  ['Google Cloud Vision', 'OCR text extraction from blood-test images', 'The image you upload', 'United States'],
                  ['RevenueCat, Inc.', 'Subscription status mirror', 'Email, purchase identifiers, subscription tier', 'United States'],
                  ['Apple Inc.', 'In-app purchase billing (iOS) and push notifications (APNs)', 'Transaction data, device token', 'United States / Ireland'],
                  ['Google LLC', 'Google Play Billing (Android) and Firebase Cloud Messaging', 'Transaction data, device token', 'United States'],
                  ['Vercel, Inc.', 'Backend API hosting', 'HTTP request metadata, JWT', 'EU edge + United States'],
                ].map(([proc, purpose, data, loc], i, arr) => (
                  <tr key={proc} style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <td style={{ padding: '10px 14px', color: '#e4e4e7', fontWeight: 500, whiteSpace: 'nowrap' }}>{proc}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8' }}>{purpose}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8' }}>{data}</td>
                    <td style={{ padding: '10px 14px', color: '#c4c9d8', whiteSpace: 'nowrap' }}>{loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#8892b0', fontSize: 13, marginTop: 14, marginBottom: 0 }}>
            All transfers to the United States rely on the <strong style={{ color: '#c4c9d8' }}>EU-U.S. Data Privacy Framework</strong> or <strong style={{ color: '#c4c9d8' }}>Standard Contractual Clauses (SCCs)</strong> where the framework does not apply.
          </p>
        </Card>

        {/* 6. Data Retention */}
        <Card>
          <SectionTitle>6. Data Retention</SectionTitle>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>Account + health data + photos + chat history:</strong> retained until you delete your account.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Server error logs:</strong> retained up to 90 days.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Subscription records</strong> (for tax / accounting compliance): retained up to 7 years after account deletion, anonymized where possible (GDPR Art. 17(3)(b) / (e)).</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Database backups:</strong> Supabase rolling backups up to 30 days after deletion.</li>
          </ul>
        </Card>

        {/* 7. Your Rights */}
        <Card>
          <SectionTitle>7. Your Rights (GDPR)</SectionTitle>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>Access (Art. 15)</strong> &mdash; request a copy of your data</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Rectification (Art. 16)</strong> &mdash; correct inaccurate data</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Erasure (Art. 17)</strong> &mdash; delete your account and data (see Section 8)</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Data portability (Art. 20)</strong> &mdash; export your data in CSV / PDF from Settings &rarr; Export Data</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Withdraw consent</strong> at any time (Art. 7(3))</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Object to processing</strong> (Art. 21)</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Lodge a complaint</strong> with the Romanian data-protection authority ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>www.dataprotection.ro</a>) or with the authority of your country of residence</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            To exercise any right, email <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>. We respond within 30 days (Art. 12(3)).
          </p>
        </Card>

        {/* 8. Account and Data Deletion */}
        <Card>
          <SectionTitle>8. Account and Data Deletion</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>You can permanently delete your account and all data at any time from inside the App:</p>
          <ol style={{ paddingLeft: 22, margin: '8px 0 16px' }}>
            <li style={liSt}>Sign in</li>
            <li style={liSt}>Go to <strong style={{ color: '#fff' }}>Settings &rarr; Delete Account</strong></li>
            <li style={liSt}>Confirm by typing &ldquo;DELETE&rdquo;</li>
          </ol>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 10, fontSize: 15 }}>Upon deletion we irreversibly remove:</p>
          <ul style={ulSt}>
            <li style={liSt}>Your authentication record (email, login credentials)</li>
            <li style={liSt}>All therapy data, weights, injections, blood-test records, glucose, side-effects</li>
            <li style={liSt}>All uploaded photos and chat history</li>
            <li style={liSt}>Your subscription record in our database</li>
          </ul>
          <div style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
            <p style={{ color: '#fde68a', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong>Important — subscription cancellation:</strong> Deleting your account <strong>does not automatically cancel</strong> your App Store or Google Play subscription. Cancel it separately in your device subscription settings.
            </p>
          </div>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            If you need help, email <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a>.
          </p>
        </Card>

        {/* 9. Health Data */}
        <Card>
          <SectionTitle>9. Health Data (HealthKit / Health Connect)</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>
            With your explicit permission, the App reads the following from Apple HealthKit (iOS) or Google Health Connect (Android):
          </p>
          <ul style={ulSt}>
            <li style={liSt}>Body weight</li>
            <li style={liSt}>Steps and daily activity</li>
            <li style={liSt}>Blood glucose</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 8 }}>
            This data is <strong style={{ color: '#c4c9d8' }}>read-only from the platform&rsquo;s secure health store</strong> and is never written back. It is used only to populate your in-app charts and logs.
          </p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>
            We <strong style={{ color: '#c4c9d8' }}>never</strong> share HealthKit or Health Connect data with any third party outside the list in Section 5. You can revoke permission at any time in your device Settings &rarr; Privacy &amp; Security &rarr; Health / Health Connect.
          </p>
        </Card>

        {/* 10. AI Features */}
        <Card>
          <SectionTitle>10. AI Features and Third-Party AI Processing (OpenAI)</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>
            The App uses <strong style={{ color: '#fff' }}>OpenAI, L.L.C.</strong> to generate AI-powered responses and health-related insights. When you use the <strong style={{ color: '#fff' }}>AI Coach</strong> or <strong style={{ color: '#fff' }}>Blood Test features</strong>, the information you choose to enter or upload may be sent to OpenAI for processing.
          </p>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>Data sent:</strong> Messages you type, blood test values or images, health context (weight, glucose, injections, lifestyle logs).</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Data NOT sent:</strong> HealthKit / Health Connect background data — only included if you explicitly reference it in your message.</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Retention:</strong> OpenAI may retain submitted data per their own policies. We do not control OpenAI&rsquo;s retention practices.</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            <strong style={{ color: '#c4c9d8' }}>Before any data is sent to OpenAI, the App asks for your explicit consent.</strong> You may revoke consent at any time from Settings &rarr; Account &rarr; Revoke AI Data Sharing Consent. Using AI features is entirely optional.
          </p>
          <p style={{ color: '#8892b0', fontSize: 13, marginTop: 10, marginBottom: 0 }}>
            The AI features do not provide medical diagnosis, treatment, emergency advice, or a replacement for professional medical care.
          </p>
        </Card>

        {/* 11. Subscriptions */}
        <Card>
          <SectionTitle>11. Subscriptions and Payments</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, marginBottom: 12, fontSize: 15 }}>Premium features (AI Advisor, Blood Test analysis) require an active subscription:</p>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>PRO:</strong> &euro;4.99 / month or &euro;49.99 / year</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>PREMIUM:</strong> &euro;9.99 / month or &euro;99.99 / year</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            Payments are processed exclusively by Apple In-App Purchase (iOS) or Google Play Billing (Android). We never see or store your payment card or bank details. Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.
          </p>
        </Card>

        {/* 12. Medical Disclaimer */}
        <Card style={{ border: '1px solid rgba(248,113,113,0.25)', background: 'rgba(239,68,68,0.06)' }}>
          <SectionTitle><span style={{ color: '#f87171' }}>12. Medical Disclaimer — IMPORTANT</span></SectionTitle>
          <p style={{ color: '#fca5a5', fontSize: 15, lineHeight: 1.7, marginBottom: 12, fontWeight: 600 }}>
            This App is not a medical device. It does not provide medical advice, diagnosis, or treatment.
          </p>
          <ul style={ulSt}>
            <li style={{ ...liSt, color: '#fca5a5' }}>Charts, calculated trends, and AI-generated text are <strong>informational only</strong> and must not replace professional medical advice.</li>
            <li style={{ ...liSt, color: '#fca5a5' }}>Always consult your doctor before any decision related to GLP-1 medication, insulin, dose adjustment, or blood-test interpretation.</li>
            <li style={{ ...liSt, color: '#fca5a5' }}>AI responses may be incomplete, outdated, or factually incorrect. Do <strong>not</strong> rely on them for urgent or life-threatening decisions.</li>
            <li style={{ ...liSt, color: '#fca5a5' }}>In case of a medical emergency, contact your local emergency number immediately (112 in the EU, 911 in the USA).</li>
          </ul>
          <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 14, marginBottom: 0 }}>By using the App you acknowledge and accept these limitations.</p>
        </Card>

        {/* 13. Age Restriction */}
        <Card>
          <SectionTitle>13. Age Restriction</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
            The App is intended for adults aged <strong style={{ color: '#fff' }}>18 years or older</strong>. It is not directed at children and we do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe your child has provided data, please contact us at <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a> and we will promptly delete it.
          </p>
        </Card>

        {/* 14. Security */}
        <Card>
          <SectionTitle>14. Security</SectionTitle>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>TLS 1.2+</strong> encryption for all traffic</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Encryption at rest</strong> (AES-256) by Supabase</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Row-Level Security (RLS)</strong> policies — each user can only access their own records</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>JWT authentication</strong> enforced on every backend endpoint</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Service-role keys</strong> stored only in secure server-side environment variables</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Webhook signatures</strong> verified with timing-safe comparison</li>
            <li style={liSt}>Regular dependency updates and security audits</li>
          </ul>
          <p style={{ color: '#8892b0', fontSize: 13, marginTop: 14, marginBottom: 0 }}>
            No transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we work continuously to reduce risk.
          </p>
        </Card>

        {/* 15. Cookies */}
        <Card>
          <SectionTitle>15. Cookies, Tracking, and Analytics</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>
            The App does <strong style={{ color: '#fff' }}>not</strong> use cookies, advertising SDKs, cross-app tracking, or third-party analytics. It is declared as <strong style={{ color: '#fff' }}>not tracking</strong> under Apple App Tracking Transparency.
          </p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>
            This Privacy Policy is hosted at <a href="https://mysmartsapp.com/privacy" style={{ color: accent }}>https://mysmartsapp.com/privacy</a>. The same page may set strictly-necessary cookies only (for language preference). No advertising or analytics cookies are set.
          </p>
        </Card>

        {/* 16. Changes */}
        <Card>
          <SectionTitle>16. Changes to This Policy</SectionTitle>
          <p style={{ color: '#c4c9d8', lineHeight: 1.7, fontSize: 15, marginBottom: 12 }}>
            We may update this Privacy Policy from time to time to reflect changes to the App, legal requirements, or sub-processors. The updated policy is always posted at <a href="https://mysmartsapp.com/privacy" style={{ color: accent }}>https://mysmartsapp.com/privacy</a> with a new &ldquo;Last Updated&rdquo; date.
          </p>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 0 }}>
            Continued use of the App after a material change constitutes acceptance of the revised policy.
          </p>
        </Card>

        {/* 17. Contact */}
        <Card>
          <SectionTitle>17. Contact</SectionTitle>
          <ul style={ulSt}>
            <li style={liSt}><strong style={{ color: '#fff' }}>Email:</strong> <a href="mailto:info@mysmartsapp.com" style={{ color: accent }}>info@mysmartsapp.com</a></li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Developer:</strong> Savvas Alexiou</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Jurisdiction:</strong> European Union / Romania</li>
            <li style={liSt}><strong style={{ color: '#fff' }}>Romanian DPA:</strong> ANSPDCP — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>www.dataprotection.ro</a></li>
          </ul>
        </Card>

        <hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '32px 0' }} />
        <p style={{ color: '#5e6888', fontSize: 13, fontStyle: 'italic', textAlign: 'center' }}>
          This policy is written in English as the authoritative version. Localized translations may be provided for convenience; in case of conflict, the English version prevails.
        </p>

        {/* Contact card footer */}
        <div style={{
          marginTop: 48,
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${accentBorder}`,
          borderRadius: 16,
          padding: '32px 32px 28px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: accentDim, borderRadius: 20, padding: '4px 12px',
            marginBottom: 14,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: accent, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Επικοινωνία
            </span>
          </div>
          <p style={{ color: '#8892b0', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            Έχετε απορίες ή χρειάζεστε βοήθεια; Είμαστε εδώ για εσάς.
          </p>
          <a
            href="mailto:info@mysmartsapp.com"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: accent, fontSize: 15, textDecoration: 'none', marginBottom: 20,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@mysmartsapp.com
          </a>
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 8,
              background: accent, color: '#000',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              letterSpacing: '0.01em', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Στείλε Μήνυμα
          </a>
        </div>

      </div>
    </div>
  )
}
