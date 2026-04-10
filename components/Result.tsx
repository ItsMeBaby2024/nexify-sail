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

const confettiPieces = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  color: ['#C9A84C', '#F0D080', '#1A6FA8', '#7BBCDB', '#ffffff'][i % 5],
  delay: Math.random() * 0.5,
  size: Math.random() * 7 + 4,
}))

function RatingPills({ level, tr }: { level: RatingLevel; tr: { low: string; mid: string; high: string } }) {
  return (
    <div className="flex gap-2">
      {(['low', 'mid', 'high'] as RatingLevel[]).map(p => (
        <span key={p} className={`rating-pill ${level === p ? 'active' : ''}`}>{tr[p]}</span>
      ))}
    </div>
  )
}

/** Colourful drink orb floating inside a boat scene */
function BoatDrinkScene({ color, color2 }: { color: string; color2: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', maxWidth: 340 }}
    >
      <svg viewBox="0 0 340 220" width="100%" style={{ display: 'block' }}>
        <defs>
          {/* Sky gradient */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1f3c"/>
            <stop offset="100%" stopColor="#1a4a7a"/>
          </linearGradient>
          {/* Water gradient */}
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6fa8"/>
            <stop offset="100%" stopColor="#0a2540"/>
          </linearGradient>
          {/* Orb gradient */}
          <radialGradient id="orbG" cx="35%" cy="30%">
            <stop offset="0%" stopColor={color} stopOpacity="0.55"/>
            <stop offset="50%" stopColor={color} stopOpacity="0.88"/>
            <stop offset="100%" stopColor={color2}/>
          </radialGradient>
          <radialGradient id="orbGloss" cx="30%" cy="20%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="softBlur"><feGaussianBlur stdDeviation="3"/></filter>
          <clipPath id="orbClip"><circle cx="170" cy="88" r="62"/></clipPath>
        </defs>

        {/* Sky */}
        <rect width="340" height="220" fill="url(#sky)"/>

        {/* Stars */}
        {[[30,20],[60,35],[100,15],[250,25],[290,18],[320,40],[180,10]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity={0.5 + (i%3)*0.2}/>
        ))}
        <text x="308" y="32" fontSize="10" fill="#FFD700" opacity="0.8">✦</text>
        <text x="22" y="45" fontSize="8" fill="#FFD700" opacity="0.6">✦</text>

        {/* Moon */}
        <circle cx="295" cy="30" r="16" fill="#FFF8D0" opacity="0.9"/>
        <circle cx="302" cy="26" r="13" fill="#1a4a7a"/>

        {/* Orb glow behind */}
        <circle cx="170" cy="88" r="70" fill={color} opacity="0.15" filter="url(#softBlur)"/>

        {/* Main drink orb */}
        <circle cx="170" cy="88" r="62" fill="url(#orbG)"/>
        <circle cx="170" cy="88" r="62" fill="url(#orbGloss)"/>

        {/* Orb interior */}
        <g clipPath="url(#orbClip)">
          {/* Wave inside */}
          <path fill="rgba(255,255,255,0.18)" d="M108,108 C125,92 148,118 170,105 C192,92 212,112 232,105 L232,152 L108,152 Z"/>
          {/* Lemon slice */}
          <circle cx="210" cy="68" r="20" fill="rgba(255,230,80,0.55)" stroke="rgba(255,210,40,0.7)" strokeWidth="1.5"/>
          <line x1="210" y1="48" x2="210" y2="88" stroke="rgba(255,210,40,0.5)" strokeWidth="0.8"/>
          <line x1="190" y1="68" x2="230" y2="68" stroke="rgba(255,210,40,0.5)" strokeWidth="0.8"/>
          <line x1="196" y1="54" x2="224" y2="82" stroke="rgba(255,210,40,0.35)" strokeWidth="0.8"/>
          <line x1="224" y1="54" x2="196" y2="82" stroke="rgba(255,210,40,0.35)" strokeWidth="0.8"/>
          {/* Cloud blob */}
          <ellipse cx="138" cy="82" rx="14" ry="11" fill="rgba(255,255,255,0.75)"/>
          <ellipse cx="126" cy="87" rx="10" ry="9" fill="rgba(255,255,255,0.65)"/>
          <ellipse cx="150" cy="88" rx="9" ry="8" fill="rgba(255,255,255,0.65)"/>
        </g>

        {/* Orb rim */}
        <circle cx="170" cy="88" r="62" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
        <text x="222" y="44" fontSize="13" fill="#FFD700" opacity="0.9">★</text>

        {/* Straw in orb */}
        <rect x="182" y="38" width="6" height="55" rx="3" fill={color2} opacity="0.8" transform="rotate(8,185,65)"/>

        {/* Water surface */}
        <path fill="url(#water)" d="M0,162 C50,148 100,170 170,158 C240,146 290,168 340,155 L340,220 L0,220 Z"/>
        {/* Wave highlight */}
        <path fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" d="M0,162 C50,148 100,170 170,158 C240,146 290,168 340,155"/>

        {/* BOAT hull */}
        <path d="M90,162 Q170,178 250,162 L238,185 Q170,194 102,185 Z" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1.5"/>
        {/* Hull shine */}
        <path d="M105,167 Q170,179 235,167" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
        {/* Mast */}
        <line x1="170" y1="162" x2="170" y2="108" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Sails */}
        <path d="M170,110 L170,158 L128,142 Z" fill="rgba(255,255,255,0.9)"/>
        <path d="M170,116 L170,156 L208,138 Z" fill="rgba(240,208,128,0.75)"/>
        {/* Flag */}
        <polygon points="170,108 184,113 170,118" fill="#C9A84C"/>
        {/* Porthole */}
        <circle cx="198" cy="174" r="5" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
        <circle cx="198" cy="174" r="2.5" fill="rgba(201,168,76,0.3)"/>
        {/* Foam at hull waterline */}
        <path d="M100,185 Q130,189 170,186 Q210,183 240,185" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Reflection of orb in water */}
        <ellipse cx="170" cy="172" rx="44" ry="8" fill={color} opacity="0.12"/>
      </svg>
    </motion.div>
  )
}

