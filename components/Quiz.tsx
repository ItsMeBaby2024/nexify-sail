'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { moodKeys, feelingKeys } from '@/lib/data'
import GoldSparkles from './GoldSparkles'
import StarField from './StarField'

export interface Answers {
  alc: 'alcoholic' | 'non-alcoholic'
  personality: 'E' | 'I'
  mood: string
  feeling: string
}

interface Props {
  onComplete: (answers: Answers) => void
  onBack: () => void
}

const TOTAL_SECONDS = 60
const TOTAL_STEPS = 4

const stepVariants = {
  enter:  { opacity: 0, x: 50,  scale: 0.97 },
  center: { opacity: 1, x: 0,   scale: 1    },
  exit:   { opacity: 0, x: -50, scale: 0.97 },
}

// ── Step illustrations ─────────────────────────────────────────────────────

/** Step 1: cocktail glass vs mocktail on a boat deck */
function IllustrationAlc() {
  return (
    <svg viewBox="0 0 240 100" width="100%" style={{ display: 'block', maxHeight: 90 }}>
      {/* Boat deck plank */}
      <rect x="10" y="70" width="220" height="18" rx="5" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1.2"/>
      <line x1="10" y1="76" x2="230" y2="76" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      {/* Porthole on deck */}
      <circle cx="195" cy="79" r="5" fill="none" stroke="#C9A84C" strokeWidth="1"/>
      <circle cx="195" cy="79" r="2.5" fill="rgba(201,168,76,0.25)"/>
      {/* Rope coil */}
      <ellipse cx="35" cy="79" rx="10" ry="5" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeDasharray="3,2"/>

      {/* LEFT: Cocktail glass (martini) */}
      <g transform="translate(62, 8)">
        {/* Glass */}
        <path d="M-22,0 L22,0 L8,38 L-8,38 Z" fill="rgba(100,180,255,0.35)" stroke="#7BBCDB" strokeWidth="1.2"/>
        <line x1="0" y1="38" x2="0" y2="58" stroke="#7BBCDB" strokeWidth="1.5"/>
        <line x1="-12" y1="58" x2="12" y2="58" stroke="#7BBCDB" strokeWidth="1.5"/>
        {/* Liquid fill */}
        <path d="M-15,8 L15,8 L8,38 L-8,38 Z" fill="rgba(26,168,200,0.55)"/>
        {/* Olive */}
        <circle cx="4" cy="14" r="4" fill="#6BBF7C"/>
        <line x1="4" y1="10" x2="4" y2="4" stroke="#C9A84C" strokeWidth="1"/>
        {/* Rim sparkle */}
        <text x="-26" y="-3" fontSize="8" fill="#FFD700">✦</text>
        <text x="22" y="-3" fontSize="6" fill="#FFD700">✦</text>
      </g>

      {/* RIGHT: Mocktail (highball with fruit) */}
      <g transform="translate(172, 12)">
        {/* Glass */}
        <rect x="-13" y="0" width="26" height="52" rx="4" fill="rgba(255,200,100,0.25)" stroke="#C9A84C" strokeWidth="1.2"/>
        {/* Liquid */}
        <rect x="-13" y="15" width="26" height="37" rx="3" fill="rgba(255,180,60,0.45)"/>
        {/* Ice cubes */}
        <rect x="-9" y="17" width="9" height="9" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/>
        <rect x="2" y="22" width="8" height="8" rx="2" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5"/>
        {/* Straw */}
        <rect x="4" y="-8" width="4" height="40" rx="2" fill="#FF9A00" opacity="0.8" transform="rotate(6,6,16)"/>
        {/* Orange slice on rim */}
        <circle cx="13" cy="3" r="9" fill="rgba(255,160,30,0.55)" stroke="#FF9A00" strokeWidth="0.8"/>
        <circle cx="13" cy="3" r="4" fill="rgba(255,130,0,0.3)"/>
        <line x1="13" y1="-6" x2="13" y2="12" stroke="#FF9A00" strokeWidth="0.5"/>
        <line x1="4" y1="3" x2="22" y2="3" stroke="#FF9A00" strokeWidth="0.5"/>
        <line x1="6" y1="-4" x2="20" y2="10" stroke="#FF9A00" strokeWidth="0.4"/>
      </g>

      {/* Wave at bottom */}
      <path d="M0,88 C40,82 80,92 120,86 C160,80 200,92 240,86" fill="none" stroke="rgba(26,111,168,0.4)" strokeWidth="1.5"/>
    </svg>
  )
}

