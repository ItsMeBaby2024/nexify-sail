'use client'

import { useI18n } from '@/lib/i18n'

export default function LangToggle() {
  const { toggleLang, tr } = useI18n()
  return (
    <button
      onClick={toggleLang}
      className="fixed top-5 right-5 z-50 px-4 py-2 rounded-full text-sm font-semibold border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
      style={{ letterSpacing: '0.05em' }}
    >
      {tr.langSwitch}
    </button>
  )
}
