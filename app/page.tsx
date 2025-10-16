import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import Cards from '@/components/sections/cards'
import { Sample } from '@/components/sections/sample'
import { CTA } from '@/components/sections/cta'

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <Cards />
      <Features />
      <Sample />
      <CTA />
    </div>
  )
}
