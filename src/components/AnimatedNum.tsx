import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
}

export default function AnimatedNum({ end, decimals = 0, duration = 1600, prefix = '', suffix = '' }: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

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
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(eased * end)
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
        io.disconnect()
      }
    }, { threshold: 0.5 })

    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
