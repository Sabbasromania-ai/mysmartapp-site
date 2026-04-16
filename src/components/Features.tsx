import { useState } from 'react'
import appLogo from '../applogo.png'

// Same color system for ALL cards
const CYAN = '#00d4ff'
const GRADIENT = 'linear-gradient(135deg, #0a1628 0%, #0c2040 50%, #0e2d52 100%)'
const GLOW = 'rgba(0,212,255,0.15)'

export const apps = [
  {
    logo: appLogo,
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'AI Health Tracker',
    tag: 'Live',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.12)',
    short: 'Smart GLP-1 tracking with AI health coach, blood test analysis, and real-time insights.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '💉', title: 'GLP-1 Tracking', desc: 'Dose logging, site rotation, and drug level curves for Mounjaro & Ozempic.' },
      { icon: '🧠', title: 'AI Health Coach', desc: 'Powered by Claude AI — remembers your full history and adapts recommendations.' },
      { icon: '📈', title: 'Progress Charts', desc: 'Weight trends, BMI, and dose effectiveness visualized over time.' },
      { icon: '📸', title: 'Photo Nutrition', desc: 'Snap a meal — AI identifies ingredients and estimates macros instantly.' },
      { icon: '🩸', title: 'Blood Tests', desc: 'Upload lab results and get AI interpretation tailored to your medication.' },
      { icon: '🔔', title: 'Smart Reminders', desc: 'Contextual notifications for injections, weight logging, and hydration.' },
    ],
    phone: [
      { dot: CYAN, label: 'Weight', value: '94.1 kg' },
      { dot: '#6366f1', label: 'Mounjaro 5mg', value: 'Injected ✓' },
      { dot: '#10b981', label: 'Calories', value: '1,280 kcal' },
      { dot: '#f59e0b', label: 'Steps', value: '8,432' },
      { dot: CYAN, label: 'AI Coach', value: 'Active 🟢' },
    ],
  },
  {
    logo: null,
    emoji: '🧘',
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'AI Wellness Coach',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.12)',
    short: 'Stress tracking, sleep analysis, and personalized mental wellness guidance powered by AI.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '😴', title: 'Sleep Analysis', desc: 'Track sleep quality and get personalized improvement tips.' },
      { icon: '🧘', title: 'Stress Monitor', desc: 'Daily stress check-ins with pattern recognition over time.' },
      { icon: '🎯', title: 'Mindfulness', desc: 'Guided sessions tailored to your stress level and schedule.' },
      { icon: '🧠', title: 'AI Coach', desc: 'Personalized mental wellness coaching with memory.' },
    ],
    phone: [
      { dot: CYAN, label: 'Sleep', value: '7.2h' },
      { dot: CYAN, label: 'Stress', value: 'Low ✓' },
      { dot: CYAN, label: 'Mood', value: 'Good' },
      { dot: CYAN, label: 'AI Session', value: 'Ready' },
    ],
  },
  {
    logo: null,
    emoji: '🍎',
    color: CYAN,
    gradient: GRADIENT,
    glow: GLOW,
    name: 'AI Nutrition',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.12)',
    short: 'Photo-based meal analysis, macro tracking, and AI-driven diet optimization.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '📸', title: 'Photo Analysis', desc: 'Instant calorie and macro breakdown from a photo.' },
      { icon: '📊', title: 'Macro Tracking', desc: 'Protein, carbs, fat targets customized to your goals.' },
      { icon: '🧠', title: 'AI Diet Coach', desc: 'Meal recommendations based on your preferences and targets.' },
      { icon: '📅', title: 'Meal Planning', desc: 'Weekly plans generated and adjusted by AI.' },
    ],
    phone: [
      { dot: CYAN, label: 'Protein', value: '142g' },
      { dot: CYAN, label: 'Calories', value: '1,820' },
      { dot: CYAN, label: 'Meal logged', value: '✓' },
      { dot: CYAN, label: 'AI Tip', value: 'View →' },
    ],
  },
]

function AppIcon({ app, size = 40 }: { app: typeof apps[0], size?: number }) {
  if (app.logo) {
    return <img src={app.logo} alt={app.name} style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover' }} />
  }
  return <span style={{ fontSize: size * 0.6 }}>{(app as any).emoji}</span>
}

