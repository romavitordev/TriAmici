import { Resend } from 'resend'
import { config } from '../config/index.js'
import type { LeadInput, PreInscricaoInput } from '../types/index.js'

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

export async function sendPreInscricaoNotification(
  data: PreInscricaoInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getResend()
  if (!client) return { sent: false, reason: 'RESEND_API_KEY não configurada' }

  const objetivoLabel = {
    profissao_principal: 'Viver de fotografia como profissão principal',
    renda_complementar: 'Complementar a renda',
    hobby_serio: 'Hobby sério e apaixonado',
  }[data.objetivo] ?? data.objetivo

  try {
    const { error } = await client.emails.send({
      from:    config.smtp.from,
      to:      config.smtp.destino,
      replyTo: data.email,
      subject: `Nova pré-inscrição: ${escape(data.nome)}`,
      html: `
        <h2>Nova pré-inscrição recebida</h2>
        <table cellpadding="6" style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td><strong>Nome</strong></td><td>${escape(data.nome)}</td></tr>
          <tr><td><strong>WhatsApp</strong></td><td>${escape(data.whatsapp)}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${escape(data.email)}</td></tr>
          <tr><td><strong>Cidade/Estado</strong></td><td>${escape(data.cidade_estado)}</td></tr>
          <tr><td><strong>Idade</strong></td><td>${escape(data.faixa_idade)}</td></tr>
          <tr><td><strong>Objetivo</strong></td><td>${escape(objetivoLabel)}</td></tr>
          <tr><td><strong>Nível</strong></td><td>${data.nivel.map(escape).join(', ')}</td></tr>
          <tr><td><strong>Câmera/Celular</strong></td><td>${escape(data.camera_celular ?? '-')}</td></tr>
          <tr><td><strong>Instagram</strong></td><td>${escape(data.instagram ?? '-')}</td></tr>
          <tr><td><strong>Facebook</strong></td><td>${escape(data.facebook ?? '-')}</td></tr>
          <tr><td><strong>Intenções</strong></td><td>${data.intencoes.map(escape).join(', ')}</td></tr>
        </table>
        <hr/>
        <h3>Vestibular de sensibilidade</h3>
        <p><strong>01) Por que fotografia é importante?</strong><br/>${escape(data.resp_fotografia)}</p>
        <p><strong>02) Artista preferido:</strong><br/>${escape(data.resp_artista)}</p>
        <p><strong>03) Por que você gosta de fotografia?</strong><br/>${escape(data.resp_emocao)}</p>
        <p><strong>04) O que você vê no Nighthawks (Hopper)?</strong><br/>${escape(data.resp_hopper)}</p>
        <hr/>
        <p style="color:#666;font-size:13px">
          Acesse o painel para chamar no WhatsApp:
          <a href="https://triamici.com.br/admin">triamici.com.br/admin</a>
        </p>
      `,
    })

    if (error) return { sent: false, reason: error.message }
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : 'Erro desconhecido' }
  }
}
