import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { FallbackImage } from "@/components/ui/fallback-image"

export function Experience() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-8">
                The Fadehouse <br /> Standard
              </h2>
            </Reveal>
            
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <h3 className="text-xl font-bold text-foreground">Attention to Detail</h3>
                <p className="mt-2 text-muted max-w-md">
                  Every cut, trim, and finish is executed with precision. We take the time required to ensure a consistent, high-quality result.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <h3 className="text-xl font-bold text-foreground">Considered Timing</h3>
                <p className="mt-2 text-muted max-w-md">
                  Your appointment time is respected. By booking in advance, we maintain a calm environment without the rush of walk-in queues.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <h3 className="text-xl font-bold text-foreground">Clean Environment</h3>
                <p className="mt-2 text-muted max-w-md">
                  Tools are sanitized, stations are prepared, and the space is maintained to the highest standard between every client.
                </p>
              </FadeIn>
            </div>
          </div>
          
          <FadeIn delay={0.3} className="relative h-[600px] w-full rounded-sm overflow-hidden bg-surface">
            <div className="absolute inset-0 bg-background/20 z-10" />
            {/* The project owner will replace this with a real interior image */}
            <FallbackImage 
              src="/images/barbershop/interior-01.webp" 
              alt="Fadehouse Interior" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
