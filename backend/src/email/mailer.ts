import { Resend } from 'resend'
import { config } from '../config/index.js'
import type { LeadInput } from '../types/index.js'

const resend = new Resend(config.resendApiKey)

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function sendNotification(
  lead: LeadInput
): Promise<{ sent: boolean; reason?: string }> {
  if (!config.resendApiKey) {
    return { sent: false, reason: 'RESEND_API_KEY não configurada' }
  }

  const { error } = await resend.emails.send({
    from: 'Tri Amici Site <noreply@triamici.com.br>',
    to:   config.smtp.destino,
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
}
