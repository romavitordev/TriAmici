'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/lib/auth'

type Depoimento = { id: string; nome: string; turma?: string; texto: string; foto?: string; ativo: boolean; ordem: number }

export function DepoimentosCRUD() {
  const [items, setItems] = useState<Depoimento[]>([])
  const [form, setForm] = useState({ nome: '', turma: '', texto: '', foto: '', ativo: true, ordem: 0 })

  const load = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/depoimentos`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    if (response.ok) setItems(await response.json())
  }

  useEffect(() => { load() }, [])

  const create = async (event: React.FormEvent) => {
    event.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/depoimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ ...form, foto: form.foto || null, turma: form.turma || null })
    })
    setForm({ nome: '', turma: '', texto: '', foto: '', ativo: true, ordem: 0 })
    await load()
  }

  const remove = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/depoimentos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    await load()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={create} className="grid gap-4 border border-borda bg-escuro p-5">
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="bg-preto p-3" />
        <input placeholder="Turma" value={form.turma} onChange={(e) => setForm({ ...form, turma: e.target.value })} className="bg-preto p-3" />
        <input placeholder="Foto URL" value={form.foto} onChange={(e) => setForm({ ...form, foto: e.target.value })} className="bg-preto p-3" />
        <textarea placeholder="Texto" value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} className="bg-preto p-3" />
        <button className="btn btn-primary">Adicionar</button>
      </form>
      <div className="grid gap-3">
        {items.map((item) => (
          <article key={item.id} className="flex items-start justify-between gap-4 border border-borda bg-escuro p-4">
            <div>
              <h3 className="text-dourado">{item.nome}</h3>
              <p className="text-sm text-cinza">{item.texto}</p>
            </div>
            <button className="text-red-300" onClick={() => remove(item.id)}>Remover</button>
          </article>
        ))}
      </div>
    </div>
  )
}
