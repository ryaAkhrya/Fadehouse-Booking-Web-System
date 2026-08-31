import Link from "next/link"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { ArrowRight } from "lucide-react"
import { treatments } from "@/data/treatments"
import { formatIDR, formatDuration } from "@/lib/utils"

export function TreatmentShowcase() {
  const showcaseTreatments = treatments.slice(0, 4)

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
                Treatments
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted max-w-md">
                Refined services focused on consistency and detail.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden md:block">
            <Link href="/treatments" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition-colors group">
              View all treatments
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {showcaseTreatments.map((treatment, index) => (
            <FadeIn key={treatment.id} delay={0.1 * index}>
              <Link 
                href="/treatments" 
                className="group block border-b border-border py-8 transition-colors hover:bg-background/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center px-4 md:px-0">
                  <div className="md:col-span-1 text-sm text-muted font-medium hidden md:block">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-accent">
                      {treatment.name}
                    </h3>
                  </div>
                  <div className="md:col-span-3 text-muted text-sm max-w-xs">
                    {treatment.description}
                  </div>
                  <div className="md:col-span-2 text-foreground font-medium text-sm md:text-right">
                    {formatDuration(treatment.durationMinutes)} <span className="text-muted mx-2">&bull;</span> {formatIDR(treatment.price)}
                  </div>
                  <div className="md:col-span-1 flex justify-end hidden md:flex">
                    <ArrowRight className="w-5 h-5 text-muted transition-all group-hover:text-accent group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <Link href="/treatments" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition-colors group">
            View all treatments
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
