import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function CtaFinal() {
  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-preto">
      <Image
        src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1800&q=85"
        alt="Aula de fotografia"
        fill
        className="object-cover opacity-30"
      />
      {/* Gradiente direcional — escurece mais na área do texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-preto/80 via-preto/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-preto/60 via-transparent to-transparent" />

      <div className="container-page relative z-10 flex min-h-[65vh] flex-col items-center justify-center py-24 pb-24 text-center md:items-start md:text-left">
        <p className="section-kicker">Aula gratuita</p>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Venha conhecer a escola numa aula gratuita.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-white/55">
          Sem compromisso. Traga sua câmera ou venha só com curiosidade.
        </p>
        <div className="mt-9">
          <Button href="/contato">Peça seu convite agora</Button>
        </div>
      </div>
    </section>
  )
}
