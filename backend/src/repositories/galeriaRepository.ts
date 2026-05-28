import { getPool, sql } from '../database/sqlserver.js'
import type { GaleriaInput } from '../types/index.js'

export async function listGaleria(includeInactive = false) {
  const result = await getPool().request().query(`
    SELECT id, url, legenda, aluno, ativo, criado_em
    FROM galeria_fotos
    ${includeInactive ? '' : 'WHERE ativo = 1'}
    ORDER BY criado_em DESC
  `)
  return result.recordset
}

export async function createGaleriaFoto(data: GaleriaInput) {
  const result = await getPool()
    .request()
    .input('url', sql.NVarChar(500), data.url)
    .input('legenda', sql.NVarChar(300), data.legenda ?? null)
    .input('aluno', sql.NVarChar(200), data.aluno ?? null)
    .input('ativo', sql.Bit, data.ativo ?? true)
    .query(`
      INSERT INTO galeria_fotos (url, legenda, aluno, ativo)
      OUTPUT INSERTED.id
      VALUES (@url, @legenda, @aluno, @ativo)
    `)
  return result.recordset[0].id
}

export async function updateGaleriaFoto(id: string, data: GaleriaInput) {
  await getPool()
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .input('url', sql.NVarChar(500), data.url)
    .input('legenda', sql.NVarChar(300), data.legenda ?? null)
    .input('aluno', sql.NVarChar(200), data.aluno ?? null)
    .input('ativo', sql.Bit, data.ativo ?? true)
    .query(`
      UPDATE galeria_fotos
      SET url = @url, legenda = @legenda, aluno = @aluno, ativo = @ativo
      WHERE id = @id
    `)
}

export async function deleteGaleriaFoto(id: string) {
  await getPool().request().input('id', sql.UniqueIdentifier, id).query('DELETE FROM galeria_fotos WHERE id = @id')
}
