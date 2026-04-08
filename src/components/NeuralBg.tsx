import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  size: number
  pulse: number
  pulseSpeed: number
}

export default function NeuralBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = 0
    let mouseY = 0
    let nodes: Node[] = []
    let time = 0

    const NODE_COUNT = 75
    const CONNECT_DIST = 200
    const PARALLAX_STRENGTH = 18

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      nodes = []
      for (let i = 0; i < NODE_COUNT; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        nodes.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: 1.5 + Math.random() * 1.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
        })
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const draw = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      for (const node of nodes) {
        node.baseX += node.vx
        node.baseY += node.vy
        node.pulse += node.pulseSpeed

        if (node.baseX < 0 || node.baseX > canvas.width) node.vx *= -1
        if (node.baseY < 0 || node.baseY > canvas.height) node.vy *= -1

        node.baseX = Math.max(0, Math.min(canvas.width, node.baseX))
        node.baseY = Math.max(0, Math.min(canvas.height, node.baseY))

        node.x = node.baseX + mouseX * PARALLAX_STRENGTH
        node.y = node.baseY + mouseY * PARALLAX_STRENGTH
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            const strength = 1 - dist / CONNECT_DIST
            const opacity = strength * 0.35

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`
            ctx.lineWidth = strength * 1.2
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseScale = 0.7 + Math.sin(node.pulse) * 0.3
        const size = node.size * pulseScale

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size * 6
        )
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.12)')
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 6, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + Math.sin(node.pulse) * 0.15})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
