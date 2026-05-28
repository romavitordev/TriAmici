import { Router } from 'express'
import { z } from 'zod'
import { dashboardTotals, listLeads, markLeadRespondido } from '../../repositories/leadRepository.js'

const router = Router()

router.get('/', async (req, res) => {
  res.json(await listLeads(typeof req.query.tipo === 'string' ? req.query.tipo : undefined))
})

router.get('/totals', async (_req, res) => {
  res.json(await dashboardTotals())
})

router.patch('/:id/respondido', async (req, res) => {
  const body = z.object({ respondido: z.boolean() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados invalidos' })
  await markLeadRespondido(req.params.id, body.data.respondido)
  return res.status(204).send()
})

export default router
