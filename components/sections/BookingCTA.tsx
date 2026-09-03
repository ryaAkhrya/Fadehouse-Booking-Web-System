import Link from "next/link"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"

export function BookingCTA() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border/30">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <Reveal width="100%">
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground uppercase mb-6">
            Reserve Your Time.
          </h2>
        </Reveal>
        
        <FadeIn delay={0.2}>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Select your treatments, choose an available time, and secure your appointment. Payment is made directly at Fadehouse.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto h-14 px-10 text-base">
            <Link href="/booking">Book Appointment</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-10 text-base">
            <Link href="/treatments">View Treatments</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
