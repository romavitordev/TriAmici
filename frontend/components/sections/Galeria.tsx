'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { apiFetch } from '@/lib/api'

type Foto = { id: string; url: string; legenda?: string; aluno?: string }

const fallback: Foto[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', legenda: 'Estudo de luz', aluno: 'Tri Amici' },
  { id: '2', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', legenda: 'Documentario', aluno: 'Turma 2024' },
  { id: '3', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80', legenda: 'Retrato', aluno: 'Ana Carolina' },
  { id: '4', url: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=900&q=80', legenda: 'Autoral', aluno: 'Bianca Rocha' },
  { id: '5', url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80', legenda: 'Portfolio', aluno: 'Marcelo Dias' },
  { id: '6', url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=900&q=80', legenda: 'Movimento', aluno: 'Turma 2025' }
]

export function Galeria() {
  const [fotos, setFotos] = useState<Foto[]>(fallback)

  useEffect(() => {
    apiFetch<Foto[]>('/api/galeria').then(setFotos).catch(() => undefined)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.2 })
    document.querySelectorAll('.reveal-photo').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-preto py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Galeria</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">1.600 fotos de nossos alunos.</h2>
          </div>
          <Button href="https://www.flickr.com/groups/tri_amici_students/pool/" variant="outline">
            Ver galeria no Flickr
          </Button>
        </div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {fotos.map((foto, index) => (
            <figure key={foto.id} className={`reveal-photo reveal-photo--${index + 1} group mb-5 break-inside-avoid bg-escuro`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={foto.url} alt={foto.legenda ?? 'Foto de aluno Tri Amici'} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 z-10 translate-y-4 bg-gradient-to-t from-black to-transparent p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-sm text-dourado">{foto.aluno}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-branco/70">{foto.legenda}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
