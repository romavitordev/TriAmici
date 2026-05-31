import { getPool } from '../database/postgres.js'
import type { GaleriaInput } from '../types/index.js'

export async function listGaleria(includeInactive = false) {
  const result = await getPool().query(`
    SELECT id, url, legenda, aluno, ativo, criado_em
    FROM galeria_fotos
    ${includeInactive ? '' : 'WHERE ativo = TRUE'}
    ORDER BY criado_em DESC
  `)
  return result.rows
}

export async function createGaleriaFoto(data: GaleriaInput) {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO galeria_fotos (url, legenda, aluno, ativo)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [data.url, data.legenda ?? null, data.aluno ?? null, data.ativo ?? true]
  )
  return result.rows[0].id
}

export async function updateGaleriaFoto(id: string, data: GaleriaInput) {
  await getPool().query(
    `UPDATE galeria_fotos
     SET url = $1, legenda = $2, aluno = $3, ativo = $4
     WHERE id = $5`,
    [data.url, data.legenda ?? null, data.aluno ?? null, data.ativo ?? true, id]
  )
}

export async function deleteGaleriaFoto(id: string) {
  await getPool().query('DELETE FROM galeria_fotos WHERE id = $1', [id])
}
