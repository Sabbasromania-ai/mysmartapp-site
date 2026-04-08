import { useEffect, useRef } from 'react'

const BASE = [20, 38, 32, 55, 48, 68, 60, 78, 70, 85, 75, 90, 82, 72]

function jitter(base: number[], amt: number) {
  return base.map(v => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * amt)))
}

export default function PhoneChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataRef = useRef(jitter(BASE, 0))
  const targetRef = useRef(jitter(BASE, 0))
  const progressRef = useRef(1)
  // Generate new target data every 1.8s
  useEffect(() => {
    const interval = setInterval(() => {
      dataRef.current = [...targetRef.current]
      targetRef.current = jitter(BASE, 12)
      progressRef.current = 0
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Canvas animation loop at 60fps
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0

    function draw() {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Interpolate data
      progressRef.current = Math.min(1, progressRef.current + 0.016)
      const t = progressRef.current
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const current = dataRef.current.map((v, i) =>
        v + (targetRef.current[i] - v) * eased
      )

      const stepX = w / (current.length - 1)
      const padY = 8

      // Build path points
      const pts = current.map((v, i) => ({
        x: i * stepX,
        y: padY + (1 - v / 100) * (h - padY * 2),
      }))

      // Draw gradient fill
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(0,229,255,0.35)')
      grad.addColorStop(0.5, 'rgba(99,102,241,0.12)')
      grad.addColorStop(1, 'rgba(99,102,241,0)')

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        const cx = (pts[i - 1].x + pts[i].x) / 2
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, cx, (pts[i - 1].y + pts[i].y) / 2)
      }
      ctx.quadraticCurveTo(
        pts[pts.length - 2].x, pts[pts.length - 2].y,
        pts[pts.length - 1].x, pts[pts.length - 1].y
      )
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // Draw line
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        const cx = (pts[i - 1].x + pts[i].x) / 2
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, cx, (pts[i - 1].y + pts[i].y) / 2)
      }
      ctx.quadraticCurveTo(
        pts[pts.length - 2].x, pts[pts.length - 2].y,
        pts[pts.length - 1].x, pts[pts.length - 1].y
      )
      ctx.strokeStyle = '#00e5ff'
      ctx.lineWidth = 2
      ctx.shadowColor = 'rgba(0,229,255,0.5)'
      ctx.shadowBlur = 6
      ctx.stroke()
      ctx.shadowBlur = 0

      // Glow dot on last point
      const last = pts[pts.length - 1]
      ctx.beginPath()
      ctx.arc(last.x, last.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#00e5ff'
      ctx.shadowColor = 'rgba(0,229,255,0.8)'
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    // Set canvas resolution
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    // Override for draw logic
    canvas.width = rect.width
    canvas.height = rect.height

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="phone-chart">
      <div className="phone-chart-header">
        <div className="phone-chart-title">Weight trend (14 days)</div>
        <div className="phone-chart-live">
          <span className="live-dot" />
          Live
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', flex: 1, minHeight: 0, borderRadius: 6 }}
      />
    </div>
  )
}
