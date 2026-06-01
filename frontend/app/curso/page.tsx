'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Camera, Eye, TrendingUp,
  Clock, Calendar, MapPin, Users, Award, Sparkles,
  CheckCircle2, XCircle, MessageCircle, ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Recursos } from '@/components/sections/Recursos'

// ────────────────────────────────────────────────────────────────────
// CURRÍCULO em 3 FASES (vs lista plana de 6 módulos)
// ────────────────────────────────────────────────────────────────────
const fases: { fase: string; titulo: string; resumo: string; modulos: { num: string; titulo: string; desc: string }[] }[] = [
  {
    fase: 'Fase 01',
    titulo: 'Fundação',
    resumo: 'Você sai operando a câmera com intenção — qualquer luz, qualquer situação.',
    modulos: [
      { num: '01', titulo: 'Câmera DSLR do zero ao avançado',  desc: 'Triângulo da exposição, modos manuais, lentes e configurações para fotografar com intenção em qualquer situação de luz.' },
      { num: '02', titulo: 'Luz natural e estúdio profissional', desc: 'Ler e modelar a luz — do sol da tarde ao flash de estúdio com difusores, rebatedores e modificadores de luz.' },
    ],
  },
  {
    fase: 'Fase 02',
    titulo: 'Linguagem',
    resumo: 'Você passa de tirar fotos a contar histórias com elas.',
    modulos: [
      { num: '03', titulo: 'Direção de retrato e books', desc: 'Direção de olhar, postura, expressão e construção de narrativa visual em ensaios fotográficos de retrato.' },
      { num: '04', titulo: 'Fotodocumentário e narrativa visual', desc: 'Contar histórias com imagens: sequência, edição de galeria, fotojornalismo e a linguagem do ensaio documental.' },
      { num: '05', titulo: 'Edição, fluxo e calibração de monitor', desc: 'Lightroom, Photoshop, exportação, gestão de arquivos e colorimetria para uma entrega profissional e consistente.' },
    ],
  },
  {
    fase: 'Fase 03',
    titulo: 'Mercado',
    resumo: 'Você termina com portfólio e clareza pra cobrar pelo seu olhar.',
    modulos: [
      { num: '06', titulo: 'Mercado, precificação e direito autoral', desc: 'Contratos, valores de mercado, lei de imagem, gestão de clientes e como montar o primeiro portfólio profissional.' },
    ],
  },
]

const pilares = [
  { Icon: Camera,       titulo: 'Técnica',  desc: 'Câmera, luz, composição e edição como ferramentas — não como fins. O domínio técnico liberta o olhar criativo.' },
  { Icon: Eye,          titulo: 'Olhar',    desc: 'Repertório visual, história da fotografia, leitura crítica de imagens e desenvolvimento de uma voz autoral única.' },
  { Icon: TrendingUp,   titulo: 'Mercado',  desc: 'Precificação, portfólio, contratos, direito autoral e como transformar técnica e olhar em renda consistente.' },
]

const logistica: { Icon: typeof Clock; label: string; value: string }[] = [
  { Icon: Clock,    label: 'Duração',     value: '6 meses' },
  { Icon: Calendar, label: 'Encontros',   value: '2× por semana' },
  { Icon: MapPin,   label: 'Formato',     value: 'Presencial · Sorocaba/SP' },
  { Icon: Users,    label: 'Turmas',      value: 'Máx. 12 alunos' },
  { Icon: Award,    label: 'Certificado', value: 'Incluso' },
  { Icon: Sparkles, label: 'Material',    value: 'Apostila + e-book' },
]

