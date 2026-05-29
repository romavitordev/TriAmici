import Link from 'next/link'
import { Facebook, Instagram, MessageCircle, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-dourado/30 bg-preto py-14">
      <div className="container-page grid gap-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <div className="font-serif text-3xl tracking-[0.12em] text-dourado">TRI AMICI</div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cinza">25 anos formando fotografos profissionais com arte, tecnica e experiencia real em Sorocaba.</p>
        </div>
        <nav className="grid gap-3 text-sm uppercase tracking-[0.16em] text-branco/75">
          <Link href="/sobre">Sobre</Link>
          <Link href="/curso">Curso</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        <div className="text-sm leading-7 text-cinza">
          <p>Rua Amapa 112, Vila Augusto, Sorocaba, SP</p>
          <p>(15) 3321-3365 · (15) 98112-7508</p>
          <p>escola@triamici.com.br</p>
          <div className="mt-5 flex gap-3 text-dourado">
            <a aria-label="WhatsApp" href="https://wa.me/5515981127508"><MessageCircle /></a>
            <a aria-label="Instagram" href="#"><Instagram /></a>
            <a aria-label="Facebook" href="#"><Facebook /></a>
            <a aria-label="Flickr" href="https://www.flickr.com/groups/tri_amici_students/pool/"><Send /></a>
          </div>
        </div>
      </div>
      <div className="container-page mt-10 text-xs text-cinza">© 2007-2026 Sterling Cooper Advertising for Tri Amici Photography Academy</div>
    </footer>
  )
}
