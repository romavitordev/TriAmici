import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato e Aula Gratuita',
  description: 'Peça seu convite para a aula gratuita da Tri Amici Photography Academy em Sorocaba. Sem compromisso.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato e Aula Gratuita | Tri Amici',
    description: 'Peça seu convite para a aula gratuita da Tri Amici Photography Academy em Sorocaba.',
    url: 'https://triamici.com.br/contato'
  }
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
