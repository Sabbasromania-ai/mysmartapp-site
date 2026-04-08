import { useEffect, useState } from 'react'

function Tick({ base, range, dec, suffix }: {
  base: number; range: number; dec: number; suffix: string
}) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const iv = setInterval(() => {
      setV(base + (Math.random() - 0.5) * range)
    }, 1800 + Math.random() * 1200)
    return () => clearInterval(iv)
  }, [base, range])
  return <span className="do-num">{v.toFixed(dec)}{suffix}</span>
}

function MiniBar({ heights, color }: { heights: number[]; color: string }) {
  return (
    <div className="do-bars">
      {heights.map((h, i) => (
        <div
          key={i}
          className="do-bar"
          style={{
            height: `${h}%`,
            background: color,
            opacity: 0.4 + h / 150,
          }}
        />
      ))}
    </div>
  )
}

export default function DataOverlays() {
  const [bars1, setBars1] = useState([40, 65, 50, 80, 60, 90, 70])
  const [bars2, setBars2] = useState([70, 50, 60, 40, 55, 35, 45])

  useEffect(() => {
    const iv = setInterval(() => {
      setBars1(Array.from({ length: 7 }, () => 25 + Math.random() * 70))
      setBars2(Array.from({ length: 7 }, () => 25 + Math.random() * 70))
    }, 2500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="data-overlays" aria-hidden="true">
      <div className="do-card do-pos-tl">
        <div className="do-label">Weight</div>
        <Tick base={94.2} range={0.6} dec={1} suffix=" kg" />
        <MiniBar heights={bars1} color="#00d4ff" />
      </div>

      <div className="do-card do-pos-tr">
        <div className="do-label">Adherence</div>
        <Tick base={94} range={3} dec={0} suffix="%" />
      </div>

      <div className="do-card do-pos-bl">
        <div className="do-label">Active dose</div>
        <Tick base={2.5} range={0} dec={1} suffix=" mg" />
        <div className="do-tag">Semaglutide</div>
      </div>

      <div className="do-card do-pos-br">
        <div className="do-label">Calorie trend</div>
        <MiniBar heights={bars2} color="#6366f1" />
        <Tick base={1280} range={80} dec={0} suffix=" cal" />
      </div>

      <div className="do-card do-pos-mr">
        <div className="do-label">Steps</div>
        <Tick base={8432} range={200} dec={0} suffix="" />
      </div>

      <svg className="do-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="20" y1="18" x2="50" y2="48" />
        <line x1="80" y1="20" x2="50" y2="48" />
        <line x1="18" y1="78" x2="50" y2="52" />
        <line x1="82" y1="80" x2="50" y2="52" />
        <line x1="85" y1="50" x2="55" y2="50" />
      </svg>
    </div>
  )
}
