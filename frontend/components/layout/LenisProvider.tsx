'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Garante scroll no topo antes do Lenis e ScrollTrigger calcularem posições.
    // Sem isso, scroll restaurado pelo browser faz a Hero iniciar no meio do vídeo.
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sincroniza Lenis com ScrollTrigger — necessário para o scrubbing de vídeo
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
