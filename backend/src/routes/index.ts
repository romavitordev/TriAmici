import { Router } from 'express'
import contatoRoutes from './contato.js'
import depoimentosRoutes from './depoimentos.js'
import galeriaRoutes from './galeria.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ ok: true }))
router.use('/contato', contatoRoutes)
router.use('/depoimentos', depoimentosRoutes)
router.use('/galeria', galeriaRoutes)

export default router
