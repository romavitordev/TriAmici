import { Router } from 'express'
import { adminLogin, adminLogout, requireAdmin } from '../middleware/adminAuth.js'
import {
  exportPreInscricoes,
  listPreInscricoes,
  updateStatus,
  getPreInscricaoById,
} from '../repositories/preInscricaoRepository.js'

const router = Router()

// Auth
router.post('/login',  adminLogin)
router.post('/logout', adminLogout)

// Verificar sessão (usado pelo frontend para checar se ainda está logado)
router.get('/me', requireAdmin, (_req, res) => res.json({ ok: true }))

// CRUD pré-inscrições (todas protegidas)
router.get('/pre-inscricoes', requireAdmin, async (req, res) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    res.json(await listPreInscricoes(status))
  } catch (err) {
    console.error('admin_list_error', err)
    res.status(500).json({ error: 'Erro ao listar' })
  }
})

// Exportar CSV (registrado antes de :id para não colidir)
router.get('/pre-inscricoes/export/csv', requireAdmin, async (_req, res) => {
  try {
    const rows = await exportPreInscricoes()
    if (!rows.length) return res.status(200).send('')
    const headers = Object.keys(rows[0]).join(',')
    const csv = [
      headers,
      ...rows.map(row =>
        Object.values(row)
          .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
    ].join('\n')
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="pre-inscricoes.csv"')
    res.send('﻿' + csv) // BOM para Excel abrir corretamente
  } catch (err) {
    console.error('admin_export_error', err)
    res.status(500).json({ error: 'Erro ao exportar' })
  }
})

router.get('/pre-inscricoes/:id', requireAdmin, async (req, res) => {
  try {
    const item = await getPreInscricaoById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Não encontrado' })
    res.json(item)
  } catch (err) {
    console.error('admin_get_error', err)
    res.status(500).json({ error: 'Erro ao buscar' })
  }
})

router.patch('/pre-inscricoes/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status, nota_admin } = req.body as { status: string; nota_admin?: string }
    if (!['pendente','contactado','rejeitado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' })
    }
    await updateStatus(req.params.id, status, nota_admin)
    res.json({ ok: true })
  } catch (err) {
    console.error('admin_status_error', err)
    res.status(500).json({ error: 'Erro ao atualizar' })
  }
})

export default router
