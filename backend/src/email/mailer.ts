import nodemailer from 'nodemailer'
import { config } from '../config/index.js'
import type { LeadInput } from '../types/index.js'

export async function sendNotification(lead: LeadInput): Promise<{ sent: boolean; reason?: string }> {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.pass) {
    return { sent: false, reason: 'SMTP não configurado nas variáveis de ambiente' }
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass }
  })

  await transporter.sendMail({
    from: `"Tri Amici Site" <${config.smtp.user}>`,
    to: config.smtp.destino,
    subject: `Novo lead Tri Amici: ${lead.nome}`,
    html: `
      <h1>Novo contato recebido</h1>
      <p><strong>Nome:</strong> ${lead.nome}</p>
      <p><strong>E-mail:</strong> ${lead.email}</p>
      <p><strong>Telefone:</strong> ${lead.telefone ?? '-'}</p>
      <p><strong>Tipo:</strong> ${lead.tipo ?? 'CONTATO'}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${lead.mensagem ?? '-'}</p>
    `
  })

  return { sent: true }
}
