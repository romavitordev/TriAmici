import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Aperture, Heart, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Recursos } from '@/components/sections/Recursos'

export const metadata: Metadata = {
  title: 'Sobre a Escola',
  description: 'A história da Tri Amici Photography Academy: três amigos, 25 anos formando fotógrafos em Sorocaba, e um método próprio que une técnica, olhar e mercado.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre a Escola | Tri Amici',
    description: 'A história dos três amigos que fundaram a Tri Amici Photography Academy em Sorocaba — 25 anos formando fotógrafos.',
    url: 'https://triamici.com.br/sobre'
  }
}

// ────────────────────────────────────────────────────────────────────
// Marcos da história — placeholders honestos para o cliente preencher.
// Edite os anos/descrições conforme a história real da escola.
// ────────────────────────────────────────────────────────────────────
const timeline: { ano: string; titulo: string; texto: string }[] = [
  { ano: '2000', titulo: 'O começo',          texto: 'Três amigos apaixonados por fotografia abrem as portas da escola em Sorocaba.' },
  { ano: '2007', titulo: 'Identidade',         texto: 'Consolidação da identidade Photography Academy e amadurecimento do método próprio.' },
  { ano: '2016', titulo: 'A galeria',          texto: 'Expansão da galeria permanente — espaço para o aluno expor e ser visto.' },
  { ano: '2026', titulo: '25 anos',            texto: 'Um quarto de século formando fotógrafos com método prático, artístico e profissionalizante.' },
]

// ────────────────────────────────────────────────────────────────────
// Valores que sustentam o método.
// ────────────────────────────────────────────────────────────────────
const valores = [
  { Icon: Aperture,  titulo: 'Técnica de verdade',    desc: 'Câmera, luz e edição como ferramentas — não como fim. O domínio liberta o olhar.' },
  { Icon: Heart,     titulo: 'Sensibilidade primeiro', desc: 'A gente forma fotógrafos, não operadores de câmera. O olhar vem antes do equipamento.' },
  { Icon: Sparkles,  titulo: 'Bom humor e oficio',     desc: 'Aprender pode (e deve) ser leve. Estúdio sério, sala de aula generosa.' },
]

