# Privacy Policy

**App:** Mounjaro & Ozempic AI Tracker (Google Play) / AIHealth Trackerapp (App Store)
**Last Updated:** 22 April 2026
**Effective Date:** Upon the App's first public release

---

## 1. Who We Are

This Privacy Policy explains how we collect, use, protect, and share your personal data when you use our mobile application (the "App").

- **Developer (Data Controller):** Savvas Alexiou
- **Address:** Strada intre vii 47, 34, 023381, Bucharest, Romania
- **Contact email:** sabbasromania@icloud.com
- **Jurisdiction:** Romania, European Union

Under the EU General Data Protection Regulation (GDPR) we are the "controller" of the personal data you provide. Your rights are described in Section 7.

---

## 2. What Data We Collect

### 2.1 Account data
- Email address (required for sign-up)
- Supabase-generated user identifier (UUID)
- Encrypted authentication tokens

### 2.2 Health and therapy data (sensitive — special category under GDPR Art. 9)
- Body weight, height, target weight
- Medication type and dose (e.g. tirzepatide, semaglutide)
- Injection dates, times, and body sites
- Blood glucose readings
- Blood test results (HbA1c, cholesterol, liver enzymes, kidney markers, thyroid, etc.)
- Side-effects and symptom logs
- Therapy start date, injection frequency
- Data imported from Apple HealthKit or Google Health Connect (steps, weight, glucose) **only if you explicitly grant permission**

### 2.3 User-generated content
- Progress photos (optional, stored in encrypted backend)
- Blood test images uploaded for OCR processing
- Messages you send to the AI Advisor chat

### 2.4 Subscription and purchase data
- Active subscription tier (PRO / PREMIUM)
- Product identifier, renewal date, transaction identifier
- RevenueCat app-user identifier (same as Supabase UUID)
- We never see, receive, or store your payment card, bank account, or any financial credentials. All billing is handled by Apple or Google.

### 2.5 Technical data
- Device push-notification token (FCM on Android, APNs on iOS)
- App version, operating-system version
- Server-side error and crash logs (IP address may be temporarily logged by Vercel for abuse prevention, automatically rotated)

### 2.6 What we DO NOT collect
- We do not use advertising identifiers (IDFA / AAID)
- We do not track you across other apps or websites
- We do not sell or rent your data
- We do not use third-party analytics, marketing, or attribution SDKs
- We do not collect biometric identifiers, contact lists, call logs, SMS, microphone, or camera content (except blood-test images you explicitly upload)
- We do not collect data from minors (see Section 12)

---

## 3. How We Use Your Data

We use your data exclusively to operate the App:

- Create and maintain your account
- Store and display your therapy data, weights, injections, and blood tests
- Generate personalized charts and progress insights
- Produce AI-powered text explanations of your data (AI Advisor, blood-test summary)
- Extract text from uploaded blood-test images via OCR
- Send you local reminders (injection, follow-ups, refill) — scheduled on your device, not by us
- Manage your subscription and unlock paid features
- Diagnose crashes and improve reliability
- Comply with legal obligations (tax, consumer protection)

We **do not** use your health data for advertising, profiling, or automated legal decision-making.

---

## 4. Legal Basis (GDPR)

We rely on the following legal bases:

- **Your explicit consent (Art. 9(2)(a))** — for processing sensitive health data. You consent at sign-up and again when you grant HealthKit / Health Connect access.
- **Performance of a contract (Art. 6(1)(b))** — to deliver the subscription you paid for.
- **Legitimate interest (Art. 6(1)(f))** — for security, abuse prevention, and crash diagnostics.
- **Legal obligation (Art. 6(1)(c))** — for tax and accounting records of paid subscriptions.

You can withdraw consent at any time by deleting your account (see Section 8).

---

## 5. Third-Party Processors

We share the minimum data necessary with the following sub-processors. Each is bound by a written Data Processing Agreement (DPA):

| Processor | Purpose | Data shared | Location |
|-----------|---------|-------------|----------|
| **Supabase, Inc.** | Authentication + encrypted database hosting | Email, UUID, all user-entered records | EU — Ireland (eu-west-1) |
| **OpenAI, L.L.C.** | AI text generation for AI Advisor and blood-test summaries | Chat messages, extracted blood-test values, therapy context you provide | United States |
| **Google Cloud Vision (Google LLC)** | OCR text extraction from blood-test images | The image you upload | United States |
| **RevenueCat, Inc.** | Subscription status mirror | Email, purchase identifiers, subscription tier | United States |
| **Apple Inc.** | In-app purchase billing (iOS) and push notifications (APNs) | Transaction data, device token | United States / Ireland |
| **Google LLC** | Google Play Billing (Android) and Firebase Cloud Messaging | Transaction data, device token | United States |
| **Vercel, Inc.** | Backend API hosting | HTTP request metadata, JWT | EU edge + United States |

All transfers to the United States rely on the **EU-U.S. Data Privacy Framework** or **Standard Contractual Clauses (SCCs)** where the framework does not apply. We do not knowingly transfer data outside the EU/US.

---

## 6. Data Retention

- **Account + health data + photos + chat history**: retained until you delete your account.
- **Server error logs**: retained up to 90 days.
- **Subscription records** (for tax / accounting compliance): retained up to 7 years after account deletion, anonymized where possible (GDPR Art. 17(3)(b) / (e)).
- **Database backups**: Supabase rolling backups up to 30 days after deletion.

---

## 7. Your Rights (GDPR)

You have the following rights:

