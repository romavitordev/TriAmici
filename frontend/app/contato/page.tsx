'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { contactSchema, type ContactForm } from '@/lib/validations'

export default function ContatoPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactForm) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/contato`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, tipo: 'AULA_GRATIS' })
    })
    if (!response.ok) throw new Error('Erro ao enviar')
    setSent(true)
  }

  return (
    <section className="bg-preto pb-24 pt-24 md:pt-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-kicker">Contato</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl lg:text-7xl">Peca seu convite para a aula gratuita.</h1>
          {sent ? (
            <div className="mt-12 border border-dourado/40 bg-escuro p-8">
              <h2 className="font-serif text-4xl text-dourado">Mensagem enviada.</h2>
              <p className="mt-4 text-cinza">Entraremos em contato para combinar sua visita.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-6">
              <input {...register('empresa')} className="hidden" tabIndex={-1} autoComplete="off" />
              {[
                ['nome', 'Nome'],
                ['email', 'E-mail'],
                ['telefone', 'Telefone / WhatsApp']
              ].map(([name, label]) => (
                <label key={name} className="grid gap-2 text-sm uppercase tracking-[0.16em] text-cinza">
                  {label}
                  <input {...register(name as keyof ContactForm)} className="border-b border-borda bg-transparent py-4 text-base normal-case tracking-normal text-branco outline-none transition focus:border-dourado" />
                  {errors[name as keyof ContactForm] && <span className="text-xs normal-case tracking-normal text-red-400">{errors[name as keyof ContactForm]?.message}</span>}
                </label>
              ))}
              <label className="grid gap-2 text-sm uppercase tracking-[0.16em] text-cinza">
                Mensagem
                <textarea {...register('mensagem')} rows={5} className="border-b border-borda bg-transparent py-4 text-base normal-case tracking-normal text-branco outline-none transition focus:border-dourado" />
                {errors.mensagem && <span className="text-xs normal-case tracking-normal text-red-400">{errors.mensagem.message}</span>}
              </label>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando' : 'Enviar mensagem'}</Button>
            </form>
          )}
        </div>

        <aside className="mt-4 border border-borda bg-escuro p-6 md:p-8">
          <h2 className="font-serif text-3xl text-dourado">Tri Amici Academy</h2>
          <div className="mt-8 grid gap-5 text-cinza">
            <p className="flex gap-3"><Phone className="text-dourado" /> (15) 3321-3365</p>
            <p className="flex gap-3"><MessageCircle className="text-dourado" /> (15) 9 8112-7508</p>
            <p className="flex gap-3"><Mail className="text-dourado" /> escola@triamici.com.br</p>
            <p className="flex gap-3"><MapPin className="text-dourado" /> Rua Amapa 112, Vila Augusto, Sorocaba, SP - 18040-050</p>
            <p>CNPJ: xx.xxx.xxx/xxxx-xx</p>
          </div>
          <iframe title="Mapa Tri Amici" className="mt-8 h-72 w-full border-0 grayscale" loading="lazy" src="https://www.google.com/maps?q=Rua%20Amap%C3%A1%20112%20Sorocaba%20SP&output=embed" />
        </aside>
      </div>
    </section>
  )
}
