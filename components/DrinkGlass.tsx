'use client'

interface Props {
  color: string
  emoji: string
}

const bubbles = [
  { left: '20%', size: 12, delay: 0, duration: 3.2 },
  { left: '38%', size: 7, delay: 0.8, duration: 2.6 },
  { left: '55%', size: 16, delay: 1.4, duration: 3.8 },
  { left: '70%', size: 9, delay: 0.3, duration: 2.9 },
  { left: '82%', size: 11, delay: 2.1, duration: 3.4 },
]

export default function DrinkGlass({ color, emoji }: Props) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 300 }}>
      {/* Glass body */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          border: '10px solid rgba(255,255,255,0.85)',
          borderRadius: '0 0 50% 50% / 0 0 30% 30%',
          background: 'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          boxShadow: `0 0 50px -10px ${color}, inset 0 20px 30px -20px rgba(255,255,255,0.6)`,
        }}
      >
        {/* Liquid */}
        <div
          className="liquid-anim absolute bottom-0 left-0 right-0"
          style={{
            height: '70%',
            background: `linear-gradient(to top, ${color}cc, ${color}44, transparent)`,
            borderRadius: '0 0 50% 50% / 0 0 30% 30%',
          }}
        />

        {/* Bubbles */}
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bubble-anim"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              background: 'rgba(255,255,255,0.7)',
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}

        {/* Garnish emoji */}
        <div
          className="absolute text-3xl"
          style={{ top: 16, right: 14, transform: 'rotate(15deg)' }}
        >
          {emoji}
        </div>

        {/* Little boat on top */}
        <div
          className="sail-anim absolute text-xl"
          style={{ top: 24, left: '50%', transform: 'translateX(-50%)' }}
        >
          ⛵
        </div>
      </div>

      {/* Glass shine highlight */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '12%',
          width: '18%',
          height: '50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          borderRadius: '50%',
          filter: 'blur(6px)',
        }}
      />

      {/* Straw */}
      <div
        className="absolute"
        style={{
          top: '-30px',
          right: '22%',
          width: '8px',
          height: '100px',
          background: `linear-gradient(to bottom, ${color}, white)`,
          borderRadius: '4px',
          transform: 'rotate(8deg)',
          opacity: 0.9,
        }}
      />
    </div>
  )
}