- **Access (Art. 15)** — request a copy of your data
- **Rectification (Art. 16)** — correct inaccurate data
- **Erasure (Art. 17)** — delete your account and data (see Section 8)
- **Data portability (Art. 20)** — export your data in CSV / PDF from Settings → Export Data
- **Withdraw consent** at any time (Art. 7(3))
- **Object to processing** (Art. 21)
- **Lodge a complaint** with the Romanian data-protection authority ANSPDCP (www.dataprotection.ro) or with the authority of your country of residence

To exercise any right, email **sabbasromania@icloud.com**. We respond within 30 days (Art. 12(3)).

---

## 8. Account and Data Deletion

You can permanently delete your account and all data at any time from inside the App:

1. Sign in
2. Go to **Settings → Delete Account**
3. Confirm by typing "DELETE"

Upon deletion we irreversibly remove:
- Your authentication record (email, login credentials)
- All therapy data, weights, injections, blood-test records, glucose, side-effects
- All uploaded photos and chat history
- Your subscription record in our database

**Important — subscription cancellation:** Deleting your account **does not automatically cancel** your App Store or Google Play subscription. Cancel it separately at:
- **iOS:** Settings → Apple ID → Subscriptions → Mounjaro & Ozempic AI Tracker
- **Android:** Google Play → Payments & subscriptions → Subscriptions

If you need help, email **sabbasromania@icloud.com**.

---

## 9. Health Data (HealthKit / Health Connect)

With your explicit permission, the App reads the following from Apple HealthKit (iOS) or Google Health Connect (Android):
- Body weight
- Steps and daily activity
- Blood glucose

This data is **read-only from the platform's secure health store** and is never written back. It is used only to populate your in-app charts and logs.

We **never** share HealthKit or Health Connect data with any third party outside the list in Section 5, and only when needed to deliver the feature you are using (for example, your weight may be stored in Supabase so it appears on all your devices; it is not sent to OpenAI unless you include it in an AI Advisor message).

You can revoke permission at any time:
- **iOS:** Settings → Privacy & Security → Health → AIHealth Trackerapp
- **Android:** Settings → Health Connect → App permissions → Mounjaro & Ozempic AI Tracker

---

## 10. Subscriptions and Payments

Premium features (AI Advisor, Blood Test analysis) require an active subscription:

- **PRO:** €4.99 / month or €49.99 / year
- **PREMIUM:** €9.99 / month or €99.99 / year

Prices shown in other currencies may vary according to the store's automatic conversion.

Payments are processed **exclusively** by Apple In-App Purchase (iOS) or Google Play Billing (Android). We never see or store your payment card or bank details. Subscription status is mirrored to our backend through RevenueCat so the App can unlock the correct features on all your devices.

Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period. Cancel or change at any time through your device's Subscriptions settings (see Section 8).

A 7-day grace period (monthly) or 14-day grace period (yearly) applies to failed renewals as per store policy.

---

## 11. Medical Disclaimer — IMPORTANT

**This App is not a medical device. It does not provide medical advice, diagnosis, or treatment.**

- Charts, calculated trends, and AI-generated text (including AI Advisor responses and blood-test summaries) are **informational only** and must not replace professional medical advice.
- Always consult your doctor, pharmacist, or qualified healthcare provider before any decision related to GLP-1 medication (Mounjaro, Ozempic, Wegovy, Saxenda/Victoza), insulin, dose adjustment, blood-test interpretation, diet, or exercise.
- AI responses may be incomplete, outdated, or factually incorrect. Do **not** rely on them for urgent, critical, or life-threatening decisions.
- In case of a medical emergency, contact your local emergency number immediately (112 in the EU, 911 in the USA).

By using the App you acknowledge and accept these limitations.

---

## 12. Age Restriction

The App is intended for adults aged **18 years or older**. It is not directed at children and we do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe your child has provided data, please contact us at **sabbasromania@icloud.com** and we will promptly delete it.

---

## 13. Security

We use industry-standard measures to protect your data:

- **TLS 1.2+** encryption for all traffic
- **Encryption at rest** (AES-256) by Supabase
- **Row-Level Security (RLS)** policies — each authenticated user can only read and write their own records
- **JWT authentication** enforced on every backend endpoint
- **Service-role keys** stored only in secure server-side environment variables, never shipped to the client
- **Webhook signatures** verified with timing-safe comparison
- **Idempotency tokens** to prevent duplicate processing
- Regular dependency updates and security audits

No transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we work continuously to reduce risk.

---

## 14. Cookies, Tracking, and Analytics

The App does **not** use cookies, advertising SDKs, cross-app tracking, or third-party analytics. It is declared as **not tracking** under Apple App Tracking Transparency and its iOS Privacy Manifest declares no tracking domains.

This Privacy Policy is hosted exclusively at **https://mysmartsapp.com/privacy**. The same page may set strictly-necessary cookies only (for language preference). No advertising or analytics cookies are set.

---

## 15. Changes to This Policy

We may update this Privacy Policy from time to time to reflect changes to the App, legal requirements, or sub-processors. The updated policy is always posted at **https://mysmartsapp.com/privacy** with a new "Last Updated" date. For material changes we will notify you inside the App and, where feasible, by email, before they take effect.

Continued use of the App after a material change constitutes acceptance of the revised policy.

---

## 16. Contact

For any question about this Privacy Policy, your personal data, or to exercise your GDPR rights:

- **Email:** sabbasromania@icloud.com
- **Developer:** Savvas Alexiou
- **Postal address:** Strada intre vii 47, 34, 023381, Bucharest, Romania
- **Romanian DPA:** ANSPDCP — www.dataprotection.ro

---

*This policy is written in English as the authoritative version. Localized translations (Greek, Romanian) may be provided for convenience; in case of conflict, the English version prevails.*
