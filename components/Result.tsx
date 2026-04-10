'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { drinkData, drinkMatrix, RatingLevel } from '@/lib/data'
import { Answers } from './Quiz'
import GoldSparkles from './GoldSparkles'
import StarField from './StarField'

interface Props {
  answers: Answers
  onRestart: () => void
  onHome: () => void
}

const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  color: ['#C9A84C', '#F0D080', '#1A6FA8', '#7BBCDB', '#ffffff'][i % 5],
  delay: Math.random() * 0.6,
  size: Math.random() * 8 + 5,
}))

function RatingPills({ level, tr }: { level: RatingLevel; tr: { low: string; mid: string; high: string } }) {
  const pills: RatingLevel[] = ['low', 'mid', 'high']
  return (
    <div className="flex gap-2">
      {pills.map(p => (
        <span key={p} className={`rating-pill ${level === p ? 'active' : ''}`}>
          {tr[p]}
        </span>
      ))}
    </div>
  )
}

/** SVG watercolour drink orb — colour-themed per drink */
function DrinkOrb({ color, color2 }: { color: string; color2: string }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: 200, height: 200, position: 'relative' }}
    >
      <svg viewBox="0 0 200 200" width="200" height="200">
        <defs>
          <radialGradient id={`og-${color}`} cx="38%" cy="32%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
            <stop offset="55%" stopColor={color} stopOpacity="0.85"/>
            <stop offset="100%" stopColor={color2} stopOpacity="1"/>
          </radialGradient>
          <radialGradient id={`og-gloss-${color}`} cx="32%" cy="22%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          <filter id={`blur-${color}`}><feGaussianBlur stdDeviation="4"/></filter>
          <clipPath id={`clip-${color}`}><ellipse cx="100" cy="100" rx="74" ry="68"/></clipPath>
        </defs>
        {/* Soft outer glow */}
        <ellipse cx="100" cy="108" rx="78" ry="70" fill={color} opacity="0.12" filter={`url(#blur-${color})`}/>
        {/* Main orb */}
        <ellipse cx="100" cy="100" rx="74" ry="68" fill={`url(#og-${color})`}/>
        {/* Glossy highlight */}
        <ellipse cx="100" cy="100" rx="74" ry="68" fill={`url(#og-gloss-${color})`}/>
        {/* Interior wave */}
        <g clipPath={`url(#clip-${color})`}>
          <path fill="rgba(255,255,255,0.2)" d="M26,118 C55,95 85,135 115,115 C145,95 168,122 174,114 L174,170 L26,170 Z"/>
          {/* Lemon circle */}
          <circle cx="132" cy="68" r="21" fill="rgba(255,235,100,0.5)" stroke="rgba(255,210,50,0.7)" strokeWidth="1.5"/>
          <line x1="132" y1="47" x2="132" y2="89" stroke="rgba(255,210,50,0.5)" strokeWidth="0.8"/>
          <line x1="111" y1="68" x2="153" y2="68" stroke="rgba(255,210,50,0.5)" strokeWidth="0.8"/>
          <line x1="117" y1="53" x2="147" y2="83" stroke="rgba(255,210,50,0.35)" strokeWidth="0.8"/>
          <line x1="147" y1="53" x2="117" y2="83" stroke="rgba(255,210,50,0.35)" strokeWidth="0.8"/>
          {/* Little cloud/blob */}
          <ellipse cx="70" cy="86" rx="13" ry="11" fill="rgba(255,255,255,0.75)"/>
          <ellipse cx="60" cy="91" rx="9"  ry="8"  fill="rgba(255,255,255,0.65)"/>
          <ellipse cx="80" cy="92" rx="8"  ry="7"  fill="rgba(255,255,255,0.65)"/>
        </g>
        {/* Rim */}
        <ellipse cx="100" cy="100" rx="74" ry="68" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Star accent */}
        <text x="140" y="54" fontSize="14" fill="#FFD700" opacity="0.9">★</text>
      </svg>
    </motion.div>
  )
}

