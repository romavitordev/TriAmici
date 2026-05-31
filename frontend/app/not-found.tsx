import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-preto px-4 py-32">
      <div className="container-page text-center">
        <p className="section-kicker">Erro 404</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">
          Página não encontrada.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-cinza">
          O endereço que você procurou não existe ou foi movido. Que tal voltar ao início?
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/">Voltar ao início</Button>
          <Link href="/contato" className="text-sm uppercase tracking-[0.18em] text-dourado underline-offset-4 hover:underline">
            Falar com a escola
          </Link>
        </div>
      </div>
    </section>
  )
}
