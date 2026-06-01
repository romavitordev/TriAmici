import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a Tri Amici Photography Academy em Sorocaba. Telefone, WhatsApp, e-mail, endereço e formulário para dúvidas, horários, valores e parcerias.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato | Tri Amici',
    description: 'Fale com a Tri Amici Photography Academy em Sorocaba.',
    url: 'https://triamici.com.br/contato'
  }
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