/** Step 2: party deck (E) vs quiet cabin (I) */
function IllustrationPersonality() {
  return (
    <svg viewBox="0 0 240 100" width="100%" style={{ display: 'block', maxHeight: 90 }}>
      {/* Divider rope */}
      <path d="M120,10 C120,10 120,90 120,90" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4,3"/>

      {/* LEFT: Party deck (E) */}
      <g>
        {/* Deck */}
        <rect x="8" y="68" width="104" height="14" rx="4" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1"/>
        {/* String lights */}
        <path d="M12,18 C30,26 50,14 70,22 C90,30 108,18 112,22" fill="none" stroke="#C9A84C" strokeWidth="1"/>
        {[18,40,62,84,106].map((x,i) => (
          <circle key={i} cx={x} cy={i%2===0?22:18} r="3.5" fill={['#FFD700','#FF6699','#00D4FF','#FFD700','#FF6699'][i]} opacity="0.85"/>
        ))}
        {/* Party people */}
        <circle cx="38" cy="52" r="7" fill="#C9A84C" opacity="0.8"/>
        <line x1="38" y1="59" x2="38" y2="68" stroke="#C9A84C" strokeWidth="2"/>
        <line x1="28" y1="62" x2="38" y2="60" stroke="#C9A84C" strokeWidth="1.5"/>
        <line x1="38" y1="60" x2="46" y2="56" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="70" cy="54" r="7" fill="#F0D080" opacity="0.7"/>
        <line x1="70" y1="61" x2="70" y2="68" stroke="#F0D080" strokeWidth="2"/>
        <line x1="62" y1="56" x2="70" y2="62" stroke="#F0D080" strokeWidth="1.5"/>
        <line x1="70" y1="62" x2="78" y2="58" stroke="#F0D080" strokeWidth="1.5"/>
        {/* Music note */}
        <text x="86" y="45" fontSize="14" fill="#C9A84C" opacity="0.8">♪</text>
        <text x="20" y="36" fontSize="10" fill="#C9A84C" opacity="0.6">♫</text>
      </g>

      {/* RIGHT: Quiet cabin (I) */}
      <g transform="translate(128,0)">
        {/* Cabin window */}
        <rect x="12" y="12" width="76" height="56" rx="6" fill="#0a2540" stroke="#C9A84C" strokeWidth="1.2"/>
        {/* Window pane cross */}
        <line x1="50" y1="12" x2="50" y2="68" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
        <line x1="12" y1="40" x2="88" y2="40" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
        {/* Stars through window */}
        {[[25,22],[65,18],[75,55],[20,58],[50,25]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity={0.4+i*0.1}/>
        ))}
        {/* Moon through window */}
        <circle cx="65" cy="28" r="9" fill="#FFF8D0" opacity="0.7"/>
        <circle cx="69" cy="25" r="7" fill="#0a2540"/>
        {/* Person silhouette reading */}
        <ellipse cx="35" cy="54" rx="8" ry="8" fill="#1a3a5c" stroke="#7BBCDB" strokeWidth="0.8"/>
        <rect x="25" y="54" width="20" height="12" rx="3" fill="#1a3a5c" stroke="#7BBCDB" strokeWidth="0.8"/>
        {/* Book */}
        <rect x="20" y="56" width="18" height="12" rx="2" fill="#C9A84C" opacity="0.6"/>
        <line x1="29" y1="56" x2="29" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
      </g>

      {/* Wave */}
      <path d="M0,88 C40,82 80,92 120,86 C160,80 200,92 240,86" fill="none" stroke="rgba(26,111,168,0.4)" strokeWidth="1.5"/>
    </svg>
  )
}

