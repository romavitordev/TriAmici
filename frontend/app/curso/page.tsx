import type { Metadata } from 'next'
import Image from 'next/image'
import { Camera, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Curso Profissional de Fotografia',
  description: 'Curso profissional de fotografia Tri Amici: prático, intenso, divertido e sem conhecimento prévio necessário.'
}

const modulos = [
  {
    num: '01',
    titulo: 'Câmera DSLR do zero ao avançado',
    desc: 'Domine o triângulo da exposição, modos manuais, lentes e configurações para fotografar com intenção em qualquer situação de luz.',
  },
  {
    num: '02',
    titulo: 'Luz natural e estúdio profissional',
    desc: 'Aprenda a ler e modelar a luz — do sol da tarde ao flash de estúdio com difusores, rebatedores e modificadores de luz.',
  },
  {
    num: '03',
    titulo: 'Direção de retrato e books',
    desc: 'Técnicas de direção de olhar, postura, expressão e criação de narrativa visual em ensaios fotográficos de retrato.',
  },
  {
    num: '04',
    titulo: 'Fotodocumentário e narrativa visual',
    desc: 'Contar histórias com imagens: sequência, edição de galeria, fotojornalismo e a linguagem do ensaio documental.',
  },
  {
    num: '05',
    titulo: 'Edição, fluxo e calibração de monitor',
    desc: 'Lightroom, Photoshop, exportação, gestão de arquivos e colorimetria para uma entrega profissional e consistente.',
  },
  {
    num: '06',
    titulo: 'Mercado, precificação e direito autoral',
    desc: 'Contratos, valores de mercado, lei de imagem, gestão de clientes e como montar o primeiro portfólio profissional.',
  },
]

const pilares = [
  {
    Icon: Camera,
    titulo: 'Técnica',
    desc: 'Câmera, luz, composição e edição como ferramentas — não como fins. O domínio técnico liberta o olhar criativo.',
  },
  {
    Icon: Eye,
    titulo: 'Olhar',
    desc: 'Repertório visual, história da fotografia, leitura crítica de imagens e o desenvolvimento de uma voz autoral única.',
  },
  {
    Icon: TrendingUp,
    titulo: 'Mercado',
    desc: 'Precificação, portfólio, contratos, direito autoral e como transformar técnica e olhar em renda consistente.',
  },
]

const logistica = [
  ['Duração', '6 meses'],
  ['Aulas', '2× por semana'],
  ['Formato', 'Presencial'],
  ['Turmas', 'Máx. 12 alunos'],
  ['Local', 'Sorocaba · SP'],
  ['Certificado', 'Incluso'],
]