export function PhoneMockup({ app }: { app: typeof apps[0] }) {
  return (
    <div className="phone-mockup-wrap">
      <div className="phone-glow" style={{ background: `radial-gradient(ellipse at center, ${app.color}30 0%, transparent 70%)` }} />
      <div className="phone-mockup">
        <div className="pm-notch" />
        <div className="pm-screen">
          <div className="pm-header">
            <span className="pm-title">
              {app.logo
                ? <img src={app.logo} alt="" style={{ width: 12, height: 12, borderRadius: 3, verticalAlign: 'middle', marginRight: 3 }} />
                : (app as any).emoji + ' '}
              {app.name.split(' ').slice(1).join(' ')}
            </span>
            <span className="pm-time">9:41</span>
          </div>
          <div className="pm-card" style={{ borderColor: app.color + '30' }}>
            <div style={{ fontSize: '0.55rem', color: app.color, fontWeight: 700, marginBottom: 4 }}>TODAY</div>
            {app.phone.map(r => (
              <div key={r.label} className="pm-row">
                <div className="pm-dot" style={{ background: r.dot }} />
                <span className="pm-label">{r.label}</span>
                <span className="pm-val" style={{ color: r.dot }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="pm-chart">
            {[45, 70, 50, 85, 65, 90, 60].map((h, i) => (
              <div key={i} className="pm-bar" style={{
                height: `${h}%`,
                background: `linear-gradient(to top, ${app.color}60, ${app.color})`,
                opacity: i === 5 ? 1 : 0.5,
              }} />
            ))}
          </div>
          <div className="pm-footer" style={{ color: app.color }}>AI Coach Active ✦</div>
        </div>
      </div>
    </div>
  )
}

export function AppModal({ app, onClose }: { app: typeof apps[0], onClose: () => void }) {
  const [tab, setTab] = useState<'features' | 'preview'>('features')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="amd-header">
          <span className="amd-icon" style={{ background: app.color + '18' }}>
            <AppIcon app={app} size={36} />
          </span>
          <div>
            <div className="amd-name">{app.name}</div>
            <div className="amd-platforms">{app.platforms.join(' · ')}</div>
          </div>
          <span className="amd-tag" style={{ color: app.tagColor, background: app.tagBg }}>{app.tag}</span>
        </div>

        <p className="amd-desc">{app.short}</p>

        <div className="amd-tabs">
          <button className={`amd-tab${tab === 'features' ? ' active' : ''}`} style={tab === 'features' ? { color: app.color, borderBottomColor: app.color } : {}} onClick={() => setTab('features')}>Features</button>
          <button className={`amd-tab${tab === 'preview' ? ' active' : ''}`} style={tab === 'preview' ? { color: app.color, borderBottomColor: app.color } : {}} onClick={() => setTab('preview')}>Preview</button>
        </div>

        {tab === 'features' && (
          <div className="amd-2col">
            <div className="amd-features">
              {app.features.map(f => (
                <div key={f.title} className="amd-feat">
                  <span className="amd-feat-icon">{f.icon}</span>
                  <div>
                    <div className="amd-feat-title">{f.title}</div>
                    <div className="amd-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <PhoneMockup app={app} />
          </div>
        )}

        {tab === 'preview' && (
          <div className="amd-preview">
            <PhoneMockup app={app} />
          </div>
        )}

        {app.tag === 'Live' ? (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="#contact" className="btn-primary" onClick={onClose}>Download App</a>
            <a href="#contact" className="btn-ghost" onClick={onClose}>Learn More</a>
          </div>
        ) : (
          <a href="#contact" className="btn-ghost" style={{ marginTop: '1.5rem', display: 'inline-block' }} onClick={onClose}>
            Notify me when ready →
          </a>
        )}
      </div>
    </div>
  )
}

interface FeaturesProps { onOpenApp: (index: number) => void }

export default function Features({ onOpenApp }: FeaturesProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="features-section" id="apps">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Our Apps
          </div>
          <h2 className="section-title">
            AI tools for real life.<br />
            <span className="dim">Each one built to solve something specific.</span>
          </h2>
        </div>
        <div className="apps-grid">
          {apps.map((app, i) => (
            <div
              key={app.name}
              className={`app-card-premium${hovered === i ? ' hovered' : ''}`}
              style={{
                animationDelay: `${i * 0.12}s`,
                background: app.gradient,
                boxShadow: hovered === i ? `0 0 40px ${app.glow}, 0 20px 60px rgba(0,0,0,0.4)` : `0 0 20px ${app.glow}`,
                borderColor: hovered === i ? app.color + '50' : app.color + '20',
              }}
              onClick={() => onOpenApp(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="acp-top">
                <span className="acp-icon" style={{ background: app.color + '20', border: `1px solid ${app.color}30` }}>
                  <AppIcon app={app} size={28} />
                </span>
                <span className="acp-tag" style={{ color: app.tagColor, background: app.tagBg }}>{app.tag}</span>
              </div>
              <div className="acp-name">{app.name}</div>
              <div className="acp-desc">{app.short}</div>
              <div className="acp-feats">
                {app.features.slice(0, 3).map(f => (
                  <div key={f.title} className="acp-feat-row">
                    <span>{f.icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{f.title}</span>
                  </div>
                ))}
              </div>
              <div className="acp-footer">
                <div className="acp-platforms">
                  {app.platforms.map(p => <span key={p} className="acp-platform">{p}</span>)}
                </div>
                <span className="acp-cta" style={{ color: app.color }}>View App →</span>
              </div>
              <div className="acp-bar" style={{ background: `linear-gradient(90deg, ${app.color}00, ${app.color}60, ${app.color}00)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
