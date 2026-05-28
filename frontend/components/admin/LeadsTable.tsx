'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/lib/auth'

type Lead = { id: string; nome: string; email: string; telefone?: string; tipo: string; respondido: boolean; criado_em: string; mensagem?: string }

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])

  const load = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/leads`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    if (response.ok) setLeads(await response.json())
  }

  useEffect(() => { load() }, [])

  const mark = async (id: string, respondido: boolean) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/leads/${id}/respondido`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ respondido })
    })
    await load()
  }

  return (
    <div className="overflow-x-auto border border-borda">
      <table className="w-full min-w-[780px] text-left text-sm">
        <thead className="bg-escuro text-xs uppercase tracking-[0.16em] text-dourado">
          <tr>
            <th className="p-4">Nome</th>
            <th className="p-4">Contato</th>
            <th className="p-4">Tipo</th>
            <th className="p-4">Status</th>
            <th className="p-4">Acao</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-borda text-cinza">
              <td className="p-4 text-branco">{lead.nome}</td>
              <td className="p-4">{lead.email}<br />{lead.telefone}</td>
              <td className="p-4">{lead.tipo}</td>
              <td className="p-4">{lead.respondido ? 'Respondido' : 'Pendente'}</td>
              <td className="p-4"><button className="text-dourado" onClick={() => mark(lead.id, !lead.respondido)}>Alternar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
