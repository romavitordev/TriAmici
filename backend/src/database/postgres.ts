import { Pool } from 'pg'
import { config } from '../config/index.js'

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: config.env === 'production' ? { rejectUnauthorized: false } : false,
      }
    : {
        host: config.db.server,
        port: config.db.port,
        database: config.db.name,
        user: config.db.user,
        password: config.db.password,
        ssl: false,
      }
)

pool.on('error', (err) => console.error('[postgres] pool error:', err))

export async function connectDB() {
  const client = await pool.connect()
  client.release()
  console.log('PostgreSQL conectado')
}

export function getPool() {
  return pool
}

export async function disconnectDB() {
  await pool.end()
}
