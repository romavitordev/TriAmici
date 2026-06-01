import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Curso Profissional de Fotografia',
  description: 'Curso profissional da Tri Amici em Sorocaba — 6 módulos em 3 fases, presencial, do zero ao mercado. Aula gratuita antes da matrícula.',
  alternates: { canonical: '/curso' },
  openGraph: {
    title: 'Curso Profissional de Fotografia | Tri Amici',
    description: 'Curso profissional em 3 fases (Fundação, Linguagem, Mercado). Presencial em Sorocaba/SP. Aula gratuita sem compromisso.',
    url: 'https://triamici.com.br/curso',
  },
}

export default function CursoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