export default function Result({ answers, onRestart, onHome }: Props) {
  const { lang, tr } = useI18n()
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  // isAlc defaults to what the user chose in the quiz, but can be toggled
  const [isAlc, setIsAlc] = useState(answers.alc === 'alcoholic')

  const drinkIndex = drinkMatrix[answers.alc][answers.personality][answers.mood][answers.feeling]
  const drink = drinkData[drinkIndex]
  const name = isAlc ? drink.name : drink.nameMock
  const ingredients = isAlc ? drink.alcIngredients : drink.mockIngredients

  useEffect(() => {
    const t1 = setTimeout(() => { setShowResult(true); setShowConfetti(true) }, 2000)
    const t2 = setTimeout(() => setShowConfetti(false), 4000)
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

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 120 }}>
        <div className="wave-drift" style={{ width: '200%', animationDuration: '14s' }}>
          <svg viewBox="0 0 1440 120" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.2)" d="M0,60 C200,110 400,10 600,60 C800,110 1000,20 1200,60 C1320,90 1380,55 1440,60 L1440,120 L0,120 Z"/>
          </svg>
        </div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confettiPieces.map(c => (
          <motion.div key={c.id} className="absolute pointer-events-none rounded-sm"
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
            /* Loading */
            <motion.div key="loading" exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="ship-loading text-7xl mb-8">🛳️</div>
              <h2 className="text-2xl mb-6 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                {tr.loading}
              </h2>
              <div className="flex items-center gap-3" style={{ color: '#C9A84C' }}>
                {[0,1,2].map(i => (
                  <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: '#C9A84C' }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.22, repeat: Infinity }}
                  />
                ))}
                <span className="text-xs tracking-widest ml-2 font-semibold">{tr.loadingDot}</span>
              </div>
            </motion.div>
          ) : (
            /* Result card */
            <motion.div key="result"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, type: 'spring', stiffness: 120 }}
            >
              <div className="cream-card relative overflow-hidden">

                {/* Top colour strip */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${drink.color}, #C9A84C, ${drink.color2})` }}/>

                <div style={{ padding: '24px 24px 20px' }}>

                  {/* Badges row */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    {/* Alc toggle button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAlc(v => !v)}
                      className="text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        background: isAlc ? '#1a3a5c' : '#2a6fa8',
                        color: '#F0D080',
                        border: `1.5px solid ${isAlc ? '#C9A84C' : '#7BBCDB'}`,
                        letterSpacing: '0.05em',
                        transition: 'all 0.3s',
                      }}
                    >
                      <span>{isAlc ? '🍹' : '🥤'}</span>
                      <span>{isAlc ? tr.cocktailLabel : tr.mocktailLabel}</span>
                      <span style={{ opacity: 0.6, fontSize: 9 }}>▼</span>
                    </motion.button>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: '#0A1F3C', color: '#C9A84C', letterSpacing: '0.04em' }}>
                      {drink.flavorTag[lang]}
                    </span>
                  </div>

                  {/* Drink name */}
                  <AnimatePresence mode="wait">
                    <motion.h1 key={name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 30, fontWeight: 700, color: '#1a2a4a', lineHeight: 1.15, marginBottom: 4 }}
                    >
                      {name}
                    </motion.h1>
                  </AnimatePresence>

                  {/* Ingredients */}
                  <AnimatePresence mode="wait">
                    <motion.p key={ingredients}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-xs mb-5"
                      style={{ color: '#8C7E6B', letterSpacing: '0.07em', textTransform: 'uppercase' }}
                    >
                      {tr.ingredients}: {ingredients}
                    </motion.p>
                  </AnimatePresence>

                  {/* Boat + Drink scene */}
                  <div className="flex justify-center mb-5">
                    <BoatDrinkScene color={drink.color} color2={drink.color2} />
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-5 text-center" style={{ color: '#4a4a4a' }}>
                    {drink.taste[lang]}
                  </p>

                  {/* RATINGS */}
                  <div className="ornament-divider mb-4" style={{ fontSize: 10, letterSpacing: '0.2em' }}>{tr.ratings}</div>
                  <div className="flex flex-col gap-2.5 mb-5">
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

                  {/* SOUL ELEMENTS */}
                  <div className="rounded-2xl p-4 mb-5" style={{ background: '#F0E8D4', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <div className="ornament-divider mb-3" style={{ fontSize: 10, letterSpacing: '0.2em' }}>{tr.soulTitle}</div>
                    <div className="flex justify-around">
                      {drink.soul.map((group, gi) => (
                        <div key={gi} className="soul-tag">
                          <span className="tag-icon">{group.icon}</span>
                          {group.tags.map((tag, ti) => <span key={ti}>{tag[lang]}</span>)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PERFECT PAIRINGS */}
                  <div className="ornament-divider mb-3" style={{ fontSize: 10, letterSpacing: '0.2em' }}>{tr.pairingTitle}</div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {drink.pairings.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-2xl p-3"
                        style={{ background: '#F5EDD8', border: '1px solid rgba(201,168,76,0.25)' }}>
                        <span style={{ fontSize: 22 }}>{p.icon}</span>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: '#2a3a5c' }}>{p.name[lang]}</div>
                          <div className="text-xs" style={{ color: '#8C7E6B' }}>{p.sub[lang]}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Captain note */}
                  <p className="text-xs text-center" style={{ color: '#8C7E6B', fontStyle: 'italic' }}>
                    ⛵ {drink.funny[lang]}
                  </p>
                </div>

                {/* Bottom gold line */}
                <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}/>

                {/* Action buttons */}
                <div className="flex gap-3 px-5 py-4" style={{ background: '#F5EDD8' }}>
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
                {[{ top: '5%', left: '3%', s: 9 }, { top: '4%', right: '4%', s: 7 }].map((pos, i) => (
                  <div key={i} className="absolute sparkle pointer-events-none"
                    style={{ ...pos, fontSize: pos.s, color: '#C9A84C', animationDelay: `${i}s`, animationDuration: `${3+i}s` }}>
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
