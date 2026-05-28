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
  const text1Ref = useRef<HTMLHeadingElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    })
    tl.to(bgRef.current, { scale: 1.08, ease: 'none' })
      .to(text1Ref.current, { opacity: 0, y: -40 }, '<50%')
      .fromTo(text2Ref.current, { opacity: 0, filter: 'blur(8px)', y: 30 }, { opacity: 1, filter: 'blur(0px)', y: 0 }, '-=0.3')
  }, [])

  return (
    <section ref={heroRef} className="relative grid min-h-screen place-items-center overflow-hidden bg-preto px-4 py-28 text-center">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85" alt="Camera fotografica em detalhe" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-preto/30 via-preto/55 to-preto" />
      </div>
      <div className="relative z-10 max-w-5xl">
        <p className="section-kicker mb-6">Sorocaba · SP · Desde 2000</p>
        <h1 ref={text1Ref} className="font-serif text-5xl leading-[0.95] md:text-8xl">
          Fotografia que muda
          <span ref={text2Ref} className="block font-serif italic text-dourado">quem voce e.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-branco/80">25 anos formando fotografos profissionais com o metodo mais completo da regiao.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contato">Quero a aula gratuita</Button>
          <Button href="/sobre" variant="outline">Conheca a escola</Button>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 animate-bounce text-xs tracking-[0.3em] text-branco/55">SCROLL</div>
    </section>
  )
}