export default function Result({ answers, onRestart, onHome }: Props) {
  const { lang, tr } = useI18n()
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const drinkIndex = drinkMatrix[answers.alc][answers.personality][answers.mood][answers.feeling]
  const drink = drinkData[drinkIndex]
  const isAlc = answers.alc === 'alcoholic'
  const name = isAlc ? drink.name : drink.nameMock
  const ingredients = isAlc ? drink.alcIngredients : drink.mockIngredients

  useEffect(() => {
    const t1 = setTimeout(() => { setShowResult(true); setShowConfetti(true) }, 2000)
    const t2 = setTimeout(() => setShowConfetti(false), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #071428 0%, #0A1F3C 50%, #071428 100%)' }}
    >
      <StarField />
      <GoldSparkles />

      {/* SVG wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 120 }}>
        <div className="wave-drift" style={{ width: '200%', animationDuration: '16s' }}>
          <svg viewBox="0 0 1440 120" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.15)" d="M0,60 C200,110 400,10 600,60 C800,110 1000,20 1200,60 C1320,90 1380,55 1440,60 L1440,120 L0,120 Z"/>
          </svg>
        </div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confettiPieces.map(c => (
          <motion.div
            key={c.id}
            className="absolute pointer-events-none rounded-sm"
            style={{ left: `${c.x}%`, top: '5%', width: c.size, height: c.size, background: c.color, zIndex: 60 }}
            initial={{ y: -10, opacity: 1, rotate: 0 }}
            animate={{ y: 600, opacity: 0, rotate: 540 }}
            transition={{ duration: 2.2, delay: c.delay, ease: 'easeIn' }}
          />
        ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!showResult ? (
            /* ── Loading ── */
            <motion.div
              key="loading"
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="ship-loading text-7xl mb-8">🛳️</div>
              <h2 className="text-2xl mb-6 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                {tr.loading}
              </h2>
              <div className="flex items-center gap-3" style={{ color: '#C9A84C' }}>
                {[0,1,2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#C9A84C' }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.22, repeat: Infinity }}
                  />
                ))}
                <span className="text-xs tracking-widest ml-2 font-semibold">{tr.loadingDot}</span>
              </div>
            </motion.div>
          ) : (
            /* ── Result cream card ── */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, type: 'spring', stiffness: 120 }}
            >
              {/* Parchment card */}
              <div className="cream-card relative overflow-hidden">

                {/* Gold accent strip at top */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${drink.color}, #C9A84C, ${drink.color2})` }}/>

                <div style={{ padding: '28px 28px 24px' }}>

                  {/* Alc badge + flavor tag row */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: isAlc ? '#0A1F3C' : '#2a6fa8', color: '#F0D080', letterSpacing: '0.06em' }}
                    >
                      {isAlc ? tr.alcBadge : tr.nonAlcBadge}
                    </span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: '#0A1F3C', color: '#C9A84C', letterSpacing: '0.04em' }}
                    >
                      {drink.flavorTag[lang]}
                    </span>
                  </div>

                  {/* Drink name — script italic */}
                  <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: 'italic',
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#1a2a4a',
                      lineHeight: 1.15,
                      marginBottom: 4,
                    }}
                  >
                    {name}
                  </motion.h1>

                  {/* Ingredients line */}
                  <p className="text-xs mb-6" style={{ color: '#8C7E6B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {tr.ingredients}: {ingredients}
                  </p>

                  {/* Orb centred */}
                  <div className="flex justify-center mb-6">
                    <DrinkOrb color={drink.color} color2={drink.color2} />
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6 text-center" style={{ color: '#4a4a4a' }}>
                    {drink.taste[lang]}
                  </p>

                  {/* ── RATINGS ── */}
                  <div className="ornament-divider mb-4" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                    {tr.ratings}
                  </div>
                  <div className="flex flex-col gap-2.5 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#8C7E6B', minWidth: 110 }}>
                        <span>🍸</span> {tr.alcLevel}
                      </div>
                      <RatingPills level={drink.alcLevel} tr={{ low: tr.low, mid: tr.mid, high: tr.high }}/>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#8C7E6B', minWidth: 110 }}>
                        <span>🚢</span> {tr.socialVibe}
                      </div>
                      <RatingPills level={drink.socialVibe} tr={{ low: tr.low, mid: tr.mid, high: tr.high }}/>
                    </div>
                  </div>

                  {/* ── SOUL ELEMENTS ── */}
                  <div
                    className="rounded-2xl p-4 mb-6"
                    style={{ background: '#F0E8D4', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    <div className="ornament-divider mb-4" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                      {tr.soulTitle}
                    </div>
                    <div className="flex justify-around">
                      {drink.soul.map((group, gi) => (
                        <div key={gi} className="soul-tag">
                          <span className="tag-icon">{group.icon}</span>
                          {group.tags.map((tag, ti) => (
                            <span key={ti}>{tag[lang]}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── PERFECT PAIRINGS ── */}
                  <div className="ornament-divider mb-4" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                    {tr.pairingTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {drink.pairings.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-2xl p-3"
                        style={{ background: '#F5EDD8', border: '1px solid rgba(201,168,76,0.25)' }}
                      >
                        <span style={{ fontSize: 24 }}>{p.icon}</span>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: '#2a3a5c' }}>{p.name[lang]}</div>
                          <div className="text-xs" style={{ color: '#8C7E6B' }}>{p.sub[lang]}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ── Captain note ── */}
                  <p className="text-xs text-center" style={{ color: '#8C7E6B', fontStyle: 'italic' }}>
                    ⛵ {drink.funny[lang]}
                  </p>
                </div>

                {/* Gold stripe bottom */}
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent, #C9A84C, transparent)` }}/>

                {/* Action buttons */}
                <div className="flex gap-3 px-6 py-5" style={{ background: '#F5EDD8' }}>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(201,168,76,0.4)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onRestart}
                    className="flex-1 py-3 rounded-full text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #F0D080)', color: '#071428' }}
                  >
                    🔄 {tr.restart}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onHome}
                    className="flex-1 py-3 rounded-full text-sm font-semibold"
                    style={{ border: '1.5px solid #C9A84C', color: '#8C7E6B', background: 'transparent' }}
                  >
                    ⚓ {tr.home}
                  </motion.button>
                </div>

                {/* Corner sparkles */}
                {[
                  { top: '6%',  left: '4%',  s: 9 },
                  { top: '4%',  right: '5%', s: 7 },
                  { top: '50%', right: '3%', s: 8 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute sparkle pointer-events-none"
                    style={{ ...pos, fontSize: pos.s, color: '#C9A84C', animationDelay: `${i}s`, animationDuration: `${3+i}s` }}
                  >
                    ✦
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
