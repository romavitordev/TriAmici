import { z } from 'zod'

export const contactSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('Informe um e-mail valido'),
  telefone: z.string().min(8, 'Informe seu WhatsApp'),
  mensagem: z.string().min(5, 'Conte um pouco sobre seu interesse'),
  empresa: z.string().max(0).optional()
})

export type ContactForm = z.infer<typeof contactSchema>
