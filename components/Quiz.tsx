'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { moodKeys, feelingKeys } from '@/lib/data'

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
  enter: { opacity: 0, x: 60, scale: 0.96 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
}

export default function Quiz({ onComplete, onBack }: Props) {
  const { tr } = useI18n()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Partial<Answers>>({})

  const progress = ((step - 1) / 4) * 100 + 25

  function advance(patch: Partial<Answers>) {
    const next = { ...answers, ...patch }
    setAnswers(next)
    if (step < 4) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      onComplete(next as Answers)
    }
  }

  function goBack() {
    if (step === 1) { onBack(); return }
    setDirection(-1)
    setStep(s => s - 1)
  }

  const cardClass = `
    option-card flex flex-col items-center gap-3 p-6 rounded-2xl text-center
    border-2 border-transparent cursor-pointer
  `
  const cardStyle = {
    background: 'rgba(255,255,255,0.06)',
    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
  }

  const steps: Record<number, React.ReactElement> = {
    1: (
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q1Title}
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>{tr.q1Sub}</p>
        <div className="grid grid-cols-2 gap-5">
          {[
            { value: 'alcoholic', emoji: '🍹', label: tr.alcoholic, sub: tr.alcoholicSub },
            { value: 'non-alcoholic', emoji: '🥤', label: tr.nonAlcoholic, sub: tr.nonAlcoholicSub },
          ].map(opt => (
            <motion.div
              key={opt.value}
              className={cardClass}
              style={cardStyle}
              whileHover={{ scale: 1.04, borderColor: '#FFD700', background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => advance({ alc: opt.value as 'alcoholic' | 'non-alcoholic' })}
            >
              <span className="text-6xl">{opt.emoji}</span>
              <span className="text-xl font-semibold">{opt.label}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{opt.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    2: (
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q2Title}
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {[
            { value: 'E', emoji: '🌟', label: tr.eType, sub: tr.eSub },
            { value: 'I', emoji: '🧭', label: tr.iType, sub: tr.iSub },
          ].map(opt => (
            <motion.div
              key={opt.value}
              className={cardClass}
              style={cardStyle}
              whileHover={{ scale: 1.04, borderColor: '#00D4FF', background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => advance({ personality: opt.value as 'E' | 'I' })}
            >
              <span className="text-6xl">{opt.emoji}</span>
              <span className="text-xl font-semibold">{opt.label}</span>
              <span className="text-xs whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.45)' }}>{opt.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    3: (
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q3Title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {tr.moods.map((label, i) => (
            <motion.div
              key={i}
              className={cardClass + ' text-lg font-medium py-5'}
              style={cardStyle}
              whileHover={{ scale: 1.05, borderColor: '#FFD700', background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => advance({ mood: moodKeys[i] })}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    ),
    4: (
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
          {tr.q4Title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {tr.feelings.map((label, i) => (
            <motion.div
              key={i}
              className={cardClass + ' text-lg font-medium py-5'}
              style={cardStyle}
              whileHover={{ scale: 1.05, borderColor: '#00D4FF', background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.93 }}
              onClick={() => advance({ feeling: feelingKeys[i] })}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(180deg, #0A2540 0%, #001F3F 100%)' }}
    >
      <div className="w-full max-w-xl">
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={goBack}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              ← {tr.back}
            </motion.button>

            {/* Progress */}
            <div className="flex-1 mx-5 relative">
              <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <motion.div
                className="absolute top-0 left-0 h-2 rounded-full"
                style={{ background: 'linear-gradient(90deg, #00D4FF, #FFD700)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              {/* Ship on bar */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 text-xl"
                animate={{ left: `calc(${progress}% - 14px)` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                🛳️
              </motion.div>
            </div>

            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {tr.step}{step}{tr.of}
            </span>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