// FAQ
const faq: { q: string; a: string }[] = [
  { q: 'Preciso ter câmera própria?',
    a: 'Não para começar. Recomendamos uma DSLR ou mirrorless para tirar o máximo do curso, mas a escola tem equipamento de estúdio e orientamos a melhor compra conforme seu objetivo e orçamento.' },
  { q: 'Atende quem nunca pegou uma câmera?',
    a: 'Sim — a Fase 1 (Fundação) começa do zero absoluto. A maior parte dos alunos chega assim e termina cobrando pelos próprios trabalhos.' },
  { q: 'Quanto tempo dura?',
    a: '6 meses, com encontros 2× por semana. Carga horária total e cronograma são entregues com a brochura.' },
  { q: 'O curso tem certificado?',
    a: 'Sim. Certificado de conclusão Tri Amici Photography Academy ao final dos 6 módulos.' },
  { q: 'Qual é o investimento?',
    a: 'Os valores são apresentados na conversa de matrícula — preferimos te explicar o que está incluso (aulas, estúdio, apostila, certificado, acesso à galeria) antes de falar de número. Chame no WhatsApp para saber.' },
  { q: 'Tem aula de teste antes de matricular?',
    a: 'Sim. A Aula Zero é gratuita e sem compromisso — você vive uma aula real na escola para decidir com base na experiência.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-borda">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-dourado"
        aria-expanded={open}
      >
        <span className="font-serif text-lg leading-snug text-branco md:text-xl">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-dourado transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid overflow-hidden text-sm leading-7 text-cinza transition-[grid-template-rows,opacity] duration-300 ${open ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="min-h-0">{a}</p>
      </div>
    </li>
  )
}

const WHATSAPP_LINK =
  'https://wa.me/5515981127508?text=' +
  encodeURIComponent('Olá! Vim pela página do curso e gostaria de saber o investimento e a próxima turma.')

export default function CursoPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-preto pb-20 pt-32">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Curso profissional</p>
            <h1 className="mt-5 max-w-[20ch] text-balance font-serif text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.01em]">
              Sem técnicas supérfluas.<br className="hidden md:block" />
              <span className="italic text-dourado/95"> Essencialmente prático.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-balance text-base leading-8 text-branco/75 md:text-lg">
              Em <strong className="text-branco">6 meses</strong>, você sai com domínio técnico,
              olhar autoral e portfólio para cobrar pelo seu trabalho. Sem pressa, sem firula —
              direto ao que importa.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-dourado">
              {['Profissional', 'Intenso', 'Divertido', 'Do zero ao mercado'].map((b) => (
                <span key={b} className="border border-dourado/40 px-4 py-2">{b}</span>
              ))}
            </div>
          </ScrollReveal>

          {/* Prova social compacta */}
          <ScrollReveal delay={0.18}>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-borda pt-8">
              {[
                ['25', 'anos de escola'],
                ['1.600+', 'fotos publicadas'],
                ['12', 'alunos por turma'],
              ].map(([n, l]) => (
                <div key={l as string}>
                  <dt className="font-serif text-3xl text-dourado md:text-4xl">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-cinza">{l}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* ── IMAGEM ESTÚDIO ────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[360px] overflow-hidden md:h-[68vh]">
        <Image
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1800&q=85"
          alt="Aulas práticas em estúdio real Tri Amici"
          fill
          sizes="100vw"
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

      {/* ── GRADE CURRICULAR — 3 FASES ────────────────────── */}
      <section className="bg-preto py-24">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Grade curricular</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
              6 módulos em 3 fases — do olhar ao mercado.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-cinza">
              Cada fase tem um objetivo claro e leva você a um patamar concreto antes da próxima.
            </p>
          </ScrollReveal>

          <div className="mt-14 space-y-12">
            {fases.map((f, fi) => (
              <ScrollReveal key={f.fase} delay={fi * 0.06}>
                <div>
                  <div className="grid items-start gap-3 border-b border-dourado/25 pb-5 md:grid-cols-[10rem_1fr] md:gap-10">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-dourado/70">{f.fase}</p>
                      <h3 className="mt-1 font-serif text-3xl text-dourado md:text-4xl">{f.titulo}</h3>
                    </div>
                    <p className="text-base leading-8 text-branco/80 md:text-lg">{f.resumo}</p>
                  </div>

                  <ul className="mt-2">
                    {f.modulos.map((mod) => (
                      <li
                        key={mod.num}
                        className="group grid grid-cols-[2.5rem_1fr] gap-5 border-b border-borda py-6 transition-colors hover:bg-escuro/30 md:grid-cols-[4rem_1fr] md:gap-10 md:py-7"
                      >
                        <span className="pt-1 font-serif text-xl text-dourado/50 transition-colors duration-300 group-hover:text-dourado md:text-2xl">
                          {mod.num}
                        </span>
                        <div>
                          <h4 className="font-serif text-lg leading-snug md:text-2xl">{mod.titulo}</h4>
                          <p className="mt-2 text-sm leading-7 text-cinza">{mod.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── O MÉTODO ──────────────────────────────────────── */}
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

      {/* ── MATERIAIS ─────────────────────────────────────── */}
      <Recursos
        titulo="Material do curso e resultados reais."
        descricao="Baixe o e-book com o conteúdo completo e veja o que os alunos produziram durante as aulas."
      />

      {/* ── PARA QUEM É (+ NÃO É PRA VOCÊ SE) ─────────────── */}
      <section className="bg-preto py-24">
        <div className="container-page">
          <ScrollReveal>
            <p className="section-kicker">Para quem é</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-5xl">
              O curso é feito para você?
            </h2>
          </ScrollReveal>

          {/* Hobby x Profissão */}
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
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-dourado" />
                      <span>{item}</span>
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
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-dourado/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* NÃO é pra você se… (honestidade vende) */}
          <ScrollReveal delay={0.18}>
            <div className="mt-16 rounded-2xl border border-borda bg-escuro/40 p-7 md:p-10">
              <p className="section-kicker">Honestidade</p>
              <h3 className="mt-3 font-serif text-2xl leading-snug text-branco/90 md:text-3xl">
                Talvez o curso <em className="text-dourado/90">não</em> seja pra você se…
              </h3>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-cinza md:grid-cols-2">
                {[
                  'Procura um curso 100% online ou em vídeo (o nosso é presencial).',
                  'Quer aprender só edição/Lightroom sem técnica de câmera.',
                  'Não tem disponibilidade para aulas práticas em estúdio.',
                  'Espera virar profissional em duas semanas — aqui leva 6 meses.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle size={16} className="mt-0.5 shrink-0 text-cinza/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INFO RÁPIDA + INVESTIMENTO ────────────────────── */}
      <section className="bg-[#0c0c0c] py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <ScrollReveal>
              <div>
                <p className="section-kicker">Resumo prático</p>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl">Tudo que você precisa saber.</h2>
                <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-borda sm:grid-cols-2 lg:grid-cols-3">
                  {logistica.map(({ Icon, label, value }) => (
                    <li key={label} className="group flex items-start gap-4 bg-[#0c0c0c] p-5">
                      <div className="icon-spring mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dourado/25 bg-dourado/10 text-dourado">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-cinza">{label}</p>
                        <p className="mt-1 font-serif text-lg text-branco">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-cinza/65">
                  Horários e próxima turma — a confirmar com a secretaria da escola.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="lift-card relative h-full border border-dourado/40 bg-gradient-to-br from-dourado/[0.08] via-escuro/60 to-preto p-7 md:p-9">
                <p className="section-kicker">Investimento</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-branco md:text-4xl">
                  Conversamos sobre valor por WhatsApp.
                </h3>
                <p className="mt-5 text-sm leading-7 text-cinza">
                  Preferimos te apresentar o que está incluso (aulas presenciais, estúdio, apostila,
                  certificado, acesso à galeria) antes de falar de número — e ajustar a melhor
                  forma de pagamento para o seu caso.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span className="relative z-[1] flex items-center gap-2">
                      <MessageCircle size={16} />
                      Consultar pelo WhatsApp
                    </span>
                  </a>
                  <Button href="/aula-gratuita" variant="outline">Aula gratuita primeiro</Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="bg-preto py-24">
        <div className="container-page max-w-3xl">
          <ScrollReveal>
            <p className="section-kicker">Perguntas frequentes</p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">Antes de você perguntar.</h2>
          </ScrollReveal>

          <ul className="mt-10 border-t border-borda">
            {faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-preto">
        <Image
          src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1800&q=85"
          alt="Venha conhecer a escola numa aula gratuita"
          fill
          sizes="100vw"
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
              <Button href="/aula-gratuita">Peça seu convite agora</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
