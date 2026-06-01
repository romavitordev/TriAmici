import { Router } from 'express'
import { sendPreInscricaoNotification } from '../email/mailer.js'
import { contactRateLimit } from '../middleware/rateLimit.js'
import { validate } from '../middleware/validate.js'
import { createPreInscricao } from '../repositories/preInscricaoRepository.js'
import { preInscricaoSchema } from '../schemas/preInscricaoSchema.js'

const router = Router()

router.post('/', contactRateLimit, validate(preInscricaoSchema), async (req, res) => {
  try {
    const { empresa, ...data } = req.body
    const id = await createPreInscricao(data)

    sendPreInscricaoNotification(data)
      .then(({ sent, reason }) => {
        if (!sent) console.warn(`[mail] pré-inscrição não notificada — ${reason}`)
        else console.log(`[mail] notificação pré-inscrição enviada`)
      })
      .catch((err) => console.error('[mail] erro:', err))

    res.status(201).json({ id })
  } catch (error) {
    console.error('pre_inscricao_error', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

export default router
