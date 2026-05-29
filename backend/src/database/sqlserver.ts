import sql from 'mssql'
import { config } from '../config/index.js'

const sqlConfig: sql.config = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.server, // sempre "localhost"
  database: config.db.name,

  // 🔥 IMPORTANTE: só usa porta se existir
  port: config.db.port ? Number(config.db.port) : undefined,

  options: {
    encrypt: config.env === 'production',
    trustServerCertificate: config.env !== 'production',
    enableArithAbort: true
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
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