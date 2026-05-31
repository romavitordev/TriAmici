import { getPool } from '../database/postgres.js'
import type { LeadInput } from '../types/index.js'

export async function createLead(data: LeadInput): Promise<string> {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO leads (nome, email, telefone, mensagem, tipo)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [data.nome, data.email, data.telefone ?? null, data.mensagem ?? null, data.tipo ?? 'CONTATO']
  )
  return result.rows[0].id
}

export async function listLeads(tipo?: string) {
  if (tipo) {
    const result = await getPool().query(
      `SELECT id, nome, email, telefone, mensagem, tipo, respondido, criado_em
       FROM leads
       WHERE tipo = $1
       ORDER BY criado_em DESC`,
      [tipo]
    )
    return result.rows
  }

  const result = await getPool().query(
    `SELECT id, nome, email, telefone, mensagem, tipo, respondido, criado_em
     FROM leads
     ORDER BY criado_em DESC`
  )
  return result.rows
}

export async function markLeadRespondido(id: string, respondido: boolean) {
  await getPool().query('UPDATE leads SET respondido = $1 WHERE id = $2', [respondido, id])
}

export async function dashboardTotals() {
  const result = await getPool().query(`
    SELECT
      COUNT(*) AS "totalLeads",
      SUM(CASE WHEN respondido = FALSE THEN 1 ELSE 0 END) AS "naoRespondidos"
    FROM leads
  `)
  return result.rows[0] ?? { totalLeads: 0, naoRespondidos: 0 }
}
