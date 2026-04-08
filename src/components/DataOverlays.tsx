import { useEffect, useRef, useState } from 'react'

/*
 * Floating data elements around the brain:
 * - Ticking numbers
 * - Micro sparkline charts
 * - Small data labels
 * Connected to brain center via faint lines
 */

function MicroChart({ data, color }: { data: number[]; color: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    c.width = 64
    c.height = 24

    ctx.clearRect(0, 0, 64, 24)
    const step = 64 / (data.length - 1)

    // Fill
    const grad = ctx.createLinearGradient(0, 0, 0, 24)
    grad.addColorStop(0, color.replace(')', ',0.3)').replace('rgb', 'rgba'))
    grad.addColorStop(1, 'transparent')
    ctx.beginPath()
    ctx.moveTo(0, 24 - data[0] * 20)
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(i * step, 24 - data[i] * 20)
    }
    ctx.lineTo(64, 24)
    ctx.lineTo(0, 24)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(0, 24 - data[0] * 20)
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(i * step, 24 - data[i] * 20)
    }
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [data, color])

  return <canvas ref={ref} style={{ width: 64, height: 24, display: 'block' }} />
}

function TickingNum({ base, range, decimals, suffix }: {
  base: number; range: number; decimals: number; suffix: string
}) {
  const [val, setVal] = useState(base)

  useEffect(() => {
    const iv = setInterval(() => {
      setVal(base + (Math.random() - 0.5) * range)
    }, 2000 + Math.random() * 1000)
    return () => clearInterval(iv)
  }, [base, range])

  return <span className="do-num">{val.toFixed(decimals)}{suffix}</span>
}

export default function DataOverlays() {
  const [charts, setCharts] = useState({
    c1: [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.75, 0.9],
    c2: [0.8, 0.6, 0.7, 0.5, 0.55, 0.4, 0.45, 0.3],
  })

  useEffect(() => {
    const iv = setInterval(() => {
      setCharts({
        c1: Array.from({ length: 8 }, () => 0.2 + Math.random() * 0.7),
        c2: Array.from({ length: 8 }, () => 0.2 + Math.random() * 0.7),
      })
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="data-overlays" aria-hidden="true">
      {/* Top-left: weight metric */}
      <div className="do-card do-pos-tl">
        <div className="do-label">Weight</div>
        <TickingNum base={94.2} range={0.6} decimals={1} suffix=" kg" />
        <MicroChart data={charts.c1} color="rgb(0,210,255)" />
      </div>

      {/* Top-right: adherence */}
      <div className="do-card do-pos-tr">
        <div className="do-label">Adherence</div>
        <TickingNum base={94} range={3} decimals={0} suffix="%" />
      </div>

      {/* Bottom-left: dose */}
      <div className="do-card do-pos-bl">
        <div className="do-label">Active dose</div>
        <TickingNum base={2.5} range={0} decimals={1} suffix=" mg" />
        <div className="do-tag">Semaglutide</div>
      </div>

      {/* Bottom-right: chart */}
      <div className="do-card do-pos-br">
        <div className="do-label">Calorie trend</div>
        <MicroChart data={charts.c2} color="rgb(99,102,241)" />
        <TickingNum base={1280} range={80} decimals={0} suffix=" cal" />
      </div>

      {/* Mid-right: steps */}
      <div className="do-card do-pos-mr">
        <div className="do-label">Steps</div>
        <TickingNum base={8432} range={200} decimals={0} suffix="" />
      </div>

      {/* Connecting lines (SVG) */}
      <svg className="do-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="22" y1="20" x2="50" y2="48" />
        <line x1="78" y1="22" x2="50" y2="48" />
        <line x1="20" y1="75" x2="50" y2="52" />
        <line x1="80" y1="78" x2="50" y2="52" />
        <line x1="82" y1="50" x2="55" y2="50" />
      </svg>
    </div>
  )
}
