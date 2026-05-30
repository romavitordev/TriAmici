'use client'

import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = heroRef.current
    const bg = bgRef.current
    const title = titleRef.current
    const sub = subRef.current
    const desc = descRef.current

    if (!hero || !bg || !title || !sub || !desc) return

    const isMobile = window.innerWidth < 768
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: isMobile ? '+=200%' : '+=400%',
        scrub: isMobile ? 0.8 : 1.2,
        pin: true,
        anticipatePin: 1
      }
    })

    // 🎥 ZOOM SUAVE DE FUNDO
    tl.to(bg, {
      scale: 1.12,
      ease: 'none'
    }, 0)

    // ─────────────────────────────
    // 🧠 TÍTULO ESTÁVEL (não perde foco rápido)
    // ─────────────────────────────
    tl.fromTo(
      title,
      {
        opacity: 1,
        scale: 1.06,
        y: 0
      },
      {
        opacity: 0.75,
        scale: 1,
        y: -5,
        ease: 'none'
      },
      0.2
    )

    // ─────────────────────────────
    // 🎯 SUBTÍTULO ENTRA DEVAGAR
    // ─────────────────────────────
    tl.fromTo(
      sub,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 8,  scale: 1,   ease: 'none' },
      0.5
    )

    tl.fromTo(
      desc,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0,  ease: 'none' },
      0.78
    )

    // ─────────────────────────────
    // 🌫️ FINAL — “SOFT EXIT” (isso resolve o seu problema do scroll duro)
    // ─────────────────────────────
    tl.to(
      hero,
      {
        opacity: 0.95,
        ease: 'power2.out'
      },
      0.92
    )

    ScrollTrigger.refresh()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-preto px-4 py-28 flex items-center justify-center"
    >
      {/* 🎥 BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85"
          alt="Camera fotografica em detalhe"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-preto/30 via-preto/55 to-preto" />
      </div>

      {/* 🧠 CONTEÚDO */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center text-center">

        <p className="section-kicker mb-8">
          Sorocaba · SP · Desde 2000
        </p>

        <h1 className="font-serif text-5xl leading-[1.05] md:text-8xl">
          <span ref={titleRef} className="block will-change-[transform,opacity]">
            Fotografia que muda
          </span>

          <span
            ref={subRef}
            className="block mt-4 font-serif italic text-dourado opacity-0 will-change-[transform,opacity]"
          >
            quem você é.
          </span>
        </h1>

        <p
          ref={descRef}
          className="mx-auto mt-10 max-w-3xl text-lg leading-8 text-branco/80 will-change-[transform,opacity]"
        >
          25 anos formando fotógrafos profissionais com o método mais completo da região.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contato">Quero a aula gratuita</Button>
          <Button href="/sobre" variant="outline">
            Conheça a escola
          </Button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-xs tracking-[0.3em] text-branco/55">
        SCROLL
      </div>
    </section>
  )
}
