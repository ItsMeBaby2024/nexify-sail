'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import GoldSparkles from './GoldSparkles'
import StarField from './StarField'

interface Props {
  onStart: () => void
}

export default function Hero({ onStart }: Props) {
  const { tr } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #071428 0%, #0A1F3C 40%, #0C2848 70%, #071428 100%)',
      }}
    >
      <StarField />
      <GoldSparkles />

      {/* Subtle radial glow behind centre */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 700, height: 700,
          background: 'radial-gradient(ellipse, rgba(26,111,168,0.18) 0%, transparent 70%)',
        }}
      />

      {/* SVG wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: 180 }}>
        <div className="wave-drift" style={{ width: '200%', animationDuration: '14s' }}>
          <svg viewBox="0 0 1440 180" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.18)" d="M0,80 C200,140 400,20 600,80 C800,140 1000,30 1200,80 C1320,110 1380,70 1440,80 L1440,180 L0,180 Z"/>
          </svg>
        </div>
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '20s', animationDelay: '-6s' }}>
          <svg viewBox="0 0 1440 140" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(201,168,76,0.07)" d="M0,60 C240,110 480,10 720,60 C960,110 1200,20 1440,60 L1440,140 L0,140 Z"/>
          </svg>
        </div>
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '11s', animationDelay: '-3s' }}>
          <svg viewBox="0 0 1440 100" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(7,20,40,0.7)" d="M0,40 C180,80 360,10 540,50 C720,90 900,20 1080,50 C1260,80 1380,35 1440,45 L1440,100 L0,100 Z"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center py-28">

        {/* ── Left copy ── */}
        <div>
          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-8"
            style={{
              border: '1px solid rgba(201,168,76,0.5)',
              background: 'rgba(201,168,76,0.08)',
              color: '#C9A84C',
            }}
          >
            ⚓ {tr.tagline}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: '"Playfair Display", Georgia, serif', lineHeight: 1.05 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-5"
          >
            <span className="text-white">Sail Beyond</span>
            <br />
            <span className="text-white">the </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D080, #C9A84C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sip
            </span>
          </motion.h1>

          {/* Chinese subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="text-lg mb-2 font-light tracking-wide"
            style={{ color: '#7BBCDB' }}
          >
            出海飲一杯
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="text-sm mb-10 max-w-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {tr.heroSub}
          </motion.p>

          {/* CTA button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 220 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(201,168,76,0.55)' }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            className="flex items-center gap-3 px-9 py-4 rounded-full text-base font-bold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)',
              backgroundSize: '200% auto',
              color: '#071428',
              boxShadow: '0 6px 28px rgba(201,168,76,0.3)',
              letterSpacing: '0.04em',
            }}
          >
            <span>{tr.startBtn}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>

        {/* ── Right — elegant parchment card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.25, type: 'spring' }}
          className="hidden md:flex justify-center"
        >
          {/* Outer glow wrapper */}
          <div
            className="relative"
            style={{
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(201,168,76,0.15))',
            }}
          >
            {/* Cream card */}
            <div
              className="cream-card relative overflow-hidden"
              style={{ width: 360, padding: '36px 32px 32px' }}
            >
              {/* Gold ornament top */}
              <div className="text-center mb-1" style={{ color: '#C9A84C', fontSize: 11, letterSpacing: '0.35em', fontWeight: 600 }}>
                NEXIFY · 2026
              </div>

              {/* Script title */}
              <div
                className="text-center mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: 26,
                  color: '#2a3a5c',
                  lineHeight: 1.3,
                }}
              >
                Sail Beyond the World
              </div>

              {/* Illustrated ship orb — SVG watercolour style */}
              <div className="flex justify-center mb-5">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                  style={{ width: 200, height: 200 }}
                >
                  {/* Dreamy blue orb */}
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <defs>
                      <radialGradient id="orbGrad" cx="40%" cy="35%">
                        <stop offset="0%" stopColor="#c8e8f8"/>
                        <stop offset="50%" stopColor="#6db8e0"/>
                        <stop offset="100%" stopColor="#2a6fa8"/>
                      </radialGradient>
                      <radialGradient id="glossGrad" cx="35%" cy="25%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                      </radialGradient>
                      <filter id="blur1">
                        <feGaussianBlur stdDeviation="3"/>
                      </filter>
                    </defs>
                    {/* Soft outer glow */}
                    <ellipse cx="100" cy="106" rx="76" ry="68" fill="rgba(100,180,220,0.18)" filter="url(#blur1)"/>
                    {/* Main orb */}
                    <ellipse cx="100" cy="100" rx="72" ry="66" fill="url(#orbGrad)"/>
                    {/* Glass gloss */}
                    <ellipse cx="100" cy="100" rx="72" ry="66" fill="url(#glossGrad)"/>
                    {/* Wave inside */}
                    <clipPath id="orbClip">
                      <ellipse cx="100" cy="100" rx="72" ry="66"/>
                    </clipPath>
                    <g clipPath="url(#orbClip)">
                      <path fill="rgba(255,255,255,0.18)" d="M28,110 C50,90 80,130 110,110 C140,90 165,120 172,110 L172,170 L28,170 Z"/>
                      {/* Tiny mountain silhouette */}
                      <path fill="rgba(255,255,255,0.25)" d="M60,130 L80,100 L100,125 L115,108 L135,130 Z"/>
                      {/* Lemon slice hint */}
                      <circle cx="130" cy="68" r="22" fill="rgba(255,220,80,0.55)" stroke="rgba(255,200,40,0.6)" strokeWidth="1.5"/>
                      <line x1="130" y1="46" x2="130" y2="90" stroke="rgba(255,200,40,0.5)" strokeWidth="0.8"/>
                      <line x1="108" y1="68" x2="152" y2="68" stroke="rgba(255,200,40,0.5)" strokeWidth="0.8"/>
                      <line x1="114" y1="52" x2="146" y2="84" stroke="rgba(255,200,40,0.4)" strokeWidth="0.8"/>
                      <line x1="146" y1="52" x2="114" y2="84" stroke="rgba(255,200,40,0.4)" strokeWidth="0.8"/>
                      {/* Little cloud/ghost */}
                      <ellipse cx="72" cy="88" rx="12" ry="10" fill="rgba(255,255,255,0.8)"/>
                      <ellipse cx="62" cy="92" rx="8" ry="7" fill="rgba(255,255,255,0.7)"/>
                      <ellipse cx="82" cy="93" rx="7" ry="6" fill="rgba(255,255,255,0.7)"/>
                    </g>
                    {/* Rim shine */}
                    <ellipse cx="100" cy="100" rx="72" ry="66" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    {/* Star accent */}
                    <text x="140" y="55" fontSize="14" fill="#FFD700" opacity="0.9">★</text>
                  </svg>
                </motion.div>
              </div>

              {/* Gold rule */}
              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', margin: '0 0 14px' }}/>

              <p className="text-center text-xs" style={{ color: '#8C7E6B', letterSpacing: '0.04em' }}>
                {tr.cardSub}
              </p>

              {/* Scattered sparkles on card */}
              {[
                { top: '8%',  left: '6%',  s: 10 },
                { top: '12%', right: '8%', s: 8  },
                { top: '75%', left: '4%',  s: 7  },
                { top: '80%', right: '5%', s: 9  },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute sparkle"
                  style={{
                    ...pos,
                    fontSize: pos.s,
                    color: '#C9A84C',
                    animationDelay: `${i * 1.1}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                >
                  ✦
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating tiny ship */}
      <motion.div
        className="absolute bottom-24 right-10 text-4xl pointer-events-none select-none"
        animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: 0.5 }}
      >
        ⛵
      </motion.div>
    </motion.div>
  )
}
