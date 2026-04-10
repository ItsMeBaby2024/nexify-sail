'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from '@/components/Hero'
import Quiz, { Answers } from '@/components/Quiz'
import Result from '@/components/Result'
import LangToggle from '@/components/LangToggle'

type Screen = 'hero' | 'quiz' | 'result'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('hero')
  const [answers, setAnswers] = useState<Answers | null>(null)

  function handleStart() { setScreen('quiz') }
  function handleComplete(a: Answers) { setAnswers(a); setScreen('result') }
  function handleRestart() { setAnswers(null); setScreen('quiz') }
  function handleHome() { setAnswers(null); setScreen('hero') }

  return (
    <>
      {/* Fixed lang toggle only on quiz/result — hero has its own inline */}
      {screen !== 'hero' && <LangToggle fixed />}

      <AnimatePresence mode="wait">
        {screen === 'hero' && <Hero key="hero" onStart={handleStart} />}
        {screen === 'quiz' && (
          <Quiz key="quiz" onComplete={handleComplete} onBack={handleHome} />
        )}
        {screen === 'result' && answers && (
          <Result key="result" answers={answers} onRestart={handleRestart} onHome={handleHome} />
        )}
      </AnimatePresence>
    </>
  )
}
