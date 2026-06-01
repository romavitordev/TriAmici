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
        <h2 className="mt-5 max-w-[20ch] text-balance font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] text-white">
          Venha conhecer a escola numa <span className="italic text-dourado/95">aula gratuita.</span>
        </h2>
        <p className="mt-5 max-w-md text-balance text-base leading-7 text-white/65">
          Sem compromisso. Traga sua câmera ou só a curiosidade — a gente apresenta o método e
          a casa pra você decidir com calma.
        </p>
        <div className="mt-9">
          <Button href="/aula-gratuita">Peça seu convite agora</Button>
        </div>
      </div>
    </section>
  )
}
