'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import GoldSparkles from './GoldSparkles'
import StarField from './StarField'
import LangToggle from './LangToggle'

interface Props { onStart: () => void }

// Captain's funny one-liners — cycles every few seconds
const captainLines = {
  zh: [
    '歡迎上船！🍸 今晚我係你地嘅船長兼調酒師！',
    '出得嚟飲，就要飲得有型！準備好未？⚓',
    '哈！唔知飲咩？俾我兩分鐘，我搞掂你！🥃',
    '今晚海浪大，但你杯嘢一定穩！😂',
    '上船！唔飲嘢點算係出海？🛳️',
  ],
  en: [
    "Welcome aboard! 🍸 Tonight I'm your Captain AND bartender!",
    "If you sail with style, you drink with style. Ready? ⚓",
    "Ha! Don't know what to drink? Give me 2 minutes! 🥃",
    "The seas are rough tonight, but your drink will be smooth! 😂",
    "All aboard! You can't call it a voyage without a drink! 🛳️",
  ],
}

// Floating ocean elements
const floaters = [
  { emoji: '🌊', x: '5%',  y: '70%', dur: 7,  delay: 0,   size: 'text-3xl', rot: 5  },
  { emoji: '⭐', x: '90%', y: '15%', dur: 5,  delay: 1,   size: 'text-xl',  rot: 20 },
  { emoji: '🌊', x: '80%', y: '75%', dur: 9,  delay: 2,   size: 'text-2xl', rot:-5  },
  { emoji: '⚓', x: '3%',  y: '20%', dur: 8,  delay: 0.5, size: 'text-2xl', rot: 10 },
  { emoji: '🐚', x: '92%', y: '55%', dur: 6,  delay: 1.5, size: 'text-xl',  rot:-15 },
  { emoji: '🌟', x: '15%', y: '85%', dur: 10, delay: 3,   size: 'text-lg',  rot: 8  },
  { emoji: '🍋', x: '75%', y: '8%',  dur: 7,  delay: 2.5, size: 'text-xl',  rot:-8  },
]

