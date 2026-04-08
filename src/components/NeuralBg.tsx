import { useEffect, useRef } from 'react'

interface P {
  x: number; y: number
  vx: number; vy: number
  s: number; ph: number; ps: number
}

export default function NeuralBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let raf = 0
    let mx = 0, my = 0
    let mouseAbs = { x: 0, y: 0 }
    let pts: P[] = []

    const N = 90
    const LINK = 170
    const MOUSE_RADIUS = 200

    function resize() {
      c.width = window.innerWidth
      c.height = window.innerHeight
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        s: 1 + Math.random() * 2,
        ph: Math.random() * Math.PI * 2,
        ps: 0.005 + Math.random() * 0.015,
      }))
    }

    function onMouse(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
      mouseAbs.x = e.clientX
      mouseAbs.y = e.clientY
    }

    function loop() {
      ctx.clearRect(0, 0, c.width, c.height)

      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        p.ph += p.ps

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > c.width) { p.x = c.width; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > c.height) { p.y = c.height; p.vy = -Math.abs(p.vy) }

        // Mouse repulsion
        const dmx = p.x - mouseAbs.x
        const dmy = p.y - mouseAbs.y
        const dm = Math.sqrt(dmx * dmx + dmy * dmy)
        if (dm < MOUSE_RADIUS && dm > 0) {
          const force = (1 - dm / MOUSE_RADIUS) * 0.8
          p.vx += (dmx / dm) * force
          p.vy += (dmy / dm) * force
        }

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995
      }

      // Lines
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        const ax = a.x + mx * 14
        const ay = a.y + my * 14
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const bx = b.x + mx * 14
          const by = b.y + my * 14
          const dx = ax - bx
          const dy = ay - by
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            const t = 1 - d / LINK
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.strokeStyle = `rgba(0,210,255,${t * 0.25})`
            ctx.lineWidth = t * 1.3
            ctx.stroke()
          }
        }
      }

      // Dots + glow
      for (const p of pts) {
        const px = p.x + mx * 14
        const py = p.y + my * 14
        const pulse = 0.6 + Math.sin(p.ph) * 0.4
        const r = p.s * pulse

        const g = ctx.createRadialGradient(px, py, 0, px, py, r * 8)
        g.addColorStop(0, `rgba(0,210,255,0.12)`)
        g.addColorStop(1, `rgba(0,210,255,0)`)
        ctx.beginPath()
        ctx.arc(px, py, r * 8, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,210,255,${0.45 + Math.sin(p.ph) * 0.2})`
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
