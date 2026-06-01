import './globals.css'

import type { Metadata } from 'next'

import { Cormorant_Garamond, DM_Sans, Playfair_Display } from 'next/font/google'

import { SiteChrome } from '@/components/layout/SiteChrome'



const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap', weight: ['400', '600', '700'] })

const OG_IMAGE = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'

export const metadata: Metadata = {
  metadataBase: new URL('https://triamici.com.br'),
  title: {
    default: 'Tri Amici Photography Academy',
    template: '%s | Tri Amici Photography Academy'
  },
  description: 'Escola de fotografia profissional em Sorocaba, SP. 25 anos formando fotografos com metodo pratico, artistico e profissionalizante.',
  keywords: ['escola de fotografia', 'curso de fotografia', 'Sorocaba', 'fotografia profissional', 'Tri Amici', 'aula de fotografia', 'curso DSLR'],
  authors: [{ name: 'Tri Amici Photography Academy' }],
  creator: 'Tri Amici Photography Academy',
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://triamici.com.br',
    siteName: 'Tri Amici Photography Academy',
    title: 'Tri Amici Photography Academy',
    description: 'Fotografia que muda quem voce e.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Tri Amici Photography Academy' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tri Amici Photography Academy',
    description: 'Fotografia que muda quem voce e.',
    images: [OG_IMAGE]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans cursor-none">
        {/*
          scrollRestoration = 'manual' impede o browser de restaurar a posição
          de scroll em refresh/reopen, garantindo que a Hero comece no frame 0.
          Inline no início do <body> — um <script> não pode ser filho direto de
          <html> (causava erro de hydration).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }",
          }}
        />
        {/* SiteChrome decide o que renderizar: site completo (Header/Footer/
            AudioPlayer/cursor custom) ou, em /admin, apenas o conteúdo. */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
