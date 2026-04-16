import { useState } from 'react'

const features = [
  {
    icon: '💉',
    title: 'GLP-1 Tracking',
    short: 'Dose logging, site rotation, and drug level curves for Mounjaro & Ozempic.',
    detail: 'Track every injection with smart site rotation reminders. Visualize drug concentration curves over time based on your dose schedule. Never miss an injection or repeat a site too soon. Full history with notes and side effects logging.',
  },
  {
    icon: '🧠',
    title: 'AI Health Coach',
    short: 'Personalized guidance with memory. Adapts to your full history.',
    detail: 'Powered by Claude AI, your coach remembers every data point — weight trends, injection history, food logs, blood results. Ask anything in plain language and get medically-informed, personalized guidance that evolves with your journey.',
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    short: 'Weight trends, BMI, body composition, and dose effectiveness over time.',
    detail: 'Beautiful charts showing your weight loss curve, weekly averages, and how each dose phase affects your results. Compare periods, set milestones, and see your progress contextualized against GLP-1 clinical averages.',
  },
  {
    icon: '📸',
    title: 'Nutrition & Habits',
    short: 'Snap a meal photo for instant calorie and macro breakdown via AI.',
    detail: 'Point your camera at any meal — AI identifies ingredients and estimates macros instantly. Log water intake, track protein targets critical for muscle preservation on GLP-1s, and build sustainable eating habits with daily streaks.',
  },
  {
    icon: '🩸',
    title: 'Blood Tests',
    short: 'Upload lab results and get AI interpretation tailored to your medication.',
    detail: 'Upload your blood test results and the AI interprets every marker in context of your GLP-1 treatment — HbA1c, insulin, lipids, liver enzymes. Tracks trends over multiple tests and flags anything that warrants attention.',
  },
  {
    icon: '🔔',
    title: 'Smart Reminders',
    short: 'Intelligent notifications based on your schedule and medication timing.',
    detail: 'Set injection reminders that account for your dose schedule. Get weight logging prompts at optimal times. Hydration reminders calibrated to your daily targets. All notifications are contextual — not generic alerts.',
  },
]

export default function Features() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            Features
          </div>
          <h2 className="section-title">
            Everything for your GLP-1 journey.<br />
            <span className="dim">Nothing you don't need.</span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <button
              key={f.title}
              className="feature-card reveal"
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => setOpen(i)}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.short}</div>
              <div className="feature-more">Learn more →</div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="modal-overlay" onClick={() => setOpen(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(null)}>✕</button>
            <div className="modal-icon">{features[open].icon}</div>
            <h3 className="modal-title">{features[open].title}</h3>
            <p className="modal-body">{features[open].detail}</p>
            <a href="#support" className="btn-primary" onClick={() => setOpen(null)}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
