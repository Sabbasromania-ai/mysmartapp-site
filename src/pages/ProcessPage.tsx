import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, setMeta, setOG, setCanonical } from '../LangContext'

// ── Step icons ────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
)
const PenToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    <path d="M2 2l7.586 7.586"/>
    <circle cx="11" cy="11" r="2"/>
  </svg>
)
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)
const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m3.5 11.5 1 4.5 4.5 1 8-8-5.5-5.5z"/>
    <path d="M5 9.5 4 6.5 7 5l2.5 2.5"/>
    <path d="M14.5 9.5 12.5 17.5 14 21 17 18.5Z"/>
  </svg>
)

// ── Deliverable icons ─────────────────────────────────────────
const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)
const LayoutIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
)
const MonitorCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <polyline points="7 9 10 12 15 7"/>
  </svg>
)
const HeadsetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
)

// ── Why / check icons ─────────────────────────────────────────
const ShieldBigIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

// ── Data ──────────────────────────────────────────────────────
const steps = [
  {
    color: '#4fc3f7', icon: <SearchIcon />,
    en: { num: '01', title: 'Discovery Call', desc: 'We understand your business, goals, audience, current workflow, and what problem the product needs to solve.' },
    el: { num: '01', title: 'Discovery Call', desc: 'Κατανοούμε την επιχείρησή σου, στόχους, κοινό, ροή εργασίας και τι πρόβλημα πρέπει να λύσει το προϊόν.' },
  },
  {
    color: '#9c5ff7', icon: <ClipboardIcon />,
    en: { num: '02', title: 'Strategy & Scope', desc: 'We define the product scope, key features, tech stack, timeline, cost, and launch plan before development starts.' },
    el: { num: '02', title: 'Στρατηγική & Εύρος', desc: 'Ορίζουμε εύρος προϊόντος, βασικά features, tech stack, χρονοδιάγραμμα, κόστος και πλάνο πριν ξεκινήσει η ανάπτυξη.' },
  },
  {
    color: '#ffb300', icon: <PenToolIcon />,
    en: { num: '03', title: 'UI/UX Design', desc: 'We design clean, user-tested screens and flows so you can see how the product will work before it is built.' },
    el: { num: '03', title: 'UI/UX Design', desc: 'Σχεδιάζουμε καθαρά screens και flows ώστε να δεις πώς θα λειτουργεί το προϊόν πριν χτιστεί.' },
  },
  {
    color: '#38bdf8', icon: <CodeIcon />,
    en: { num: '04', title: 'Development', desc: 'We build the product: frontend, backend, database, integrations, AI features, automation, and admin tools.' },
    el: { num: '04', title: 'Ανάπτυξη', desc: 'Χτίζουμε το προϊόν: frontend, backend, database, integrations, AI features, automation και admin tools.' },
  },
  {
    color: '#34d399', icon: <ShieldCheckIcon />,
    en: { num: '05', title: 'Testing & QA', desc: 'We test the product across devices, browsers, flows, forms, payments, automations, and edge cases before launch.' },
    el: { num: '05', title: 'Testing & QA', desc: 'Δοκιμάζουμε το προϊόν σε devices, browsers, flows, forms, πληρωμές, automations και edge cases πριν το launch.' },
  },
  {
    color: '#a78bfa', icon: <RocketIcon />,
    en: { num: '06', title: 'Launch & Support', desc: 'We deploy, monitor, fix issues, and support improvements after launch.' },
    el: { num: '06', title: 'Launch & Support', desc: 'Κάνουμε deploy, παρακολουθούμε, διορθώνουμε προβλήματα και υποστηρίζουμε βελτιώσεις μετά το launch.' },
  },
]

