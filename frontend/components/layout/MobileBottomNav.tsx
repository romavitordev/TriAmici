'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, GraduationCap, Home, MessageCircle } from 'lucide-react'

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/sobre', label: 'Sobre', Icon: Camera },
  { href: '/curso', label: 'Curso', Icon: GraduationCap },
  { href: '/contato', label: 'Contato', Icon: MessageCircle }
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegacao inferior"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-dourado/20 bg-escuro/90 backdrop-blur md:hidden"
    >
      <ul className="flex h-16 items-center justify-around">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <li key={href} className="flex-1 text-center">
              <Link
                href={href}
                aria-label={label}
                className={`mx-auto grid h-full w-full place-items-center transition ${active ? 'text-dourado' : 'text-branco/60 hover:text-dourado'}`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

