'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/curso', label: 'Curso' },
  { href: '/contato', label: 'Contato' }
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'h-16 border-b border-dourado/15 bg-preto/85 backdrop-blur-xl' : 'h-20 bg-transparent'}`}>
      <div className="container-page flex h-full items-center justify-between">
        <Link href="/" className="leading-none" aria-label="Tri Amici home">
          <div className="font-serif text-2xl font-semibold tracking-[0.12em] text-dourado">TRI AMICI</div>
          <div className="text-[0.57rem] tracking-[0.32em] text-branco/70">PHOTOGRAPHY ACADEMY</div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegacao principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contato" className="min-h-10 px-4 py-2">Aula gratis</Button>
        </div>

        <button className="grid h-10 w-10 place-items-center border border-borda text-dourado md:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-preto/80 backdrop-blur md:hidden" onClick={() => setOpen(false)}>
          <aside className="ml-auto flex h-full w-72 flex-col gap-8 border-l border-dourado/20 bg-escuro p-6" onClick={(event) => event.stopPropagation()}>
            <button className="ml-auto text-dourado" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X />
            </button>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg uppercase tracking-[0.18em]" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button href="/contato">Aula gratis</Button>
          </aside>
        </div>
      )}
    </header>
  )
}
