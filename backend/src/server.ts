import express from 'express'
import morgan from 'morgan'
import { config } from './config/index.js'
import { connectDB, disconnectDB } from './database/postgres.js'
import { corsMiddleware } from './middleware/cors.js'
import routes from './routes/index.js'

const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'))
app.use(corsMiddleware)
app.use('/api', routes)

app.use((_req, res) => res.status(404).json({ error: 'Rota nao encontrada' }))

const server = app.listen(config.port, async () => {
  try {
    await connectDB()
  } catch (error) {
    // Não derruba o processo: o /api/health continua respondendo e as rotas
    // que dependem do banco retornam 500 até a conexão ser restabelecida.
    console.error('[postgres] falha ao conectar no startup:', error)
  }
  console.log(`Backend rodando na porta ${config.port}`)
})

async function shutdown(signal: string) {
  console.log(`\n${signal} recebido — encerrando...`)
  server.close(async () => {
    await disconnectDB().catch(() => undefined)
    process.exit(0)
  })
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))
