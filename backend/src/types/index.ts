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
