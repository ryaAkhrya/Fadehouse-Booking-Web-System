import Link from "next/link"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { HeroMedia } from "@/components/ui/hero-media"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Media Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/40 z-20"></div>
        {/* Lighter gradient for text readability without being AI-slop */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent z-20"></div>
        
        <HeroMedia />
      </div>

      <div className="relative z-30 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground uppercase leading-[0.95] mb-6">
              Precision <br /> Without <br /> Compromise.
            </h1>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-lg md:text-xl text-muted max-w-lg mb-10">
              Modern grooming, considered down to the detail. Choose your treatment, reserve your time, and pay when you arrive.
            </p>
          </Reveal>
          
          <FadeIn delay={0.5} className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="text-base h-14 px-8">
              <Link href="/booking">Book Appointment</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-base h-14 px-8 border-muted/30">
              <Link href="/treatments">View Treatments</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
