'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await adminLogin(user, password)
      router.replace('/admin')
      router.refresh()
    } catch {
      setError('Usuário ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-preto px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="font-serif text-2xl font-semibold tracking-[0.12em] text-dourado">TRI AMICI</div>
          <div className="text-[0.55rem] tracking-[0.3em] text-branco/60">PHOTOGRAPHY ACADEMY</div>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-2xl border border-borda bg-escuro/60 p-8">
          <h1 className="text-center font-serif text-xl text-branco">Painel administrativo</h1>

          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-cinza">Usuário</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              className="mt-2 w-full rounded-lg border border-borda bg-preto/60 px-4 py-3 text-branco outline-none transition focus:border-dourado"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-cinza">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-borda bg-preto/60 px-4 py-3 text-branco outline-none transition focus:border-dourado"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center disabled:opacity-60"
          >
            <span className="relative z-[1]">{loading ? 'Entrando...' : 'Entrar'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