export default function SobrePage() {
  return (
    <>
    <section className="bg-preto pb-24 pt-24 md:pt-32">
      <div className="container-page">

        {/* ── HERO ─────────────────────────────────────────── */}
        <ScrollReveal>
          <p className="section-kicker">Sobre a escola</p>
          <h1 className="mt-5 max-w-[22ch] text-balance font-serif text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.01em] text-branco">
            Três amigos, uma paixão por imagem<br className="hidden lg:block" />
            <span className="italic text-dourado/95"> e 25 anos de ofício.</span>
          </h1>
          <p className="mt-8 max-w-xl text-balance text-lg leading-[1.7] text-branco/75 md:text-xl">
            <span className="font-serif italic text-dourado">Tri Amici</span> — em italiano,
            <span className="text-branco/95"> três amigos</span>. É daí que vem o nome da escola — e
            tudo o que a gente faz em Sorocaba desde o ano 2000.
          </p>
        </ScrollReveal>

        {/* ── BLOCO "OS TRÊS AMIGOS" — placeholder estruturado ── */}
        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <ScrollReveal>
            <p className="section-kicker">Os fundadores</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Tudo começou com três amigos.
            </h2>
            <p className="mt-5 text-base leading-8 text-cinza md:text-lg">
              No fim dos anos 90, três amigos apaixonados por fotografia decidiram que Sorocaba
              merecia uma escola de verdade — com técnica sólida, direção artística e mercado.
              Eles compartilhavam câmaras escuras, ideias, viagens e a certeza de que a melhor
              forma de aprender fotografia é praticando, ao lado de gente boa.
            </p>
            <p className="mt-4 text-base leading-8 text-cinza md:text-lg">
              Dessa amizade nasceu a Tri Amici. A escola guarda esse espírito até hoje:
              acolhimento, conversa franca e o gosto por colocar a mão na massa.
            </p>

            {/* Placeholder visual para os nomes/papéis dos 3 fundadores.
                Substituir os 3 itens quando o cliente passar os dados. */}
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <li
                  key={n}
                  className="rounded-xl border border-dashed border-dourado/30 bg-escuro/40 p-5"
                >
                  <p className="font-serif text-3xl text-dourado/60">0{n}</p>
                  <p className="mt-2 text-sm text-branco/85">Fundador(a) {n}</p>
                  <p className="mt-1 text-xs leading-5 text-cinza/70">
                    Nome, função e ano de entrada — a confirmar.
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-borda">
              <Image
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=85"
                alt="Tri Amici — três amigos, uma escola"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto via-preto/40 to-transparent p-6 pt-20">
                <p className="text-xs uppercase tracking-[0.22em] text-dourado/85">Sorocaba, 2000</p>
                <p className="mt-1 font-serif text-lg italic text-branco/90">
                  “Três amigos que decidiram ensinar fotografia do jeito certo.”
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── PROFESSOR PRINCIPAL — placeholder honesto ───── */}
        <div className="mt-24 grid items-center gap-10 rounded-3xl border border-dourado/25 bg-gradient-to-br from-escuro/80 via-preto to-preto p-7 md:mt-32 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:p-12">
          <ScrollReveal>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-dourado/30">
              {/* Substituir pelo retrato real do professor. */}
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85"
                alt="Retrato do professor principal — a substituir"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="section-kicker">Quem ensina</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Um professor, anos de mercado, milhares de horas em sala de aula.
            </h2>
            <p className="mt-5 text-base leading-8 text-cinza md:text-lg">
              À frente do método da Tri Amici está um único professor principal — escolha
              proposital. A escola acredita que a continuidade do olhar e o vínculo direto entre
              aluno e mestre fazem mais diferença do que uma vitrine de nomes.
            </p>

            <blockquote className="mt-7 border-l-2 border-dourado/60 pl-6 font-serif text-xl italic leading-relaxed text-branco/85 md:text-2xl">
              “Não ensino a fotografar. Ensino a enxergar — depois a câmera só obedece.”
            </blockquote>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-dourado/80">
              — Nome do professor (a confirmar)
            </p>

            <p className="mt-7 text-sm leading-7 text-cinza/80">
              <strong className="text-branco/85">Bio detalhada e formação:</strong> a serem
              preenchidas conforme o material enviado pela escola.
            </p>
          </ScrollReveal>
        </div>

        {/* ── VALORES / MÉTODO ───────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <ScrollReveal>
            <p className="section-kicker">O método em três palavras</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
              Técnica essencial, sensibilidade artística e prática de mercado.
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {valores.map(({ Icon, titulo, desc }, i) => (
              <ScrollReveal key={titulo} delay={i * 0.08}>
                <Card className="h-full">
                  <div className="icon-spring flex h-11 w-11 items-center justify-center rounded-xl border border-dourado/30 bg-dourado/10 text-dourado">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-white">{titulo}</h3>
                  <p className="mt-3 text-sm leading-7 text-cinza">{desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── LINHA DO TEMPO ─────────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <ScrollReveal>
            <p className="section-kicker">Linha do tempo</p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight md:text-4xl">
              Vinte e cinco anos em quatro marcos.
            </h2>
          </ScrollReveal>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map(({ ano, titulo, texto }, i) => (
              <ScrollReveal key={ano} delay={i * 0.06}>
                <li className="lift-card relative h-full border border-borda bg-escuro/70 p-6">
                  <span className="font-serif text-4xl text-dourado">{ano}</span>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-branco/85">
                    {titulo}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-cinza">{texto}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
          <p className="mt-6 text-xs text-cinza/60">
            * Marcos a serem confirmados com a escola — ajustar datas e descrições.
          </p>
        </div>

        {/* ── A CASA (foco narrativo; info prática em /contato) ── */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] md:mt-32">
          <ScrollReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-borda">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                alt="Tri Amici House — a casa onde tudo acontece"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="section-kicker">A casa</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Tri Amici House — sala de aula, estúdio e galeria.
            </h2>
            <p className="mt-5 text-base leading-8 text-cinza md:text-lg">
              A nossa casa em Sorocaba é onde o método ganha vida: estúdio profissional para
              prática real, sala de aula generosa para conversa franca e uma galeria permanente
              que recebe o trabalho de quem passou por aqui. Cada parede conta uma turma.
            </p>
            <div className="mt-7">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-dourado underline-offset-4 hover:underline"
              >
                Endereço e como chegar →
              </Link>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>

    <Recursos
      titulo="Continue conhecendo a Tri Amici."
      descricao="Leve o e-book da escola e explore o acervo com mais de 1.600 fotos feitas pelos alunos."
    />
    </>
  )
}
