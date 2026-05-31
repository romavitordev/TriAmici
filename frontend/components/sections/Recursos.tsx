import { BookOpen, Images } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const EBOOK_URL =
  'https://www.triamici.com.br/_files/ugd/d43b4b_a72e514c62e94f979d9470fa8eae01df.pdf'
const FLICKR_URL = 'https://www.flickr.com/groups/tri_amici_students/pool/'

type Props = {
  titulo?: string
  descricao?: string
}

export function Recursos({
  titulo = 'Explore a escola antes mesmo de começar.',
  descricao = 'Baixe o e-book gratuito da escola e veja as imagens que os alunos criaram durante o curso.',
}: Props = {}) {
  return (
    <section className="bg-preto py-24 md:py-32">
      <div className="container-page">
        <ScrollReveal>
          <p className="section-kicker">Materiais</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
            {titulo}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-cinza">
            {descricao}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* E-book */}
          <ScrollReveal>
            <div className="lift-card group flex h-full flex-col border border-borda bg-escuro/80 p-8 md:p-10">
              <div className="icon-spring flex h-12 w-12 items-center justify-center rounded-xl border border-dourado/25 bg-dourado/10 text-dourado">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-white">E-book da escola</h3>
              <p className="mt-3 max-w-md flex-1 text-sm leading-7 text-cinza">
                Material gratuito da Tri Amici: conheça o método, a filosofia e a
                estrutura do curso profissional de fotografia.
              </p>
              <div className="mt-7">
                <Button href={EBOOK_URL} external>
                  Baixar o e-book
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Fotos dos alunos */}
          <ScrollReveal delay={0.1}>
            <div className="lift-card group flex h-full flex-col border border-borda bg-escuro/80 p-8 md:p-10">
              <div className="icon-spring flex h-12 w-12 items-center justify-center rounded-xl border border-dourado/25 bg-dourado/10 text-dourado">
                <Images className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-white">+1.600 fotos dos alunos</h3>
              <p className="mt-3 max-w-md flex-1 text-sm leading-7 text-cinza">
                Veja as imagens que os alunos fizeram durante o curso — e imagine
                até onde o seu olhar pode chegar.
              </p>
              <div className="mt-7">
                <Button href={FLICKR_URL} external variant="outline">
                  Ver fotos no Flickr
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