const deliverables = [
  {
    color: '#4fc3f7', icon: <TargetIcon />,
    en: { title: 'Clear scope', text: 'You know exactly what will be built, which features are included, and what is not included.' },
    el: { title: 'Σαφές εύρος', text: 'Γνωρίζεις ακριβώς τι θα χτιστεί, ποια features περιλαμβάνονται και τι εξαιρείται.' },
  },
  {
    color: '#9c5ff7', icon: <LayoutIcon />,
    en: { title: 'Transparent delivery', text: 'You get structured progress, feedback points, and realistic expectations during development.' },
    el: { title: 'Διαφανής παράδοση', text: 'Λαμβάνεις δομημένη πρόοδο, feedback points και ρεαλιστικές προσδοκίες κατά την ανάπτυξη.' },
  },
  {
    color: '#34d399', icon: <MonitorCheckIcon />,
    en: { title: 'Launch-ready product', text: 'The goal is not just a design. The goal is a working product that can be used by real customers.' },
    el: { title: 'Έτοιμο προϊόν', text: 'Ο στόχος δεν είναι απλώς σχεδιασμός. Ο στόχος είναι ένα λειτουργικό προϊόν για πραγματικούς πελάτες.' },
  },
  {
    color: '#ffb300', icon: <HeadsetIcon />,
    en: { title: 'Support after launch', text: 'After launch, we can help with fixes, improvements, analytics, and new features.' },
    el: { title: 'Υποστήριξη μετά launch', text: 'Μετά το launch, μπορούμε να βοηθήσουμε με fixes, βελτιώσεις, analytics και νέα features.' },
  },
]

const whyList = [
  { en: 'Clear scope before development starts', el: 'Σαφές εύρος πριν ξεκινήσει η ανάπτυξη' },
  { en: 'Better cost and timeline control', el: 'Καλύτερος έλεγχος κόστους και χρονοδιαγράμματος' },
  { en: 'Fewer misunderstandings', el: 'Λιγότερες παρεξηγήσεις' },
  { en: 'Cleaner design and development handoff', el: 'Καθαρότερη παράδοση σχεδιασμού και ανάπτυξης' },
  { en: 'Proper testing before launch', el: 'Σωστό testing πριν το launch' },
  { en: 'Support after delivery', el: 'Υποστήριξη μετά την παράδοση' },
]

