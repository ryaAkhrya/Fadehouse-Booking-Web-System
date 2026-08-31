import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8 max-w-7xl mx-auto relative pt-20">
      <div className="max-w-3xl">
        <Reveal>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground uppercase leading-[1.1]">
            Precision <br /> Without <br /> Compromise.
          </h1>
        </Reveal>
        
        <FadeIn delay={0.2} className="mt-8 text-lg text-muted max-w-xl">
          Modern grooming, considered down to the detail. Choose your treatment, reserve your time, and pay when you arrive.
        </FadeIn>
        
        <FadeIn delay={0.4} className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/booking">Book Appointment</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/treatments">View Treatments</Link>
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}
