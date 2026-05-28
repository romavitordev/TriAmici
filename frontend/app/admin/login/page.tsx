'use client'

import { useState } from 'react'
import { setToken } from '@/lib/auth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@triamici.com.br')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
    if (!response.ok) {
      setError('Credenciais invalidas')
      return
    }
    const data = await response.json()
    setToken(data.token)
    window.location.href = '/admin/dashboard'
  }

  return (
    <section className="grid min-h-screen place-items-center bg-preto px-4">
      <form onSubmit={submit} className="w-full max-w-md border border-dourado/30 bg-escuro p-8">
        <p className="section-kicker">Area admin</p>
        <h1 className="mt-3 font-serif text-4xl text-dourado">Login</h1>
        <div className="mt-8 grid gap-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="border border-borda bg-preto p-4" placeholder="E-mail" />
          <input value={senha} onChange={(e) => setSenha(e.target.value)} className="border border-borda bg-preto p-4" placeholder="Senha" type="password" />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn btn-primary">Entrar</button>
        </div>
      </form>
    </section>
  )
}
