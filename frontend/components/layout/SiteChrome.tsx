'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { PageTransition } from '@/components/layout/PageTransition'
import { AudioPlayer } from '@/components/ui/AudioPlayer'

// Decide o "chrome" do site. Nas rotas /admin renderiza apenas o conteúdo
// (sem Header/Footer/AudioPlayer/cursor custom), preservando os componentes
// originais intactos para o restante do site.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = (pathname ?? '').startsWith('/admin')

  useEffect(() => {
    // Site usa cursor custom (body.cursor-none); admin usa cursor nativo.
    document.body.classList.toggle('cursor-none', !isAdmin)
  }, [isAdmin])

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <LenisProvider />
      <CustomCursor />
      <Header />
      <PageTransition>
        <main className="overflow-x-hidden">{children}</main>
      </PageTransition>
      <Footer />
      <AudioPlayer />
    </>
  )
}