/** Step 3: ocean mood scenes */
function IllustrationMood() {
  return (
    <svg viewBox="0 0 240 100" width="100%" style={{ display: 'block', maxHeight: 90 }}>
      {/* Sky */}
      <rect width="240" height="100" fill="rgba(10,31,60,0.4)" rx="8"/>
      {/* Sun */}
      <circle cx="40" cy="28" r="14" fill="#FFD700" opacity="0.8"/>
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const rad = deg * Math.PI/180
        return <line key={i} x1={40+17*Math.cos(rad)} y1={28+17*Math.sin(rad)} x2={40+22*Math.cos(rad)} y2={28+22*Math.sin(rad)} stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
      })}
      {/* Happy face in sun */}
      <circle cx="37" cy="26" r="1.5" fill="#E07820"/>
      <circle cx="43" cy="26" r="1.5" fill="#E07820"/>
      <path d="M36,31 C38,34 42,34 44,31" fill="none" stroke="#E07820" strokeWidth="1.2"/>

      {/* Lightning bolt (energetic) */}
      <g transform="translate(85,12)">
        <circle cx="16" cy="18" r="16" fill="rgba(255,180,0,0.15)" stroke="rgba(255,180,0,0.4)" strokeWidth="1"/>
        <path d="M18,4 L10,18 L16,18 L14,32 L22,16 L16,16 Z" fill="#FFB300" opacity="0.85"/>
      </g>

      {/* Gentle wave (relaxed) */}
      <g transform="translate(135,10)">
        <circle cx="20" cy="20" r="16" fill="rgba(26,111,168,0.2)" stroke="rgba(26,111,168,0.5)" strokeWidth="1"/>
        <path d="M6,18 C10,12 16,24 20,18 C24,12 30,22 34,18" fill="none" stroke="#7BBCDB" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6,24 C10,18 16,28 20,24 C24,18 30,26 34,24" fill="none" stroke="#7BBCDB" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>

      {/* Telescope (curious) */}
      <g transform="translate(193,10)">
        <circle cx="18" cy="18" r="16" fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
        <rect x="6" y="15" width="24" height="7" rx="3" fill="#C9A84C" opacity="0.7"/>
        <rect x="26" y="13" width="5" height="11" rx="2" fill="#C9A84C" opacity="0.85"/>
        <circle cx="8" cy="18.5" r="4" fill="none" stroke="#F0D080" strokeWidth="1.5"/>
        {/* Stars being observed */}
        <text x="8" y="8" fontSize="6" fill="#FFD700">✦</text>
        <text x="26" y="9" fontSize="5" fill="#FFD700">✧</text>
      </g>

      {/* Labels */}
      <text x="40" y="56" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)">😄</text>
      <text x="101" y="56" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)">⚡</text>
      <text x="155" y="56" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)">😌</text>
      <text x="211" y="56" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)">🧐</text>

      {/* Boat silhouette at bottom */}
      <path d="M60,80 Q120,92 180,80 L174,90 Q120,96 66,90 Z" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1"/>
      <line x1="120" y1="80" x2="120" y2="60" stroke="#C9A84C" strokeWidth="1.5"/>
      <path d="M120,62 L120,78 L102,72 Z" fill="rgba(255,255,255,0.7)"/>
      {/* Waves */}
      <path d="M0,92 C40,86 80,96 120,90 C160,84 200,96 240,90" fill="none" stroke="rgba(26,111,168,0.45)" strokeWidth="1.5"/>
    </svg>
  )
}

