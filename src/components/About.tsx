export default function About({
  bio, tech, name
}: {
  bio: string[]
  tech: Record<string, string[]>
  name: string
}) {
  return (
    <section className="about-section" id="about">
      <div className="sec-eyebrow reveal">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">About</span>
      </div>
      <h2 className="sec-title reveal">
        The person<br /><span>behind the apps.</span>
      </h2>

      <div className="about-card reveal">
        <div className="about-left">
          {bio.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: p.replace(name, `<strong>${name}</strong>`)
            }} />
          ))}
        </div>
        <div className="about-right">
          {Object.entries(tech).map(([group, pills]) => (
            <div key={group} className="tech-group">
              <div className="tech-group-label">{group}</div>
              <div className="tech-pills">
                {pills.map(p => <span key={p} className="tech-pill">{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
