import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Sail Beyond the Sip • 出海飲一杯 | Nexify 2026',
  description: 'Nexify Annual Dinner 2026 — find your perfect voyage drink with our AI Captain quiz!',
  openGraph: {
    title: 'Sail Beyond the Sip • 出海飲一杯',
    description: 'Nexify Annual Dinner 2026 drink quiz',
    siteName: 'Nexify 2026',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full" style={{ background: '#0A2540' }}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
