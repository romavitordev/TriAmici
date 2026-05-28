import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().max(200),
  senha: z.string().min(8).max(200)
})
