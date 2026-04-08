import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  phase: number
  phaseSpeed: number
}

export default function NeuralBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let mx = 0
    let my = 0
    let particles: Particle[] = []

    const COUNT = 80
    const LINK_DIST = 180

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      seed()
    }

    function seed() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.014,
      }))
    }

    function onMouse(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.phaseSpeed

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy = -Math.abs(p.vy) }
      }

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const ax = a.x + mx * 16
        const ay = a.y + my * 16
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const bx = b.x + mx * 16
          const by = b.y + my * 16
          const dx = ax - bx
          const dy = ay - by
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.3
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.strokeStyle = `rgba(0,230,255,${alpha})`
            ctx.lineWidth = (1 - dist / LINK_DIST) * 1.2
            ctx.stroke()
          }
        }
      }

      // Draw particles with glow
      for (const p of particles) {
        const px = p.x + mx * 16
        const py = p.y + my * 16
        const pulse = 0.6 + Math.sin(p.phase) * 0.4
        const r = p.size * pulse

        // Radial glow
        const g = ctx.createRadialGradient(px, py, 0, px, py, r * 7)
        g.addColorStop(0, `rgba(0,230,255,0.15)`)
        g.addColorStop(1, `rgba(0,230,255,0)`)
        ctx.beginPath()
        ctx.arc(px, py, r * 7, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,230,255,${0.5 + Math.sin(p.phase) * 0.2})`
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
      ref={canvasRef}
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
