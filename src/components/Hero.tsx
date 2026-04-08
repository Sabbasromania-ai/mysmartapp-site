import NeuralBrain from './NeuralBrain'
import DataOverlays from './DataOverlays'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left: Text */}
        <div className="hero-text">
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

        {/* Right: Brain visual */}
        <div className="hero-visual">
          <div className="hero-brain-glow" />
          <NeuralBrain />
          <DataOverlays />
        </div>
      </div>
    </section>
  )
}
