'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef  = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const subRef   = useRef<HTMLSpanElement>(null)
  const descRef  = useRef<HTMLParagraphElement>(null)

  // iOS/Safari não bufferiza <video> sem um play(), mesmo com preload="auto".
  // Fazemos um "prime" mudo (play + pause imediato no frame 0) para forçar o
  // download/decode e habilitar o scrubbing. O vídeo continua controlado só
  // pelo scroll — este play é imperceptível (mudo e pausado no mesmo tick).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prime = () => {
      if (!video.paused) return
      video.muted = true
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => {
          video.pause()
          if (video.currentTime < 0.05) video.currentTime = 0
        }).catch(() => {})
      }
    }

    prime()
    const onGesture = () => prime()
    window.addEventListener('touchstart', onGesture, { once: true, passive: true })
    window.addEventListener('pointerdown', onGesture, { once: true, passive: true })
    return () => {
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('pointerdown', onGesture)
    }
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero  = heroRef.current
    const video = videoRef.current
    const title = titleRef.current
    const sub   = subRef.current
    const desc  = descRef.current

    if (!hero || !video || !title || !sub || !desc) return

    const isMobile = window.innerWidth < 768
    const end      = isMobile ? '+=300%' : '+=400%'

    // Frame 0, sem autoplay
    video.pause()
    video.currentTime = 0

    // Duração real — preenchida por loadedmetadata ou já disponível em cache
    let duration = 0
    if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
      duration = video.duration
    } else {
      video.addEventListener('loadedmetadata', () => {
        duration = video.duration
        video.currentTime = 0 // pinta o primeiro frame assim que a metadata chega
      }, { once: true })
    }

    /*
     * Proxy JS puro: GSAP anima proxy.t de 0 → 1 via scrub.
     *
     * Por que tween onUpdate em vez de ScrollTrigger onUpdate + quickTo:
     *
     * - ScrollTrigger.onUpdate dispara em eventos de scroll (raw Lenis position)
     * - quickTo com duration cria uma segunda animação independente que "persegue"
     *   o alvo — quando a direção muda, proxy.t parte de um valor intermediário,
     *   causando salto de frame visível.
     *
     * - tween.onUpdate dispara no mesmo tick em que o GSAP scrub move o
     *   playhead da timeline — forward E backward — sem animação secundária.
     *   proxy.t = exatamente onde o scrub colocou (0 a 1). Sem lag extra.
     *
     * Lenis já suaviza o scroll. scrub:true deixa o GSAP mapear diretamente
     * a posição suavizada do Lenis para o progresso da timeline.
     * Não há dupla suavização.
     */
    const proxy = { t: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end,
        pin: true,
        anticipatePin: 1,
        scrub: true,             // mapeia diretamente Lenis → playhead
        invalidateOnRefresh: true,
      },
    })

    // Scrub do vídeo: proxy.t vai 0→1, onUpdate do tween (não do ST) é
    // chamado a cada tick GSAP em ambas as direções — forward e backward.
    tl.to(proxy, {
      t: 1,
      ease: 'none',
      onUpdate() {
        if (duration <= 0) return
        video.currentTime = proxy.t * duration
      },
    }, 0)

    // Texto na mesma timeline — mesma direção, mesmo scrub
    tl.fromTo(title,
      { opacity: 1, scale: 1.06, y: 0  },
      { opacity: 0.75, scale: 1, y: -5, ease: 'none' }, 0.2)
    tl.fromTo(sub,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 8, scale: 1, ease: 'none' }, 0.5)
    tl.fromTo(desc,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: 'none' }, 0.78)
    tl.to(hero, { opacity: 0.95, ease: 'power2.out' }, 0.92)

    ScrollTrigger.refresh()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-preto px-4 py-28"
    >
      {/* VÍDEO — pausado, frame 0 */}
      <video
        ref={videoRef}
        src="/midias/video_bg.mp4"
        poster="/midias/camera_bg.png"
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-[54%_50%] md:object-center"
      />

      {/* GRADIENTE */}
      <div className="absolute inset-0 bg-gradient-to-b from-preto/10 via-preto/50 to-preto" />

      {/* CONTEÚDO */}
      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">

        <p className="section-kicker mb-4 [text-shadow:0_0_24px_rgba(0,0,0,1),0_2px_8px_rgba(0,0,0,0.9)] md:mb-8">
          Sorocaba · SP · Desde 2000
        </p>

        <h1 className="font-serif text-[clamp(2.1rem,8.5vw,2.75rem)] leading-[1.05] md:text-8xl">
          <span ref={titleRef} className="block will-change-[transform,opacity]">
            Fotografia que muda
          </span>
          <span
            ref={subRef}
            className="mt-2 block font-serif italic text-dourado opacity-0 will-change-[transform,opacity] md:mt-4"
          >
            quem você é.
          </span>
        </h1>

        <p
          ref={descRef}
          className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-branco/80 will-change-[transform,opacity] md:mt-10 md:text-lg md:leading-8"
        >
          25 anos formando fotógrafos profissionais com o método mais completo da região.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12">
          <Button href="/contato">Quero a aula gratuita</Button>
          <Button href="/sobre" variant="outline">Conheça a escola</Button>
        </div>
      </div>
      
    </section>
  )
}
