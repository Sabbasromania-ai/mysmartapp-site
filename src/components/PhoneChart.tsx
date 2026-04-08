import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'

const data = [
  { v: 20 }, { v: 45 }, { v: 35 }, { v: 60 },
  { v: 50 }, { v: 72 }, { v: 65 }, { v: 80 },
  { v: 70 }, { v: 88 }, { v: 78 }, { v: 92 },
  { v: 85 }, { v: 75 },
]

export default function PhoneChart() {
  return (
    <div className="phone-chart">
      <div className="phone-chart-title">Weight trend (14 days)</div>
      <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
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
              animationDuration={1800}
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
