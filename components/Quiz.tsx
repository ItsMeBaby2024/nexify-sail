'use client'

import React, { useState } from 'react'
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

const stepVariants = {
  enter:  { opacity: 0, x: 50,  scale: 0.97 },
  center: { opacity: 1, x: 0,   scale: 1    },
  exit:   { opacity: 0, x: -50, scale: 0.97 },
}

export default function Quiz({ onComplete, onBack }: Props) {
  const { tr } = useI18n()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Partial<Answers>>({})

  const progress = ((step - 1) / 4) * 100 + 25

  function advance(patch: Partial<Answers>) {
    const next = { ...answers, ...patch }
    setAnswers(next)
    if (step < 4) setStep(s => s + 1)
    else onComplete(next as Answers)
  }

  function goBack() {
    if (step === 1) { onBack(); return }
    setStep(s => s - 1)
  }

  // Cream option card
  function OptionCard({
    onClick, emoji, label, sub, accent = '#C9A84C'
  }: { onClick: () => void; emoji: string; label: string; sub?: string; accent?: string }) {
    return (
      <motion.div
        className="option-card flex flex-col items-center gap-2 p-5 rounded-2xl text-center cursor-pointer"
        style={{
          background: 'rgba(255,248,237,0.06)',
          border: '1.5px solid rgba(201,168,76,0.2)',
        }}
        whileHover={{
          background: 'rgba(255,248,237,0.12)',
          borderColor: accent,
          y: -5,
          boxShadow: `0 8px 32px rgba(201,168,76,0.2)`,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className="text-5xl">{emoji}</span>
        <span className="text-base font-semibold text-white">{label}</span>
        {sub && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</span>}
      </motion.div>
    )
  }

  // Text option card (for moods/feelings)
  function TextCard({ onClick, label }: { onClick: () => void; label: string }) {
    return (
      <motion.div
        className="option-card flex items-center justify-center p-5 rounded-2xl text-center cursor-pointer text-sm font-medium text-white"
        style={{
          background: 'rgba(255,248,237,0.05)',
          border: '1.5px solid rgba(201,168,76,0.18)',
          minHeight: 68,
        }}
        whileHover={{
          background: 'rgba(201,168,76,0.1)',
          borderColor: '#C9A84C',
          y: -4,
        }}
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
        <div className="ornament-divider mb-5">PORT 01</div>
        <h2 className="text-xl font-bold mb-1 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q1Title}
        </h2>
        <p className="text-xs mb-7" style={{ color: 'rgba(255,255,255,0.45)' }}>{tr.q1Sub}</p>
        <div className="grid grid-cols-2 gap-4">
          <OptionCard onClick={() => advance({ alc: 'alcoholic' })}     emoji="🍹" label={tr.alcoholic}    sub={tr.alcoholicSub}    />
          <OptionCard onClick={() => advance({ alc: 'non-alcoholic' })} emoji="🥤" label={tr.nonAlcoholic} sub={tr.nonAlcoholicSub} accent="#7BBCDB" />
        </div>
      </div>
    ),
    2: (
      <div>
        <div className="ornament-divider mb-5">PORT 02</div>
        <h2 className="text-xl font-bold mb-7 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q2Title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <OptionCard onClick={() => advance({ personality: 'E' })} emoji="🌟" label={tr.eType} sub={tr.eSub}    />
          <OptionCard onClick={() => advance({ personality: 'I' })} emoji="🧭" label={tr.iType} sub={tr.iSub} accent="#7BBCDB" />
        </div>
      </div>
    ),
    3: (
      <div>
        <div className="ornament-divider mb-5">PORT 03</div>
        <h2 className="text-xl font-bold mb-7 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
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
        <div className="ornament-divider mb-5">PORT 04</div>
        <h2 className="text-xl font-bold mb-7 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
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

      {/* SVG wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 120 }}>
        <div className="wave-drift" style={{ width: '200%', animationDuration: '16s' }}>
          <svg viewBox="0 0 1440 120" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path fill="rgba(26,111,168,0.15)" d="M0,60 C200,110 400,10 600,60 C800,110 1000,20 1200,60 C1320,90 1380,55 1440,60 L1440,120 L0,120 Z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Card */}
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{
            background: 'rgba(10,31,60,0.85)',
            border: '1px solid rgba(201,168,76,0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)',
          }}
        >
          {/* Header: back + progress + step */}
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={goBack}
              className="text-xs flex items-center gap-1.5 shrink-0"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              ← {tr.back}
            </motion.button>

            <div className="flex-1 relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #1A6FA8, #C9A84C)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
              {/* Ship marker */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-base"
                animate={{ left: `calc(${progress}% - 10px)` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                🛳️
              </motion.div>
            </div>

            <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {step} / 4
            </span>
          </div>

          {/* Animated step */}
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
