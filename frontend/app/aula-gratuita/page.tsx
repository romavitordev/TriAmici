'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { postPreInscricao } from '@/lib/api'
import { preInscricaoSchema, type PreInscricaoForm } from '@/lib/validations'

const FAIXAS: { value: string; label: string }[] = [
  { value: '18-24', label: '18-24 anos' },
  { value: '25-30', label: '25-30 anos' },
  { value: '31-40', label: '31-40 anos' },
  { value: '41-50', label: '41-50 anos' },
  { value: '51-60', label: '51-60 anos' },
  { value: '61-70', label: '61-70 anos' },
  { value: '71-80', label: '71-80 anos' },
  { value: '81-99', label: '81-99 anos' },
  { value: '99+',   label: '99 ou mais?? (se ainda estiver criando imagens aos 100, será nossa inspiração)' },
]

const OBJETIVOS: { value: string; label: string }[] = [
  { value: 'profissao_principal', label: 'Trabalhar com algo que amo e viver de fotografia como minha profissão principal.' },
  { value: 'renda_complementar',  label: 'Trabalhar com fotografia e complementar minha renda sem abandonar minha atividade atual.' },
  { value: 'hobby_serio',         label: 'Aprofundar-me na arte da fotografia como hobby sério e apaixonado.' },
]

const NIVEIS: { value: string; label: string }[] = [
  { value: 'nao_fotografo',    label: 'Não costumo fotografar (mas sinto que posso aprender).' },
  { value: 'celular',          label: 'Fotografo bastante com o celular.' },
  { value: 'odeia_tecnologia', label: 'Odeio computadores e tecnologia muito avançada (mas estou disposto a superar isso se for necessário).' },
  { value: 'facilidade_tech',  label: 'Tenho facilidade com computadores, internet, arquivos...' },
  { value: 'cameras_compactas',label: 'Já fotografo com câmeras compactas. E gosto muito.' },
  { value: 'dslr',             label: 'Já fotografo com câmeras DSLR profissionais.' },
  { value: 'fotografo_familia',label: 'Sou eu quem fotografa a família em todos os eventos.' },
  { value: 'cobrou_servicos',  label: 'Já cobrei por serviços de fotografia.' },
]

const INTENCOES: { value: string; label: string }[] = [
  { value: 'convite_aula_zero', label: 'Receber convite especial para a Aula Zero (gratuita)' },
  { value: 'reservar_vaga',     label: 'Reservar minha vaga para a próxima turma (entrar em contato imediato pelo Whatsapp: 15 98112 7508)' },
  { value: 'receber_brochura',  label: 'Receber a brochura oficial do programa de admissão, com as informações do curso (se ainda não recebeu)' },
  { value: 'outro',             label: 'Outro:' },
]

const NIGHTHAWKS =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1280px-Nighthawks_by_Edward_Hopper_1942.jpg'

const inputCls =
  'w-full rounded-lg border border-borda bg-escuro/60 px-4 py-3 text-base text-branco outline-none transition placeholder:text-cinza/50 focus:border-dourado'
const labelCls = 'block text-[0.98rem] font-medium text-branco'
const hintCls = 'mt-1 text-[0.85rem] leading-relaxed text-branco/55'
const errCls = 'mt-1 text-[0.82rem] text-red-400'

