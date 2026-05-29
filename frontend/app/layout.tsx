import './globals.css'

import type { Metadata } from 'next'

import { Cormorant_Garamond, DM_Sans, Playfair_Display } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { PageTransition } from '@/components/layout/PageTransition'
import { AudioPlayer } from '@/components/ui/AudioPlayer'



const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap', weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://triamici.com.br'),
  title: {
    default: 'Tri Amici Photography Academy',
    template: '%s | Tri Amici Photography Academy'
  },
  description: 'Escola de fotografia profissional em Sorocaba, SP. 25 anos formando fotografos com metodo pratico, artistico e profissionalizante.',
  openGraph: {
    title: 'Tri Amici Photography Academy',
    description: 'Fotografia que muda quem voce e.',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans cursor-none">

        <LenisProvider />

        <CustomCursor />
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <AudioPlayer />
        {/* MobileBottomNav é renderizado dentro de <Header /> */}
      </body>
    </html>
  )
}
