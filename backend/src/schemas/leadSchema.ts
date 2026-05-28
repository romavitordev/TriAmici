import { z } from 'zod'

export const leadSchema = z.object({
  nome: z.string().min(2).max(200),
  email: z.string().email().max(200),
  telefone: z.string().max(50).optional().nullable(),
  mensagem: z.string().max(4000).optional().nullable(),
  tipo: z.enum(['CONTATO', 'AULA_GRATIS']).default('CONTATO'),
  empresa: z.string().max(0).optional()
})
