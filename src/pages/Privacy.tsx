import { useEffect } from 'react'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — mysmartsapp'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="privacy-page">
      <div className="container" style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px 120px', color: '#e4e4e7', lineHeight: 1.7 }}>
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          marginBottom: 24,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          color: '#e4e4e7',
          fontSize: 14,
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>&larr;</span>
          <span>Back to home</span>
        </a>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Privacy Policy</h1>
        <p style={{ color: '#a1a1aa', marginBottom: 32 }}>
          <strong>App:</strong> Mounjaro &amp; Ozempic AI Tracker (Google Play) / AIHealth Trackerapp (App Store)<br />
          <strong>Last Updated:</strong> 22 April 2026<br />
          <strong>Effective Date:</strong> Upon the App&rsquo;s first public release
        </p>

        <hr style={{ borderColor: '#27272a', margin: '32px 0' }} />

        <h2>1. Who We Are</h2>
        <p>This Privacy Policy explains how we collect, use, protect, and share your personal data when you use our mobile application (the &ldquo;App&rdquo;).</p>
        <ul>
          <li><strong>Developer (Data Controller):</strong> Savvas Alexiou</li>
          <li><strong>Address:</strong> Strada intre vii 47, 34, 023381, Bucharest, Romania</li>
          <li><strong>Contact email:</strong> <a href="mailto:sabbasromania@icloud.com">sabbasromania@icloud.com</a></li>
          <li><strong>Jurisdiction:</strong> Romania, European Union</li>
        </ul>
        <p>Under the EU General Data Protection Regulation (GDPR) we are the &ldquo;controller&rdquo; of the personal data you provide. Your rights are described in Section 7.</p>

        <h2>2. What Data We Collect</h2>
        <h3>2.1 Account data</h3>
        <ul>
          <li>Email address (required for sign-up)</li>
          <li>Supabase-generated user identifier (UUID)</li>
          <li>Encrypted authentication tokens</li>
        </ul>
        <h3>2.2 Health and therapy data (sensitive &mdash; special category under GDPR Art. 9)</h3>
        <ul>
          <li>Body weight, height, target weight</li>
          <li>Medication type and dose (e.g. tirzepatide, semaglutide)</li>
          <li>Injection dates, times, and body sites</li>
          <li>Blood glucose readings</li>
          <li>Blood test results (HbA1c, cholesterol, liver enzymes, kidney markers, thyroid, etc.)</li>
          <li>Side-effects and symptom logs</li>
          <li>Therapy start date, injection frequency</li>
          <li>Data imported from Apple HealthKit or Google Health Connect (steps, weight, glucose) <strong>only if you explicitly grant permission</strong></li>
        </ul>
        <h3>2.3 User-generated content</h3>
        <ul>
          <li>Progress photos (optional, stored in encrypted backend)</li>
          <li>Blood test images uploaded for OCR processing</li>
          <li>Messages you send to the AI Advisor chat</li>
        </ul>
        <h3>2.4 Subscription and purchase data</h3>
        <ul>
          <li>Active subscription tier (PRO / PREMIUM)</li>
          <li>Product identifier, renewal date, transaction identifier</li>
          <li>RevenueCat app-user identifier (same as Supabase UUID)</li>
          <li>We never see, receive, or store your payment card, bank account, or any financial credentials. All billing is handled by Apple or Google.</li>
        </ul>
        <h3>2.5 Technical data</h3>
        <ul>
          <li>Device push-notification token (FCM on Android, APNs on iOS)</li>
          <li>App version, operating-system version</li>
          <li>Server-side error and crash logs (IP address may be temporarily logged by Vercel for abuse prevention, automatically rotated)</li>
        </ul>
        <h3>2.6 What we DO NOT collect</h3>
        <ul>
          <li>We do not use advertising identifiers (IDFA / AAID)</li>
          <li>We do not track you across other apps or websites</li>
          <li>We do not sell or rent your data</li>
          <li>We do not use third-party analytics, marketing, or attribution SDKs</li>
          <li>We do not collect biometric identifiers, contact lists, call logs, SMS, microphone, or camera content (except blood-test images you explicitly upload)</li>
          <li>We do not collect data from minors (see Section 12)</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We use your data exclusively to operate the App:</p>
        <ul>
          <li>Create and maintain your account</li>
          <li>Store and display your therapy data, weights, injections, and blood tests</li>
          <li>Generate personalized charts and progress insights</li>
          <li>Produce AI-powered text explanations of your data (AI Advisor, blood-test summary)</li>
          <li>Extract text from uploaded blood-test images via OCR</li>
          <li>Send you local reminders (injection, follow-ups, refill) &mdash; scheduled on your device, not by us</li>
          <li>Manage your subscription and unlock paid features</li>
          <li>Diagnose crashes and improve reliability</li>
          <li>Comply with legal obligations (tax, consumer protection)</li>
        </ul>
        <p>We <strong>do not</strong> use your health data for advertising, profiling, or automated legal decision-making.</p>

        <h2>4. Legal Basis (GDPR)</h2>
        <ul>
          <li><strong>Your explicit consent (Art. 9(2)(a))</strong> &mdash; for processing sensitive health data. You consent at sign-up and again when you grant HealthKit / Health Connect access.</li>
          <li><strong>Performance of a contract (Art. 6(1)(b))</strong> &mdash; to deliver the subscription you paid for.</li>
          <li><strong>Legitimate interest (Art. 6(1)(f))</strong> &mdash; for security, abuse prevention, and crash diagnostics.</li>
          <li><strong>Legal obligation (Art. 6(1)(c))</strong> &mdash; for tax and accounting records of paid subscriptions.</li>
        </ul>
        <p>You can withdraw consent at any time by deleting your account (see Section 8).</p>

        <h2>5. Third-Party Processors</h2>
        <p>We share the minimum data necessary with the following sub-processors. Each is bound by a written Data Processing Agreement (DPA):</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #3f3f46' }}>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#fafafa' }}>Processor</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#fafafa' }}>Purpose</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#fafafa' }}>Data shared</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#fafafa' }}>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>Supabase, Inc.</td><td style={{ padding: '10px 8px' }}>Authentication + encrypted database hosting</td><td style={{ padding: '10px 8px' }}>Email, UUID, all user-entered records</td><td style={{ padding: '10px 8px' }}>EU &mdash; Ireland</td></tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>OpenAI, L.L.C.</td><td style={{ padding: '10px 8px' }}>AI text generation for AI Advisor and blood-test summaries</td><td style={{ padding: '10px 8px' }}>Chat messages, extracted blood-test values, therapy context you provide</td><td style={{ padding: '10px 8px' }}>United States</td></tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>Google Cloud Vision (Google LLC)</td><td style={{ padding: '10px 8px' }}>OCR text extraction from blood-test images</td><td style={{ padding: '10px 8px' }}>The image you upload</td><td style={{ padding: '10px 8px' }}>United States</td></tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>RevenueCat, Inc.</td><td style={{ padding: '10px 8px' }}>Subscription status mirror</td><td style={{ padding: '10px 8px' }}>Email, purchase identifiers, subscription tier</td><td style={{ padding: '10px 8px' }}>United States</td></tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>Apple Inc.</td><td style={{ padding: '10px 8px' }}>In-app purchase billing (iOS) and push notifications (APNs)</td><td style={{ padding: '10px 8px' }}>Transaction data, device token</td><td style={{ padding: '10px 8px' }}>United States / Ireland</td></tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}><td style={{ padding: '10px 8px' }}>Google LLC</td><td style={{ padding: '10px 8px' }}>Google Play Billing (Android) and Firebase Cloud Messaging</td><td style={{ padding: '10px 8px' }}>Transaction data, device token</td><td style={{ padding: '10px 8px' }}>United States</td></tr>
              <tr><td style={{ padding: '10px 8px' }}>Vercel, Inc.</td><td style={{ padding: '10px 8px' }}>Backend API hosting</td><td style={{ padding: '10px 8px' }}>HTTP request metadata, JWT</td><td style={{ padding: '10px 8px' }}>EU edge + United States</td></tr>
            </tbody>
          </table>
        </div>
        <p>All transfers to the United States rely on the <strong>EU-U.S. Data Privacy Framework</strong> or <strong>Standard Contractual Clauses (SCCs)</strong> where the framework does not apply. We do not knowingly transfer data outside the EU/US.</p>

        <h2>6. Data Retention</h2>
        <ul>
          <li><strong>Account + health data + photos + chat history:</strong> retained until you delete your account.</li>
          <li><strong>Server error logs:</strong> retained up to 90 days.</li>
          <li><strong>Subscription records</strong> (for tax / accounting compliance): retained up to 7 years after account deletion, anonymized where possible (GDPR Art. 17(3)(b) / (e)).</li>
          <li><strong>Database backups:</strong> Supabase rolling backups up to 30 days after deletion.</li>
        </ul>

        <h2>7. Your Rights (GDPR)</h2>
        <p>You have the following rights:</p>
        <ul>
          <li><strong>Access (Art. 15)</strong> &mdash; request a copy of your data</li>
          <li><strong>Rectification (Art. 16)</strong> &mdash; correct inaccurate data</li>
          <li><strong>Erasure (Art. 17)</strong> &mdash; delete your account and data (see Section 8)</li>
          <li><strong>Data portability (Art. 20)</strong> &mdash; export your data in CSV / PDF from Settings &rarr; Export Data</li>
          <li><strong>Withdraw consent</strong> at any time (Art. 7(3))</li>
          <li><strong>Object to processing</strong> (Art. 21)</li>
          <li><strong>Lodge a complaint</strong> with the Romanian data-protection authority ANSPDCP (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>) or with the authority of your country of residence</li>
        </ul>
        <p>To exercise any right, email <a href="mailto:sabbasromania@icloud.com">sabbasromania@icloud.com</a>. We respond within 30 days (Art. 12(3)).</p>

        <h2>8. Account and Data Deletion</h2>
        <p>You can permanently delete your account and all data at any time from inside the App:</p>
        <ol>
          <li>Sign in</li>
          <li>Go to <strong>Settings &rarr; Delete Account</strong></li>
          <li>Confirm by typing &ldquo;DELETE&rdquo;</li>
        </ol>
        <p>Upon deletion we irreversibly remove:</p>
        <ul>
          <li>Your authentication record (email, login credentials)</li>
          <li>All therapy data, weights, injections, blood-test records, glucose, side-effects</li>
          <li>All uploaded photos and chat history</li>
          <li>Your subscription record in our database</li>
        </ul>
        <p><strong>Important &mdash; subscription cancellation:</strong> Deleting your account <strong>does not automatically cancel</strong> your App Store or Google Play subscription. Cancel it separately at:</p>
        <ul>
          <li><strong>iOS:</strong> Settings &rarr; Apple ID &rarr; Subscriptions &rarr; Mounjaro &amp; Ozempic AI Tracker</li>
          <li><strong>Android:</strong> Google Play &rarr; Payments &amp; subscriptions &rarr; Subscriptions</li>
        </ul>
        <p>If you need help, email <a href="mailto:sabbasromania@icloud.com">sabbasromania@icloud.com</a>.</p>

        <h2>9. Health Data (HealthKit / Health Connect)</h2>
        <p>With your explicit permission, the App reads the following from Apple HealthKit (iOS) or Google Health Connect (Android):</p>
        <ul>
          <li>Body weight</li>
          <li>Steps and daily activity</li>
          <li>Blood glucose</li>
        </ul>
        <p>This data is <strong>read-only from the platform&rsquo;s secure health store</strong> and is never written back. It is used only to populate your in-app charts and logs.</p>
        <p>We <strong>never</strong> share HealthKit or Health Connect data with any third party outside the list in Section 5, and only when needed to deliver the feature you are using.</p>
        <p>You can revoke permission at any time:</p>
        <ul>
          <li><strong>iOS:</strong> Settings &rarr; Privacy &amp; Security &rarr; Health &rarr; AIHealth Trackerapp</li>
          <li><strong>Android:</strong> Settings &rarr; Health Connect &rarr; App permissions &rarr; Mounjaro &amp; Ozempic AI Tracker</li>
        </ul>

        <h2>10. Subscriptions and Payments</h2>
        <p>Premium features (AI Advisor, Blood Test analysis) require an active subscription:</p>
        <ul>
          <li><strong>PRO:</strong> &euro;4.99 / month or &euro;49.99 / year</li>
          <li><strong>PREMIUM:</strong> &euro;9.99 / month or &euro;99.99 / year</li>
        </ul>
        <p>Prices shown in other currencies may vary according to the store&rsquo;s automatic conversion.</p>
        <p>Payments are processed <strong>exclusively</strong> by Apple In-App Purchase (iOS) or Google Play Billing (Android). We never see or store your payment card or bank details. Subscription status is mirrored to our backend through RevenueCat so the App can unlock the correct features on all your devices.</p>
        <p>Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.</p>

        <h2 style={{ color: '#f87171' }}>11. Medical Disclaimer &mdash; IMPORTANT</h2>
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 12, padding: 16, margin: '16px 0' }}>
          <p><strong>This App is not a medical device. It does not provide medical advice, diagnosis, or treatment.</strong></p>
          <ul>
            <li>Charts, calculated trends, and AI-generated text (including AI Advisor responses and blood-test summaries) are <strong>informational only</strong> and must not replace professional medical advice.</li>
            <li>Always consult your doctor, pharmacist, or qualified healthcare provider before any decision related to GLP-1 medication (Mounjaro, Ozempic, Wegovy, Saxenda/Victoza), insulin, dose adjustment, blood-test interpretation, diet, or exercise.</li>
            <li>AI responses may be incomplete, outdated, or factually incorrect. Do <strong>not</strong> rely on them for urgent, critical, or life-threatening decisions.</li>
            <li>In case of a medical emergency, contact your local emergency number immediately (112 in the EU, 911 in the USA).</li>
          </ul>
          <p>By using the App you acknowledge and accept these limitations.</p>
        </div>

        <h2>12. Age Restriction</h2>
        <p>The App is intended for adults aged <strong>18 years or older</strong>. It is not directed at children and we do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe your child has provided data, please contact us at <a href="mailto:sabbasromania@icloud.com">sabbasromania@icloud.com</a> and we will promptly delete it.</p>

        <h2>13. Security</h2>
        <ul>
          <li><strong>TLS 1.2+</strong> encryption for all traffic</li>
          <li><strong>Encryption at rest</strong> (AES-256) by Supabase</li>
          <li><strong>Row-Level Security (RLS)</strong> policies &mdash; each user can only access their own records</li>
          <li><strong>JWT authentication</strong> enforced on every backend endpoint</li>
          <li><strong>Service-role keys</strong> stored only in secure server-side environment variables</li>
          <li><strong>Webhook signatures</strong> verified with timing-safe comparison</li>
          <li>Regular dependency updates and security audits</li>
        </ul>
        <p>No transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we work continuously to reduce risk.</p>

        <h2>14. Cookies, Tracking, and Analytics</h2>
        <p>The App does <strong>not</strong> use cookies, advertising SDKs, cross-app tracking, or third-party analytics. It is declared as <strong>not tracking</strong> under Apple App Tracking Transparency and its iOS Privacy Manifest declares no tracking domains.</p>
        <p>This Privacy Policy is hosted exclusively at <strong><a href="https://mysmartsapp.com/privacy">https://mysmartsapp.com/privacy</a></strong>. The same page may set strictly-necessary cookies only (for language preference). No advertising or analytics cookies are set.</p>

        <h2>15. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes to the App, legal requirements, or sub-processors. The updated policy is always posted at <strong><a href="https://mysmartsapp.com/privacy">https://mysmartsapp.com/privacy</a></strong> with a new &ldquo;Last Updated&rdquo; date. For material changes we will notify you inside the App and, where feasible, by email, before they take effect.</p>
        <p>Continued use of the App after a material change constitutes acceptance of the revised policy.</p>

        <h2>16. Contact</h2>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:sabbasromania@icloud.com">sabbasromania@icloud.com</a></li>
          <li><strong>Developer:</strong> Savvas Alexiou</li>
          <li><strong>Postal address:</strong> Strada intre vii 47, 34, 023381, Bucharest, Romania</li>
          <li><strong>Romanian DPA:</strong> ANSPDCP &mdash; <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></li>
        </ul>

        <hr style={{ borderColor: '#27272a', margin: '32px 0' }} />

        <p style={{ color: '#71717a', fontSize: 13, fontStyle: 'italic' }}>
          This policy is written in English as the authoritative version. Localized translations may be provided for convenience; in case of conflict, the English version prevails.
        </p>
      </div>
    </main>
  )
}
