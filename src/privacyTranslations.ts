// Each bullet is either a plain string or a [boldLabel, bodyText] tuple
type B = string | readonly [string, string]

interface PvContent {
  back: string
  title: string
  meta: { appLabel: string; appVal: string; updatedLabel: string; updatedVal: string; effectiveLabel: string; effectiveVal: string }
  s1: { title: string; p1: string; box: { controllerLabel: string; controllerVal: string; emailLabel: string; jurisdictionLabel: string; jurisdictionVal: string }; p2: string; p3: string }
  s2: {
    title: string
    sub1: { title: string; bullets: B[] }
    sub2: { title: string; sensitiveLabel: string; bullets: B[] }
    sub3: { title: string; bullets: B[] }
    sub4: { title: string; bullets: B[] }
    sub5: { title: string; bullets: B[] }
    sub6: { title: string; bullets: B[] }
  }
  s3: { title: string; p1: string; bullets: B[]; p2: string }
  s4: { title: string; bullets: B[]; p2: string }
  s5: { title: string; p1: string; tableHeaders: readonly [string, string, string, string]; rows: ReadonlyArray<readonly [string, string, string, string]>; p2: string }
  s6: { title: string; bullets: B[] }
  s7: { title: string; bullets: B[]; p2: string }
  s8: { title: string; p1: string; steps: string[]; p2: string; bullets: B[]; warning: string; p3: string }
  s9: { title: string; p1: string; bullets: B[]; p2: string; p3: string }
  s10: { title: string; p1: string; bullets: B[]; p2: string; p3: string }
  s11: { title: string; p1: string; bullets: B[]; p2: string }
  s12: { title: string; p1: string; bullets: B[]; p2: string }
  s13: { title: string; p1: string }
  s14: { title: string; bullets: B[]; p2: string }
  s15: { title: string; p1: string; p2: string }
  s16: { title: string; p1: string; p2: string }
  s17: { title: string; bullets: B[] }
  footer: { label: string; p: string; button: string }
  bottomNote: string
}

