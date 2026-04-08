import { useState, useEffect } from 'react'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'

const BASE_DATA = [20, 45, 35, 60, 50, 72, 65, 80, 70, 88, 78, 92, 85, 75]

function jitter(base: number[], amount: number) {
  return base.map(v => ({ v: v + (Math.random() - 0.5) * amount }))
}

export default function PhoneChart() {
  const [data, setData] = useState(() => jitter(BASE_DATA, 0))
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Small data shifts every 4 seconds
    const interval = setInterval(() => {
      setData(jitter(BASE_DATA, 6))
      setKey(k => k + 1)
    }, 4000)
    return () => clearInterval(interval)
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
      <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart key={key} data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <YAxis domain={[0, 100]} hide />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#00e5ff"
              strokeWidth={2}
              fill="url(#chartGrad)"
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
