import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import adminAuthRoutes from './admin/auth.js'
import adminDepoimentosRoutes from './admin/depoimentos.js'
import adminGaleriaRoutes from './admin/galeria.js'
import adminLeadsRoutes from './admin/leads.js'
import contatoRoutes from './contato.js'
import depoimentosRoutes from './depoimentos.js'
import galeriaRoutes from './galeria.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ ok: true }))
router.use('/contato', contatoRoutes)
router.use('/depoimentos', depoimentosRoutes)
router.use('/galeria', galeriaRoutes)
router.use('/auth', adminAuthRoutes)
router.use('/admin/leads', requireAuth, adminLeadsRoutes)
router.use('/admin/depoimentos', requireAuth, adminDepoimentosRoutes)
router.use('/admin/galeria', requireAuth, adminGaleriaRoutes)

export default router
