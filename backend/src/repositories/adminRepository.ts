import bcrypt from 'bcryptjs'
import { getPool, sql } from '../database/sqlserver.js'

export async function findAdminByEmail(email: string) {
  const result = await getPool()
    .request()
    .input('email', sql.NVarChar(200), email)
    .query('SELECT TOP 1 id, email, senha FROM admins WHERE email = @email')
  return result.recordset[0] as { id: string; email: string; senha: string } | undefined
}

export async function ensureAdmin(email: string, senha: string) {
  const existing = await findAdminByEmail(email)
  if (existing) return existing.id
  const hash = await bcrypt.hash(senha, 12)
  const result = await getPool()
    .request()
    .input('email', sql.NVarChar(200), email)
    .input('senha', sql.NVarChar(300), hash)
    .query('INSERT INTO admins (email, senha) OUTPUT INSERTED.id VALUES (@email, @senha)')
  return result.recordset[0].id
}