/** Step 4: drink effect illustrations (nautical) */
function IllustrationFeeling() {
  return (
    <svg viewBox="0 0 240 100" width="100%" style={{ display: 'block', maxHeight: 90 }}>
      {/* Background */}
      <rect width="240" height="100" fill="rgba(10,31,60,0.3)" rx="8"/>

      {/* Coffee/wake up */}
      <g transform="translate(16,14)">
        <circle cx="20" cy="24" r="18" fill="rgba(100,60,20,0.2)" stroke="rgba(180,120,40,0.5)" strokeWidth="1"/>
        {/* Cup */}
        <path d="M12,24 L14,36 Q20,39 26,36 L28,24 Z" fill="#8B4513" opacity="0.7"/>
        <path d="M28,27 C34,24 34,32 28,30" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Steam */}
        <path d="M16,22 C16,18 20,16 18,12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M22,22 C22,18 26,16 24,12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
        <text x="10" y="10" fontSize="7" fill="#FFD700">☕</text>
      </g>

      {/* Wave / refreshing */}
      <g transform="translate(72,14)">
        <circle cx="20" cy="24" r="18" fill="rgba(26,111,168,0.2)" stroke="rgba(26,168,200,0.5)" strokeWidth="1"/>
        {/* Splash */}
        <path d="M6,30 C10,20 16,32 20,24 C24,16 30,28 34,20" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10,36 C14,28 18,38 22,32 C26,26 30,36 34,30" fill="none" stroke="#7BBCDB" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* Droplets */}
        <circle cx="20" cy="12" r="2.5" fill="#00D4FF" opacity="0.7"/>
        <circle cx="30" cy="16" r="1.8" fill="#7BBCDB" opacity="0.6"/>
        <circle cx="12" cy="16" r="2" fill="#00D4FF" opacity="0.5"/>
      </g>

      {/* Warm / healing flame */}
      <g transform="translate(128,14)">
        <circle cx="20" cy="24" r="18" fill="rgba(255,100,30,0.15)" stroke="rgba(255,130,0,0.5)" strokeWidth="1"/>
        {/* Flame */}
        <path d="M20,36 C12,30 10,22 16,16 C14,22 18,24 18,18 C20,12 24,16 22,20 C26,14 28,22 26,28 C30,22 28,16 26,12 C30,18 30,28 20,36 Z" fill="#FF6B00" opacity="0.8"/>
        <path d="M20,34 C15,28 15,24 18,20 C17,24 20,26 20,22 C22,18 24,22 22,26 C24,22 24,26 20,34 Z" fill="#FFD700" opacity="0.7"/>
        {/* Heart */}
        <text x="26" y="14" fontSize="8" fill="#FF6699">♥</text>
      </g>

      {/* Star / surprise */}
      <g transform="translate(184,14)">
        <circle cx="20" cy="24" r="18" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.5)" strokeWidth="1"/>
        {/* Magic sparkles */}
        <text x="8" y="20" fontSize="12" fill="#FFD700" opacity="0.9">✦</text>
        <text x="24" y="16" fontSize="8" fill="#F0D080">✧</text>
        <text x="28" y="30" fontSize="10" fill="#FFD700" opacity="0.7">★</text>
        <text x="10" y="34" fontSize="7" fill="#C9A84C">✦</text>
        {/* Wand */}
        <line x1="14" y1="34" x2="28" y2="16" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="28" cy="15" r="3" fill="#FFD700"/>
      </g>

      {/* Boat at bottom */}
      <path d="M60,80 Q120,92 180,80 L174,90 Q120,96 66,90 Z" fill="#1a3a5c" stroke="#C9A84C" strokeWidth="1"/>
      <line x1="120" y1="80" x2="120" y2="62" stroke="#C9A84C" strokeWidth="1.5"/>
      <path d="M120,64 L120,78 L104,72 Z" fill="rgba(255,255,255,0.7)"/>
      <path d="M0,92 C40,86 80,96 120,90 C160,84 200,96 240,90" fill="none" stroke="rgba(26,111,168,0.45)" strokeWidth="1.5"/>
    </svg>
  )
}

