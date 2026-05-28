'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/lib/auth'

type Foto = { id: string; url: string; legenda?: string; aluno?: string; ativo: boolean }

export function GaleriaCRUD() {
  const [items, setItems] = useState<Foto[]>([])
  const [form, setForm] = useState({ url: '', legenda: '', aluno: '', ativo: true })

  const load = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/galeria`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    if (response.ok) setItems(await response.json())
  }

  useEffect(() => { load() }, [])

  const create = async (event: React.FormEvent) => {
    event.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/galeria`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ ...form, legenda: form.legenda || null, aluno: form.aluno || null })
    })
    setForm({ url: '', legenda: '', aluno: '', ativo: true })
    await load()
  }

  const remove = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/galeria/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    await load()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={create} className="grid gap-4 border border-borda bg-escuro p-5">
        <input placeholder="URL da foto" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="bg-preto p-3" />
        <input placeholder="Legenda" value={form.legenda} onChange={(e) => setForm({ ...form, legenda: e.target.value })} className="bg-preto p-3" />
        <input placeholder="Aluno" value={form.aluno} onChange={(e) => setForm({ ...form, aluno: e.target.value })} className="bg-preto p-3" />
        <button className="btn btn-primary">Adicionar foto</button>
      </form>
      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="flex items-start justify-between gap-4 border border-borda bg-escuro p-4">
            <div className="min-w-0">
              <h3 className="truncate text-dourado">{item.aluno ?? 'Foto'}</h3>
              <p className="truncate text-sm text-cinza">{item.legenda ?? item.url}</p>
            </div>
            <button className="shrink-0 text-red-300" onClick={() => remove(item.id)}>Remover</button>
          </article>
        ))}
      </div>
    </div>
  )
}
