import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Send } from 'lucide-react'

export function Footer() {
  const ano = new Date().getFullYear()
  return (
    <footer className="border-t border-dourado/30 bg-preto pt-14 pb-24 md:pb-14">
      <div className="container-page grid gap-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <div className="font-serif text-3xl tracking-[0.12em] text-dourado">TRI AMICI</div>
          <div className="mt-1 text-[0.55rem] tracking-[0.3em] text-branco/60">PHOTOGRAPHY ACADEMY</div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-cinza">
            25 anos formando fotógrafos profissionais com arte, técnica e experiência real em Sorocaba.
          </p>
        </div>

        <nav className="grid gap-3 text-sm uppercase tracking-[0.16em] text-branco/75">
          <Link href="/sobre" className="hover:text-dourado">Sobre</Link>
          <Link href="/curso" className="hover:text-dourado">Curso</Link>
          <Link href="/contato" className="hover:text-dourado">Contato</Link>
          <Link href="/aula-gratuita" className="text-dourado underline-offset-4 hover:underline">
            Aula gratuita
          </Link>
        </nav>

        <div className="text-sm leading-7 text-cinza">
          <p>Rua Amapá 112, Vila Augusto, Sorocaba/SP</p>
          <p>(15) 3321-3365 · (15) 9 8112-7508</p>
          <p>escola@triamici.com.br</p>
          <div className="mt-5 flex gap-4 text-dourado">
            <a aria-label="WhatsApp" href="https://wa.me/5515981127508" target="_blank" rel="noopener noreferrer" className="transition hover:scale-110">
              <MessageCircle size={20} />
            </a>
            <a aria-label="Instagram" href="https://www.instagram.com/triamiciacademy/" target="_blank" rel="noopener noreferrer" className="transition hover:scale-110">
              <Instagram size={20} />
            </a>
            <a aria-label="Facebook" href="#" className="transition hover:scale-110">
              <Facebook size={20} />
            </a>
            <a aria-label="Flickr" href="https://www.flickr.com/groups/tri_amici_students/pool/" target="_blank" rel="noopener noreferrer" className="transition hover:scale-110">
              <Send size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-page mt-12 flex flex-col gap-2 border-t border-borda pt-6 text-xs text-cinza/65 md:flex-row md:items-center md:justify-between">
        <p>© 2000–{ano} Tri Amici Photography Academy · Sorocaba/SP</p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
