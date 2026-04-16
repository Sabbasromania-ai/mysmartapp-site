import { apps, PhoneMockup } from './Features'

interface HeroProps {
  onOpenApp: (index: number) => void
}

export default function Hero({ onOpenApp }: HeroProps) {
  return (
    <section className="hero-platform" id="home">
      <div className="container hero-inner">

        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Platform
          </div>
          <h1 className="hero-h1">
            AI-powered apps<br />
            built for <span className="text-gradient">real&nbsp;use.</span>
          </h1>
          <p className="hero-p">
            A platform creating smart, AI-driven tools for health,
            productivity, and real-world use. Designed and built by a solo developer.
          </p>
          <div className="hero-actions">
            <a href="#apps" className="btn-primary">Explore Apps</a>
            <a href="#platform" className="btn-ghost">View Platform →</a>
          </div>
          <div className="hero-trust">
            <span className="trust-dot" />
            <span>iOS & Android</span>
            <span className="trust-sep">·</span>
            <span>Powered by Claude AI</span>
            <span className="trust-sep">·</span>
            <span>Built by 1 developer</span>
          </div>
        </div>

        {/* RIGHT — Phone Mockup */}
        <div className="hero-right hero-phone-right">
          <div className="hero-phone-label" style={{ color: apps[0].color }}>
            {apps[0].icon} {apps[0].name}
          </div>
          <div className="hero-phone-scale" onClick={() => onOpenApp(0)} style={{ cursor: 'pointer' }}>
            <PhoneMockup app={apps[0]} />
          </div>
          <div className="hero-phone-hint" style={{ color: apps[0].color }}>
            Tap to explore →
          </div>
        </div>

      </div>
    </section>
  )
}
