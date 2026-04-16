import { useState } from 'react'

export const apps = [
  {
    icon: '🏥',
    color: '#00d4ff',
    name: 'AI Health Tracker',
    tag: 'Live',
    tagColor: '#10b981',
    tagBg: 'rgba(16,185,129,0.1)',
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
      { dot: '#00d4ff', label: 'Weight', value: '94.1 kg' },
      { dot: '#6366f1', label: 'Mounjaro 5mg', value: 'Injected ✓' },
      { dot: '#10b981', label: 'Calories', value: '1,280 kcal' },
      { dot: '#f59e0b', label: 'AI Coach', value: 'Active' },
    ],
  },
  {
    icon: '🧘',
    color: '#6366f1',
    name: 'AI Wellness Coach',
    tag: 'Coming Soon',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.1)',
    short: 'Stress tracking, sleep analysis, and personalized mental wellness guidance powered by AI.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '😴', title: 'Sleep Analysis', desc: 'Track sleep quality and get personalized improvement tips.' },
      { icon: '🧘', title: 'Stress Monitor', desc: 'Daily stress check-ins with pattern recognition over time.' },
      { icon: '🎯', title: 'Mindfulness', desc: 'Guided sessions tailored to your stress level and schedule.' },
      { icon: '🧠', title: 'AI Coach', desc: 'Personalized mental wellness coaching with memory.' },
    ],
    phone: [
      { dot: '#6366f1', label: 'Sleep', value: '7.2h' },
      { dot: '#10b981', label: 'Stress', value: 'Low' },
      { dot: '#f59e0b', label: 'Mood', value: 'Good' },
      { dot: '#6366f1', label: 'AI Session', value: 'Ready' },
    ],
  },
  {
    icon: '🍎',
    color: '#10b981',
    name: 'AI Nutrition',
    tag: 'In Development',
    tagColor: '#6366f1',
    tagBg: 'rgba(99,102,241,0.1)',
    short: 'Photo-based meal analysis, macro tracking, and AI-driven diet optimization.',
    platforms: ['iOS', 'Android'],
    features: [
      { icon: '📸', title: 'Photo Analysis', desc: 'Instant calorie and macro breakdown from a photo.' },
      { icon: '📊', title: 'Macro Tracking', desc: 'Protein, carbs, fat targets customized to your goals.' },
      { icon: '🧠', title: 'AI Diet Coach', desc: 'Meal recommendations based on your preferences and targets.' },
      { icon: '📅', title: 'Meal Planning', desc: 'Weekly plans generated and adjusted by AI.' },
    ],
    phone: [
      { dot: '#10b981', label: 'Protein', value: '142g' },
      { dot: '#00d4ff', label: 'Calories', value: '1,820' },
      { dot: '#f59e0b', label: 'Meal logged', value: '✓' },
      { dot: '#10b981', label: 'AI Tip', value: 'View' },
    ],
  },
]

export function AppModal({ app, onClose }: { app: typeof apps[0], onClose: () => void }) {
  const [tab, setTab] = useState<'features' | 'preview'>('features')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="amd-header">
          <span className="amd-icon" style={{ background: app.color + '18' }}>{app.icon}</span>
          <div>
            <div className="amd-name">{app.name}</div>
            <div className="amd-platforms">{app.platforms.join(' · ')}</div>
          </div>
          <span className="amd-tag" style={{ color: app.tagColor, background: app.tagBg }}>{app.tag}</span>
        </div>
        <p className="amd-desc">{app.short}</p>
        <div className="amd-tabs">
          <button className={`amd-tab${tab === 'features' ? ' active' : ''}`} onClick={() => setTab('features')}>Features</button>
          <button className={`amd-tab${tab === 'preview' ? ' active' : ''}`} onClick={() => setTab('preview')}>Preview</button>
        </div>
        {tab === 'features' && (
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
        )}
        {tab === 'preview' && (
          <div className="amd-preview">
            <div className="preview-phone" style={{ margin: '0 auto' }}>
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="phone-header">
                  <span className="phone-title">{app.name}</span>
                  <span className="phone-date">Live</span>
                </div>
                {app.phone.map(r => (
                  <div key={r.label} className="phone-row">
                    <div className="phone-dot" style={{ background: r.dot }} />
                    <span className="phone-label">{r.label}</span>
                    <span className="phone-value">{r.value}</span>
                  </div>
                ))}
                <div className="phone-chart">
                  {[60, 80, 55, 90, 70, 85, 65].map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%`, background: `linear-gradient(to top, ${app.color}88, ${app.color})` }} />
                  ))}
                </div>
              </div>
            </div>
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

interface FeaturesProps {
  onOpenApp: (index: number) => void
}

export default function Features({ onOpenApp }: FeaturesProps) {
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
              className="app-card reveal"
              style={{ transitionDelay: `${i * 0.08}s`, cursor: 'pointer' }}
              onClick={() => onOpenApp(i)}
            >
              <div className="ac-top">
                <span className="ac-icon" style={{ background: app.color + '18' }}>{app.icon}</span>
                <span className="ac-tag" style={{ color: app.tagColor, background: app.tagBg }}>{app.tag}</span>
              </div>
              <div className="ac-name">{app.name}</div>
              <div className="ac-desc">{app.short}</div>
              <div className="ac-platforms">
                {app.platforms.map(p => <span key={p} className="ac-platform">{p}</span>)}
              </div>
              <div className="ac-btn" style={{ color: app.color, borderColor: app.color + '40' }}>
                View App →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
