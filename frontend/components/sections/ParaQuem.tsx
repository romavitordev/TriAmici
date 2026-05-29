'use client'

import { useRef } from 'react'
import {
  Aperture,
  Camera,
  Copyright,
  Images,
  Monitor,
  Palette,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wand2
} from 'lucide-react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { Card } from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    title: 'Criar imagens que vendem (não só bonitas)',
    desc: 'Fotos que geram impacto real e desejo imediato no público.',
    Icon: Camera
  },
  {
    title: 'Editar fotos com padrão profissional de mercado',
    desc: 'Técnicas usadas em estúdios profissionais de alto nível.',
    Icon: Wand2
  },
  {
    title: 'Dominar câmera como fotógrafo de estúdio real',
    desc: 'Controle total da câmera em qualquer situação de luz.',
    Icon: Aperture
  },
  {
    title: 'Produzir ensaios com narrativa forte',
    desc: 'Crie histórias visuais que conectam e emocionam.',
    Icon: Images
  },
  {
    title: 'Transformar fotografia em renda real',
    desc: 'Aprenda a cobrar e viver de fotografia profissional.',
    Icon: Wallet
  },
  {
    title: 'Construir identidade visual consistente',
    desc: 'Desenvolva um estilo próprio reconhecível no mercado.',
    Icon: Palette
  },
  {
    title: 'Aprender a cobrar e viver de fotografia',
    desc: 'Posicionamento e mentalidade profissional.',
    Icon: Sparkles
  },
  {
    title: 'Proteger seu trabalho e direitos autorais',
    desc: 'Entenda como proteger suas imagens corretamente.',
    Icon: ShieldCheck
  },
  {
    title: 'Ajustar cores como profissionais de cinema',
    desc: 'Domine cor, luz e estética cinematográfica.',
    Icon: Monitor
  },
  {
    title: 'Desenvolver olhar artístico que se destaca',
    desc: 'Treine seu olhar para criar imagens únicas.',
    Icon: Copyright
  }
]

export function ParaQuem() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 900) return

    const track = trackRef.current
    const text = textRef.current
    const section = sectionRef.current
    if (!track || !text || !section) return

    // 📏 FIX DO CORTE DO ÚLTIMO CARD (mais espaço real)
    const extraScroll = window.innerWidth * 0.7
    const maxScroll = track.scrollWidth - window.innerWidth + extraScroll

    // 🍎 SCROLL HORIZONTAL (efeito Apple)
    gsap.to(track, {
      x: -maxScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${maxScroll + window.innerWidth * 0.3}`,
        scrub: 1.4,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })


    // 🌫️ TEXTO INTRO
    gsap.to(text, {
      y: -80,
      opacity: 0,
      filter: 'blur(8px)',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300',
        scrub: true
      }
    })

    // 🧠 CARDS STORYTELLING
    const cards = gsap.utils.toArray<HTMLElement>('.skill-card')

    cards.forEach((card, i) => {
      const isLast = i === cards.length - 1

      gsap.to(card, {
        scale: isLast ? 1.15 : 1.02,
        opacity: isLast ? 1 : 0.75,
        y: isLast ? -10 : 0,
        filter: isLast ? 'blur(0px)' : 'blur(0.4px)',
        boxShadow: isLast
          ? '0 70px 200px rgba(0,0,0,0.85)'
          : '0 20px 60px rgba(0,0,0,0.4)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${maxScroll}`,
          scrub: 1.6,
          invalidateOnRefresh: true
        }
      })
    })

    ScrollTrigger.refresh()
    setTimeout(() => ScrollTrigger.refresh(), 200)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-escuro py-24 md:py-32"
    >
      <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr]">

        {/* 🎭 TEXTO */}
        <div ref={textRef} className="relative z-10 will-change-transform">
          <p className="section-kicker">Para quem é este curso</p>

          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Uma experiência de vida inesquecível.
          </h2>

          <p className="mt-6 text-lg leading-8 text-cinza">
            Este não é só um curso de fotografia.
            <span className="block mt-3">
              É uma transformação completa na forma de ver e criar imagens.
            </span>
          </p>
        </div>

        {/* 🧊 CARDS */}
        <div
          ref={trackRef}
          className="grid gap-4 md:flex md:w-max relative z-20 pr-[45vw]"
        >
          {skills.map(({ title, desc, Icon }) => (
            <Card
              key={title}
              className="
                skill-card
                relative md:w-80
                p-6

                /* 🖱️ CLICÁVEL REAL */
                cursor-none select-none pointer-events-auto

                /* ✨ MICROINTERAÇÕES */
                transition-all duration-200 ease-out
                hover:scale-[1.06]
                hover:-translate-y-2
                hover:shadow-2xl
                hover:brightness-110

                active:scale-[0.94]
                active:translate-y-1
                active:rotate-[0.3deg]
                active:brightness-90

                group
              "
            >
              {/* ICON */}
              <div className="mb-5 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition">
                  <Icon className="text-dourado w-5 h-5" />
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold leading-snug text-white">
                {title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-sm leading-6 text-cinza opacity-80">
                {desc}
              </p>
            </Card>
          ))}

          {/* FINAL DO SCROLL */}
          <div className="flex items-center justify-center md:w-80 opacity-70 text-cinza px-6">
            <div>
              <p className="text-sm leading-6">
                E isso é só o começo da sua evolução.
              </p>
              <p className="text-xs mt-2 opacity-60">
                O curso aprofunda tudo isso na prática real.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 🌫️ OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-escuro via-transparent to-escuro opacity-40" />
    </section>
  )
}