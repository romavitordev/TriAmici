import { Router } from 'express'
import { listGaleria } from '../repositories/galeriaRepository.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    res.json(await listGaleria(false))
  } catch (error) {
    console.error('list_galeria_error', error)
    res.status(500).json({ error: 'Erro ao listar galeria' })
  }
})

export default router