export default function AulaGratuitaPage() {
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreInscricaoForm>({ resolver: zodResolver(preInscricaoSchema) })

  const onSubmit = async (data: PreInscricaoForm) => {
    setSubmitError(null)
    try {
      await postPreInscricao(data)
      setSent(true)
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('Não foi possível enviar agora. Tente novamente em instantes.')
    }
  }

  if (sent) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-preto px-4 py-32">
        <div className="max-w-xl text-center">
          <p className="section-kicker">Pré-inscrição recebida</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-branco md:text-5xl">
            Sua jornada acaba de começar.
          </h1>
          <p className="mt-6 text-lg leading-8 text-cinza">
            Recebemos sua pré-inscrição com muito carinho. Em breve entraremos em contato
            pelo WhatsApp ou e-mail para conversar sobre os próximos passos.
          </p>
          <p className="mt-3 text-sm text-cinza/70">
            Fique de olho no seu celular — é por lá que falaremos sobre sua aula experimental.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/">Voltar para a página inicial</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-preto px-4 pb-24 pt-28 md:pt-36">
      <div className="container-page max-w-3xl">

        {/* ── COPY DE VENDAS (texto original do dono) ── */}
        <p className="section-kicker">Programa de admissão</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.12] text-branco md:text-5xl">
          O primeiro passo para viver seu sonho de fotografia com arte, paixão e profissionalismo
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-cinza">
          <p>Se você está lendo isto, existe algo dentro de você que não quer apenas tirar fotos.</p>

          <div className="space-y-1.5 border-l-2 border-dourado/40 pl-5 font-serif text-xl italic text-branco/90">
            <p>Quer contar histórias.</p>
            <p>Quer ser reconhecido.</p>
            <p>Quer transformar talento em profissão.</p>
            <p>Quer sentir orgulho quando disser: “Eu sou fotógrafa!” ou “Eu sou fotógrafo!”</p>
          </div>

          <p>
            Nós também não gostamos de formulários. Gostamos de luz perfeita, enquadramento
            preciso, risadas em sala de aula e alunos que descobrem que são capazes de muito
            mais do que imaginavam.
          </p>
          <p>
            Mas este pequeno passo garante sua segurança, sua organização e o cuidado individual
            que dedicamos a cada futuro profissional que entra na escola.
          </p>
          <p>
            Preencha com atenção. Em breve, você poderá receber o convite para sua primeira aula
            gratuita — uma experiência real, prática e inspiradora, onde você entenderá como é
            aprender fotografia com técnica sólida, direção artística, mercado profissional e
            muito bom humor.
          </p>
          <div className="py-1">
            <p className="font-serif text-2xl text-dourado">Este cadastro não gera compromisso financeiro.</p>
            <p className="font-serif text-2xl text-dourado">Ele gera oportunidade.</p>
          </div>
        </div>

        <p className="mt-6 text-xs leading-6 text-cinza/70">
          Ao solicitar seu convite, você concorda com o tratamento básico dos seus dados pessoais
          (não solicitamos dados sensíveis), utilizados exclusivamente para seu ingresso e
          comunicação com a escola (Lei Geral de Proteção de Dados).
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-14 space-y-12">

          {/* honeypot — escondido via CSS, não type=hidden */}
          <input
            {...register('empresa')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* ───────── ETAPA 1 — DADOS PESSOAIS ───────── */}
          <div className="space-y-7">
            <h2 className="font-serif text-2xl text-dourado">Etapa 1 — Sobre você</h2>

            {/* Nome */}
            <div>
              <label className={labelCls}>Nome completo *</label>
              <p className={hintCls}>Conforme escrito no documento de identificação (para acesso à sala de aula).</p>
              <input {...register('nome')} className={`${inputCls} mt-2`} />
              {errors.nome && <p className={errCls}>{errors.nome.message}</p>}
            </div>

            {/* Idade */}
            <fieldset>
              <legend className={labelCls}>Idade *</legend>
              <p className={hintCls}>(A idade mínima para o curso é de 18 anos.)</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {FAIXAS.map((f) => {
                  const full = f.value === '99+'
                  return (
                    <label
                      key={f.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border border-borda bg-escuro/40 px-4 py-3 text-[0.95rem] text-branco/90 transition hover:border-dourado/50 ${full ? 'col-span-2 items-start sm:col-span-3' : ''}`}
                    >
                      <input type="radio" value={f.value} {...register('faixa_idade')} className="mt-0.5 shrink-0 accent-dourado" />
                      <span>{f.label}</span>
                    </label>
                  )
                })}
              </div>
              {errors.faixa_idade && <p className={errCls}>{errors.faixa_idade.message}</p>}
            </fieldset>

            {/* E-mail */}
            <div>
              <label className={labelCls}>Seu melhor e-mail *</label>
              <p className={hintCls}>(Onde enviaremos seu possível convite e informações importantes.)</p>
              <input type="email" {...register('email')} className={`${inputCls} mt-2`} />
              {errors.email && <p className={errCls}>{errors.email.message}</p>}
            </div>

            {/* WhatsApp */}
            <div>
              <label className={labelCls}>Celular/Whatsapp *</label>
              <p className={hintCls}>Sem traços ou pontos, com DDD. É por aqui que conversaremos sobre sua jornada profissional.</p>
              <input type="tel" inputMode="numeric" placeholder="15981127508" {...register('whatsapp')} className={`${inputCls} mt-2`} />
              {errors.whatsapp && <p className={errCls}>{errors.whatsapp.message}</p>}
            </div>

            {/* Cidade/Estado */}
            <div>
              <label className={labelCls}>Cidade/Estado *</label>
              <p className={hintCls}>Queremos saber de onde vêm os próximos fotógrafos profissionais.</p>
              <input {...register('cidade_estado')} className={`${inputCls} mt-2`} placeholder="Sorocaba/SP" />
              {errors.cidade_estado && <p className={errCls}>{errors.cidade_estado.message}</p>}
            </div>

            {/* CPF últimos 4 */}
            <div>
              <label className={labelCls}>Apenas os últimos 4 números do seu CPF *</label>
              <p className={hintCls}>Insira apenas números — sem pontos ou traços.</p>
              <input maxLength={4} inputMode="numeric" {...register('cpf_ultimos4')} className={`${inputCls} mt-2 max-w-[8rem]`} />
              {errors.cpf_ultimos4 && <p className={errCls}>{errors.cpf_ultimos4.message}</p>}
            </div>

            {/* Instagram */}
            <div>
              <label className={labelCls}>Link do seu Instagram</label>
              <p className={hintCls}>Como a gente encontra você no Insta? Queremos conhecer seu olhar — mesmo que você ache que ainda está começando.</p>
              <input {...register('instagram')} className={`${inputCls} mt-2`} placeholder="@seuusuario" />
            </div>

            {/* Facebook */}
            <div>
              <label className={labelCls}>Link do Facebook</label>
              <p className={hintCls}>Como a gente encontra você no Face?</p>
              <input {...register('facebook')} className={`${inputCls} mt-2`} />
            </div>

            {/* Objetivo */}
            <fieldset>
              <legend className={labelCls}>Quero aprender fotografia profissional para: *</legend>
              <div className="mt-3 space-y-2">
                {OBJETIVOS.map((o) => (
                  <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-borda bg-escuro/40 px-4 py-3 text-[0.95rem] text-branco/90 transition hover:border-dourado/50">
                    <input type="radio" value={o.value} {...register('objetivo')} className="mt-0.5 accent-dourado" />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
              {errors.objetivo && <p className={errCls}>{errors.objetivo.message}</p>}
            </fieldset>

            {/* Nível (checkbox) */}
            <fieldset>
              <legend className={labelCls}>Qual o seu nível atual? *</legend>
              <p className={hintCls}>
                Este curso é para quem ama fotografia e deseja tornar-se profissional — esteja
                começando do zero, sem nenhum conhecimento prévio, ou já atuando.
              </p>
              <p className="mt-1 text-xs text-cinza">Clique em todas que julgar aplicáveis:</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {NIVEIS.map((n) => (
                  <label key={n.value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-borda bg-escuro/40 px-4 py-3 text-[0.95rem] text-branco/90 transition hover:border-dourado/50">
                    <input type="checkbox" value={n.value} {...register('nivel')} className="mt-0.5 accent-dourado" />
                    <span>{n.label}</span>
                  </label>
                ))}
              </div>
              {errors.nivel && <p className={errCls}>{errors.nivel.message as string}</p>}
            </fieldset>

            {/* Câmera/celular */}
            <div>
              <label className={labelCls}>Câmera ou celular</label>
              <p className={hintCls}>Se já tem, coloque a marca e o modelo exato. Se não tem e precisar de orientação para comprar, dá um toque pra gente:</p>
              <textarea rows={3} {...register('camera_celular')} className={`${inputCls} mt-2 resize-y`} />
            </div>
          </div>

          {/* ───────── SEPARADOR ───────── */}
          <div className="border-t border-dourado/25 pt-12 text-center">
            <p className="section-kicker">Etapa 2</p>
            <h2 className="mt-3 font-serif text-3xl italic text-dourado md:text-4xl">
              O Singelo (e Revelador) “Vestibular” da Nossa Escola
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-cinza">
              Quatro perguntas. Nenhuma resposta certa. Queremos conhecer o seu olhar — não te avaliar.
            </p>
          </div>

          {/* ───────── ETAPA 2 — VESTIBULAR ───────── */}
          <div className="space-y-9">
            <div>
              <label className={labelCls}>01) Por que fotografia é importante, na sua opinião? *</label>
              <p className={hintCls}>O que ela representa no mundo? Memória? Prova? Arte? Transformação? Negócio? Explique sua visão.</p>
              <textarea rows={4} {...register('resp_fotografia')} className={`${inputCls} mt-2 resize-y`} />
              {errors.resp_fotografia && <p className={errCls}>{errors.resp_fotografia.message}</p>}
            </div>

            <div>
              <label className={labelCls}>02) Quem é seu artista preferido? *</label>
              <p className={hintCls}>Pode ser fotógrafo, pintor, cineasta, músico, escritor. Queremos entender as referências que moldam seu olhar.</p>
              <textarea rows={3} {...register('resp_artista')} className={`${inputCls} mt-2 resize-y`} />
              {errors.resp_artista && <p className={errCls}>{errors.resp_artista.message}</p>}
            </div>

            <div>
              <label className={labelCls}>03) Por quê VOCÊ gosta tanto de fotografia? *</label>
              <p className={hintCls}>Não responda tecnicamente. Responda emocionalmente. O que acontece dentro de você quando cria uma imagem que funciona?</p>
              <textarea rows={4} {...register('resp_emocao')} className={`${inputCls} mt-2 resize-y`} />
              {errors.resp_emocao && <p className={errCls}>{errors.resp_emocao.message}</p>}
            </div>

            <div>
              <label className={labelCls}>04) O que você vê nesta imagem? *</label>
              <p className={hintCls}>Vá além da descrição. Fale sobre atmosfera, narrativa, símbolo, intenção. O que está acontecendo além do que é visível?</p>
              {/* Sem legenda visível — de propósito (revelar o título entregaria a resposta). */}
              <div className="mt-4 overflow-hidden rounded-xl border border-borda">
                <Image
                  src={NIGHTHAWKS}
                  alt="Nighthawks, Edward Hopper, 1942"
                  width={1280}
                  height={679}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full"
                />
              </div>
              <textarea rows={4} {...register('resp_hopper')} className={`${inputCls} mt-3 resize-y`} />
              {errors.resp_hopper && <p className={errCls}>{errors.resp_hopper.message}</p>}
            </div>
          </div>

          {/* ───────── INTENÇÕES ───────── */}
          <div className="border-t border-borda pt-10">
            <p className="leading-8 text-cinza">
              mas <strong className="text-branco">ANTES DE ENVIAR</strong> pense: Talvez você esteja
              apenas preenchendo um formulário. Ou talvez esteja iniciando a transição entre “gostar de
              fotografia” e “entender de fotografia”. A diferença começa com uma decisão. E decisões
              transformam destinos.
            </p>

            <fieldset className="mt-6">
              <legend className={labelCls}>Eu quero (marque quantas forem necessárias) *</legend>
              <div className="mt-3 space-y-2">
                {INTENCOES.map((i) => (
                  <label key={i.value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-borda bg-escuro/40 px-4 py-3 text-[0.95rem] text-branco/90 transition hover:border-dourado/50">
                    <input type="checkbox" value={i.value} {...register('intencoes')} className="mt-0.5 accent-dourado" />
                    <span>{i.label}</span>
                  </label>
                ))}
              </div>
              {errors.intencoes && <p className={errCls}>{errors.intencoes.message as string}</p>}
            </fieldset>
          </div>

          {submitError && (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {submitError}
            </p>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar minha pré-inscrição'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
