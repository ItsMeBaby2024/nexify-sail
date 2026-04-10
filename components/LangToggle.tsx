'use client'

import { useI18n } from '@/lib/i18n'

interface Props {
  /** When true, renders as fixed overlay (quiz/result screens) */
  fixed?: boolean
}

export default function LangToggle({ fixed = false }: Props) {
  const { toggleLang, tr } = useI18n()
  return (
    <button
      onClick={toggleLang}
      className={`${fixed ? 'fixed top-5 right-5 z-50' : ''} px-3 py-1.5 rounded-full text-xs font-semibold border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all`}
      style={{ letterSpacing: '0.06em' }}
    >
      {tr.langSwitch}
    </button>
  )
}
