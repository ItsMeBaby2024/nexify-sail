'use client'

const sparks = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
  shape: i % 3, // 0=dot, 1=cross, 2=star
}))

export default function GoldSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map(s => (
        <div
          key={s.id}
          className="absolute sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            color: s.id % 4 === 0 ? '#F0D080' : '#C9A84C',
            fontSize: s.size * 3,
          }}
        >
          {s.shape === 0 ? '✦' : s.shape === 1 ? '✧' : '·'}
        </div>
      ))}
    </div>
  )
}
