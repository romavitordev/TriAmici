const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
const internalUrl = process.env.INTERNAL_API_URL ?? publicUrl

export const apiBaseUrl = typeof window === 'undefined' ? internalUrl : publicUrl

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: init?.cache ?? 'no-store'
  })

  if (!response.ok) throw new Error(`API error ${response.status}`)
  return response.json() as Promise<T>
}

/* ── Pré-inscrição (público) e painel admin ── */

export async function postPreInscricao(data: unknown) {
  const res = await fetch(`${apiBaseUrl}/api/pre-inscricao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erro ao enviar pré-inscrição')
  return res.json()
}

export async function adminLogin(user: string, password: string) {
  const res = await fetch(`${apiBaseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ user, password }),
  })
  if (!res.ok) throw new Error('Credenciais inválidas')
  return res.json()
}

export async function adminLogout() {
  await fetch(`${apiBaseUrl}/api/admin/logout`, { method: 'POST', credentials: 'include' })
}

export async function getPreInscricoes(status?: string) {
  const params = status ? `?status=${status}` : ''
  const res = await fetch(`${apiBaseUrl}/api/admin/pre-inscricoes${params}`, {
    credentials: 'include',
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export async function getPreInscricaoDetalhe(id: string) {
  const res = await fetch(`${apiBaseUrl}/api/admin/pre-inscricoes/${id}`, {
    credentials: 'include',
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Não encontrado')
  return res.json()
}

export async function updatePreInscricaoStatus(
  id: string, status: string, nota_admin?: string
) {
  const res = await fetch(`${apiBaseUrl}/api/admin/pre-inscricoes/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ status, nota_admin }),
  })
  if (!res.ok) throw new Error('Erro ao atualizar')
  return res.json()
}

export const csvExportUrl = `${apiBaseUrl}/api/admin/pre-inscricoes/export/csv`
