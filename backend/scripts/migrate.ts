import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(dirname, '../migrations')

async function main() {
  const pool = new Pool({
    host:     process.env.DB_SERVER   ?? 'localhost',
    port:     Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME     ?? 'triamici_db',
    user:     process.env.DB_USER     ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
  })

  const files = (await fs.readdir(migrationsDir))
    .filter(f => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8')
    console.log(`Executando ${file}`)
    await pool.query(sql)
  }

  await pool.end()
  console.log('Migrations concluídas.')
}

main().catch(async (err) => {
  console.error(err)
  process.exit(1)
})
