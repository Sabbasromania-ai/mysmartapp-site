import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    short: 'GLP-1 dose tracking with real injection logging, an AI coach that remembers your data, blood test analysis, and progress charts — built for Mounjaro and Ozempic users.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '💉', title: 'Injection Tracking', desc: 'Log every dose with date, time, body site, and history. Track Mounjaro, Ozempic, and Wegovy with drug level curves.' },
      { icon: '🧠', title: 'AI Coach with Memory', desc: 'AI coach powered by Claude that remembers your full health history and adapts recommendations based on real data — not generic advice.' },
      { icon: '📈', title: 'Weight & Progress Charts', desc: 'Visualize weight loss, BMI, glucose trends, and dose effectiveness over time. See real progress, not just numbers.' },
      { icon: '📸', title: 'Photo Meal Logging', desc: 'Photograph any meal and get an instant AI breakdown of ingredients, calories, and macros — no manual input needed.' },
      { icon: '🩸', title: 'Blood Test Tracking', desc: 'Upload lab results and track key health markers over time. Get AI interpretation tailored to your medication and history.' },
      { icon: '🔔', title: 'Smart Reminders', desc: 'Timely notifications for injections, weight check-ins, and hydration — based on your schedule and real usage patterns.' },
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

const slugs = ['ai-health-tracker', 'ai-wellness-coach', 'ai-nutrition']

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null)
  const navigate = useNavigate()

  return (
    <>
      <div className="col-section-header reveal">
        <div className="section-label">
          <span className="section-label-dot" />
          Our Apps
        </div>
        <h2 className="col-section-title">
          AI tools for real life.<br />
          <span className="dim">Each one built to solve something specific.</span>
        </h2>
      </div>
      <div className="apps-grid">
        {apps.map((app, i) => (
          <div
            key={app.name}
            className={`app-card-compact${hovered === i ? ' hovered' : ''}`}
            style={{
              background: app.gradient,
              border: `1px solid ${hovered === i ? app.color + '50' : app.color + '20'}`,
              boxShadow: hovered === i ? `0 0 24px ${app.glow}` : `0 0 10px ${app.glow}`,
            }}
            onClick={() => navigate(`/apps/${slugs[i]}`)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="acc-top">
              <span className="acc-icon" style={{ background: app.color + '20', border: `1px solid ${app.color}30` }}>
                <AppIcon app={app} size={18} />
              </span>
              <span className="acc-tag" style={{ color: app.tagColor, background: app.tagBg }}>{app.tag}</span>
            </div>
            <div className="acc-name">{app.name}</div>
            <div className="acc-desc">{app.short}</div>
            <div className="acp-bar" style={{ background: `linear-gradient(90deg, ${app.color}00, ${app.color}60, ${app.color}00)` }} />
          </div>
        ))}
      </div>
    </>
  )
}
