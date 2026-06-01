'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

const links = [
  { href: '/', label: 'Home' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/curso', label: 'Curso' },
  { href: '/contato', label: 'Contato' }
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'h-16 border-b border-dourado/15 bg-preto/90 backdrop-blur-xl'
            : 'h-20 bg-transparent'}`}
      >
        <div className="container-page flex h-full items-center justify-between">

          {/* Logo */}
          <Link href="/" className="leading-none" aria-label="Tri Amici home">
            <div className="font-serif text-xl font-semibold tracking-[0.12em] text-dourado md:text-2xl">
              TRI AMICI
            </div>
            <div className="text-[0.5rem] tracking-[0.3em] text-branco/60 md:text-[0.57rem] md:tracking-[0.32em]">
              PHOTOGRAPHY ACADEMY
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <Button href="/aula-gratuita" className="min-h-10 px-4 py-2">Aula grátis</Button>
          </div>

        </div>
      </header>

      {/* Barra de navegação inferior — mobile only */}
      <MobileBottomNav />
    </>
  )
}
