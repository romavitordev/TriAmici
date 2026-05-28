import { getPool, sql } from '../database/sqlserver.js'
import type { DepoimentoInput } from '../types/index.js'

export async function listDepoimentos(includeInactive = false) {
  const result = await getPool().request().query(`
    SELECT id, nome, turma, texto, foto, ativo, ordem
    FROM depoimentos
    ${includeInactive ? '' : 'WHERE ativo = 1'}
    ORDER BY ordem ASC, nome ASC
  `)
  return result.recordset
}

export async function createDepoimento(data: DepoimentoInput) {
  const result = await getPool()
    .request()
    .input('nome', sql.NVarChar(200), data.nome)
    .input('turma', sql.NVarChar(100), data.turma ?? null)
    .input('texto', sql.NVarChar(sql.MAX), data.texto)
    .input('foto', sql.NVarChar(500), data.foto ?? null)
    .input('ativo', sql.Bit, data.ativo ?? true)
    .input('ordem', sql.Int, data.ordem ?? 0)
    .query(`
      INSERT INTO depoimentos (nome, turma, texto, foto, ativo, ordem)
      OUTPUT INSERTED.id
      VALUES (@nome, @turma, @texto, @foto, @ativo, @ordem)
    `)
  return result.recordset[0].id
}

export async function updateDepoimento(id: string, data: DepoimentoInput) {
  await getPool()
    .request()
    .input('id', sql.UniqueIdentifier, id)
    .input('nome', sql.NVarChar(200), data.nome)
    .input('turma', sql.NVarChar(100), data.turma ?? null)
    .input('texto', sql.NVarChar(sql.MAX), data.texto)
    .input('foto', sql.NVarChar(500), data.foto ?? null)
    .input('ativo', sql.Bit, data.ativo ?? true)
    .input('ordem', sql.Int, data.ordem ?? 0)
    .query(`
      UPDATE depoimentos
      SET nome = @nome, turma = @turma, texto = @texto, foto = @foto, ativo = @ativo, ordem = @ordem
      WHERE id = @id
    `)
}

export async function deleteDepoimento(id: string) {
  await getPool().request().input('id', sql.UniqueIdentifier, id).query('DELETE FROM depoimentos WHERE id = @id')
}
