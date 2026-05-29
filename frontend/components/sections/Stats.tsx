import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 25, suffix: '+', label: 'Anos de historia' },
  { value: 1600, suffix: '+', label: 'Fotos de alunos publicadas' },
  { value: 0, suffix: '', label: 'Conhecimento previo necessario' },
  { value: 100, suffix: '%', label: 'Profissionalizante' }
]

export function Stats() {
  return (
<section className="border-y border-dourado/20 bg-preto py-16">
  <div className="container-page">
    
    <div className="grid gap-10 md:grid-cols-4 text-center">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center md:border-r md:last:border-r-0 border-dourado/30"
        >
          <div className="font-serif text-5xl text-dourado md:text-6xl">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>

          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-cinza">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
  )
}
