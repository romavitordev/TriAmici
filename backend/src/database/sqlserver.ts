import sql from 'mssql'
import { config } from '../config/index.js'

const sqlConfig: sql.config = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.server,
  database: config.db.name,
  port: config.db.port,
  options: { encrypt: false, trustServerCertificate: true }
}

let pool: sql.ConnectionPool | null = null
let currentDatabase: string | null = null

export async function connectDB(database = config.db.name) {
  if (pool?.connected && currentDatabase === database) return pool
  if (pool?.connected) await pool.close()
  pool = await sql.connect({ ...sqlConfig, database })
  currentDatabase = database
  console.log('SQL Server conectado')
  return pool
}

export function getPool() {
  if (!pool) throw new Error('SQL Server ainda nao conectado')
  return pool
}

export async function disconnectDB() {
  await pool?.close()
  pool = null
  currentDatabase = null
}

export { sql }