// ── Page ──────────────────────────────────────────────────────
export default function ProcessPage() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const isEl = lang === 'el'

  // Reveal animations (for .reveal elements — used by shared components)
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 60)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.05 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // SEO
  useEffect(() => {
    window.scrollTo(0, 0)
    const title = isEl
      ? 'Διαδικασία — mysmartsapp | Custom Apps, Websites & AI'
      : 'Process — mysmartsapp | Custom Apps, Websites & AI'
    const desc = isEl
      ? 'Η διαδικασία μας: 6 βήματα από ιδέα έως launch. Ανακαλύψτε πώς μετατρέπουμε ιδέες σε λειτουργικά ψηφιακά προϊόντα.'
      : 'Our process: 6 clear steps from idea to launch. Discover how we turn ideas into working digital products.'
    document.title = title
    setMeta('description', desc)
    setOG('og:title', title)
    setOG('og:description', desc)
    setCanonical('https://mysmartsapp.com/process')
  }, [lang])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ── */}
      <div className="prc-hero">

        {/* Left */}
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            <span className="section-label-dot" />
            {isEl ? 'ΔΙΑΔΙΚΑΣΙΑ' : 'PROCESS'}
          </div>
          <h1 className="prc-h1">
            {isEl ? (
              <>Από ιδέα σε launch{' '}<span className="prc-h1-accent">χωρίς σύγχυση.</span></>
            ) : (
              <>From idea to launch{' '}<span className="prc-h1-accent">without confusion.</span></>
            )}
          </h1>
          <p className="prc-sub">
            {isEl
              ? 'Μια σαφής βήμα-προς-βήμα διαδικασία για να μετατρέψεις την ιδέα σου για app, website, e-shop, AI εργαλείο ή αυτοματισμό σε ένα λειτουργικό ψηφιακό προϊόν.'
              : 'A clear step-by-step process for turning your app, website, e-shop, AI tool, or automation idea into a working digital product.'}
          </p>
          <p className="prc-para">
            {isEl
              ? 'Ορίζουμε το εύρος, σχεδιάζουμε την εμπειρία, χτίζουμε το προϊόν, το δοκιμάζουμε σωστά και υποστηρίζουμε το launch ώστε να ξέρεις ακριβώς τι χτίζεται, πώς λειτουργεί και τι γίνεται στη συνέχεια.'
              : 'We define the scope, design the experience, build the product, test it properly, and support the launch so you know exactly what is being built, how it works, and what happens next.'}
          </p>
        </div>

        {/* Right — process flow visual */}
        <div className="prc-hero-visual" aria-hidden="true">
          <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" className="prc-hero-svg">
            <defs>
              <radialGradient id="prg1" cx="65%" cy="28%" r="55%">
                <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.16"/>
                <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="prg2" cx="20%" cy="75%" r="45%">
                <stop offset="0%" stopColor="#9c5ff7" stopOpacity="0.13"/>
                <stop offset="100%" stopColor="#9c5ff7" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="prg3" cx="82%" cy="82%" r="38%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.11"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
              </radialGradient>
              {/* Dot grid pattern */}
              <pattern id="pdots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="0.7" fill="rgba(255,255,255,0.07)"/>
              </pattern>
              {/* Multi-color gradient for the process path */}
              <linearGradient id="pathGrad" gradientUnits="userSpaceOnUse" x1="50" y1="248" x2="418" y2="42">
                <stop offset="0%"   stopColor="#4fc3f7"/>
                <stop offset="20%"  stopColor="#9c5ff7"/>
                <stop offset="40%"  stopColor="#ffb300"/>
                <stop offset="60%"  stopColor="#38bdf8"/>
                <stop offset="82%"  stopColor="#34d399"/>
                <stop offset="100%" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
            {/* Dot grid background */}
            <rect width="440" height="300" fill="url(#pdots)"/>
            {/* Atmosphere */}
            <ellipse cx="270" cy="85" rx="170" ry="130" fill="url(#prg1)"/>
            <ellipse cx="90" cy="225" rx="120" ry="95" fill="url(#prg2)"/>
            <ellipse cx="380" cy="248" rx="85" ry="75" fill="url(#prg3)"/>
            {/* Scattered particles — cyan */}
            <g fill="#00dcff">
              <circle cx="160" cy="52" r="1.5" opacity="0.40"/>
              <circle cx="232" cy="38" r="1.0" opacity="0.32"/>
              <circle cx="322" cy="32" r="1.5" opacity="0.38"/>
              <circle cx="402" cy="112" r="1.0" opacity="0.30"/>
              <circle cx="28"  cy="168" r="1.5" opacity="0.35"/>
              <circle cx="76"  cy="128" r="1.0" opacity="0.28"/>
            </g>
            {/* Scattered particles — purple */}
            <g fill="#9c5ff7">
              <circle cx="186" cy="102" r="1.5" opacity="0.42"/>
              <circle cx="70"  cy="288" r="1.5" opacity="0.35"/>
              <circle cx="242" cy="86"  r="1.0" opacity="0.30"/>
              <circle cx="172" cy="265" r="1.5" opacity="0.35"/>
            </g>
            {/* Scattered particles — green */}
            <g fill="#34d399">
              <circle cx="392" cy="172" r="1.5" opacity="0.35"/>
              <circle cx="432" cy="88"  r="1.0" opacity="0.30"/>
              <circle cx="322" cy="198" r="1.5" opacity="0.28"/>
            </g>
            {/* Scattered particles — orange */}
            <g fill="#ffb300">
              <circle cx="155" cy="228" r="1.0" opacity="0.32"/>
              <circle cx="252" cy="192" r="1.5" opacity="0.28"/>
            </g>
            {/* Path glow — outer halo */}
            <path
              d="M 50,248 C 78,225 108,200 128,192 C 158,182 190,152 208,145 C 226,138 268,147 288,148 C 310,149 340,102 357,90 C 374,78 402,56 418,42"
              stroke="rgba(80,190,255,0.07)" strokeWidth="30" fill="none" strokeLinecap="round"
            />
            {/* Path glow — mid halo */}
            <path
              d="M 50,248 C 78,225 108,200 128,192 C 158,182 190,152 208,145 C 226,138 268,147 288,148 C 310,149 340,102 357,90 C 374,78 402,56 418,42"
              stroke="rgba(120,180,255,0.13)" strokeWidth="14" fill="none" strokeLinecap="round"
            />
            {/* Process path — gradient main line */}
            <path
              d="M 50,248 C 78,225 108,200 128,192 C 158,182 190,152 208,145 C 226,138 268,147 288,148 C 310,149 340,102 357,90 C 374,78 402,56 418,42"
              stroke="url(#pathGrad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.92"
            />
            {/* Dashed overlay for neon texture */}
            <path
              d="M 50,248 C 78,225 108,200 128,192 C 158,182 190,152 208,145 C 226,138 268,147 288,148 C 310,149 340,102 357,90 C 374,78 402,56 418,42"
              stroke="rgba(255,255,255,0.20)" strokeWidth="1" fill="none" strokeDasharray="5 8" opacity="0.55"
            />
            {/* Node 1 — Discovery — cyan #4fc3f7 */}
            <circle cx="50" cy="248" r="34" fill="rgba(79,195,247,0.06)" stroke="none"/>
            <circle cx="50" cy="248" r="22" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="50" cy="248" r="22" fill="rgba(79,195,247,0.18)" stroke="#4fc3f7" strokeWidth="2" opacity="0.95"/>
            <circle cx="50" cy="248" r="29" fill="none" stroke="#4fc3f7" strokeWidth="0.6" opacity="0.40"/>
            <circle cx="47" cy="245" r="6" fill="none" stroke="#4fc3f7" strokeWidth="1.6" opacity="0.9"/>
            <line x1="51.5" y1="249.5" x2="56" y2="254" stroke="#4fc3f7" strokeWidth="1.8" strokeLinecap="round" opacity="0.9"/>
            {/* Node 2 — Strategy — purple #9c5ff7 */}
            <circle cx="128" cy="192" r="34" fill="rgba(156,95,247,0.06)" stroke="none"/>
            <circle cx="128" cy="192" r="22" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="128" cy="192" r="22" fill="rgba(156,95,247,0.18)" stroke="#9c5ff7" strokeWidth="2" opacity="0.95"/>
            <circle cx="128" cy="192" r="29" fill="none" stroke="#9c5ff7" strokeWidth="0.6" opacity="0.40"/>
            <rect x="119" y="184" width="18" height="16" rx="2" fill="none" stroke="#9c5ff7" strokeWidth="1.5" opacity="0.9"/>
            <line x1="123" y1="190" x2="133" y2="190" stroke="#9c5ff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <line x1="123" y1="194" x2="133" y2="194" stroke="#9c5ff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            {/* Node 3 — Design — orange #ffb300 */}
            <circle cx="208" cy="145" r="34" fill="rgba(255,179,0,0.06)" stroke="none"/>
            <circle cx="208" cy="145" r="22" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="208" cy="145" r="22" fill="rgba(255,179,0,0.18)" stroke="#ffb300" strokeWidth="2" opacity="0.95"/>
            <circle cx="208" cy="145" r="29" fill="none" stroke="#ffb300" strokeWidth="0.6" opacity="0.40"/>
            <path d="M200,153 L203,146 L212,137 L216,141 L207,150 Z" fill="none" stroke="#ffb300" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9"/>
            <line x1="200" y1="153" x2="198" y2="155" stroke="#ffb300" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            {/* Node 4 — Development — blue #38bdf8 */}
            <circle cx="288" cy="148" r="34" fill="rgba(56,189,248,0.06)" stroke="none"/>
            <circle cx="288" cy="148" r="22" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="288" cy="148" r="22" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" strokeWidth="2" opacity="0.95"/>
            <circle cx="288" cy="148" r="29" fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.40"/>
            <polyline points="281,141 276,148 281,155" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
            <polyline points="295,141 300,148 295,155" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
            {/* Node 5 — Testing — green #34d399 */}
            <circle cx="357" cy="90" r="34" fill="rgba(52,211,153,0.06)" stroke="none"/>
            <circle cx="357" cy="90" r="22" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="357" cy="90" r="22" fill="rgba(52,211,153,0.18)" stroke="#34d399" strokeWidth="2" opacity="0.95"/>
            <circle cx="357" cy="90" r="29" fill="none" stroke="#34d399" strokeWidth="0.6" opacity="0.40"/>
            <path d="M357,80 L364,83 L364,91 L357,97 L350,91 L350,83 Z" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9"/>
            <polyline points="353,90 356,93 362,86" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
            {/* Node 6 — Launch — soft purple #a78bfa */}
            <circle cx="418" cy="42" r="32" fill="rgba(167,139,250,0.06)" stroke="none"/>
            <circle cx="418" cy="42" r="20" fill="rgba(8,10,20,0.93)" stroke="none"/>
            <circle cx="418" cy="42" r="20" fill="rgba(167,139,250,0.18)" stroke="#a78bfa" strokeWidth="2" opacity="0.95"/>
            <circle cx="418" cy="42" r="27" fill="none" stroke="#a78bfa" strokeWidth="0.6" opacity="0.40"/>
            <path d="M418,34 L415,46 L418,44 L421,46 Z" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9"/>
            <circle cx="418" cy="37" r="2.5" fill="#a78bfa" opacity="0.8"/>
            {/* Small step labels */}
            <text x="50" y="278" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">01</text>
            <text x="128" y="222" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">02</text>
            <text x="208" y="175" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">03</text>
            <text x="288" y="178" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">04</text>
            <text x="357" y="120" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">05</text>
            <text x="418" y="72" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">06</text>
          </svg>
        </div>
      </div>

      {/* ── 6-STEP TIMELINE ── */}
      <div className="prc-section">
        <div className="prc-section-head">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="section-label-dot" />
            {isEl ? 'Η ΔΙΑΔΙΚΑΣΙΑ ΜΑΣ' : 'OUR PROCESS'}
          </div>
          <h2 className="prc-section-title">
            {isEl ? (
              <>Μια σαφής <span style={{ color: 'var(--accent)' }}>6-βήματη διαδικασία</span> από ιδέα σε launch.</>
            ) : (
              <>A clear <span style={{ color: 'var(--accent)' }}>6-step process</span> from idea to launch.</>
            )}
          </h2>
        </div>

        {/* Reuse homepage proc-timeline CSS */}
        <div className="proc-timeline">
          {steps.map((step, i) => (
            <div key={i} className="proc-step">
              <div
                className="proc-circle"
                style={{
                  borderColor: step.color,
                  boxShadow: `0 0 24px ${step.color}70, 0 0 48px ${step.color}38, 0 0 72px ${step.color}15`,
                }}
              >
                <span style={{ color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {step.icon}
                </span>
              </div>
              <div className="proc-step-content">
                <div className="proc-step-num" style={{ color: step.color, opacity: 1 }}>
                  {isEl ? step.el.num : step.en.num}
                </div>
                <div className="proc-step-title">{isEl ? step.el.title : step.en.title}</div>
                <p className="proc-step-desc">{isEl ? step.el.desc : step.en.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT YOU GET AT EACH STAGE ── */}
      <div className="prc-section">
        <div className="prc-section-head">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="section-label-dot" />
            {isEl ? 'ΤΙ ΠΑΙΡΝΕΙΣ ΣΕ ΚΑΘΕ ΣΤΑΔΙΟ' : 'WHAT YOU GET AT EACH STAGE'}
          </div>
        </div>
        <div className="prc-del-grid">
          {deliverables.map((d, i) => (
            <div
              key={i}
              className="prc-del-card"
              style={{ borderColor: `${d.color}22`, '--prc-del-color': d.color } as React.CSSProperties}
            >
              <div
                className="prc-del-icon"
                style={{
                  background: `${d.color}15`,
                  border: `1px solid ${d.color}45`,
                  color: d.color,
                  boxShadow: `0 0 16px ${d.color}28`,
                }}
              >
                {d.icon}
              </div>
              <h3 className="prc-del-title">{isEl ? d.el.title : d.en.title}</h3>
              <p className="prc-del-text">{isEl ? d.el.text : d.en.text}</p>
              <div className="prc-del-accent" style={{ background: d.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY THIS PROCESS MATTERS ── */}
      <div className="prc-section">
        <div className="section-label" style={{ marginBottom: 20 }}>
          <span className="section-label-dot" />
          {isEl ? 'ΓΙΑΤΙ ΑΥΤΗ Η ΔΙΑΔΙΚΑΣΙΑ ΕΧΕΙ ΣΗΜΑΣΙΑ' : 'WHY THIS PROCESS MATTERS'}
        </div>
        <div className="prc-why-grid">

          {/* Left */}
          <div>
            <div className="prc-why-shield">
              <ShieldBigIcon />
            </div>
            <h2 className="prc-why-title">
              {isEl ? 'Γιατί αυτή η διαδικασία έχει σημασία' : 'Why this process matters'}
            </h2>
            <p className="prc-why-text">
              {isEl
                ? 'Χωρίς σαφή διαδικασία, τα ψηφιακά projects γίνονται αργά, ακριβά και μπερδεμένα.'
                : 'Without a clear process, digital projects become slow, expensive, and confusing.'}
            </p>
            <p className="prc-why-text" style={{ marginBottom: 0 }}>
              {isEl
                ? 'Η ροή εργασίας μας κρατά το project εστιασμένο, μειώνει περιττές αλλαγές και βοηθά επιχειρήσεις να κάνουν launch γρηγορότερα.'
                : 'Our workflow keeps the project focused, reduces unnecessary changes, and helps businesses launch faster.'}
            </p>
          </div>

          {/* Right — checklist */}
          <div className="prc-checklist-board">
            {whyList.map((item, i) => (
              <div key={i} className="prc-check-item">
                <span className="prc-check-icon"><CheckCircleIcon /></span>
                <span>{isEl ? item.el : item.en}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '8px 0 52px' }}>
        <div className="container">
          <div className="svc-notsure-card" style={{ gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,220,255,0.08)', border: '1px solid rgba(0,220,255,0.25)',
                color: 'var(--accent)', boxShadow: '0 0 20px rgba(0,220,255,0.20)', flexShrink: 0,
              }}>
                <ChatIcon />
              </div>
              <div className="svc-notsure-left">
                <h2 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', fontWeight: 800, color: '#fff', marginBottom: 5, letterSpacing: '-0.02em' }}>
                  {isEl ? 'Έτοιμος να ξεκινήσεις το project σου;' : 'Ready to start your project?'}
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
                  {isEl
                    ? "Πες μας τι θέλεις να φτιάξεις και θα σου προτείνουμε τη σωστή διαδικασία, τεχνολογία και πλάνο."
                    : "Tell us what you want to build and we'll suggest the right process, technology, and launch plan."}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
              <button
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '11px 26px' }}
                onClick={() => navigate('/contact')}
              >
                {isEl ? 'Ξεκίνα το Project σου' : 'Start Your Project'} →
              </button>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                </svg>
                info@mysmartsapp.com
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
