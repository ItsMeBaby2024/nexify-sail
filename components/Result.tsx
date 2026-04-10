'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { drinkData, drinkMatrix } from '@/lib/data'
import { Answers } from './Quiz'
import DrinkGlass from './DrinkGlass'

interface Props {
  answers: Answers
  onRestart: () => void
  onHome: () => void
}

// Confetti pieces
const confetti = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  color: ['#FFD700', '#00D4FF', '#FF6699', '#FFB366', '#ffffff'][i % 5],
  delay: Math.random() * 0.8,
  size: Math.random() * 10 + 6,
}))

export default function Result({ answers, onRestart, onHome }: Props) {
  const { lang, tr } = useI18n()
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const drinkIndex = drinkMatrix[answers.alc][answers.personality][answers.mood][answers.feeling]
  const drink = drinkData[drinkIndex]
  const isAlc = answers.alc === 'alcoholic'
  const name = isAlc ? drink.name : drink.nameMock
  const ingredients = isAlc ? drink.alc : drink.mock

  useEffect(() => {
    const t1 = setTimeout(() => setShowResult(true), 2200)
    const t2 = setTimeout(() => setShowConfetti(true), 2400)
    const t3 = setTimeout(() => setShowConfetti(false), 4800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A2540 0%, #001F3F 60%, #000D1A 100%)' }}
    >
      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && confetti.map(c => (
          <motion.div
            key={c.id}
            className="absolute pointer-events-none rounded-sm"
            style={{
              left: `${c.x}%`,
              top: '10%',
              width: c.size,
              height: c.size,
              background: c.color,
              zIndex: 50,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 500, opacity: 0, rotate: 720 }}
            transition={{ duration: 2, delay: c.delay, ease: 'easeIn' }}
          />
        ))}
      </AnimatePresence>

      <div className="w-full max-w-4xl">
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Loading state */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="loading"
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-24 px-8 text-center"
              >
                <motion.div
                  className="text-7xl mb-6 ship-loading"
                >
                  🛳️
                </motion.div>
                <h2
                  className="text-2xl font-serif mb-6"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {tr.loading}
                </h2>
                <div className="flex items-center gap-3" style={{ color: '#FFD700' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#FFD700' }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, delay: i * 0.25, repeat: Infinity }}
                    />
                  ))}
                  <span className="text-sm tracking-widest ml-2">{tr.loadingDot}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                {/* Top glow bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #00D4FF, ${drink.color}, #FFD700)` }} />

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-10 items-center">
                    {/* Drink illustration */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 150 }}
                      className="flex-shrink-0"
                    >
                      <DrinkGlass color={drink.color} emoji={drink.emoji} />
                    </motion.div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm mb-4"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        {isAlc ? tr.alcBadge : tr.nonAlcBadge}
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold mb-3"
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          color: '#FFD700',
                          textShadow: `0 0 40px ${drink.color}66`,
                        }}
                      >
                        {name}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg mb-8 leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                      >
                        {drink.funny[lang]}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-5 p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {tr.ingredients}
                        </div>
                        <div className="text-lg font-medium">{ingredients}</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {tr.taste}
                        </div>
                        <div className="text-lg">{drink.taste[lang]}</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        className="mt-6 flex items-center gap-2 text-sm"
                        style={{ color: '#00D4FF' }}
                      >
                        <span>💨</span>
                        {tr.captainNote}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div
                  className="flex flex-col sm:flex-row gap-4 px-8 pb-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,215,0,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRestart}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#0A2540' }}
                  >
                    🔄 {tr.restart}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHome}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-lg font-semibold"
                    style={{ border: '2px solid #FFD700', color: '#FFD700' }}
                  >
                    ⚓ {tr.home}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
