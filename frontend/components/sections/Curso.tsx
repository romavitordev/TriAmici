'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react'
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

const categories = [
  {
    id: 'tecnica',
    label: 'Técnica',
    offset: 1,
    items: [
      'Fotografar em estúdio',
      'Usar câmera DSLR com domínio',
      'Editar e pós-processar',
      'Calibrar monitor para edição',
      'Criar um foto-documentário',
      'Produzir um book completo',
    ],
  },
  {
    id: 'carreira',
    label: 'Carreira',
    offset: 7,
    items: [
      'Atender um briefing profissional',
      'Cobrar pelo seu trabalho',
      'Proteger seu trabalho',
      'Expor seu trabalho',
      'O que a lei diz sobre imagem e autoria',
    ],
  },
  {
    id: 'visao',
    label: 'Arte & Visão',
    offset: 12,
    items: [
      'O que comprar — e o que não comprar',
      'Mergulhar no mundo da arte',
      'Tornar sua vida mais interessante',
      'Fazer por hobby ou transformar em profissão',
      'Produzir sem jargão técnico desnecessário',
      'Aprender com método essencialmente prático',
    ],
  },
]

export function Curso() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  const previous = () => setActiveSlide((s) => (s - 1 + slides.length) % slides.length)
  const next = () => setActiveSlide((s) => (s + 1) % slides.length)

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32">

      {/* Gradiente sutil — não alcança o conteúdo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,_rgba(201,168,76,0.06),_transparent)]" />

      <div className="container-page relative">

        {/* ── PARTE 1: INTRODUÇÃO ── */}
        <div className="grid items-start gap-12 xl:grid-cols-2 xl:gap-20">

          {/* Coluna de texto */}
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              <p className="section-kicker">O curso</p>
              <h2 className="max-w-[20ch] text-balance font-serif text-4xl leading-[1.08] text-white sm:text-5xl xl:text-6xl">
                Um curso profissional, <span className="italic text-dourado/95">divertido e relevante.</span>
              </h2>
              <p className="max-w-lg text-base leading-8 text-cinza">
                Há 25 anos com o currículo mais profundo, abrangente e exigente da região —
                para quem não tem medo de estudar.
              </p>
            </div>

            {/* Feature rows */}
            <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
              <div className="group flex items-start gap-5 px-6 py-5 transition-colors duration-200 hover:bg-white/[0.025]">
                <div className="icon-spring mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dourado/10">
                  <BookOpen className="h-4 w-4 text-dourado" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Método próprio</p>
                  <p className="mt-1.5 text-sm leading-6 text-white/45">
                    Construído ao longo de 25 anos pelos três fundadores e refinado pelo
                    professor titular — pensado para quem quer produzir imagens que impactam.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-5 border-t border-white/[0.07] px-6 py-5 transition-colors duration-200 hover:bg-white/[0.025]">
                <div className="icon-spring mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dourado/10">
                  <Layers className="h-4 w-4 text-dourado" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Experiência imersiva</p>
                  <p className="mt-1.5 text-sm leading-6 text-white/45">
                    Estúdio próprio, ambiente didático e exposições na galeria permanente
                    da escola. Aprenda com prática real e feedback profissional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da imagem */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[2.5rem] border border-dourado/12 bg-[#111] shadow-[0_40px_120px_rgba(0,0,0,0.4)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent px-7 pb-7 pt-20">
                  <p className="text-xs uppercase tracking-[0.22em] text-dourado">Exemplo de aula</p>
                  <p className="mt-1.5 text-base font-semibold text-white">{slide.caption}</p>
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-2">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Ir para slide ${index + 1}`}
                    className={`h-1 rounded-full transition-all duration-300
                      ${activeSlide === index ? 'w-8 bg-dourado' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Slide anterior"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-200 hover:border-dourado/50 hover:text-dourado"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próximo slide"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-200 hover:border-dourado/50 hover:text-dourado"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── PARTE 2: CURRÍCULO — FULL WIDTH ── */}
        <div className="mt-24 border-t border-white/[0.05] pt-20 md:mt-32 md:pt-24">

          {/* Cabeçalho da grade */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
            <div>
              <p className="section-kicker">O que você aprende</p>
              <h3 className="mt-3 max-w-[18ch] text-balance font-serif text-3xl leading-[1.08] text-white md:text-4xl">
                Em 6 módulos, <span className="italic text-dourado/95">três frentes essenciais.</span>
              </h3>
            </div>
            <p className="max-w-xs text-sm leading-7 text-white/40 md:text-right">
              Tudo para produzir, proteger e vender trabalho autoral com confiança.
            </p>
          </div>

          {/* Grade de categorias */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, ci) => (
              <div
                key={cat.id}
                className="lift-card rounded-2xl border border-white/[0.07] bg-[#0d0d0d]"
              >
                {/* Header da categoria */}
                <div className="flex items-center gap-4 border-b border-white/[0.06] px-6 py-4">
                  <span className="font-mono text-[10px] tabular-nums text-dourado/40">
                    {String(ci + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/65">
                    {cat.label}
                  </p>
                </div>

                {/* Itens */}
                <ul className="px-3 py-3 space-y-px">
                  {cat.items.map((item, i) => (
                    <li
                      key={item}
                      className="group flex cursor-default items-center gap-3 rounded-xl px-4 py-2.5 transition-colors duration-150 hover:bg-white/[0.04]"
                    >
                      <span className="w-5 shrink-0 font-mono text-[10px] tabular-nums text-dourado/35 transition-colors duration-150 group-hover:text-dourado/65">
                        {String(cat.offset + i).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-snug text-white/50 transition-colors duration-150 group-hover:text-white/88">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTAs — centralizados após o conteúdo completo ── */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/aula-gratuita">Peça a aula gratuita</Button>
          <Button href="/sobre" variant="outline">Saiba mais sobre o curso</Button>
        </div>

      </div>
    </section>
  )
}
