'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { DepoimentosCRUD } from '@/components/admin/DepoimentosCRUD'
import { GaleriaCRUD } from '@/components/admin/GaleriaCRUD'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { getToken } from '@/lib/auth'

export default function DashboardPage() {
  const [totals, setTotals] = useState({ totalLeads: 0, naoRespondidos: 0 })

  useEffect(() => {
    const token = getToken()
    if (!token) {
      window.location.href = '/admin/login'
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/admin/leads/totals`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.ok && response.json()).then((data) => data && setTotals(data))
  }, [])

  return (
    <AdminLayout>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-borda bg-escuro p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-cinza">Total de leads</p>
          <strong className="font-serif text-5xl text-dourado">{totals.totalLeads}</strong>
        </div>
        <div className="border border-borda bg-escuro p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-cinza">Nao respondidos</p>
          <strong className="font-serif text-5xl text-dourado">{totals.naoRespondidos}</strong>
        </div>
      </div>
      <h2 className="mb-5 mt-12 font-serif text-3xl">Leads recebidos</h2>
      <LeadsTable />
      <h2 className="mb-5 mt-12 font-serif text-3xl">Depoimentos</h2>
      <DepoimentosCRUD />
      <h2 className="mb-5 mt-12 font-serif text-3xl">Galeria</h2>
      <GaleriaCRUD />
    </AdminLayout>
  )
}
