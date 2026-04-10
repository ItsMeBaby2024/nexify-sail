'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'
import GoldSparkles from './GoldSparkles'
import StarField from './StarField'
import LangToggle from './LangToggle'

interface Props { onStart: () => void }

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

/** Fully detailed SVG sailing boat */
function Boat({ width = 130, opacity = 1 }: { width?: number; opacity?: number }) {
  const h = width * 0.65
  return (
    <svg viewBox="0 0 130 85" width={width} height={h} style={{ display: 'block', opacity }}>
      {/* Hull shadow */}
      <ellipse cx="65" cy="72" rx="52" ry="7" fill="rgba(0,0,0,0.18)"/>
      {/* Hull body */}
      <path d="M12,54 Q65,68 118,54 L106,70 Q65,78 24,70 Z" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1.8"/>
      {/* Hull highlight stripe */}
      <path d="M22,58 Q65,69 108,58" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2"/>
      {/* Mast */}
      <line x1="65" y1="54" x2="65" y2="8" stroke="#C9A84C" strokeWidth="2.8" strokeLinecap="round"/>
      {/* Boom */}
      <line x1="65" y1="42" x2="38" y2="50" stroke="#C9A84C" strokeWidth="1.4"/>
      {/* Main sail — white */}
      <path d="M65,10 L65,52 L22,40 Z" fill="rgba(255,255,255,0.94)" stroke="rgba(200,200,200,0.4)" strokeWidth="0.6"/>
      {/* Inner sail crease */}
      <line x1="65" y1="18" x2="38" y2="42" stroke="rgba(180,180,180,0.3)" strokeWidth="0.6"/>
      {/* Fore sail — gold */}
      <path d="M65,14 L65,50 L102,36 Z" fill="rgba(240,208,128,0.82)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6"/>
      {/* Flag */}
      <polygon points="65,8 80,13 65,18" fill="#C9A84C"/>
      {/* Porthole */}
      <circle cx="90" cy="61" r="5" fill="none" stroke="#C9A84C" strokeWidth="1.4"/>
      <circle cx="90" cy="61" r="2.5" fill="rgba(201,168,76,0.35)"/>
      {/* Rope detail */}
      <path d="M65,10 Q80,28 102,36" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      {/* Waterline foam */}
      <path d="M18,70 Q40,74 65,71 Q90,68 112,70" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function Hero({ onStart }: Props) {
  const { tr, lang } = useI18n()
  const [lineIdx, setLineIdx] = useState(0)
  const [showBubble, setShowBubble] = useState(true)
  const lines = captainLines[lang]

  useEffect(() => {
    const id = setInterval(() => {
      setShowBubble(false)
      setTimeout(() => { setLineIdx(i => (i + 1) % lines.length); setShowBubble(true) }, 400)
    }, 4000)
    return () => clearInterval(id)
  }, [lang, lines.length])
  useEffect(() => { setLineIdx(0); setShowBubble(true) }, [lang])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #05111f 0%, #0A1F3C 35%, #0d2a50 65%, #071828 100%)' }}
    >
      <StarField />
      <GoldSparkles />

      {/* ── WAVE + BOATS ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 240 }}>

        {/* Wave layer 1 — back */}
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '18s' }}>
          <svg viewBox="0 0 1440 200" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(13,42,80,0.85)" d="M0,95 C200,155 400,45 600,95 C800,145 1000,50 1200,95 C1320,122 1390,80 1440,95 L1440,200 L0,200 Z"/>
          </svg>
        </div>

        {/* Wave layer 2 — mid, lighter blue */}
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '11s', animationDelay: '-4s' }}>
          <svg viewBox="0 0 1440 160" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.3)" d="M0,72 C240,125 480,22 720,72 C960,122 1200,28 1440,72 L1440,160 L0,160 Z"/>
          </svg>
        </div>

        {/* Wave layer 3 — front dark */}
        <div className="wave-drift absolute bottom-0" style={{ width: '200%', animationDuration: '7.5s', animationDelay: '-2s' }}>
          <svg viewBox="0 0 1440 100" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(5,17,31,0.9)" d="M0,50 C160,82 320,22 480,52 C640,82 800,20 960,50 C1120,80 1300,30 1440,50 L1440,100 L0,100 Z"/>
          </svg>
        </div>

        {/* ── BOAT 1: main — drifts left→right across screen ── */}
        <motion.div
          className="absolute"
          style={{ bottom: 62 }}
          animate={{
            x: ['10vw', '55vw', '10vw'],
            y: [0, -12, 4, -8, 0],
            rotate: [-2, 2.5, -1.5, 2, -2],
          }}
          transition={{
            x: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 5,  repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Boat width={130} />
        </motion.div>

        {/* ── BOAT 2: smaller, opposite drift ── */}
        <motion.div
          className="absolute"
          style={{ bottom: 80 }}
          animate={{
            x: ['72vw', '28vw', '72vw'],
            y: [0, -8, 2, -6, 0],
            rotate: [1, -2, 1, -1.5, 1],
          }}
          transition={{
            x: { duration: 28, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
            rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
        >
          <Boat width={88} opacity={0.55} />
        </motion.div>

        {/* ── BOAT 3: tiny, far background ── */}
        <motion.div
          className="absolute"
          style={{ bottom: 100 }}
          animate={{
            x: ['5vw', '85vw', '5vw'],
            y: [0, -6, 1, -4, 0],
            rotate: [-1, 1.5, -1, 1, -1],
          }}
          transition={{
            x: { duration: 38, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 },
            rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 },
          }}
        >
          <Boat width={55} opacity={0.28} />
        </motion.div>
      </div>

      {/* ── TOP NAV: logos ── */}
      <div className="relative z-20 flex items-start justify-between px-5 pt-5">
        {/* Left stack: Nexify on top, XOXO directly below */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col gap-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-nexify.svg" alt="Nexify" style={{ height: 44, width: 'auto' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-xoxo.png" alt="XOXO Beverages" style={{ height: 22, width: 'auto' }} />
        </motion.div>

        {/* Right: lang toggle only */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <LangToggle />
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-2 pb-56 text-center">

        {/* Captain */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140 }}
          className="relative mb-2" style={{ width: 180, height: 180 }}
        >
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.22) 0%, transparent 70%)', transform: 'scale(1.4)' }}/>
          <svg viewBox="0 0 180 180" width="180" height="180">
            <ellipse cx="90" cy="138" rx="38" ry="28" fill="#0A2540"/>
            <rect x="60" y="118" width="60" height="32" rx="8" fill="#0A2540"/>
            <circle cx="90" cy="126" r="3" fill="#C9A84C"/>
            <circle cx="90" cy="136" r="3" fill="#C9A84C"/>
            <circle cx="90" cy="146" r="3" fill="#C9A84C"/>
            <ellipse cx="62" cy="120" rx="10" ry="5" fill="#C9A84C"/>
            <ellipse cx="118" cy="120" rx="10" ry="5" fill="#C9A84C"/>
            <rect x="82" y="100" width="16" height="20" rx="4" fill="#f5c89a"/>
            <ellipse cx="90" cy="88" rx="28" ry="26" fill="#f5c89a"/>
            <rect x="64" y="58" width="52" height="8" rx="4" fill="#0A2540"/>
            <rect x="70" y="38" width="40" height="24" rx="5" fill="#0A2540"/>
            <rect x="64" y="58" width="52" height="5" rx="2.5" fill="#C9A84C"/>
            <circle cx="90" cy="46" r="7" fill="#C9A84C"/>
            <text x="90" y="50" textAnchor="middle" fontSize="8" fill="#0A2540" fontWeight="bold">⚓</text>
            <ellipse cx="80" cy="88" rx="4" ry="4.5" fill="white"/>
            <ellipse cx="100" cy="88" rx="4" ry="4.5" fill="white"/>
            <circle cx="81" cy="89" r="2.5" fill="#3a2a1a"/>
            <circle cx="101" cy="89" r="2.5" fill="#3a2a1a"/>
            <circle cx="82" cy="88" r="1" fill="white"/>
            <circle cx="102" cy="88" r="1" fill="white"/>
            <path d="M76,82 Q80,79 84,82" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M96,82 Q100,79 104,82" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M78,97 Q90,108 102,97" stroke="#c0704a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M82,94 Q86,97 90,94 Q94,97 98,94" stroke="#5a3a2a" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="62" y1="118" x2="40" y2="100" stroke="#0A2540" strokeWidth="12" strokeLinecap="round"/>
            <rect x="26" y="82" width="18" height="26" rx="6" fill="#C9A84C"/>
            <rect x="28" y="78" width="14" height="8" rx="4" fill="#F0D080"/>
            <line x1="118" y1="118" x2="140" y2="96" stroke="#0A2540" strokeWidth="12" strokeLinecap="round"/>
            <polygon points="130,76 154,76 146,96 138,96" fill="rgba(0,212,255,0.7)" stroke="#C9A84C" strokeWidth="1.5"/>
            <line x1="142" y1="96" x2="142" y2="104" stroke="#C9A84C" strokeWidth="2"/>
            <line x1="136" y1="104" x2="148" y2="104" stroke="#C9A84C" strokeWidth="2"/>
            <line x1="147" y1="78" x2="138" y2="93" stroke="#FF6699" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="147" cy="77" r="3" fill="#FFD700"/>
            <circle cx="20" cy="75" r="2" fill="rgba(0,212,255,0.6)"/>
            <circle cx="24" cy="68" r="1.5" fill="rgba(0,212,255,0.5)"/>
          </svg>
        </motion.div>

        {/* Speech bubble */}
        <div className="relative mb-5" style={{ minHeight: 68 }}>
          <AnimatePresence mode="wait">
            {showBubble && (
              <motion.div key={lineIdx}
                initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.35 }}
                className="relative px-5 py-3 rounded-2xl text-sm font-medium max-w-xs mx-auto text-center"
                style={{ background: 'rgba(255,248,237,0.1)', border: '1.5px solid rgba(201,168,76,0.4)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}
              >
                <div className="absolute left-1/2 -top-2.5" style={{ transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '10px solid rgba(201,168,76,0.4)' }}/>
                {lines[lineIdx]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
          className="font-bold mb-2 leading-tight"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(38px, 9vw, 68px)', lineHeight: 1.05 }}
        >
          <span className="text-white">Sail Beyond</span><br />
          <span className="text-white">the </span>
          <span style={{ background: 'linear-gradient(135deg, #F0D080, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sip</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} className="text-base mb-2" style={{ color: '#7BBCDB', letterSpacing: '0.1em' }}>
          出海飲一杯
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-xs mb-8 max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {tr.heroSub}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(201,168,76,0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="flex items-center gap-3 px-9 py-4 rounded-full text-base font-bold cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C)', backgroundSize: '200% auto', color: '#071428', boxShadow: '0 6px 30px rgba(201,168,76,0.35)', letterSpacing: '0.05em' }}
        >
          <span>{tr.startBtn}</span>
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>→</motion.span>
        </motion.button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          ✦ Nexify Annual Dinner 2026 · XOXO Beverages ✦
        </motion.div>
      </div>
    </motion.div>
  )
}
