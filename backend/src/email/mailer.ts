import { Resend } from 'resend'
import { config } from '../config/index.js'
import type { LeadInput } from '../types/index.js'

// Instanciação preguiçosa: o construtor da Resend lança erro quando a chave
// é vazia. Criar o cliente só quando houver chave evita derrubar o backend
// no startup em ambientes sem RESEND_API_KEY configurada.
let resend: Resend | null = null
function getResend(): Resend | null {
  if (!config.resendApiKey) return null
  if (!resend) resend = new Resend(config.resendApiKey)
  return resend
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function sendNotification(
  lead: LeadInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getResend()
  if (!client) {
    return { sent: false, reason: 'RESEND_API_KEY não configurada' }
  }

  try {
    const { error } = await client.emails.send({
      from: config.smtp.from,
      to:   config.smtp.destino,
      replyTo: lead.email,
      subject: `Novo lead Tri Amici: ${escape(lead.nome)}`,
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> ${escape(lead.nome)}</p>
        <p><strong>E-mail:</strong> ${escape(lead.email)}</p>
        <p><strong>Telefone:</strong> ${escape(lead.telefone ?? '-')}</p>
        <p><strong>Tipo:</strong> ${escape(lead.tipo ?? 'CONTATO')}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escape(lead.mensagem ?? '-')}</p>
      `,
    })

    if (error) return { sent: false, reason: error.message }
    return { sent: true }
  } catch (error) {
    return { sent: false, reason: error instanceof Error ? error.message : 'Erro desconhecido no envio' }
  }
}
