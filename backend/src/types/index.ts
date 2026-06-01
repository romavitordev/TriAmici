export type LeadTipo = 'CONTATO' | 'AULA_GRATIS'

export interface LeadInput {
  nome: string
  email: string
  telefone?: string | null
  mensagem?: string | null
  tipo?: LeadTipo
}

export interface DepoimentoInput {
  nome: string
  turma?: string | null
  texto: string
  foto?: string | null
  ativo?: boolean
  ordem?: number
}

export interface GaleriaInput {
  url: string
  legenda?: string | null
  aluno?: string | null
  ativo?: boolean
}

export type PreInscricaoStatus = 'pendente' | 'contactado' | 'rejeitado'

export interface PreInscricaoInput {
  nome: string
  faixa_idade: string
  email: string
  whatsapp: string
  cidade_estado: string
  cpf_ultimos4: string
  instagram?: string | null
  facebook?: string | null
  objetivo: string
  nivel: string[]
  camera_celular?: string | null
  resp_fotografia: string
  resp_artista: string
  resp_emocao: string
  resp_hopper: string
  intencoes: string[]
}
