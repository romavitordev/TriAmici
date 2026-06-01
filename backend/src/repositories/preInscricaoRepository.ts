import { getPool } from '../database/postgres.js'
import type { PreInscricaoInput } from '../types/index.js'

export async function createPreInscricao(data: PreInscricaoInput): Promise<string> {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO pre_inscricoes
      (nome, faixa_idade, email, whatsapp, cidade_estado, cpf_ultimos4,
       instagram, facebook, objetivo, nivel, camera_celular,
       resp_fotografia, resp_artista, resp_emocao, resp_hopper, intencoes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING id`,
    [
      data.nome, data.faixa_idade, data.email, data.whatsapp,
      data.cidade_estado, data.cpf_ultimos4,
      data.instagram ?? null, data.facebook ?? null,
      data.objetivo, data.nivel, data.camera_celular ?? null,
      data.resp_fotografia, data.resp_artista, data.resp_emocao,
      data.resp_hopper, data.intencoes,
    ]
  )
  return result.rows[0].id
}

export async function listPreInscricoes(status?: string) {
  const where = status ? 'WHERE status = $1' : ''
  const params = status ? [status] : []
  const result = await getPool().query(
    `SELECT id, nome, whatsapp, email, cidade_estado, objetivo,
            nivel, faixa_idade, intencoes, status, contactado_em,
            nota_admin, criado_em
     FROM pre_inscricoes
     ${where}
     ORDER BY criado_em DESC`,
    params
  )
  return result.rows
}

export async function getPreInscricaoById(id: string) {
  const result = await getPool().query(
    `SELECT * FROM pre_inscricoes WHERE id = $1`, [id]
  )
  return result.rows[0] ?? null
}

export async function updateStatus(
  id: string,
  status: string,
  nota_admin?: string
) {
  await getPool().query(
    `UPDATE pre_inscricoes
     SET status = $1,
         contactado_em = CASE WHEN $1 = 'contactado' THEN NOW() ELSE contactado_em END,
         nota_admin = COALESCE($2, nota_admin)
     WHERE id = $3`,
    [status, nota_admin ?? null, id]
  )
}

export async function exportPreInscricoes() {
  const result = await getPool().query(
    `SELECT nome, faixa_idade, email, whatsapp, cidade_estado,
            cpf_ultimos4, instagram, facebook, objetivo,
            array_to_string(nivel, '; ') AS nivel,
            camera_celular,
            resp_fotografia, resp_artista, resp_emocao, resp_hopper,
            array_to_string(intencoes, '; ') AS intencoes,
            status, contactado_em, nota_admin, criado_em
     FROM pre_inscricoes
     ORDER BY criado_em DESC`
  )
  return result.rows
}
