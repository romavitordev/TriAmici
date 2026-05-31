import assert from 'node:assert/strict'
import { test } from 'node:test'
import { leadSchema } from '../src/schemas/leadSchema.js'
import { depoimentoSchema, galeriaSchema } from '../src/schemas/depoimentoSchema.js'

test('leadSchema aceita lead válido e aplica default de tipo', () => {
  const parsed = leadSchema.parse({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(15) 99999-9999',
    mensagem: 'Tenho interesse na aula experimental.',
  })
  assert.equal(parsed.tipo, 'CONTATO')
  assert.equal(parsed.nome, 'João Silva')
})

test('leadSchema rejeita e-mail inválido', () => {
  const result = leadSchema.safeParse({ nome: 'João', email: 'nao-eh-email' })
  assert.equal(result.success, false)
})

test('leadSchema rejeita nome curto', () => {
  const result = leadSchema.safeParse({ nome: 'J', email: 'a@b.com' })
  assert.equal(result.success, false)
})

test('leadSchema bloqueia honeypot (empresa preenchida)', () => {
  const result = leadSchema.safeParse({ nome: 'João', email: 'a@b.com', empresa: 'spam' })
  assert.equal(result.success, false)
})

test('leadSchema aceita apenas tipos válidos', () => {
  const ok = leadSchema.safeParse({ nome: 'João', email: 'a@b.com', tipo: 'AULA_GRATIS' })
  assert.equal(ok.success, true)
  const bad = leadSchema.safeParse({ nome: 'João', email: 'a@b.com', tipo: 'OUTRO' })
  assert.equal(bad.success, false)
})

test('depoimentoSchema valida campos obrigatórios', () => {
  const ok = depoimentoSchema.safeParse({ nome: 'Ana', texto: 'Curso excelente!' })
  assert.equal(ok.success, true)
  const bad = depoimentoSchema.safeParse({ nome: 'Ana' })
  assert.equal(bad.success, false)
})

test('galeriaSchema exige URL válida', () => {
  const ok = galeriaSchema.safeParse({ url: 'https://exemplo.com/foto.jpg' })
  assert.equal(ok.success, true)
  const bad = galeriaSchema.safeParse({ url: 'nao-eh-url' })
  assert.equal(bad.success, false)
})
