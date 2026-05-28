import { Router } from 'express'
import { listGaleria } from '../repositories/galeriaRepository.js'

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await listGaleria(false))
})

export default router
