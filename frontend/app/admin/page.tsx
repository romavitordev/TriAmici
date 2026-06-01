'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, RefreshCw, Download, MessageCircle, Eye, X } from 'lucide-react'
import {
  adminLogout,
  csvExportUrl,
  getPreInscricoes,
  getPreInscricaoDetalhe,
  updatePreInscricaoStatus,
} from '@/lib/api'

type Status = 'pendente' | 'contactado' | 'rejeitado'

type PreInscricao = {
  id: string
  nome: string
  whatsapp: string
  email: string
  cidade_estado: string
  objetivo: string
  nivel: string[]
  faixa_idade: string
  intencoes: string[]
  status: Status
  contactado_em: string | null
  nota_admin: string | null
  criado_em: string
}

const OBJETIVO_LABEL: Record<string, string> = {
  profissao_principal: 'Profissão principal',
  renda_complementar: 'Renda complementar',
  hobby_serio: 'Hobby sério',
}
const NIVEL_LABEL: Record<string, string> = {
  nao_fotografo: 'Iniciante', celular: 'Celular', odeia_tecnologia: 'Pouca afinidade tech',
  facilidade_tech: 'Facilidade tech', cameras_compactas: 'Compactas', dslr: 'DSLR/mirrorless',
  fotografo_familia: 'Fotografa família', cobrou_servicos: 'Já cobrou',
}
const INTENCAO_LABEL: Record<string, string> = {
  convite_aula_zero: 'Convite Aula Zero', reservar_vaga: 'Reservar vaga',
  receber_brochura: 'Brochura', outro: 'Outro',
}
const STATUS_META: Record<Status, { label: string; cls: string }> = {
  pendente:   { label: 'Pendente',   cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  contactado: { label: 'Contactado', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  rejeitado:  { label: 'Rejeitado',  cls: 'bg-white/10 text-cinza border-borda' },
}

const TABS: { key: 'todas' | Status; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'contactado', label: 'Contactadas' },
  { key: 'rejeitado', label: 'Rejeitadas' },
]

function whatsappLink(p: PreInscricao) {
  const msg =
    `Olá, ${p.nome}! 👋\n\n` +
    `Aqui é da Tri Amici Photography Academy, em Sorocaba.\n` +
    `Recebemos sua pré-inscrição para a aula experimental gratuita e ficamos muito felizes com seu interesse!\n\n` +
    `Gostaríamos de conversar sobre os próximos passos da sua jornada fotográfica.\n` +
    `Quando seria um bom momento para você? 📸`
  return `https://wa.me/55${p.whatsapp}?text=${encodeURIComponent(msg)}`
}

const fmtDate = (s: string | null) =>
  s ? new Date(s).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '-'

export default function AdminPage() {
  const router = useRouter()
  const [items, setItems] = useState<PreInscricao[]>([])
  const [tab, setTab] = useState<'todas' | Status>('todas')
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null)
  const [nota, setNota] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await getPreInscricoes())
    } catch {
      // sessão pode ter expirado → middleware/login cobrem
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const logout = async () => {
    await adminLogout()
    router.replace('/')
    router.refresh()
  }

  const exportCsv = async () => {
    const res = await fetch(csvExportUrl, { credentials: 'include' })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pre-inscricoes.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const setStatusLocal = (id: string, status: Status, extra?: Partial<PreInscricao>) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status, ...extra } : p)))

  const handleWhatsapp = async (p: PreInscricao) => {
    window.open(whatsappLink(p), '_blank', 'noopener')
    try {
      await updatePreInscricaoStatus(p.id, 'contactado')
      setStatusLocal(p.id, 'contactado', { contactado_em: new Date().toISOString() })
    } catch { /* mantém estado atual */ }
  }

  const openDetail = async (id: string) => {
    setDetail({ id, __loading: true })
    try {
      const d = await getPreInscricaoDetalhe(id)
      setDetail(d)
      setNota((d.nota_admin as string) ?? '')
    } catch {
      setDetail(null)
    }
  }

  const changeStatus = async (status: Status) => {
    if (!detail) return
    const id = detail.id as string
    await updatePreInscricaoStatus(id, status, nota)
    setStatusLocal(id, status, { nota_admin: nota })
    setDetail({ ...detail, status, nota_admin: nota })
  }

  const counts = {
    todas: items.length,
    pendente: items.filter((i) => i.status === 'pendente').length,
    contactado: items.filter((i) => i.status === 'contactado').length,
    rejeitado: items.filter((i) => i.status === 'rejeitado').length,
  }
  const visible = tab === 'todas' ? items : items.filter((i) => i.status === tab)

  return (
    <div className="min-h-screen bg-preto text-branco">
      {/* Header do painel */}
      <header className="sticky top-0 z-30 border-b border-borda bg-preto/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="leading-none">
              <div className="font-serif text-lg font-semibold tracking-[0.12em] text-dourado">TRI AMICI</div>
              <div className="text-[0.5rem] tracking-[0.3em] text-branco/50">PHOTOGRAPHY ACADEMY</div>
            </div>
            <span className="ml-3 hidden text-sm text-cinza sm:inline">Painel de Pré-inscrições</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} title="Atualizar" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-borda text-cinza transition hover:border-dourado/50 hover:text-dourado">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg border border-dourado/40 px-3 py-2 text-xs font-medium uppercase tracking-wide text-dourado transition hover:bg-dourado/10">
              <Download size={15} /> CSV
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-borda px-3 py-2 text-xs font-medium uppercase tracking-wide text-cinza transition hover:border-red-500/40 hover:text-red-300">
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                tab === t.key ? 'border-dourado bg-dourado/10 text-dourado' : 'border-borda text-cinza hover:text-branco'
              }`}
            >
              {t.label} <span className="ml-1 opacity-60">{counts[t.key]}</span>
            </button>
          ))}
        </div>

        {/* Tabela */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-borda">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-borda bg-escuro/60 text-xs uppercase tracking-wide text-cinza">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Cidade</th>
                <th className="px-4 py-3">Objetivo</th>
                <th className="px-4 py-3">Nível</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-cinza">Carregando...</td></tr>
              )}
              {!loading && visible.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-cinza">Nenhuma pré-inscrição.</td></tr>
              )}
              {!loading && visible.map((p, idx) => (
                <tr key={p.id} className="border-b border-borda/60 transition hover:bg-escuro/40">
                  <td className="px-4 py-3 text-cinza">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-branco">{p.nome}</td>
                  <td className="px-4 py-3 text-cinza">{p.whatsapp}</td>
                  <td className="px-4 py-3 text-cinza">{p.cidade_estado}</td>
                  <td className="px-4 py-3 text-cinza">{OBJETIVO_LABEL[p.objetivo] ?? p.objetivo}</td>
                  <td className="px-4 py-3 text-cinza">
                    {(p.nivel ?? []).slice(0, 2).map((n) => NIVEL_LABEL[n] ?? n).join(', ')}
                    {(p.nivel ?? []).length > 2 ? ` +${p.nivel.length - 2}` : ''}
                  </td>
                  <td className="px-4 py-3 text-cinza">{fmtDate(p.criado_em)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_META[p.status].cls}`}>
                      {STATUS_META[p.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openDetail(p.id)} title="Ver detalhes" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-borda text-cinza transition hover:border-dourado/50 hover:text-dourado">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleWhatsapp(p)} title="Chamar no WhatsApp" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/40 text-emerald-300 transition hover:bg-emerald-500/10">
                        <MessageCircle size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Drawer de detalhes */}
      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => setDetail(null)}>
          <div className="h-full w-full max-w-lg overflow-y-auto border-l border-borda bg-preto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="font-serif text-2xl text-dourado">{(detail.nome as string) ?? 'Detalhes'}</h2>
              <button onClick={() => setDetail(null)} className="rounded-lg border border-borda p-2 text-cinza hover:text-branco"><X size={16} /></button>
            </div>

            {detail.__loading ? (
              <p className="mt-8 text-cinza">Carregando...</p>
            ) : (
              <div className="mt-6 space-y-5 text-sm">
                <dl className="grid grid-cols-3 gap-x-3 gap-y-2">
                  <Detail k="WhatsApp" v={detail.whatsapp as string} />
                  <Detail k="E-mail" v={detail.email as string} />
                  <Detail k="Cidade/Estado" v={detail.cidade_estado as string} />
                  <Detail k="Idade" v={detail.faixa_idade as string} />
                  <Detail k="CPF (4)" v={detail.cpf_ultimos4 as string} />
                  <Detail k="Objetivo" v={OBJETIVO_LABEL[detail.objetivo as string] ?? (detail.objetivo as string)} />
                  <Detail k="Instagram" v={(detail.instagram as string) || '-'} />
                  <Detail k="Facebook" v={(detail.facebook as string) || '-'} />
                  <Detail k="Câmera/Celular" v={(detail.camera_celular as string) || '-'} />
                  <Detail k="Nível" v={((detail.nivel as string[]) ?? []).map((n) => NIVEL_LABEL[n] ?? n).join(', ')} />
                  <Detail k="Intenções" v={((detail.intencoes as string[]) ?? []).map((n) => INTENCAO_LABEL[n] ?? n).join(', ')} />
                  <Detail k="Criado em" v={fmtDate(detail.criado_em as string)} />
                </dl>

                <div className="space-y-4 border-t border-borda pt-5">
                  <h3 className="text-xs uppercase tracking-wide text-dourado">Vestibular de sensibilidade</h3>
                  <Resp n="01) Por que fotografia é importante?" v={detail.resp_fotografia as string} />
                  <Resp n="02) Artista preferido" v={detail.resp_artista as string} />
                  <Resp n="03) Por que você gosta de fotografia?" v={detail.resp_emocao as string} />
                  <Resp n="04) O que vê no Nighthawks (Hopper)?" v={detail.resp_hopper as string} />
                </div>

                <div className="border-t border-borda pt-5">
                  <label className="text-xs uppercase tracking-wide text-cinza">Nota do admin</label>
                  <textarea
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-borda bg-escuro/60 px-3 py-2 text-branco outline-none focus:border-dourado"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={() => changeStatus('pendente')} className="rounded-lg border border-amber-500/40 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-500/10">Pendente</button>
                    <button onClick={() => changeStatus('contactado')} className="rounded-lg border border-emerald-500/40 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-500/10">Contactado</button>
                    <button onClick={() => changeStatus('rejeitado')} className="rounded-lg border border-borda px-3 py-1.5 text-xs text-cinza hover:bg-white/5">Rejeitado</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="col-span-1 text-cinza">{k}</dt>
      <dd className="col-span-2 break-words text-branco/90">{v}</dd>
    </>
  )
}

function Resp({ n, v }: { n: string; v: string }) {
  return (
    <div>
      <p className="text-branco/80">{n}</p>
      <p className="mt-1 whitespace-pre-wrap rounded-lg bg-escuro/50 px-3 py-2 text-cinza">{v}</p>
    </div>
  )
}