export const pv: Record<'en' | 'el', PvContent> = {
  en: {
    back: 'Back to home',
    title: 'Privacy Policy',
    meta: {
      appLabel: 'App:',
      appVal: 'Mounjaro & Ozempic AI Tracker (Google Play) / AIHealth Trackerapp (App Store)',
      updatedLabel: 'Last Updated:',
      updatedVal: '6 May 2026',
      effectiveLabel: 'Effective Date:',
      effectiveVal: "Upon the App’s first public release",
    },
    s1: {
      title: '1. Who We Are',
      p1: 'This Privacy Policy explains how Mysmartsapp (“we”, “us”, or “our”) collects, uses, protects, and shares personal data when users access or use our mobile applications and related services.',
      box: {
        controllerLabel: 'Data Controller / App Publisher:',
        controllerVal: 'Savvas Alexiou',
        emailLabel: 'Contact email:',
        jurisdictionLabel: 'Jurisdiction:',
        jurisdictionVal: 'European Union / Romania',
      },
      p2: 'For questions about this Privacy Policy, privacy rights, or data protection requests, users may contact us at ',
      p3: 'Under the EU General Data Protection Regulation (GDPR) we are the “controller” of the personal data you provide. Your rights are described in Section 7.',
    },
    s2: {
      title: '2. What Data We Collect',
      sub1: {
        title: '2.1 Account data',
        bullets: [
          'Email address (required for sign-up)',
          'Supabase-generated user identifier (UUID)',
          'Encrypted authentication tokens',
        ],
      },
      sub2: {
        title: '2.2 Health and therapy data',
        sensitiveLabel: '(sensitive — special category under GDPR Art. 9)',
        bullets: [
          'Body weight, height, target weight',
          'Medication type and dose (e.g. tirzepatide, semaglutide)',
          'Injection dates, times, and body sites',
          'Blood glucose readings',
          'Blood test results (HbA1c, cholesterol, liver enzymes, kidney markers, thyroid, etc.)',
          'Side-effects and symptom logs',
          'Therapy start date, injection frequency',
          'Data imported from Apple HealthKit or Google Health Connect (steps, weight, glucose) — only if you explicitly grant permission',
        ],
      },
      sub3: {
        title: '2.3 User-generated content',
        bullets: [
          'Progress photos (optional, stored in encrypted backend)',
          'Blood test images uploaded for OCR processing',
          'Messages you send to the AI Advisor chat',
        ],
      },
      sub4: {
        title: '2.4 Subscription and purchase data',
        bullets: [
          'Active subscription tier (PRO / PREMIUM)',
          'Product identifier, renewal date, transaction identifier',
          'RevenueCat app-user identifier (same as Supabase UUID)',
          'We never see, receive, or store your payment card, bank account, or any financial credentials. All billing is handled by Apple or Google.',
        ],
      },
      sub5: {
        title: '2.5 Technical data',
        bullets: [
          'Device push-notification token (FCM on Android, APNs on iOS)',
          'App version, operating-system version',
          'Server-side error and crash logs (IP address may be temporarily logged by Vercel for abuse prevention, automatically rotated)',
        ],
      },
      sub6: {
        title: '2.6 What we DO NOT collect',
        bullets: [
          'We do not use advertising identifiers (IDFA / AAID)',
          'We do not track you across other apps or websites',
          'We do not sell or rent your data',
          'We do not use third-party analytics, marketing, or attribution SDKs',
          'We do not collect biometric identifiers, contact lists, call logs, SMS, microphone, or camera content (except blood-test images you explicitly upload)',
          'We do not collect data from minors (see Section 12)',
        ],
      },
    },
    s3: {
      title: '3. How We Use Your Data',
      p1: 'We use personal data strictly for:',
      bullets: [
        'Providing, maintaining, and improving our apps and services',
        'Storing and displaying your therapy data, weights, injections, and blood tests',
        'Generating personalized charts and progress insights',
        'Producing AI-powered text explanations of your data (AI Advisor, blood-test summary)',
        'Extracting text from uploaded blood-test images via OCR',
        'Sending you local reminders (injection, follow-ups, refill) — scheduled on your device, not by us',
        'Managing your subscription and unlocking paid features',
        'Diagnosing crashes and improving reliability',
        'Complying with legal obligations (tax, consumer protection)',
      ],
      p2: 'We do not use your health data for advertising, profiling, or automated legal decision-making.',
    },
    s4: {
      title: '4. Legal Basis (GDPR)',
      bullets: [
        ['Your explicit consent (Art. 9(2)(a)) —', 'for processing sensitive health data. You consent at sign-up and again when you grant HealthKit / Health Connect access.'],
        ['Performance of a contract (Art. 6(1)(b)) —', 'to deliver the subscription you paid for.'],
        ['Legitimate interest (Art. 6(1)(f)) —', 'for security, abuse prevention, and crash diagnostics.'],
        ['Legal obligation (Art. 6(1)(c)) —', 'for tax and accounting records of paid subscriptions.'],
      ],
      p2: 'You can withdraw consent at any time by deleting your account (see Section 8).',
    },
    s5: {
      title: '5. Third-Party Processors',
      p1: 'We share the minimum data necessary with the following sub-processors. Each is bound by a written Data Processing Agreement (DPA):',
      tableHeaders: ['Processor', 'Purpose', 'Data shared', 'Location'],
      rows: [
        ['Supabase, Inc.', 'Authentication + encrypted database hosting', 'Email, UUID, all user-entered records', 'EU — Ireland'],
        ['OpenAI, L.L.C.', 'AI text generation for AI Advisor and blood-test summaries', 'Chat messages, extracted blood-test values, therapy context', 'United States'],
        ['Google Cloud Vision', 'OCR text extraction from blood-test images', 'The image you upload', 'United States'],
        ['RevenueCat, Inc.', 'Subscription status mirror', 'Email, purchase identifiers, subscription tier', 'United States'],
        ['Apple Inc.', 'In-app purchase billing (iOS) and push notifications (APNs)', 'Transaction data, device token', 'United States / Ireland'],
        ['Google LLC', 'Google Play Billing (Android) and Firebase Cloud Messaging', 'Transaction data, device token', 'United States'],
        ['Vercel, Inc.', 'Backend API hosting', 'HTTP request metadata, JWT', 'EU edge + United States'],
      ],
      p2: 'All transfers to the United States rely on the EU-U.S. Data Privacy Framework or Standard Contractual Clauses (SCCs) where the framework does not apply. We do not knowingly transfer data outside the EU/US.',
    },
    s6: {
      title: '6. Data Retention',
      bullets: [
        ['Account + health data + photos + chat history:', 'retained until you delete your account.'],
        ['Server error logs:', 'retained up to 90 days.'],
        ['Subscription records (for tax / accounting compliance):', 'retained up to 7 years after account deletion, anonymized where possible (GDPR Art. 17(3)(b) / (e)).'],
        ['Database backups:', 'Supabase rolling backups up to 30 days after deletion.'],
      ],
    },
    s7: {
      title: '7. Your Rights (GDPR)',
      bullets: [
        ['Access (Art. 15) —', 'request a copy of your data'],
        ['Rectification (Art. 16) —', 'correct inaccurate data'],
        ['Erasure (Art. 17) —', 'delete your account and data (see Section 8)'],
        ['Data portability (Art. 20) —', 'export your data in CSV / PDF from Settings → Export Data'],
        ['Withdraw consent —', 'at any time (Art. 7(3))'],
        ['Object to processing —', '(Art. 21)'],
        ['Lodge a complaint —', 'with the Romanian data-protection authority ANSPDCP (www.dataprotection.ro) or with the authority of your country of residence'],
      ],
      p2: 'To exercise any right, email ',
    },
    s8: {
      title: '8. Account and Data Deletion',
      p1: 'You can permanently delete your account and all data at any time from inside the App:',
      steps: ['Sign in', 'Go to Settings → Delete Account', 'Confirm by typing “DELETE”'],
      p2: 'Upon deletion we irreversibly remove:',
      bullets: [
        'Your authentication record (email, login credentials)',
        'All therapy data, weights, injections, blood-test records, glucose, side-effects',
        'All uploaded photos and chat history',
        'Your subscription record in our database',
      ],
      warning: 'Important — subscription cancellation: Deleting your account does not automatically cancel your App Store or Google Play subscription. Cancel it separately in your device subscription settings.',
      p3: 'If you need help, email ',
    },
    s9: {
      title: '9. Health Data (HealthKit / Health Connect)',
      p1: 'With your explicit permission, the App reads the following from Apple HealthKit (iOS) or Google Health Connect (Android):',
      bullets: ['Body weight', 'Steps and daily activity', 'Blood glucose'],
      p2: 'This data is read-only from the platform’s secure health store and is never written back. It is used only to populate your in-app charts and logs.',
      p3: 'We never share HealthKit or Health Connect data with any third party outside the list in Section 5. You can revoke permission at any time in your device Settings → Privacy & Security → Health / Health Connect.',
    },
    s10: {
      title: '10. AI Features and Third-Party AI Processing (OpenAI)',
      p1: 'The App uses OpenAI, L.L.C. to generate AI-powered responses and health-related insights. When you use the AI Coach or Blood Test features, the information you choose to enter or upload may be sent to OpenAI for processing.',
      bullets: [
        ['Data sent:', 'Messages you type, blood test values or images, health context (weight, glucose, injections, lifestyle logs).'],
        ['Data NOT sent:', 'HealthKit / Health Connect background data — only included if you explicitly reference it in your message.'],
        ['Retention:', 'OpenAI may retain submitted data per their own policies. We do not control OpenAI’s retention practices.'],
      ],
      p2: 'Before any data is sent to OpenAI, the App asks for your explicit consent. You may revoke consent at any time from Settings → Account → Revoke AI Data Sharing Consent. Using AI features is entirely optional.',
      p3: 'The AI features do not provide medical diagnosis, treatment, emergency advice, or a replacement for professional medical care.',
    },
    s11: {
      title: '11. Subscriptions and Payments',
      p1: 'Premium features (AI Advisor, Blood Test analysis) require an active subscription:',
      bullets: [
        ['€4.99 / month or €49.99 / year', '— PRO plan'],
        ['€9.99 / month or €99.99 / year', '— PREMIUM plan'],
      ],
      p2: 'Payments are processed exclusively by Apple In-App Purchase (iOS) or Google Play Billing (Android). We never see or store your payment card or bank details. Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.',
    },
    s12: {
      title: '12. Medical Disclaimer — IMPORTANT',
      p1: 'This App is not a medical device. It does not provide medical advice, diagnosis, or treatment.',
      bullets: [
        'Charts, calculated trends, and AI-generated text are informational only and must not replace professional medical advice.',
        'Always consult your doctor before any decision related to GLP-1 medication (Mounjaro, Ozempic, Wegovy), insulin, dose adjustment, blood-test interpretation, diet, or exercise.',
        'AI responses may be incomplete, outdated, or factually incorrect. Do not rely on them for urgent, critical, or life-threatening decisions.',
        'In case of a medical emergency, contact your local emergency number immediately (112 in the EU, 911 in the USA).',
      ],
      p2: 'By using the App you acknowledge and accept these limitations.',
    },
    s13: {
      title: '13. Age Restriction',
      p1: 'The App is intended for adults aged 18 years or older. It is not directed at children and we do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe your child has provided data, please contact us at ',
    },
    s14: {
      title: '14. Security',
      bullets: [
        ['TLS 1.2+', 'encryption for all traffic'],
        ['Encryption at rest (AES-256)', 'by Supabase'],
        ['Row-Level Security (RLS)', 'policies — each user can only access their own records'],
        ['JWT authentication', 'enforced on every backend endpoint'],
        ['Service-role keys', 'stored only in secure server-side environment variables'],
        ['Webhook signatures', 'verified with timing-safe comparison'],
        'Regular dependency updates and security audits',
      ],
      p2: 'No transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we work continuously to reduce risk.',
    },
    s15: {
      title: '15. Cookies, Tracking, and Analytics',
      p1: 'The App does not use cookies, advertising SDKs, cross-app tracking, or third-party analytics. It is declared as not tracking under Apple App Tracking Transparency and its iOS Privacy Manifest declares no tracking domains.',
      p2: 'This Privacy Policy is hosted at https://mysmartsapp.com/privacy. The same page may set strictly-necessary cookies only (for language preference). No advertising or analytics cookies are set.',
    },
    s16: {
      title: '16. Changes to This Policy',
      p1: 'We may update this Privacy Policy from time to time to reflect changes to the App, legal requirements, or sub-processors. The updated policy is always posted at https://mysmartsapp.com/privacy with a new “Last Updated” date.',
      p2: 'Continued use of the App after a material change constitutes acceptance of the revised policy.',
    },
    s17: {
      title: '17. Contact',
      bullets: [
        ['Email:', 'info@mysmartsapp.com'],
        ['Developer:', 'Savvas Alexiou'],
        ['Jurisdiction:', 'European Union / Romania'],
        ['Romanian DPA:', 'ANSPDCP — www.dataprotection.ro'],
      ],
    },
    footer: {
      label: 'Contact',
      p: 'Have questions or need help? We’re here for you.',
      button: 'Send a Message',
    },
    bottomNote: 'This policy is written in English as the authoritative version. Localized translations may be provided for convenience; in case of conflict, the English version prevails.',
  },

  el: {
    back: 'Πίσω στην αρχική',
    title: 'Πολιτική Απορρήτου',
    meta: {
      appLabel: 'Εφαρμογή:',
      appVal: 'Mounjaro & Ozempic AI Tracker (Google Play) / AIHealth Trackerapp (App Store)',
      updatedLabel: 'Τελευταία Ενημέρωση:',
      updatedVal: '6 Μαΐου 2026',
      effectiveLabel: 'Ημερομηνία Ισχύος:',
      effectiveVal: 'Κατά την πρώτη δημόσια κυκλοφορία της εφαρμογής',
    },
    s1: {
      title: '1. Ποιοι Είμαστε',
      p1: 'Αυτή η Πολιτική Απορρήτου εξηγεί πώς η Mysmartsapp («εμείς» ή «μας») συλλέγει, χρησιμοποιεί, προστατεύει και κοινοποιεί προσωπικά δεδομένα όταν οι χρήστες αποκτούν πρόσβαση ή χρησιμοποιούν τις κινητές εφαρμογές και τις σχετικές υπηρεσίες μας.',
      box: {
        controllerLabel: 'Υπεύθυνος Επεξεργασίας / Εκδότης:',
        controllerVal: 'Savvas Alexiou',
        emailLabel: 'Email επικοινωνίας:',
        jurisdictionLabel: 'Δικαιοδοσία:',
        jurisdictionVal: 'Ευρωπαϊκή Ένωση / Ρουμανία',
      },
      p2: 'Για ερωτήσεις σχετικά με αυτήν την Πολιτική, δικαιώματα απορρήτου ή αιτήματα προστασίας δεδομένων, επικοινωνήστε μαζί μας στο ',
      p3: 'Βάσει του Γενικού Κανονισμού Προστασίας Δεδομένων της ΕΕ (GDPR) είμαστε ο «υπεύθυνος επεξεργασίας» των προσωπικών δεδομένων που μας παρέχετε. Τα δικαιώματά σας περιγράφονται στην Ενότητα 7.',
    },
    s2: {
      title: '2. Ποια Δεδομένα Συλλέγουμε',
      sub1: {
        title: '2.1 Δεδομένα λογαριασμού',
        bullets: [
          'Διεύθυνση email (απαιτείται για εγγραφή)',
          'Αναγνωριστικό χρήστη από Supabase (UUID)',
          'Κρυπτογραφημένα tokens ταυτοποίησης',
        ],
      },
      sub2: {
        title: '2.2 Δεδομένα υγείας και θεραπείας',
        sensitiveLabel: '(ευαίσθητα — ειδική κατηγορία βάσει GDPR Άρθρο 9)',
        bullets: [
          'Σωματικό βάρος, ύψος, στόχος βάρους',
          'Τύπος και δόση φαρμάκου (π.χ. tirzepatide, semaglutide)',
          'Ημερομηνίες, ώρες και σημεία ένεσης',
          'Μετρήσεις γλυκόζης αίματος',
          'Αποτελέσματα εξετάσεων αίματος (HbA1c, χοληστερόλη, ηπατικά ένζυμα, νεφρικοί δείκτες, θυρεοειδής, κ.λπ.)',
          'Ημερολόγια παρενεργειών και συμπτωμάτων',
          'Ημερομηνία έναρξης θεραπείας, συχνότητα ενέσεων',
          'Δεδομένα από Apple HealthKit ή Google Health Connect (βήματα, βάρος, γλυκόζη) — μόνο αν το επιτρέψετε ρητά',
        ],
      },
      sub3: {
        title: '2.3 Περιεχόμενο που δημιουργείτε εσείς',
        bullets: [
          'Φωτογραφίες προόδου (προαιρετικό, αποθηκεύονται κρυπτογραφημένα)',
          'Φωτογραφίες εξετάσεων αίματος για OCR επεξεργασία',
          'Μηνύματα που στέλνετε στη συνομιλία με τον AI Advisor',
        ],
      },
      sub4: {
        title: '2.4 Δεδομένα συνδρομής και αγορών',
        bullets: [
          'Ενεργό επίπεδο συνδρομής (PRO / PREMIUM)',
          'Αναγνωριστικό προϊόντος, ημερομηνία ανανέωσης, αναγνωριστικό συναλλαγής',
          'Αναγνωριστικό χρήστη RevenueCat (ίδιο με Supabase UUID)',
          'Δεν βλέπουμε, λαμβάνουμε ή αποθηκεύουμε ποτέ την κάρτα σας, τον τραπεζικό λογαριασμό ή οικονομικά στοιχεία. Όλες οι χρεώσεις γίνονται από Apple ή Google.',
        ],
      },
      sub5: {
        title: '2.5 Τεχνικά δεδομένα',
        bullets: [
          'Token push ειδοποίησης (FCM σε Android, APNs σε iOS)',
          'Έκδοση εφαρμογής, έκδοση λειτουργικού συστήματος',
          'Αρχεία καταγραφής σφαλμάτων διακομιστή (η διεύθυνση IP ενδέχεται να καταγράφεται προσωρινά από Vercel για αποτροπή κατάχρησης)',
        ],
      },
      sub6: {
        title: '2.6 Τι ΔΕΝ συλλέγουμε',
        bullets: [
          'Δεν χρησιμοποιούμε αναγνωριστικά διαφήμισης (IDFA / AAID)',
          'Δεν σας παρακολουθούμε σε άλλες εφαρμογές ή ιστοσελίδες',
          'Δεν πωλούμε ή ενοικιάζουμε τα δεδομένα σας',
          'Δεν χρησιμοποιούμε SDKs τρίτων για analytics, marketing ή attribution',
          'Δεν συλλέγουμε βιομετρικά αναγνωριστικά, λίστες επαφών, αρχεία κλήσεων, SMS, μικρόφωνο ή κάμερα (εκτός από φωτογραφίες εξετάσεων που ανεβάζετε εσείς ρητά)',
          'Δεν συλλέγουμε δεδομένα ανηλίκων (βλ. Ενότητα 12)',
        ],
      },
    },
    s3: {
      title: '3. Πώς Χρησιμοποιούμε τα Δεδομένα σας',
      p1: 'Χρησιμοποιούμε τα προσωπικά δεδομένα αποκλειστικά για:',
      bullets: [
        'Παροχή, συντήρηση και βελτίωση των εφαρμογών και υπηρεσιών μας',
        'Αποθήκευση και εμφάνιση των δεδομένων θεραπείας, βάρους, ενέσεων και εξετάσεων αίματος',
        'Δημιουργία εξατομικευμένων γραφημάτων και πληροφοριών προόδου',
        'Παραγωγή AI-powered επεξηγήσεων των δεδομένων σας (AI Advisor, ανάλυση εξετάσεων αίματος)',
        'Εξαγωγή κειμένου από φωτογραφίες εξετάσεων αίματος μέσω OCR',
        'Αποστολή τοπικών υπενθυμίσεων (ένεση, επανέλεγχοι, ανανέωση) — προγραμματισμένες στη συσκευή σας',
        'Διαχείριση της συνδρομής σας και ξεκλείδωμα πληρωμένων λειτουργιών',
        'Διάγνωση σφαλμάτων και βελτίωση αξιοπιστίας',
        'Συμμόρφωση με νομικές υποχρεώσεις (φορολογία, προστασία καταναλωτή)',
      ],
      p2: 'Δεν χρησιμοποιούμε τα δεδομένα υγείας σας για διαφήμιση, profiling ή αυτοματοποιημένη λήψη νομικών αποφάσεων.',
    },
    s4: {
      title: '4. Νομική Βάση (GDPR)',
      bullets: [
        ['Ρητή συγκατάθεσή σας (Άρθρο 9(2)(α)) —', 'για επεξεργασία ευαίσθητων δεδομένων υγείας. Δίνετε συγκατάθεση κατά την εγγραφή και πάλι όταν παραχωρείτε πρόσβαση σε HealthKit / Health Connect.'],
        ['Εκτέλεση σύμβασης (Άρθρο 6(1)(β)) —', 'για παροχή της συνδρομής που πληρώσατε.'],
        ['Έννομο συμφέρον (Άρθρο 6(1)(στ)) —', 'για ασφάλεια, αποτροπή κατάχρησης και διαγνωστικά σφαλμάτων.'],
        ['Νομική υποχρέωση (Άρθρο 6(1)(γ)) —', 'για φορολογικά και λογιστικά αρχεία πληρωμένων συνδρομών.'],
      ],
      p2: 'Μπορείτε να αποσύρετε τη συγκατάθεσή σας ανά πάσα στιγμή διαγράφοντας τον λογαριασμό σας (βλ. Ενότητα 8).',
    },
    s5: {
      title: '5. Τρίτοι Επεξεργαστές Δεδομένων',
      p1: 'Μοιραζόμαστε τα ελάχιστα απαραίτητα δεδομένα με τους παρακάτω υπεργολάβους επεξεργασίας. Κάθε ένας δεσμεύεται από γραπτή Σύμβαση Επεξεργασίας Δεδομένων (DPA):',
      tableHeaders: ['Επεξεργαστής', 'Σκοπός', 'Δεδομένα που κοινοποιούνται', 'Τοποθεσία'],
      rows: [
        ['Supabase, Inc.', 'Ταυτοποίηση + κρυπτογραφημένη φιλοξενία βάσης δεδομένων', 'Email, UUID, όλες οι καταχωρήσεις χρήστη', 'ΕΕ — Ιρλανδία'],
        ['OpenAI, L.L.C.', 'Δημιουργία AI κειμένου για AI Advisor και ανάλυση εξετάσεων αίματος', 'Μηνύματα συνομιλίας, τιμές εξετάσεων αίματος, θεραπευτικό πλαίσιο', 'ΗΠΑ'],
        ['Google Cloud Vision', 'Εξαγωγή κειμένου OCR από φωτογραφίες εξετάσεων αίματος', 'Η φωτογραφία που ανεβάζετε', 'ΗΠΑ'],
        ['RevenueCat, Inc.', 'Καταγραφή κατάστασης συνδρομής', 'Email, αναγνωριστικά αγοράς, επίπεδο συνδρομής', 'ΗΠΑ'],
        ['Apple Inc.', 'Χρέωση αγορών εντός εφαρμογής (iOS) και push ειδοποιήσεις (APNs)', 'Δεδομένα συναλλαγής, token συσκευής', 'ΗΠΑ / Ιρλανδία'],
        ['Google LLC', 'Google Play Billing (Android) και Firebase Cloud Messaging', 'Δεδομένα συναλλαγής, token συσκευής', 'ΗΠΑ'],
        ['Vercel, Inc.', 'Φιλοξενία backend API', 'Μεταδεδομένα HTTP αιτήματος, JWT', 'ΕΕ edge + ΗΠΑ'],
      ],
      p2: 'Όλες οι μεταφορές δεδομένων στις ΗΠΑ βασίζονται στο Πλαίσιο Απορρήτου ΕΕ-ΗΠΑ ή σε Τυπικές Συμβατικές Ρήτρες (SCC) όπου το πλαίσιο δεν εφαρμόζεται.',
    },
    s6: {
      title: '6. Διατήρηση Δεδομένων',
      bullets: [
        ['Λογαριασμός + δεδομένα υγείας + φωτογραφίες + ιστορικό συνομιλιών:', 'διατηρούνται έως ότου διαγράψετε τον λογαριασμό σας.'],
        ['Αρχεία καταγραφής σφαλμάτων διακομιστή:', 'διατηρούνται έως 90 ημέρες.'],
        ['Αρχεία συνδρομής (για φορολογική/λογιστική συμμόρφωση):', 'διατηρούνται έως 7 χρόνια μετά τη διαγραφή λογαριασμού, ανωνυμοποιημένα όπου είναι δυνατό (GDPR Άρθρο 17(3)(β) / (ε)).'],
        ['Αντίγραφα ασφαλείας βάσης δεδομένων:', 'Supabase rolling backups έως 30 ημέρες μετά τη διαγραφή.'],
      ],
    },
    s7: {
      title: '7. Τα Δικαιώματά σας (GDPR)',
      bullets: [
        ['Πρόσβαση (Άρθρο 15) —', 'αίτημα αντιγράφου των δεδομένων σας'],
        ['Διόρθωση (Άρθρο 16) —', 'διόρθωση ανακριβών δεδομένων'],
        ['Διαγραφή (Άρθρο 17) —', 'διαγραφή λογαριασμού και δεδομένων (βλ. Ενότητα 8)'],
        ['Φορητότητα δεδομένων (Άρθρο 20) —', 'εξαγωγή δεδομένων σε CSV / PDF από Ρυθμίσεις → Εξαγωγή Δεδομένων'],
        ['Ανάκληση συγκατάθεσης —', 'ανά πάσα στιγμή (Άρθρο 7(3))'],
        ['Εναντίωση στην επεξεργασία —', '(Άρθρο 21)'],
        ['Υποβολή καταγγελίας —', 'στη ρουμανική αρχή προστασίας δεδομένων ANSPDCP (www.dataprotection.ro) ή στην αρχή της χώρας διαμονής σας'],
      ],
      p2: 'Για να ασκήσετε οποιοδήποτε δικαίωμα, αποστείλετε email στο ',
    },
    s8: {
      title: '8. Διαγραφή Λογαριασμού και Δεδομένων',
      p1: 'Μπορείτε να διαγράψετε μόνιμα τον λογαριασμό και όλα τα δεδομένα σας ανά πάσα στιγμή μέσα από την εφαρμογή:',
      steps: ['Συνδεθείτε', 'Μεταβείτε στις Ρυθμίσεις → Διαγραφή Λογαριασμού', 'Επιβεβαιώστε πληκτρολογώντας «DELETE»'],
      p2: 'Κατά τη διαγραφή αφαιρούμε αμετάκλητα:',
      bullets: [
        'Τον εγγραφή ταυτοποίησής σας (email, στοιχεία σύνδεσης)',
        'Όλα τα δεδομένα θεραπείας, βάρους, ενέσεων, εξετάσεων αίματος, γλυκόζης και παρενεργειών',
        'Όλες τις φωτογραφίες που έχετε ανεβάσει και το ιστορικό συνομιλιών',
        'Τον εγγραφή συνδρομής σας στη βάση δεδομένων μας',
      ],
      warning: 'Σημαντικό — ακύρωση συνδρομής: Η διαγραφή του λογαριασμού δεν ακυρώνει αυτόματα τη συνδρομή σας στο App Store ή Google Play. Ακυρώστε τη ξεχωριστά στις ρυθμίσεις συνδρομής της συσκευής σας.',
      p3: 'Εάν χρειάζεστε βοήθεια, αποστείλετε email στο ',
    },
    s9: {
      title: '9. Δεδομένα Υγείας (HealthKit / Health Connect)',
      p1: 'Με ρητή άδειά σας, η εφαρμογή διαβάζει τα εξής από το Apple HealthKit (iOS) ή Google Health Connect (Android):',
      bullets: ['Σωματικό βάρος', 'Βήματα και καθημερινή δραστηριότητα', 'Γλυκόζη αίματος'],
      p2: 'Αυτά τα δεδομένα είναι μόνο για ανάγνωση από τον ασφαλή χώρο αποθήκευσης υγείας της πλατφόρμας και δεν εγγράφονται ποτέ πίσω. Χρησιμοποιούνται μόνο για να συμπληρωθούν τα γραφήματα και τα αρχεία καταγραφής σας.',
      p3: 'Δεν κοινοποιούμε ποτέ δεδομένα HealthKit ή Health Connect σε τρίτους εκτός της λίστας στην Ενότητα 5. Μπορείτε να ανακαλέσετε την άδεια ανά πάσα στιγμή στις Ρυθμίσεις → Απόρρητο & Ασφάλεια → Υγεία / Health Connect.',
    },
    s10: {
      title: '10. Λειτουργίες AI και Επεξεργασία από Τρίτο AI (OpenAI)',
      p1: 'Η εφαρμογή χρησιμοποιεί την OpenAI, L.L.C. για τη δημιουργία AI-powered απαντήσεων και πληροφοριών σχετικών με την υγεία. Όταν χρησιμοποιείτε τον AI Coach ή τις λειτουργίες Εξετάσεων Αίματος, οι πληροφορίες που εισάγετε ή ανεβάζετε ενδέχεται να αποστέλλονται στην OpenAI.',
      bullets: [
        ['Δεδομένα που αποστέλλονται:', 'Μηνύματα που πληκτρολογείτε, τιμές εξετάσεων αίματος ή φωτογραφίες, θεραπευτικό πλαίσιο (βάρος, γλυκόζη, ενέσεις, καταχωρήσεις τρόπου ζωής).'],
        ['Δεδομένα που ΔΕΝ αποστέλλονται:', 'Δεδομένα HealthKit / Health Connect στο παρασκήνιο — περιλαμβάνονται μόνο αν τα αναφέρετε ρητά στο μήνυμά σας.'],
        ['Διατήρηση:', 'Η OpenAI ενδέχεται να διατηρήσει υποβληθέντα δεδομένα βάσει των δικών της πολιτικών. Δεν ελέγχουμε τις πρακτικές διατήρησης δεδομένων της OpenAI.'],
      ],
      p2: 'Πριν αποσταλεί οποιοδήποτε δεδομένο στην OpenAI, η εφαρμογή ζητά ρητή συγκατάθεσή σας. Μπορείτε να την ανακαλέσετε από Ρυθμίσεις → Λογαριασμός → Ανάκληση Συγκατάθεσης AI. Η χρήση λειτουργιών AI είναι προαιρετική.',
      p3: 'Οι λειτουργίες AI δεν παρέχουν ιατρική διάγνωση, θεραπεία, επείγουσα ιατρική συμβουλή ή υποκατάστατο επαγγελματικής ιατρικής φροντίδας.',
    },
    s11: {
      title: '11. Συνδρομές και Πληρωμές',
      p1: 'Οι premium λειτουργίες (AI Advisor, ανάλυση εξετάσεων αίματος) απαιτούν ενεργή συνδρομή:',
      bullets: [
        ['€4,99 / μήνα ή €49,99 / έτος', '— πλάνο PRO'],
        ['€9,99 / μήνα ή €99,99 / έτος', '— πλάνο PREMIUM'],
      ],
      p2: 'Οι πληρωμές επεξεργάζονται αποκλειστικά από Apple In-App Purchase (iOS) ή Google Play Billing (Android). Δεν βλέπουμε ούτε αποθηκεύουμε στοιχεία κάρτας ή τραπεζικά στοιχεία. Οι συνδρομές ανανεώνονται αυτόματα εκτός αν ακυρωθούν τουλάχιστον 24 ώρες πριν το τέλος της τρέχουσας περιόδου.',
    },
    s12: {
      title: '12. Ιατρική Αποποίηση Ευθύνης — ΣΗΜΑΝΤΙΚΟ',
      p1: 'Αυτή η εφαρμογή δεν είναι ιατρικό βοήθημα. Δεν παρέχει ιατρικές συμβουλές, διάγνωση ή θεραπεία.',
      bullets: [
        'Τα γραφήματα, οι υπολογισμένες τάσεις και τα AI-generated κείμενα είναι αποκλειστικά ενημερωτικά και δεν πρέπει να αντικαθιστούν επαγγελματική ιατρική συμβουλή.',
        'Πάντα συμβουλευτείτε τον γιατρό σας πριν από οποιαδήποτε απόφαση σχετικά με φάρμακα GLP-1 (Mounjaro, Ozempic, Wegovy), ινσουλίνη, προσαρμογή δόσης ή ερμηνεία εξετάσεων αίματος.',
        'Οι AI απαντήσεις μπορεί να είναι ελλιπείς, απαρχαιωμένες ή λανθασμένες. Μην βασίζεστε σε αυτές για επείγουσες ή κρίσιμες αποφάσεις.',
        'Σε περίπτωση ιατρικής έκτακτης ανάγκης, επικοινωνήστε αμέσως με τον τοπικό αριθμό επείγουσας ανάγκης (112 στην ΕΕ, 911 στις ΗΠΑ).',
      ],
      p2: 'Χρησιμοποιώντας την εφαρμογή αναγνωρίζετε και αποδέχεστε αυτούς τους περιορισμούς.',
    },
    s13: {
      title: '13. Ηλικιακός Περιορισμός',
      p1: 'Η εφαρμογή απευθύνεται σε ενήλικες 18 ετών και άνω. Δεν απευθύνεται σε παιδιά και δεν συλλέγουμε εν γνώσει μας προσωπικά δεδομένα ατόμων κάτω των 18. Εάν είστε γονέας ή κηδεμόνας και πιστεύετε ότι το παιδί σας έχει παράσχει δεδομένα, επικοινωνήστε μαζί μας στο ',
    },
    s14: {
      title: '14. Ασφάλεια',
      bullets: [
        ['TLS 1.2+', 'κρυπτογράφηση για όλη την κίνηση δεδομένων'],
        ['Κρυπτογράφηση at rest (AES-256)', 'από Supabase'],
        ['Row-Level Security (RLS)', 'πολιτικές — κάθε χρήστης έχει πρόσβαση μόνο στα δικά του δεδομένα'],
        ['Ταυτοποίηση JWT', 'εφαρμόζεται σε κάθε endpoint του backend'],
        ['Κλειδιά service-role', 'αποθηκεύονται μόνο σε ασφαλείς μεταβλητές περιβάλλοντος από την πλευρά του διακομιστή'],
        ['Υπογραφές webhook', 'επαληθεύονται με timing-safe σύγκριση'],
        'Τακτικές ενημερώσεις εξαρτήσεων και έλεγχοι ασφαλείας',
      ],
      p2: 'Καμία μετάδοση μέσω διαδικτύου δεν είναι 100% ασφαλής. Δεν μπορούμε να εγγυηθούμε απόλυτη ασφάλεια, αλλά εργαζόμαστε συνεχώς για τη μείωση του κινδύνου.',
    },
    s15: {
      title: '15. Cookies, Παρακολούθηση και Analytics',
      p1: 'Η εφαρμογή δεν χρησιμοποιεί cookies, SDKs διαφήμισης, cross-app παρακολούθηση ή analytics τρίτων. Δηλώνεται ως μη παρακολούθηση βάσει του Apple App Tracking Transparency.',
      p2: 'Αυτή η Πολιτική Απορρήτου φιλοξενείται στο https://mysmartsapp.com/privacy. Η ίδια σελίδα ενδέχεται να ορίζει αποκλειστικά αναγκαία cookies (για προτίμηση γλώσσας). Δεν ορίζονται cookies διαφήμισης ή analytics.',
    },
    s16: {
      title: '16. Αλλαγές σε Αυτήν την Πολιτική',
      p1: 'Ενδέχεται να ενημερώσουμε αυτήν την Πολιτική Απορρήτου κατά καιρούς για να αντικατοπτρίζει αλλαγές στην εφαρμογή, νομικές απαιτήσεις ή υπεργολάβους επεξεργασίας. Η ενημερωμένη πολιτική δημοσιεύεται πάντα στο https://mysmartsapp.com/privacy με νέα ημερομηνία «Τελευταία Ενημέρωση».',
      p2: 'Η συνεχιζόμενη χρήση της εφαρμογής μετά από ουσιαστική αλλαγή συνιστά αποδοχή της αναθεωρημένης πολιτικής.',
    },
    s17: {
      title: '17. Επικοινωνία',
      bullets: [
        ['Email:', 'info@mysmartsapp.com'],
        ['Developer:', 'Savvas Alexiou'],
        ['Δικαιοδοσία:', 'Ευρωπαϊκή Ένωση / Ρουμανία'],
        ['Ρουμανική Αρχή Προστασίας Δεδομένων:', 'ANSPDCP — www.dataprotection.ro'],
      ],
    },
    footer: {
      label: 'Επικοινωνία',
      p: 'Έχετε απορίες ή χρειάζεστε βοήθεια; Είμαστε εδώ για εσάς.',
      button: 'Στείλε Μήνυμα',
    },
    bottomNote: 'Η παρούσα πολιτική έχει συνταχθεί στα Αγγλικά ως η αυθεντική έκδοση. Η ελληνική μετάφραση παρέχεται για ευκολία· σε περίπτωση αντίφασης, η Αγγλική έκδοση υπερισχύει.',
  },
}
