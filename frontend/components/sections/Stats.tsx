import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const stats = [
  { value: 25,   suffix: '+',  label: 'Anos de ofício' },
  { value: 1600, suffix: '+',  label: 'Fotos de alunos publicadas' },
  { value: 6,    suffix: '',   label: 'Módulos em 1 semestre' },
  { value: 100,  suffix: '%',  label: 'Presencial e prático' }
]

export function Stats() {
  return (
    <section className="border-y border-dourado/15 bg-preto py-14 md:py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center md:border-r md:last:border-r-0 md:border-dourado/20"
            >
              <div className="font-serif text-4xl text-dourado md:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 max-w-[10rem] text-xs uppercase tracking-[0.18em] text-cinza">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
