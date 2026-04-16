const steps = [
  {
    num: '01',
    title: 'Track',
    desc: 'Log your weight, injections, meals, and symptoms. Takes 30 seconds a day. Syncs automatically with Apple Health and Google Health Connect.',
  },
  {
    num: '02',
    title: 'Analyze',
    desc: 'The AI processes your data to find patterns — how your dose affects appetite, which foods impact your progress, when you\'re most likely to miss a log.',
  },
  {
    num: '03',
    title: 'Improve',
    desc: 'Get specific, personalized recommendations. Not generic tips — real guidance based on your history, your medication, and your goals.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-section" id="how">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">
            <span className="section-label-dot" />
            How It Works
          </div>
          <h2 className="section-title">
            Three steps.<br />
            <span className="dim">Real results.</span>
          </h2>
        </div>

        <div className="how-grid">
          {steps.map((s, i) => (
            <div key={s.num} className="how-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="how-num">{s.num}</div>
              <div className="how-connector" />
              <h3 className="how-title">{s.title}</h3>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
