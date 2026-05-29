import { CtaFinal } from '@/components/sections/CtaFinal'
import { Curso } from '@/components/sections/Curso'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Galeria } from '@/components/sections/Galeria'
import { Hero } from '@/components/sections/Hero'
import { ParaQuem } from '@/components/sections/ParaQuem'
import { Stats } from '@/components/sections/Stats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Curso />
      <Stats />
      <ParaQuem />
      <Galeria />
      <Depoimentos />
      <CtaFinal />
    </>
  )
}
