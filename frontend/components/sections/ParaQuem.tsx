'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
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
  { title: 'Criar imagens que vendem',            desc: 'Fotos que geram impacto real e desejo imediato no público.',              Icon: Camera     },
  { title: 'Editar com padrão profissional',      desc: 'Técnicas usadas em estúdios profissionais de alto nível.',               Icon: Wand2      },
  { title: 'Dominar câmera em estúdio real',      desc: 'Controle total da câmera em qualquer situação de luz.',                  Icon: Aperture   },
  { title: 'Produzir ensaios com narrativa',      desc: 'Crie histórias visuais que conectam e emocionam.',                       Icon: Images     },
  { title: 'Transformar fotografia em renda',     desc: 'Aprenda a cobrar e viver de fotografia profissional.',                   Icon: Wallet     },
  { title: 'Construir identidade visual',         desc: 'Desenvolva um estilo próprio reconhecível no mercado.',                  Icon: Palette    },
  { title: 'Cobrar e se posicionar',              desc: 'Posicionamento e mentalidade profissional.',                             Icon: Sparkles   },
  { title: 'Proteger direitos autorais',          desc: 'Entenda como proteger suas imagens corretamente.',                       Icon: ShieldCheck },
  { title: 'Ajustar cores como no cinema',        desc: 'Domine cor, luz e estética cinematográfica.',                            Icon: Monitor    },
  { title: 'Desenvolver olhar artístico',         desc: 'Treine seu olhar para criar imagens únicas.',                           Icon: Copyright  },
]

export function ParaQuem() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 900) return

    const track   = trackRef.current
    const text    = textRef.current
    const section = sectionRef.current
    if (!track || !text || !section) return

    const extraScroll = window.innerWidth * 0.7
    const maxScroll   = track.scrollWidth - window.innerWidth + extraScroll

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
        invalidateOnRefresh: true,
      },
    })

    gsap.to(text, {
      y: -80,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300',
        scrub: true,
      },
    })

    // 2 ScrollTriggers em vez de 11 — um para todos os cards, um para o último
    const cards = gsap.utils.toArray<HTMLElement>('.skill-card')
    const lastCard = cards[cards.length - 1]
    const restCards = cards.slice(0, -1)

    const stConfig = {
      trigger: section,
      start: 'top top',
      end: `+=${maxScroll}`,
      scrub: 1.6,
      invalidateOnRefresh: true,
    }

    if (restCards.length) {
      gsap.to(restCards, {
        scale: 1.02,
        opacity: 0.75,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        ease: 'none',
        scrollTrigger: stConfig,
      })
    }

    gsap.to(lastCard, {
      scale: 1.15,
      opacity: 1,
      y: -10,
      boxShadow: '0 70px 200px rgba(0,0,0,0.85)',
      ease: 'none',
      scrollTrigger: stConfig,
    })

    ScrollTrigger.refresh()
    setTimeout(() => ScrollTrigger.refresh(), 200)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-escuro py-16 md:overflow-hidden md:py-32"
    >
      {/* ── MOBILE LAYOUT ── visível só em < md */}
      <div className="md:hidden">
        <motion.div
          className="container-page"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-kicker">Para quem é este curso</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white">
            Uma experiência de vida inesquecível.
          </h2>
          <p className="mt-4 text-base leading-7 text-cinza">
            Este não é só um curso de fotografia.
            É uma transformação completa na forma de ver e criar imagens.
          </p>
        </motion.div>

        <motion.div
          className="container-page mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {skills.map(({ title, desc, Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 26, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-dourado/15 bg-gradient-to-b from-[#181818] to-[#0f0f0f] p-4 shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 active:scale-[0.97]"
            >
              {/* hairline dourado no topo */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dourado/45 to-transparent"
              />
              {/* brilho sutil atrás do ícone */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-dourado/10 blur-2xl"
              />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-dourado/25 bg-dourado/10 text-dourado">
                <Icon className="h-4 w-4" />
              </div>
              <p className="relative text-sm font-semibold leading-snug text-white">{title}</p>
              <p className="relative text-xs leading-5 text-cinza/75">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ── visível só em md+ */}
      <div className="hidden md:block">
        <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr]">

          {/* Texto intro */}
          <div ref={textRef} className="relative z-10 will-change-transform">
            <p className="section-kicker">Para quem é este curso</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              Uma experiência de vida inesquecível.
            </h2>
            <p className="mt-6 text-lg leading-8 text-cinza">
              Este não é só um curso de fotografia.
              <span className="mt-3 block">
                É uma transformação completa na forma de ver e criar imagens.
              </span>
            </p>
          </div>

          {/* Cards — horizontal scroll via GSAP */}
          <div
            ref={trackRef}
            className="relative z-20 flex w-max gap-4 pr-[45vw]"
          >
            {skills.map(({ title, desc, Icon }) => (
              <Card
                key={title}
                className="skill-card relative w-80 cursor-none select-none p-6 transition-all duration-200 ease-out hover:scale-[1.06] hover:-translate-y-2 hover:brightness-110 active:scale-[0.94] group"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="icon-spring rounded-xl bg-white/5 p-2 group-hover:bg-white/10">
                    <Icon className="h-5 w-5 text-dourado" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-cinza opacity-80">{desc}</p>
              </Card>
            ))}

            <div className="flex w-80 items-center justify-center px-6 text-cinza opacity-70">
              <div>
                <p className="text-sm leading-6">E isso é só o começo da sua evolução.</p>
                <p className="mt-2 text-xs opacity-60">O curso aprofunda tudo isso na prática real.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Overlay lateral — desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-escuro via-transparent to-escuro opacity-40 md:block" />
    </section>
  )
}