export default function Quiz({ onComplete, onBack }: Props) {
  const { tr } = useI18n()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS)
  const [expired, setExpired] = useState(false)

  const progress = ((step - 1) / TOTAL_STEPS) * 100 + (100 / TOTAL_STEPS)

  const reset = useCallback(() => {
    setStep(1)
    setAnswers({})
    setTimeLeft(TOTAL_SECONDS)
    setExpired(false)
  }, [])

  useEffect(() => {
    if (expired) return
    if (timeLeft <= 0) { setExpired(true); return }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, expired])

  function advance(patch: Partial<Answers>) {
    const next = { ...answers, ...patch }
    setAnswers(next)
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
    } else {
      onComplete(next as Answers)
    }
  }

  function goBack() {
    if (step === 1) { onBack(); return }
    setStep(s => s - 1)
  }

  const timerPct = (timeLeft / TOTAL_SECONDS) * 100
  const timerColor = timeLeft > 20 ? '#C9A84C' : timeLeft > 10 ? '#FF9A00' : '#FF4444'
  const circumference = 2 * Math.PI * 20

  function OptionCard({ onClick, emoji, label, sub, accent = '#C9A84C' }: { onClick: () => void; emoji: string; label: string; sub?: string; accent?: string }) {
    return (
      <motion.div
        className="option-card flex flex-col items-center gap-2 p-5 rounded-2xl text-center cursor-pointer"
        style={{ background: 'rgba(255,248,237,0.06)', border: '1.5px solid rgba(201,168,76,0.2)' }}
        whileHover={{ background: 'rgba(255,248,237,0.12)', borderColor: accent, y: -5, boxShadow: `0 8px 32px rgba(201,168,76,0.2)` }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className="text-5xl">{emoji}</span>
        <span className="text-base font-semibold text-white">{label}</span>
        {sub && <span className="text-xs whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</span>}
      </motion.div>
    )
  }

  function TextCard({ onClick, label }: { onClick: () => void; label: string }) {
    return (
      <motion.div
        className="option-card flex items-center justify-center p-5 rounded-2xl text-center cursor-pointer text-sm font-medium text-white"
        style={{ background: 'rgba(255,248,237,0.05)', border: '1.5px solid rgba(201,168,76,0.18)', minHeight: 68 }}
        whileHover={{ background: 'rgba(201,168,76,0.1)', borderColor: '#C9A84C', y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {label}
      </motion.div>
    )
  }

  const steps: Record<number, React.ReactElement> = {
    1: (
      <div>
        <div className="ornament-divider mb-3">PORT 01</div>
        <div className="mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <IllustrationAlc />
        </div>
        <h2 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q1Title}
        </h2>
        <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>{tr.q1Sub}</p>
        <div className="grid grid-cols-2 gap-4">
          <OptionCard onClick={() => advance({ alc: 'alcoholic' })} emoji="🍹" label={tr.alcoholic} sub={tr.alcoholicSub} />
          <OptionCard onClick={() => advance({ alc: 'non-alcoholic' })} emoji="🥤" label={tr.nonAlcoholic} sub={tr.nonAlcoholicSub} accent="#7BBCDB" />
        </div>
      </div>
    ),
    2: (
      <div>
        <div className="ornament-divider mb-3">PORT 02</div>
        <div className="mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <IllustrationPersonality />
        </div>
        <h2 className="text-xl font-bold mb-7 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q2Title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <OptionCard onClick={() => advance({ personality: 'E' })} emoji="🌟" label={tr.eType} sub={tr.eSub} />
          <OptionCard onClick={() => advance({ personality: 'I' })} emoji="🧭" label={tr.iType} sub={tr.iSub} accent="#7BBCDB" />
        </div>
      </div>
    ),
    3: (
      <div>
        <div className="ornament-divider mb-3">PORT 03</div>
        <div className="mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <IllustrationMood />
        </div>
        <h2 className="text-xl font-bold mb-5 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q3Title}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {tr.moods.map((label, i) => (
            <TextCard key={i} onClick={() => advance({ mood: moodKeys[i] })} label={label} />
          ))}
        </div>
      </div>
    ),
    4: (
      <div>
        <div className="ornament-divider mb-3">PORT 04</div>
        <div className="mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <IllustrationFeeling />
        </div>
        <h2 className="text-xl font-bold mb-5 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q4Title}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {tr.feelings.map((label, i) => (
            <TextCard key={i} onClick={() => advance({ feeling: feelingKeys[i] })} label={label} />
          ))}
        </div>
      </div>
    ),
  }

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
        <div className="wave-drift" style={{ width: '200%', animationDuration: '16s' }}>
          <svg viewBox="0 0 1440 120" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.15)" d="M0,60 C200,110 400,10 600,60 C800,110 1000,20 1200,60 C1320,90 1380,55 1440,60 L1440,120 L0,120 Z"/>
          </svg>
        </div>
      </div>

      {/* EXPIRED OVERLAY */}
      <AnimatePresence>
        {expired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-8"
            style={{ background: 'rgba(5,17,31,0.96)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180 }}
              className="text-8xl mb-6"
            >
              ⏱️
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
              {tr.timeUp}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>{tr.timeUpSub}</p>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(201,168,76,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-8 py-4 rounded-full text-base font-bold"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #F0D080)', color: '#071428' }}
            >
              🔄 {tr.restart}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg">
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{ background: 'rgba(10,31,60,0.85)', border: '1px solid rgba(201,168,76,0.25)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        >
          {/* Header: back + progress ship + timer */}
          <div className="flex items-center gap-3 mb-6">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={goBack}
              className="text-xs flex items-center gap-1 shrink-0"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              ← {tr.back}
            </motion.button>

            {/* Progress bar */}
            <div className="flex-1 relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #1A6FA8, #C9A84C)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-base"
                animate={{ left: `calc(${progress}% - 10px)` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                🛳️
              </motion.div>
            </div>

            <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>{step}/{TOTAL_STEPS}</span>

            {/* Circular countdown timer */}
            <div className="relative shrink-0" style={{ width: 48, height: 48 }}>
              <svg width="48" height="48" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke={timerColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - timerPct / 100)}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                style={{ color: timerColor }}
              >
                {timeLeft}
              </div>
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
