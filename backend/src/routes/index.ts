import { Router } from 'express'
import { getPool } from '../database/postgres.js'
import contatoRoutes from './contato.js'
import depoimentosRoutes from './depoimentos.js'
import galeriaRoutes from './galeria.js'

const router = Router()

router.get('/health', async (_req, res) => {
  let db = false
  try {
    await getPool().query('SELECT 1')
    db = true
  } catch {
    db = false
  }
  res.json({ ok: true, db, uptime: process.uptime(), timestamp: new Date().toISOString() })
})
router.use('/contato', contatoRoutes)
router.use('/depoimentos', depoimentosRoutes)
router.use('/galeria', galeriaRoutes)

export default router
