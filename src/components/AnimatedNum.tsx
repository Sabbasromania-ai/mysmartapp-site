import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  drift?: number       // random drift range after initial animation
  driftInterval?: number // ms between drifts
}

export default function AnimatedNum({
  end,
  decimals = 0,
  duration = 1600,
  prefix = '',
  suffix = '',
  drift = 0,
  driftInterval = 3000,
}: Props) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const currentVal = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()

        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          currentVal.current = eased * end
          setDisplay(currentVal.current.toFixed(decimals))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
        io.disconnect()
      }
    }, { threshold: 0.5 })

    io.observe(el)
    return () => io.disconnect()
  }, [end, duration, decimals])

  // Subtle drift after initial animation
  useEffect(() => {
    if (drift === 0) return

    const interval = setInterval(() => {
      if (!started.current) return
      const offset = (Math.random() - 0.5) * drift
      const newVal = end + offset
      currentVal.current = newVal

      // Smooth transition over 600ms
      const from = parseFloat(display)
      const to = newVal
      const start = performance.now()
      const dur = 600

      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 2)
        const v = from + (to - from) * eased
        setDisplay(v.toFixed(decimals))
        if (p < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }, driftInterval)

    return () => clearInterval(interval)
  }, [drift, driftInterval, end, decimals, display])

  return (
    <span ref={ref} className="animated-num">
      {prefix}{display}{suffix}
    </span>
  )
}
