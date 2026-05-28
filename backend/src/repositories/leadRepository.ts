import { getPool, sql } from '../database/sqlserver.js'
import type { LeadInput } from '../types/index.js'

export async function createLead(data: LeadInput): Promise<string> {
  const result = await getPool()
    .request()
    .input('nome', sql.NVarChar(200), data.nome)
    .input('email', sql.NVarChar(200), data.email)
    .input('telefone', sql.NVarChar(50), data.telefone ?? null)
    .input('mensagem', sql.NVarChar(sql.MAX), data.mensagem ?? null)
    .input('tipo', sql.NVarChar(20), data.tipo ?? 'CONTATO')
    .query(`
      INSERT INTO leads (nome, email, telefone, mensagem, tipo)
      OUTPUT INSERTED.id
      VALUES (@nome, @email, @telefone, @mensagem, @tipo)
    `)

  return result.recordset[0].id
}

export async function listLeads(tipo?: string) {
  const request = getPool().request()
  let where = ''
  if (tipo) {
    request.input('tipo', sql.NVarChar(20), tipo)
    where = 'WHERE tipo = @tipo'
  }
  const result = await request.query(`
    SELECT id, nome, email, telefone, mensagem, tipo, respondido, criado_em
    FROM leads
    ${where}
    ORDER BY criado_em DESC
  `)
  return result.recordset
}

export async function markLeadRespondido(id: string, respondido: boolean) {
  await getPool()
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .input('respondido', sql.Bit, respondido)
    .query('UPDATE leads SET respondido = @respondido WHERE id = @id')
}

export async function dashboardTotals() {
  const result = await getPool().request().query(`
    SELECT
      COUNT(*) AS totalLeads,
      SUM(CASE WHEN respondido = 0 THEN 1 ELSE 0 END) AS naoRespondidos
    FROM leads
  `)
  return result.recordset[0] ?? { totalLeads: 0, naoRespondidos: 0 }
}
