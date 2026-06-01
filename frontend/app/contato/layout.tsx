import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a Tri Amici Photography Academy em Sorocaba — WhatsApp, telefone, e-mail e endereço. Tire dúvidas sobre o curso e agende uma visita à escola.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato | Tri Amici',
    description: 'WhatsApp, telefone, e-mail e endereço da Tri Amici Photography Academy em Sorocaba.',
    url: 'https://triamici.com.br/contato'
  }
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
