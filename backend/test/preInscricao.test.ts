import { test } from 'node:test'
import assert from 'node:assert/strict'
import { preInscricaoSchema } from '../src/schemas/preInscricaoSchema.js'

const valida = {
  nome: 'Maria Fotografa',
  faixa_idade: '25-30',
  email: 'maria@exemplo.com',
  whatsapp: '15981127508',
  cidade_estado: 'Sorocaba/SP',
  cpf_ultimos4: '1234',
  objetivo: 'hobby_serio',
  nivel: ['celular'],
  resp_fotografia: 'Para mim a fotografia eterniza memórias e sentimentos.',
  resp_artista: 'Sebastião Salgado',
  resp_emocao: 'Sinto que paro o tempo quando faço uma boa imagem.',
  resp_hopper: 'Vejo solidão urbana e uma narrativa silenciosa de espera.',
  intencoes: ['convite_aula_zero'],
}

test('preInscricaoSchema aceita pré-inscrição válida', () => {
  const r = preInscricaoSchema.safeParse(valida)
  assert.equal(r.success, true)
})

test('preInscricaoSchema exige ao menos um nível', () => {
  const r = preInscricaoSchema.safeParse({ ...valida, nivel: [] })
  assert.equal(r.success, false)
})

test('preInscricaoSchema rejeita whatsapp com formatação', () => {
  const r = preInscricaoSchema.safeParse({ ...valida, whatsapp: '(15) 98112-7508' })
  assert.equal(r.success, false)
})

test('preInscricaoSchema bloqueia honeypot (empresa preenchida)', () => {
  const r = preInscricaoSchema.safeParse({ ...valida, empresa: 'spam' })
  assert.equal(r.success, false)
})

test('preInscricaoSchema valida faixa_idade dentro do enum', () => {
  const r = preInscricaoSchema.safeParse({ ...valida, faixa_idade: '10-17' })
  assert.equal(r.success, false)
})
