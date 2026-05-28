import type { Metadata } from 'next'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Sobre a Escola',
  description: 'Conheca a historia, o metodo e a casa da Tri Amici Photography Academy em Sorocaba.'
}

const timeline = [
  ['2000', 'Inicio da jornada Tri Amici em Sorocaba.'],
  ['2007', 'Consolidacao da identidade Photography Academy.'],
  ['2016', 'Expansao da galeria permanente de exposicoes.'],
  ['2026', '25 anos formando fotografos com metodo pratico e artistico.']
]

export default function SobrePage() {
  return (
    <section className="bg-preto pb-24 pt-32">
      <div className="container-page">
        <ScrollReveal>
          <p className="section-kicker">Sobre a escola</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Uma casa para aprender fotografia com presenca, oficio e arte.</h1>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="Tri Amici House em Sorocaba" fill className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-xl leading-9 text-branco/82">A Tri Amici House fica na Rua Amapa, 112, Vila Augusto, Sorocaba. E um espaco de aprendizado, estudio profissional e galeria permanente para que o aluno experimente a fotografia como pratica viva.</p>
            <p className="mt-6 text-lg leading-8 text-cinza">O metodo proprio combina tecnica essencial, exercicios intensivos, leitura de imagem, edicao, direitos autorais e pratica de mercado sem tecnoques superfluo.</p>
          </ScrollReveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-4">
          {timeline.map(([year, text], index) => (
            <Card key={year}>
              <span className="font-serif text-4xl text-dourado">{year}</span>
              <p className="mt-5 text-sm leading-7 text-cinza">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <p className="section-kicker">Corpo docente</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {['Direcao artistica', 'Tecnica e estudio', 'Edicao e portfolio'].map((role) => (
              <Card key={role}>
                <div className="mb-5 h-48 bg-[url('https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center" />
                <h3 className="font-serif text-2xl text-dourado">{role}</h3>
                <p className="mt-3 text-sm leading-7 text-cinza">Professores com experiencia de mercado, acompanhamento pratico e olhar dedicado ao desenvolvimento autoral do aluno.</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
