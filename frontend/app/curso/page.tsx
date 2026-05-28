import type { Metadata } from 'next'
import { Camera, Check, FileImage, Monitor, Palette, Scale, Wallet, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Sobre o Curso',
  description: 'Curso profissional de fotografia Tri Amici: pratico, intenso, divertido e sem conhecimento previo.'
}

const modules = [
  'Camera DSLR do zero ao avancado',
  'Luz natural e estudio profissional',
  'Direcao de retrato e books',
  'Fotodocumentario e narrativa visual',
  'Edicao, fluxo e calibracao de monitor',
  'Mercado, precificacao, direitos autorais e lei de imagem'
]

const icons = [Camera, Wand2, FileImage, Palette, Monitor, Wallet, Scale, Check]

export default function CursoPage() {
  return (
    <section className="bg-preto pb-24 pt-32">
      <div className="container-page">
        <ScrollReveal>
          <p className="section-kicker">Curso profissional</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">Sem tecnoques superfluo. Essencialmente pratico.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-cinza">Curso profissional, intenso, divertido e desenhado para quem parte de zero ou quer transformar hobby em trabalho consistente.</p>
        </ScrollReveal>

        <div className="mt-12 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-dourado">
          {['Profissional', 'Intenso', 'Divertido', 'Zero conhecimento previo'].map((badge) => (
            <span key={badge} className="border border-dourado/40 px-4 py-2">{badge}</span>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => {
            const Icon = icons[index % icons.length]
            return (
              <Card key={module}>
                <Icon className="mb-6 text-dourado" />
                <h2 className="font-serif text-2xl">{module}</h2>
                <p className="mt-4 text-sm leading-7 text-cinza">Aulas com pratica guiada, exercicios reais e repertorio visual para construir tecnica com personalidade.</p>
              </Card>
            )
          })}
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <Card>
            <p className="section-kicker">Hobby</p>
            <h3 className="mt-4 font-serif text-4xl">Fotografar melhor a propria vida.</h3>
            <p className="mt-5 text-cinza">Domine luz, composicao e camera para criar imagens mais bonitas, conscientes e memoraveis.</p>
          </Card>
          <Card>
            <p className="section-kicker">Profissao</p>
            <h3 className="mt-4 font-serif text-4xl">Cobrar pelo seu olhar.</h3>
            <p className="mt-5 text-cinza">Construa portfolio, entenda mercado, direitos, entrega e precificacao para atuar profissionalmente.</p>
          </Card>
        </div>

        <div className="mt-16">
          <Button href="/contato">Quero a aula gratuita</Button>
        </div>
      </div>
    </section>
  )
}
