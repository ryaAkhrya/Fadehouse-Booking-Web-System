import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { LocationInfo } from "@/components/sections/LocationInfo"
import { FallbackImage } from "@/components/ui/fallback-image"

export default function LocationPage() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <Reveal>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase">
            Location
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted max-w-xl">
            Find us in the heart of the city. A premium space designed for precise grooming.
          </p>
        </Reveal>
      </div>

      <FadeIn delay={0.2} className="w-full h-[400px] md:h-[600px] relative bg-surface mb-24">
        {/* Owner will replace with another interior or exterior image */}
        <div className="absolute inset-0 bg-background/30 z-10" />
        <FallbackImage 
          src="/images/barbershop/interior-02.webp"
          alt="Fadehouse Location"
          fill
          className="object-cover grayscale"
        />
      </FadeIn>

      <LocationInfo />
    </div>
  )
}
