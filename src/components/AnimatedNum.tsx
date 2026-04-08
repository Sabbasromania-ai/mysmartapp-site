import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  drift?: number
  driftInterval?: number
}

export default function AnimatedNum({
  end,
  decimals = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  drift = 0,
  driftInterval = 2500,
}: Props) {
  const [text, setText] = useState('0')
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const val = useRef(0)

  // Count-up on first viewport entry
  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        io.disconnect()

        const t0 = performance.now()
        function tick(now: number) {
          const p = Math.min((now - t0) / duration, 1)
          // Cubic ease-out
          const e = 1 - Math.pow(1 - p, 3)
          val.current = e * end
          setText(val.current.toFixed(decimals))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration, decimals])

  // Ongoing drift: small random ticks
  useEffect(() => {
    if (!drift || drift === 0) return

    const iv = setInterval(() => {
      if (!started.current) return
      const offset = (Math.random() - 0.5) * drift
      const target = end + offset

      // Smooth 500ms transition to new value
      const from = val.current
      const t0 = performance.now()
      function tick(now: number) {
        const p = Math.min((now - t0) / 500, 1)
        const e = 1 - Math.pow(1 - p, 2)
        val.current = from + (target - from) * e
        setText(val.current.toFixed(decimals))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, driftInterval)

    return () => clearInterval(iv)
  }, [drift, driftInterval, end, decimals])

  return (
    <span ref={elRef} className="animated-num">
      {prefix}{text}{suffix}
    </span>
  )
}
