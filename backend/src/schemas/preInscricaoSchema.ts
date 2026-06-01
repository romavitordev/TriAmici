import { z } from 'zod'

const FAIXAS = ['18-24','25-30','31-40','41-50','51-60','61-70','71-80','81-99','99+'] as const
const OBJETIVOS = ['profissao_principal','renda_complementar','hobby_serio'] as const
const NIVEIS = [
  'nao_fotografo','celular','odeia_tecnologia','facilidade_tech',
  'cameras_compactas','dslr','fotografo_familia','cobrou_servicos'
] as const
const INTENCOES = [
  'convite_aula_zero','reservar_vaga','receber_brochura'
] as const

export const preInscricaoSchema = z.object({
  nome:           z.string().min(3).max(200),
  faixa_idade:    z.enum(FAIXAS),
  email:          z.string().email().max(200),
  whatsapp:       z.string().regex(/^\d{10,11}$/, 'DDD + número sem espaços ou traços'),
  cidade_estado:  z.string().min(3).max(150),
  cpf_ultimos4:   z.string().regex(/^\d{4}$/, 'Apenas os 4 últimos dígitos'),
  instagram:      z.string().max(200).optional().nullable(),
  facebook:       z.string().max(200).optional().nullable(),
  objetivo:       z.enum(OBJETIVOS),
  nivel:          z.array(z.enum(NIVEIS)).min(1),
  camera_celular: z.string().max(300).optional().nullable(),
  resp_fotografia:z.string().min(20).max(3000),
  resp_artista:   z.string().min(10).max(1000),
  resp_emocao:    z.string().min(20).max(3000),
  resp_hopper:    z.string().min(20).max(3000),
  intencoes:      z.array(z.enum(INTENCOES)).min(1),
  // honeypot
  empresa:        z.string().max(0).optional(),
})
