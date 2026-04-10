'use client'

export default function WaveBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: '220px' }}>
      {/* Wave layer 1 */}
      <svg
        className="absolute bottom-0 wave-animate"
        style={{ width: '200%', animationDuration: '10s' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(0,212,255,0.12)"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
        />
      </svg>
      {/* Wave layer 2 */}
      <svg
        className="absolute bottom-0 wave-animate"
        style={{ width: '200%', animationDuration: '14s', animationDelay: '-4s' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,215,0,0.07)"
          d="M0,80 C360,20 720,100 1080,50 C1260,25 1380,70 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
      {/* Wave layer 3 */}
      <svg
        className="absolute bottom-0 wave-animate"
        style={{ width: '200%', animationDuration: '18s', animationDelay: '-8s' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(0,31,63,0.6)"
          d="M0,40 C180,90 360,10 540,50 C720,90 900,30 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  )
}
