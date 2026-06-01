'use client'

import { Mail, MapPin, MessageCircle, Phone, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const WHATSAPP_NUM = '5515981127508'
const WHATSAPP_LABEL = '(15) 9 8112-7508'
const TEL_RAW = '+551533213365'
const TEL_LABEL = '(15) 3321-3365'
const EMAIL = 'escola@triamici.com.br'
const ENDERECO = 'Rua Amapá, 112 — Vila Augusto, Sorocaba/SP'
const CEP = '18040-050'
const MAPS_QUERY = 'Rua Amapá 112 Vila Augusto Sorocaba SP'
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`
const MAPS_OPEN = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`
const INSTAGRAM_URL = 'https://www.instagram.com/triamiciacademy/'

const WHATSAPP_MSG =
  'Olá, Tri Amici! Cheguei pelo site e gostaria de conversar sobre o curso de fotografia.'
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(WHATSAPP_MSG)}`

type ChannelCardProps = {
  href: string
  Icon: typeof Phone
  kicker: string
  primary: string
  secondary: string
  cta: string
  external?: boolean
}

function ChannelCard({ href, Icon, kicker, primary, secondary, cta, external }: ChannelCardProps) {
  const rel = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {}
  return (
    <a
      href={href}
      {...rel}
      className="lift-card group flex h-full flex-col gap-5 border border-borda bg-escuro/80 p-7 md:p-8"
    >
      <div className="icon-spring flex h-12 w-12 items-center justify-center rounded-xl border border-dourado/30 bg-dourado/10 text-dourado">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-dourado/80">{kicker}</p>
        <p className="mt-2 font-serif text-2xl text-white">{primary}</p>
        <p className="mt-2 text-sm leading-6 text-cinza">{secondary}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-dourado transition group-hover:translate-x-0.5">
        {cta} →
      </span>
    </a>
  )
}

export default function ContatoPage() {
  return (
    <section className="bg-preto pb-24 pt-24 md:pt-32">
      <div className="container-page">

        {/* ── HEADER ────────────────────────────────── */}
        <ScrollReveal>
          <p className="section-kicker">Fale com a escola</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl lg:text-7xl">
            A Tri Amici é uma casa — entre quando quiser.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-cinza md:text-lg">
            Dúvidas sobre o curso, valores ou turmas? A gente prefere conversar de verdade.
            Escolha o canal mais confortável — respondemos rápido.
          </p>
        </ScrollReveal>

        {/* ── 3 CANAIS PRINCIPAIS ───────────────────── */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <ScrollReveal delay={0.05}>
            <ChannelCard
              href={WHATSAPP_HREF}
              Icon={MessageCircle}
              kicker="O jeito mais rápido"
              primary="WhatsApp"
              secondary={WHATSAPP_LABEL}
              cta="Conversar agora"
              external
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ChannelCard
              href={`tel:${TEL_RAW}`}
              Icon={Phone}
              kicker="Prefere ligar?"
              primary="Telefone"
              secondary={TEL_LABEL}
              cta="Ligar para a escola"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <ChannelCard
              href={`mailto:${EMAIL}`}
              Icon={Mail}
              kicker="Mais formal"
              primary="E-mail"
              secondary={EMAIL}
              cta="Enviar e-mail"
            />
          </ScrollReveal>
        </div>

        {/* ── CTA PARA O FUNIL DE ADMISSÃO ──────────── */}
        <ScrollReveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-dourado/35 bg-gradient-to-r from-dourado/[0.12] via-dourado/[0.06] to-transparent p-7 md:flex md:items-center md:justify-between md:gap-6 md:p-9">
            <div className="max-w-2xl">
              <p className="section-kicker">Aula experimental</p>
              <h2 className="mt-3 max-w-[22ch] text-balance font-serif text-2xl leading-[1.15] text-white md:text-3xl">
                Já quer começar? <span className="italic text-dourado/95">Garanta seu convite para a Aula Zero.</span>
              </h2>
              <p className="mt-3 text-sm leading-7 text-cinza md:text-base">
                Pré-inscrição rápida — sem compromisso financeiro, com vestibular de sensibilidade
                para a gente já te conhecer.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button href="/aula-gratuita">Quero a aula gratuita</Button>
            </div>
          </div>
        </ScrollReveal>

        {/* ── TRI AMICI HOUSE (endereço + mapa) ─────── */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <ScrollReveal>
            <p className="section-kicker">Tri Amici House</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Venha conhecer a escola.
            </h2>
            <p className="mt-5 text-base leading-8 text-cinza">
              A nossa casa em Sorocaba é estúdio profissional, sala de aula e galeria permanente —
              tudo num só lugar. Agende uma visita pelo WhatsApp.
            </p>

            <div className="mt-8 space-y-5">
              <div className="group flex items-start gap-4">
                <div className="icon-spring mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dourado/30 bg-dourado/10 text-dourado">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-dourado/75">Endereço</p>
                  <p className="mt-1 text-base text-branco">{ENDERECO}</p>
                  <p className="text-sm text-cinza">CEP {CEP}</p>
                  <a
                    href={MAPS_OPEN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-dourado underline-offset-4 hover:underline"
                  >
                    Abrir no Google Maps →
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="icon-spring mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dourado/30 bg-dourado/10 text-dourado">
                  <Instagram className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-dourado/75">Instagram</p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-base text-branco hover:text-dourado"
                  >
                    @triamiciacademy
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-borda">
              <iframe
                title="Mapa Tri Amici House"
                src={MAPS_EMBED}
                loading="lazy"
                className="h-[420px] w-full border-0 grayscale transition duration-500 hover:grayscale-0 md:h-[500px]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
