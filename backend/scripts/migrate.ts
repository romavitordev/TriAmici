import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB, disconnectDB } from '../src/database/sqlserver.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(dirname, '../migrations')

function splitBatches(script: string) {
  return script
    .split(/^\s*GO\s*$/gim)
    .map((batch) => batch.trim())
    .filter(Boolean)
}

async function main() {
  const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort()
  let pool = await connectDB('master')

  for (const file of files) {
    const script = await fs.readFile(path.join(migrationsDir, file), 'utf8')
    console.log(`Executando ${file}`)
    for (const batch of splitBatches(script)) {
      if (/^USE\s+triamici_db/i.test(batch)) {
        pool = await connectDB('triamici_db')
        continue
      }

      await pool.request().batch(batch)
      if (/CREATE DATABASE triamici_db/i.test(batch)) {
        pool = await connectDB('triamici_db')
      }
    }
  }

  await disconnectDB()
}

main().catch(async (error) => {
  console.error(error)
  await disconnectDB()
  process.exit(1)
})
