import NeuralBrain3D from './NeuralBrain3D'

export default function Hero() {
  return (
    <section className="hero">
      {/* Full-screen Three.js canvas */}
      <NeuralBrain3D />

      {/* Text overlay — left side, on top of canvas */}
      <div className="hero-overlay">
        <div className="hero-badge">
          <span className="badge-dot" />
          AI-Powered Platform
        </div>

        <h1 className="hero-h1">
          AI-powered apps<br />
          built for{' '}
          <span className="text-gradient">real&nbsp;people.</span>
        </h1>

        <p className="hero-p">
          Smart health tracking, AI coaching with memory, and real-time
          analytics — designed, built, and shipped by a solo developer.
        </p>

        <div className="hero-actions">
          <a href="#apps" className="btn-primary">Explore apps</a>
          <a href="#about" className="btn-ghost">Learn more</a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="hero-fade" />
    </section>
  )
}
