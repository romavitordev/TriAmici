import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function CtaFinal() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-preto py-28">
      <Image src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1800&q=85" alt="Aula de fotografia" fill className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-preto/55" />
      <div className="container-page relative z-10 flex min-h-[48vh] flex-col items-start justify-center">
        <p className="section-kicker">Aula gratuita</p>
        <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Venha conhecer a escola numa aula gratuita. Sem compromisso.</h2>
        <div className="mt-9">
          <Button href="/contato">Peca seu convite agora</Button>
        </div>
      </div>
    </section>
  )
}
