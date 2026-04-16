import NeuralBrain3D from './NeuralBrain3D'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <NeuralBrain3D />
      <div className="hero-overlay">
        <div className="hero-badge">
          <span className="badge-dot" />
          AI-Powered Health Platform
        </div>
        <h1 className="hero-h1">
          Your GLP-1 journey,<br />
          guided by <span className="text-gradient">real AI.</span>
        </h1>
        <p className="hero-p">
          Smart medication tracking, AI health coaching, and real-time analytics
          — built for people on Mounjaro, Ozempic, and other GLP-1 medications.
        </p>
        <div className="hero-actions">
          <a href="#features" className="btn-primary">Explore Features</a>
          <a href="#preview" className="btn-ghost">See the App →</a>
        </div>
        <div className="hero-trust">
          <span className="trust-dot" />
          <span>Available on iOS & Android</span>
          <span className="trust-sep">·</span>
          <span>Powered by Claude AI</span>
          <span className="trust-sep">·</span>
          <span>Syncs with Apple Health & Google Health</span>
        </div>
      </div>
    </section>
  )
}
