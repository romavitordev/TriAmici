'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { apiFetch } from '@/lib/api'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

type Depoimento = { id: string; nome: string; turma?: string; texto: string; foto?: string }

const fallback: Depoimento[] = [
  {
    id: '1',
    nome: 'Ana Carolina',
    turma: 'Turma 2024',
    texto: 'Entrei sem saber operar a câmera no manual e saí fotografando com intenção, luz e narrativa.',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    nome: 'Marcelo Dias',
    turma: 'Turma 2023',
    texto: 'A Tri Amici mudou meu olhar e abriu as portas para meus primeiros clientes profissionais.',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    nome: 'Bianca Rocha',
    turma: 'Turma 2025',
    texto: 'A escola tem alma. Cada aula é um convite para criar melhor e enxergar o mundo de outro ângulo.',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    nome: 'Lucas Ferreira',
    turma: 'Turma 2022',
    texto: 'Saí com portfólio, clientes e uma visão de mundo completamente diferente. Recomendo sem hesitar.',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    nome: 'Fernanda Alves',
    turma: 'Turma 2023',
    texto: 'Nunca imaginei aprender tanto em tão pouco tempo. A metodologia é única — prática desde o primeiro dia.',
    foto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    nome: 'Ricardo Mendes',
    turma: 'Turma 2024',
    texto: 'Fotografava há anos, mas só depois da Tri Amici entendi o que significa ter intenção real nas imagens.',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '7',
    nome: 'Juliana Prado',
    turma: 'Turma 2025',
    texto: 'A escola é um ambiente de transformação. Saí pronta para trabalhar com fotografia profissionalmente.',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
  },
]

export function Depoimentos() {
  const [items, setItems] = useState(fallback)

  useEffect(() => {
    apiFetch<Depoimento[]>('/api/depoimentos').then(setItems).catch(() => undefined)
  }, [])

  return (
    <section className="bg-[#151515] py-24">
      <div className="container-page">
        <p className="section-kicker">Depoimentos</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">
          Quem passa por aqui muda o jeito de ver.
        </h2>
      </div>

      <div className="relative mt-12">
        {/* Fade lateral esquerdo */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-[#151515] to-transparent sm:w-40 md:w-64" />
        {/* Fade lateral direito */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-[#151515] to-transparent sm:w-40 md:w-64" />

      <Swiper
        className=""
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 140, modifier: 1.2, slideShadows: false }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="w-[76vw] max-w-sm sm:w-auto sm:max-w-xl">
            <article className="border border-dourado/25 bg-preto p-5 sm:p-8">
              <div className="flex items-center gap-4">
                {item.foto && (
                  <Image
                    src={item.foto}
                    alt={item.nome}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-serif text-2xl text-dourado">{item.nome}</h3>
                  {item.turma && (
                    <p className="text-xs uppercase tracking-[0.18em] text-cinza">{item.turma}</p>
                  )}
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-branco/82">"{item.texto}"</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  )
}
