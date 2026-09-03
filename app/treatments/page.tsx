import { Metadata } from 'next'
import { treatments } from "@/data/treatments"

export const metadata: Metadata = {
  title: 'Treatments | Fadehouse Barbershop',
  description: 'Refined grooming services. Book your Fadehouse signature haircut, beard trim, or scalp detox.',
}
import { formatIDR, formatDuration } from "@/lib/utils"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { FallbackImage } from "@/components/ui/fallback-image"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n"

export default async function TreatmentsPage() {
  const { t } = await getDictionary()

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 md:flex md:items-end md:justify-between">
        <div>
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase">
              {t.treatments.pageTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted max-w-xl">
              {t.treatments.pageSubtitle}
            </p>
          </Reveal>
        </div>
        <FadeIn delay={0.2} className="hidden md:block">
          <Button asChild size="lg">
            <Link href="/booking">{t.treatments.bookBtn}</Link>
          </Button>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24">
        {treatments.map((treatment, index) => {
          const translation = t.treatments.list[treatment.id as keyof typeof t.treatments.list]
          return (
          <FadeIn key={treatment.id} delay={0.1 * (index % 4)} className="flex flex-col">
            <div className="relative w-full aspect-[4/3] bg-surface rounded-sm overflow-hidden mb-6">
              {/* Owner will replace images later */}
              <FallbackImage 
                src={treatment.image} 
                alt={treatment.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              {translation?.name || treatment.name}
            </h2>
            
            <p className="text-muted mb-6 flex-grow">
              {translation?.desc || treatment.description}
            </p>
            
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="text-foreground font-medium">
                {formatDuration(treatment.durationMinutes)} <span className="text-muted mx-2">&bull;</span> {formatIDR(treatment.price)}
              </div>
              <Button asChild variant="text" className="px-0 h-auto hover:text-foreground">
                <Link href="/booking" className="text-accent">Select</Link>
              </Button>
            </div>
          </FadeIn>
          )
        })}
      </div>
      
      <div className="mt-16 md:hidden">
        <Button asChild size="lg" className="w-full">
          <Link href="/booking">{t.treatments.bookBtn}</Link>
        </Button>
      </div>
    </div>
  )
}
