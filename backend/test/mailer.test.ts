import assert from 'node:assert/strict'
import { test } from 'node:test'

// Garante ambiente sem chave para validar o caminho de fallback (sem rede).
delete process.env.RESEND_API_KEY

const { sendNotification } = await import('../src/email/mailer.js')

test('sendNotification não envia quando RESEND_API_KEY está ausente', async () => {
  const result = await sendNotification({ nome: 'João', email: 'joao@exemplo.com' })
  assert.equal(result.sent, false)
  assert.match(result.reason ?? '', /RESEND_API_KEY/)
})
