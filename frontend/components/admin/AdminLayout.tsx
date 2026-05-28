'use client'

import Link from 'next/link'
import { clearToken } from '@/lib/auth'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-preto pb-16 pt-28">
      <div className="container-page">
        <div className="mb-8 flex items-center justify-between border-b border-dourado/20 pb-5">
          <div>
            <p className="section-kicker">Admin</p>
            <h1 className="font-serif text-4xl text-dourado">Tri Amici</h1>
          </div>
          <nav className="flex gap-4 text-sm text-cinza">
            <Link href="/">Site</Link>
            <button onClick={() => { clearToken(); window.location.href = '/admin/login' }}>Sair</button>
          </nav>
        </div>
        {children}
      </div>
    </section>
  )
}
