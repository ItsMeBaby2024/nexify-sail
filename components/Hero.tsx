'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import StarField from './StarField'
import WaveBackground from './WaveBackground'

interface Props {
  onStart: () => void
}

const floatingItems = [
  { emoji: '⚙️', x: '8%', y: '12%', delay: 0, duration: 6, rotate: 12 },
  { emoji: '🔗', x: '88%', y: '20%', delay: 1, duration: 8, rotate: -12 },
  { emoji: '🌊', x: '20%', y: '75%', delay: 2, duration: 10, rotate: 6 },
  { emoji: '⛵', x: '75%', y: '68%', delay: 0.5, duration: 7, rotate: -6 },
  { emoji: '🌟', x: '55%', y: '10%', delay: 1.5, duration: 9, rotate: 20 },
]

export default function Hero({ onStart }: Props) {
  const { tr } = useI18n()

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A2540 0%, #001F3F 60%, #000D1A 100%)' }}
    >
      <StarField />
      <WaveBackground />

      {/* Floating decorative emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl pointer-events-none select-none opacity-25"
          style={{ left: item.x, top: item.y, rotate: item.rotate }}
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Rotating ring */}
      <div
        className="absolute rounded-full border border-white/5 spin-slow pointer-events-none"
        style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="absolute rounded-full border border-[#00D4FF]/10 pointer-events-none"
        style={{
          width: 900,
          height: 900,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin-slow 30s linear infinite reverse',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full py-24">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            🛳️ {tr.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-none mb-4 tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            <span className="text-white">{tr.heroTitle1}</span>
            <br />
            <span className="text-white">the </span>
            <span style={{ color: '#FFD700' }}>Sip</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl mb-3"
            style={{ color: '#00D4FF' }}
          >
            {tr.heroHighlight}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {tr.heroSub}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="flex items-center gap-3 px-10 py-5 rounded-full text-xl font-bold text-[#0A2540] cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', boxShadow: '0 8px 32px rgba(255,215,0,0.3)' }}
          >
            <span>{tr.startBtn}</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 mt-10 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D4FF' }} />
              {tr.badge1}
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#FFD700' }}>✦</span>
              {tr.badge2}
            </div>
          </motion.div>
        </div>

        {/* Right — ship card */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
          className="hidden md:block"
        >
          <div
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(255,215,0,0.06))',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Top label */}
            <div
              className="text-center text-xs tracking-[6px] mb-4 font-semibold"
              style={{ color: '#FFD700' }}
            >
              NEXIFY 2026
            </div>

            {/* Title */}
            <div
              className="text-4xl text-center leading-tight mb-6"
              style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}
            >
              Sail Beyond<br />the World
            </div>

            {/* Animated ship */}
            <div className="flex justify-center py-4">
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl"
              >
                🚢
              </motion.div>
            </div>

            {/* Divider wave */}
            <div className="my-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />

            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {tr.cardSub}
            </p>

            {/* Glow orbs */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.15), transparent 70%)' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
