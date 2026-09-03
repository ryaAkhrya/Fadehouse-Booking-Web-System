import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { FallbackImage } from "@/components/ui/fallback-image"
import { getDictionary } from "@/lib/i18n"

export async function Experience() {
  const { t } = await getDictionary()

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-8">
                {t.home.experience.title[0]} <br /> {t.home.experience.title[1]}
              </h2>
            </Reveal>
            
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <h3 className="text-xl font-bold text-foreground">{t.home.experience.detail.title}</h3>
                <p className="mt-2 text-muted max-w-md">
                  {t.home.experience.detail.desc}
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <h3 className="text-xl font-bold text-foreground">{t.home.experience.timing.title}</h3>
                <p className="mt-2 text-muted max-w-md">
                  {t.home.experience.timing.desc}
                </p>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <h3 className="text-xl font-bold text-foreground">{t.home.experience.clean.title}</h3>
                <p className="mt-2 text-muted max-w-md">
                  {t.home.experience.clean.desc}
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
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
