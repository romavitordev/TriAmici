import { connectDB, disconnectDB } from '../src/database/sqlserver.js'

async function main() {
  await connectDB()
  console.log('Seeds: no admin to create')
  await disconnectDB()
}

main().catch(async (error) => {
  console.error(error)
  await disconnectDB()
  process.exit(1)
})
