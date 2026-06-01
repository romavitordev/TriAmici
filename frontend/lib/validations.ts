import { z } from 'zod'

/* ── Pré-inscrição (espelha o schema do backend) ── */

export const FAIXAS = ['18-24','25-30','31-40','41-50','51-60','61-70','71-80','81-99','99+'] as const
export const OBJETIVOS = ['profissao_principal','renda_complementar','hobby_serio'] as const
export const NIVEIS = [
  'nao_fotografo','celular','odeia_tecnologia','facilidade_tech',
  'cameras_compactas','dslr','fotografo_familia','cobrou_servicos'
] as const
export const INTENCOES = ['convite_aula_zero','reservar_vaga','receber_brochura'] as const

export const preInscricaoSchema = z.object({
  nome:           z.string().min(3, 'Informe seu nome completo').max(200),
  faixa_idade:    z.enum(FAIXAS, { errorMap: () => ({ message: 'Selecione sua faixa de idade' }) }),
  email:          z.string().email('Informe um e-mail válido').max(200),
  whatsapp:       z.string().regex(/^\d{10,11}$/, 'DDD + número, só dígitos'),
  cidade_estado:  z.string().min(3, 'Informe cidade e estado').max(150),
  cpf_ultimos4:   z.string().regex(/^\d{4}$/, 'Apenas os 4 últimos dígitos'),
  instagram:      z.string().max(200).optional().or(z.literal('')),
  facebook:       z.string().max(200).optional().or(z.literal('')),
  objetivo:       z.enum(OBJETIVOS, { errorMap: () => ({ message: 'Selecione um objetivo' }) }),
  nivel:          z.array(z.enum(NIVEIS)).min(1, 'Marque pelo menos uma opção'),
  camera_celular: z.string().max(300).optional().or(z.literal('')),
  resp_fotografia:z.string().min(20, 'Conte um pouco mais (mín. 20 caracteres)').max(3000),
  resp_artista:   z.string().min(10, 'Diga ao menos um nome (mín. 10 caracteres)').max(1000),
  resp_emocao:    z.string().min(20, 'Conte um pouco mais (mín. 20 caracteres)').max(3000),
  resp_hopper:    z.string().min(20, 'Conte um pouco mais (mín. 20 caracteres)').max(3000),
  intencoes:      z.array(z.enum(INTENCOES)).min(1, 'Marque pelo menos uma opção'),
  empresa:        z.string().max(0).optional(),
})

export type PreInscricaoForm = z.infer<typeof preInscricaoSchema>
