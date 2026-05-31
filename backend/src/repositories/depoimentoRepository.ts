import { getPool } from '../database/postgres.js'
import type { DepoimentoInput } from '../types/index.js'

export async function listDepoimentos(includeInactive = false) {
  const result = await getPool().query(`
    SELECT id, nome, turma, texto, foto, ativo, ordem
    FROM depoimentos
    ${includeInactive ? '' : 'WHERE ativo = TRUE'}
    ORDER BY ordem ASC, nome ASC
  `)
  return result.rows
}

export async function createDepoimento(data: DepoimentoInput) {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO depoimentos (nome, turma, texto, foto, ativo, ordem)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [data.nome, data.turma ?? null, data.texto, data.foto ?? null, data.ativo ?? true, data.ordem ?? 0]
  )
  return result.rows[0].id
}

export async function updateDepoimento(id: string, data: DepoimentoInput) {
  await getPool().query(
    `UPDATE depoimentos
     SET nome = $1, turma = $2, texto = $3, foto = $4, ativo = $5, ordem = $6
     WHERE id = $7`,
    [data.nome, data.turma ?? null, data.texto, data.foto ?? null, data.ativo ?? true, data.ordem ?? 0, id]
  )
}

export async function deleteDepoimento(id: string) {
  await getPool().query('DELETE FROM depoimentos WHERE id = $1', [id])
}
