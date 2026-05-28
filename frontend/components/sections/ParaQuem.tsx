'use client'

import { useRef } from 'react'
import { Aperture, Camera, Copyright, Images, Monitor, Palette, ShieldCheck, Sparkles, Wallet, Wand2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Card } from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  ['Fotografar em estudio profissional', Camera],
  ['Editar com maestria', Wand2],
  ['Usar DSLR do zero ao avancado', Aperture],
  ['Fazer foto-documentarios', Images],
  ['Criar books profissionais', Sparkles],
  ['Cobrar pelo seu trabalho', Wallet],
  ['Proteger e expor seu trabalho', ShieldCheck],
  ['Direitos autorais e lei de imagem', Copyright],
  ['Calibracao de monitor para edicao', Monitor],
  ['Mergulhar no mundo da arte', Palette]
] as const

export function ParaQuem() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const track = trackRef.current
    if (!track) return
    const totalScroll = track.scrollWidth - window.innerWidth + 120
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-escuro py-24 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Para quem e este curso</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Uma experiencia de vida inesquecivel.</h2>
          <p className="mt-6 text-lg leading-8 text-cinza">Para quem quer mergulhar no mundo da fotografia relevante e da arte que importa. Para quem quer uma experiencia que mudara sua postura pessoal para sempre.</p>
        </div>
        <div ref={trackRef} className="grid gap-4 md:flex md:w-max">
          {skills.map(([label, Icon]) => (
            <Card key={label} className="md:w-72">
              <Icon className="mb-8 text-dourado" />
              <p className="text-lg leading-7">{label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
