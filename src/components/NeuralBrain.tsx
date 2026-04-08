import { useEffect, useRef } from 'react'

/*
 * Brain-shaped neural network rendered on canvas.
 * Nodes are seeded inside an elliptical brain silhouette with
 * left/right hemisphere clustering. Three depth layers with
 * blur, scale, and opacity variation. Parallax on mouse.
 * Lightweight: ~160 nodes, no libraries.
 */

interface Node {
  x: number; y: number; z: number          // z = depth 0..1
  ox: number; oy: number                   // origin for breathing
  vx: number; vy: number
  r: number; ph: number; ps: number
  layer: number                            // 0=back 1=mid 2=front
}

// Brain silhouette: ellipse with two lobe bumps
function insideBrain(x: number, y: number, cx: number, cy: number, w: number, h: number): boolean {
  const nx = (x - cx) / w
  const ny = (y - cy) / h
  // Main ellipse
  const base = nx * nx + ny * ny
  // Left lobe bulge
  const ll = ((nx + 0.45) * (nx + 0.45)) / 0.25 + ((ny + 0.15) * (ny + 0.15)) / 0.35
  // Right lobe bulge
  const rl = ((nx - 0.45) * (nx - 0.45)) / 0.25 + ((ny + 0.15) * (ny + 0.15)) / 0.35
  // Stem area
  const stem = Math.abs(nx) < 0.12 && ny > 0.6 && ny < 0.95
  return base < 1.0 || ll < 1.0 || rl < 1.0 || stem
}

function seedNodes(cx: number, cy: number, w: number, h: number): Node[] {
  const nodes: Node[] = []
  const target = 170
  let attempts = 0
  while (nodes.length < target && attempts < 8000) {
    attempts++
    const x = cx + (Math.random() - 0.5) * w * 2.4
    const y = cy + (Math.random() - 0.5) * h * 2.4
    if (!insideBrain(x, y, cx, cy, w, h)) continue
    const z = Math.random()
    const layer = z < 0.3 ? 0 : z < 0.65 ? 1 : 2
    nodes.push({
      x, y, z, ox: x, oy: y,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: 1.2 + z * 2.5,
      ph: Math.random() * Math.PI * 2,
      ps: 0.004 + Math.random() * 0.012,
      layer,
    })
  }
  return nodes
}

export default function NeuralBrain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let raf = 0
    let mx = 0, my = 0
    let time = 0
    let nodes: Node[] = []
    let W = 0, H = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = c.getBoundingClientRect()
      W = rect.width
      H = rect.height
      c.width = W * dpr
      c.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const brainW = W * 0.38
      const brainH = H * 0.38
      const bcx = W * 0.5
      const bcy = H * 0.48
      nodes = seedNodes(bcx, bcy, brainW, brainH)
    }

    function onMouse(e: MouseEvent) {
      const rect = c.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / W - 0.5) * 2
      my = ((e.clientY - rect.top) / H - 0.5) * 2
    }

    const LINK = 80

    function draw() {
      time += 0.008
      ctx.clearRect(0, 0, W, H)

      // Radial glow behind brain
      const glow = ctx.createRadialGradient(W * 0.5, H * 0.48, 0, W * 0.5, H * 0.48, W * 0.42)
      glow.addColorStop(0, 'rgba(0,200,255,0.07)')
      glow.addColorStop(0.4, 'rgba(60,80,220,0.03)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      // Update positions: gentle breathing + parallax by depth
      for (const n of nodes) {
        n.ph += n.ps
        const breathX = Math.sin(time + n.ph) * 2
        const breathY = Math.cos(time * 0.8 + n.ph) * 2
        const pStr = 8 + n.z * 20  // deeper parallax for front nodes
        n.x = n.ox + breathX + mx * pStr
        n.y = n.oy + breathY + my * pStr
      }

      // Sort by depth (back first)
      const sorted = [...nodes].sort((a, b) => a.z - b.z)

      // Draw connections (only within same or adjacent layers, limit distance)
      for (let i = 0; i < sorted.length; i++) {
        const a = sorted[i]
        for (let j = i + 1; j < sorted.length; j++) {
          const b = sorted[j]
          if (Math.abs(a.layer - b.layer) > 1) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > LINK) continue

          const t = 1 - d / LINK
          const depthAlpha = 0.08 + Math.min(a.z, b.z) * 0.18
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(0,200,255,${t * depthAlpha})`
          ctx.lineWidth = t * (0.4 + Math.min(a.z, b.z) * 1)
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const n of sorted) {
        const pulse = 0.6 + Math.sin(n.ph) * 0.4
        const r = n.r * pulse
        const alpha = 0.15 + n.z * 0.55  // back=dim, front=bright

        // Glow (only for mid/front)
        if (n.layer >= 1) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6)
          g.addColorStop(0, `rgba(0,200,255,${alpha * 0.3})`)
          g.addColorStop(1, 'rgba(0,200,255,0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        // Core
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        // Front nodes: brighter cyan, back: dimmer blue
        const blue = n.z > 0.5
          ? `rgba(0,210,255,${alpha})`
          : `rgba(80,120,255,${alpha * 0.7})`
        ctx.fillStyle = blue
        ctx.fill()
      }

      // Subtle center-line (corpus callosum hint)
      ctx.save()
      ctx.globalAlpha = 0.04 + Math.sin(time * 2) * 0.02
      ctx.beginPath()
      ctx.moveTo(W * 0.42, H * 0.46)
      ctx.quadraticCurveTo(W * 0.5, H * 0.42, W * 0.58, H * 0.46)
      ctx.strokeStyle = 'rgba(0,200,255,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    c.addEventListener('mousemove', onMouse)
    // also track mouse on window for when cursor is over text
    window.addEventListener('mousemove', (e) => {
      const rect = c.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / W - 0.5) * 2
      my = ((e.clientY - rect.top) / H - 0.5) * 2
    })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0, left: 0,
      }}
    />
  )
}
