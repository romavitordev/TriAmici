import { Router } from 'express'
import { listDepoimentos } from '../repositories/depoimentoRepository.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    res.json(await listDepoimentos(false))
  } catch (error) {
    console.error('list_depoimentos_error', error)
    res.status(500).json({ error: 'Erro ao listar depoimentos' })
  }
})

export default router