export default function CursoPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-preto pb-20 pt-32">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Curso profissional</p>
            <h1 className="mt-4 max-w-5xl font-serif text-4xl leading-tight md:text-5xl lg:text-7xl">
              Sem técnicas supérfluas. Essencialmente prático.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cinza">
              Intenso, divertido e desenhado para quem parte do zero ou quer transformar hobby em trabalho consistente.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-dourado">
              {['Profissional', 'Intenso', 'Divertido', 'Zero conhecimento prévio'].map((b) => (
                <span key={b} className="border border-dourado/40 px-4 py-2">{b}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── IMAGEM ESTÚDIO ───────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[360px] overflow-hidden md:h-[68vh]">
        <Image
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1800&q=85"
          alt="Aulas práticas em estúdio real Tri Amici"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-preto/85 via-preto/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-preto/70 via-transparent to-transparent" />
        <div className="container-page relative z-10 flex h-full flex-col justify-end pb-14">
          <ScrollReveal>
            <p className="section-kicker">Na prática</p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-white md:text-5xl">
              Aulas práticas em estúdio real.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              Cada módulo combina teoria aplicada com exercícios reais dentro do nosso estúdio profissional em Sorocaba.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GRADE CURRICULAR ─────────────────────────────────── */}
      <section className="bg-preto py-24">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Grade curricular</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">6 módulos. Do olhar ao mercado.</h2>
          </ScrollReveal>
          <div className="mt-14 border-t border-borda">
            {modulos.map((mod, i) => (
              <ScrollReveal key={mod.num} delay={i * 0.05}>
                <div className="group grid grid-cols-[3rem_1fr] gap-6 border-b border-borda py-7 transition-colors hover:bg-escuro/30 md:grid-cols-[5rem_1fr] md:gap-10 md:py-9">
                  <span className="pt-1 font-serif text-xl text-dourado/50 transition-colors duration-300 group-hover:text-dourado md:text-2xl">{mod.num}</span>
                  <div>
                    <h3 className="font-serif text-lg leading-snug md:text-2xl">{mod.titulo}</h3>
                    <p className="mt-2 text-sm leading-7 text-cinza">{mod.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── O MÉTODO ─────────────────────────────────────────── */}
      <section className="bg-[#0c0c0c] py-24">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">O método</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
              Três pilares que transformam olhar em ofício.
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid border border-borda md:grid-cols-3">
            {pilares.map(({ Icon, titulo, desc }, i) => (
              <ScrollReveal key={titulo} delay={i * 0.1}>
                <div className={`group p-8 transition-colors duration-300 hover:bg-white/[0.02] md:p-10 ${i < 2 ? 'border-b border-borda md:border-b-0 md:border-r' : ''}`}>
                  <Icon size={28} className="icon-spring text-dourado" strokeWidth={1.5} />
                  <h3 className="mt-7 font-serif text-3xl text-dourado">{titulo}</h3>
                  <p className="mt-4 text-sm leading-7 text-cinza">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUEM É ──────────────────────────────────────── */}
      <section className="bg-preto py-24">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Para quem é</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">O curso é feito para você?</h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-0">
            <ScrollReveal delay={0.05}>
              <div className="relative border-l border-dourado pl-8 md:pr-14">
                <p className="section-kicker">Hobby</p>
                <h3 className="mt-4 font-serif text-3xl leading-snug md:text-4xl">
                  Fotografar melhor a própria vida.
                </h3>
                <p className="mt-5 leading-7 text-cinza">
                  Domine luz, composição e câmera para criar imagens mais bonitas, conscientes e memoráveis — sem precisar virar profissional.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-cinza">
                  {[
                    'Viagens e cotidiano com mais intenção',
                    'Retratos da família com técnica real',
                    'Construir um olhar próprio e consistente',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dourado" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative border-l border-dourado/30 pl-8">
                <p className="section-kicker">Profissão</p>
                <h3 className="mt-4 font-serif text-3xl leading-snug md:text-4xl">
                  Cobrar pelo seu olhar.
                </h3>
                <p className="mt-5 leading-7 text-cinza">
                  Construa portfólio, entenda mercado, direitos, entrega e precificação para atuar profissionalmente desde o primeiro trabalho.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-cinza">
                  {[
                    'Portfólio pronto ao final do curso',
                    'Precificação, contrato e direito autoral',
                    'Primeiros clientes antes de se formar',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dourado/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── INFO RÁPIDA ──────────────────────────────────────── */}
      <section className="bg-[#0c0c0c] py-16">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-px bg-borda md:grid-cols-6">
            {logistica.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-2 bg-[#0c0c0c] px-6 py-8">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-cinza">{label}</span>
                <span className="font-serif text-xl text-branco">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-preto">
        <Image
          src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1800&q=85"
          alt="Venha conhecer a escola numa aula gratuita"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-preto/80 via-preto/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-preto/60 via-transparent to-transparent" />
        <div className="container-page relative z-10 flex min-h-[60vh] flex-col items-start justify-center py-24 pb-16 md:pb-20">
          <ScrollReveal>
            <p className="section-kicker">Aula gratuita</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Venha conhecer a escola numa aula gratuita.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/55">
              Sem compromisso. Traga sua câmera ou venha só com curiosidade.
            </p>
            <div className="mt-9">
              <Button href="/contato">Peça seu convite agora</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
