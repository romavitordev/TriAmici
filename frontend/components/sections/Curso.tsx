'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const slides = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    alt: 'Alunos em aula de fotografia em estúdio',
    caption: 'Aulas práticas em estúdio real'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80',
    alt: 'Turma de fotografia com diplomas',
    caption: 'Turma com diplomas e reconhecimento profissional'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    alt: 'Aluno editando fotos em computador',
    caption: 'Edição profissional e preparação de portfólio'
  }
]

const highlights = [
  'Sem “tecnoquês” supérfluo',
  'Essencialmente prático',
  'Aprenda a editar',
  'Aprenda a fotografar em estúdio',
  'Aprenda a atender um briefing',
  'Aprenda a usar sua câmera DSLR',
  'Aprenda a fazer um foto-documentário',
  'Aprenda a fazer um book',
  'Aprenda a proteger seu trabalho',
  'Aprenda a expor seu trabalho',
  'Aprenda a cobrar por seu trabalho',
  'Saiba o que comprar',
  'Saiba o que não comprar',
  'Aprenda a calibrar seu monitor para edição',
  'Aprenda o que a lei diz sobre imagem e direito autoral',
  'Mergulhe no mundo da arte',
  'Torne sua vida mais interessante',
  'Faça por hobby ou transforme em profissão'
]

export function Curso() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  const previous = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)
  const next = () => setActiveSlide((current) => (current + 1) % slides.length)

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(252,211,77,0.18),_transparent_45%)]" />
      <div className="container-page relative">
        <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-10">
            <div className="max-w-2xl space-y-6">
              <p className="section-kicker">O curso</p>
              <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
                Um curso profissional, divertido e relevante.
              </h2>
              <p className="text-lg leading-8 text-cinza">
                Há 25 anos com o currículo mais profundo, abrangente e exigente da região - para quem não tem medo de estudar.
                O método é construído com atividades reais imersivas e desafios técnico-pedagógicos que transformam o estudante de fotografia.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-dourado/20 bg-[#141414] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <p className="text-sm uppercase tracking-[0.25em] text-dourado">Método próprio</p>
                <p className="mt-4 text-white leading-7">
                  Um conselho de fotógrafos experientes construiu um processo pensado para quem quer entrar no mercado e produzir imagens que impactam.
                </p>
              </div>
              <div className="rounded-[2rem] border border-dourado/20 bg-[#141414] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <p className="text-sm uppercase tracking-[0.25em] text-dourado">Experiência imersiva</p>
                <p className="mt-4 text-white leading-7">
                  Estúdio próprio, ambiente didático e exposições frequentes na galeria permanente da escola. Aprenda com prática real e feedback profissional.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-dourado/15 bg-[#101010]/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-4 border-b border-dourado/15 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-dourado">O que você aprende</p>
                  <p className="mt-3 max-w-xl text-white/80 leading-7">
                    Tudo o que um fotógrafo precisa para produzir, proteger e vender trabalho autoral com confiança.
                  </p>
                </div>
                <div className="rounded-full border border-dourado/20 bg-[#111] px-4 py-2 text-xs uppercase tracking-[0.2em] text-dourado">
                  18 tópicos essenciais
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-[#121212] p-4 text-sm leading-6 text-cinza transition hover:border-dourado/30 hover:bg-[#1a1a1a]">
                    <div className="mb-3 inline-flex h-2.5 w-2.5 rounded-full bg-dourado" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/contato">Peça a aula gratuita</Button>
              <Button href="/sobre" variant="outline">Saiba mais</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2.5rem] border border-dourado/15 bg-[#111] shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-dourado">Exemplo de aula</p>
                  <p className="mt-2 text-lg font-semibold">{slide.caption}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[2rem] border border-borda bg-escuro/95 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                <p className="text-sm uppercase tracking-[0.25em] text-dourado">Aprendizado prático</p>
                <p className="mt-3 text-white leading-7">
                  Treine com câmeras reais, briefs autênticos e edição profissional para criar imagens que já começam prontas para o mercado.
                </p>
              </div>
              <div className="rounded-[2rem] border border-borda bg-escuro/95 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                <p className="text-sm uppercase tracking-[0.25em] text-dourado">Visibilidade real</p>
                <p className="mt-3 text-white leading-7">
                  Mostre seu trabalho em exposições da escola, construa portfólio e receba orientação prática para posicionar sua carreira.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition ${activeSlide === index ? 'bg-dourado' : 'bg-white/20'}`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={previous}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-dourado hover:text-dourado"
                aria-label="Slide anterior"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-dourado hover:text-dourado"
                aria-label="Próximo slide"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
