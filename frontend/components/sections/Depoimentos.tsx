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
  { id: '1', nome: 'Ana Carolina', turma: 'Turma 2024', texto: 'Entrei sem saber operar a camera no manual e sai fotografando com intencao, luz e narrativa.', foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
  { id: '2', nome: 'Marcelo Dias', turma: 'Turma 2023', texto: 'A Tri Amici mudou meu olhar e abriu as portas para meus primeiros clientes.', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  { id: '3', nome: 'Bianca Rocha', turma: 'Turma 2025', texto: 'A escola tem alma. Cada aula parece um convite para criar melhor.', foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' }
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
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Quem passa por aqui muda o jeito de ver.</h2>
        <Swiper className="mt-12" modules={[Autoplay, EffectCoverflow]} effect="coverflow" grabCursor centeredSlides slidesPerView="auto" autoplay={{ delay: 5000 }} coverflowEffect={{ rotate: 0, stretch: 0, depth: 140, modifier: 1.2, slideShadows: false }}>
          {items.map((item) => (
            <SwiperSlide key={item.id} className="max-w-xl">
              <article className="border border-dourado/25 bg-preto p-8">
                <div className="flex items-center gap-4">
                  {item.foto && <Image src={item.foto} alt={item.nome} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" />}
                  <div>
                    <h3 className="font-serif text-2xl text-dourado">{item.nome}</h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-cinza">{item.turma}</p>
                  </div>
                </div>
                <p className="mt-8 text-lg leading-8 text-branco/82">“{item.texto}”</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