export default function Hero({ onStart }: Props) {
  const { tr, lang } = useI18n()
  const [lineIdx, setLineIdx] = useState(0)
  const [showBubble, setShowBubble] = useState(true)

  const lines = captainLines[lang]

  useEffect(() => {
    const id = setInterval(() => {
      setShowBubble(false)
      setTimeout(() => {
        setLineIdx(i => (i + 1) % lines.length)
        setShowBubble(true)
      }, 400)
    }, 4000)
    return () => clearInterval(id)
  }, [lang, lines.length])

  // Reset index when lang changes
  useEffect(() => { setLineIdx(0); setShowBubble(true) }, [lang])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #05111f 0%, #0A1F3C 35%, #0d2a50 65%, #071828 100%)' }}
    >
      <StarField />
      <GoldSparkles />

      {/* ── Floating decorations ── */}
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none select-none opacity-20 ${f.size}`}
          style={{ left: f.x, top: f.y, rotate: f.rot }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* ── SVG Ocean waves bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 200 }}>
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '12s' }}>
          <svg viewBox="0 0 1440 180" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.22)" d="M0,80 C220,140 440,20 660,80 C880,140 1100,30 1320,80 L1440,80 L1440,180 L0,180 Z"/>
          </svg>
        </div>
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '18s', animationDelay: '-5s' }}>
          <svg viewBox="0 0 1440 140" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(201,168,76,0.07)" d="M0,60 C300,110 600,10 900,60 C1100,95 1280,40 1440,60 L1440,140 L0,140 Z"/>
          </svg>
        </div>
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '9s', animationDelay: '-3s' }}>
          <svg viewBox="0 0 1440 100" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(5,17,31,0.75)" d="M0,45 C200,85 400,15 600,50 C800,85 1000,25 1200,55 C1320,70 1400,40 1440,48 L1440,100 L0,100 Z"/>
          </svg>
        </div>
      </div>

      {/* ── TOP NAV: logos + lang toggle ── */}
      <div className="relative z-20 flex items-start justify-between px-5 pt-5">
        {/* Nexify logo — top left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo-nexify.svg"
            alt="Nexify"
            width={72}
            height={52}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </motion.div>

        {/* XOXO Beverages logo + lang toggle — top right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo-xoxo.svg"
            alt="XOXO Beverages"
            width={90}
            height={32}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
          />
          <LangToggle />
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-40 text-center">

        {/* ── Captain SVG illustration ── */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140 }}
          className="relative mb-2"
          style={{ width: 180, height: 180 }}
        >
          {/* Glow behind captain */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.25) 0%, transparent 70%)',
              transform: 'scale(1.4)',
            }}
          />
          {/* Captain SVG — illustrated bartender/boat captain */}
          <svg viewBox="0 0 180 180" width="180" height="180">
            {/* Body — navy coat */}
            <ellipse cx="90" cy="138" rx="38" ry="28" fill="#0A2540"/>
            <rect x="60" y="118" width="60" height="32" rx="8" fill="#0A2540"/>
            {/* Gold coat buttons */}
            <circle cx="90" cy="126" r="3" fill="#C9A84C"/>
            <circle cx="90" cy="136" r="3" fill="#C9A84C"/>
            <circle cx="90" cy="146" r="3" fill="#C9A84C"/>
            {/* Gold epaulettes */}
            <ellipse cx="62" cy="120" rx="10" ry="5" fill="#C9A84C"/>
            <ellipse cx="118" cy="120" rx="10" ry="5" fill="#C9A84C"/>
            {/* Neck */}
            <rect x="82" y="100" width="16" height="20" rx="4" fill="#f5c89a"/>
            {/* Head */}
            <ellipse cx="90" cy="88" rx="28" ry="26" fill="#f5c89a"/>
            {/* Captain hat */}
            <rect x="64" y="58" width="52" height="8" rx="4" fill="#0A2540"/>
            <rect x="70" y="38" width="40" height="24" rx="5" fill="#0A2540"/>
            {/* Hat gold band */}
            <rect x="64" y="58" width="52" height="5" rx="2.5" fill="#C9A84C"/>
            {/* Hat badge */}
            <circle cx="90" cy="46" r="7" fill="#C9A84C"/>
            <text x="90" y="50" textAnchor="middle" fontSize="8" fill="#0A2540" fontWeight="bold">⚓</text>
            {/* Eyes */}
            <ellipse cx="80" cy="88" rx="4" ry="4.5" fill="white"/>
            <ellipse cx="100" cy="88" rx="4" ry="4.5" fill="white"/>
            <circle cx="81" cy="89" r="2.5" fill="#3a2a1a"/>
            <circle cx="101" cy="89" r="2.5" fill="#3a2a1a"/>
            {/* Eye shine */}
            <circle cx="82" cy="88" r="1" fill="white"/>
            <circle cx="102" cy="88" r="1" fill="white"/>
            {/* Eyebrows — raised cheerfully */}
            <path d="M76,82 Q80,79 84,82" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M96,82 Q100,79 104,82" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Big smile */}
            <path d="M78,97 Q90,108 102,97" stroke="#c0704a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Moustache */}
            <path d="M82,94 Q86,97 90,94 Q94,97 98,94" stroke="#5a3a2a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Left arm + cocktail shaker */}
            <line x1="62" y1="118" x2="40" y2="100" stroke="#0A2540" strokeWidth="12" strokeLinecap="round"/>
            <rect x="26" y="82" width="18" height="26" rx="6" fill="#C9A84C"/>
            <rect x="28" y="78" width="14" height="8" rx="4" fill="#F0D080"/>
            {/* Right arm — raised with cocktail glass */}
            <line x1="118" y1="118" x2="140" y2="96" stroke="#0A2540" strokeWidth="12" strokeLinecap="round"/>
            {/* Cocktail glass */}
            <polygon points="130,76 154,76 146,96 138,96" fill="rgba(0,212,255,0.7)" stroke="#C9A84C" strokeWidth="1.5"/>
            <line x1="142" y1="96" x2="142" y2="104" stroke="#C9A84C" strokeWidth="2"/>
            <line x1="136" y1="104" x2="148" y2="104" stroke="#C9A84C" strokeWidth="2"/>
            {/* Drink swizzle */}
            <line x1="147" y1="78" x2="138" y2="93" stroke="#FF6699" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="147" cy="77" r="3" fill="#FFD700"/>
            {/* Splash drops from shaker */}
            <circle cx="20" cy="75" r="2" fill="rgba(0,212,255,0.6)"/>
            <circle cx="24" cy="68" r="1.5" fill="rgba(0,212,255,0.5)"/>
            <circle cx="16" cy="70" r="1" fill="rgba(255,215,0,0.7)"/>
          </svg>
        </motion.div>

        {/* ── Speech bubble ── */}
        <div className="relative mb-6" style={{ minHeight: 72 }}>
          <AnimatePresence mode="wait">
            {showBubble && (
              <motion.div
                key={lineIdx}
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative px-5 py-3 rounded-2xl text-sm font-medium max-w-xs mx-auto text-center"
                style={{
                  background: 'rgba(255,248,237,0.1)',
                  border: '1.5px solid rgba(201,168,76,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.5,
                }}
              >
                {/* Triangle pointer up toward captain */}
                <div
                  className="absolute left-1/2 -top-2.5"
                  style={{
                    transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '10px solid rgba(201,168,76,0.4)',
                  }}
                />
                {lines[lineIdx]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Hero title ── */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="font-bold mb-2 leading-tight"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(42px, 10vw, 72px)',
            lineHeight: 1.05,
          }}
        >
          <span className="text-white">Sail Beyond</span>
          <br />
          <span className="text-white">the </span>
          <span style={{
            background: 'linear-gradient(135deg, #F0D080, #C9A84C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Sip</span>
        </motion.h1>

        {/* Chinese subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="text-base mb-2"
          style={{ color: '#7BBCDB', letterSpacing: '0.1em' }}
        >
          出海飲一杯
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-xs mb-8 max-w-xs leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {tr.heroSub}
        </motion.p>

        {/* ── CTA ── */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(201,168,76,0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="flex items-center gap-3 px-9 py-4 rounded-full text-base font-bold cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)',
            backgroundSize: '200% auto',
            color: '#071428',
            boxShadow: '0 6px 30px rgba(201,168,76,0.35)',
            letterSpacing: '0.05em',
          }}
        >
          <span>{tr.startBtn}</span>
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
            →
          </motion.span>
        </motion.button>

        {/* Subtle scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          ✦ Nexify Annual Dinner 2026 · XOXO Beverages ✦
        </motion.div>
      </div>
    </motion.div>
  )
}
