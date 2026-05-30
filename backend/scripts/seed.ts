import { connectDB, disconnectDB } from '../src/database/sqlserver.js'

async function main() {
  await connectDB()
  console.log('Seeds: nada a popular via script (use as migrations 002/003 para depoimentos e galeria)')
  await disconnectDB()
}

main().catch(async (error) => {
  console.error(error)
  await disconnectDB()
  process.exit(1)
})
