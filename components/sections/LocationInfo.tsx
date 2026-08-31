import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"

export function LocationInfo() {
  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground uppercase mb-8">
                Opening Hours
              </h2>
            </Reveal>
            
            <FadeIn delay={0.2} className="space-y-4 max-w-sm">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Monday - Thursday</span>
                <span className="text-foreground font-medium">10:00 - 21:00</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Friday</span>
                <span className="text-foreground font-medium">13:00 - 21:00</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Saturday</span>
                <span className="text-foreground font-medium">09:00 - 22:00</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Sunday</span>
                <span className="text-foreground font-medium">09:00 - 20:00</span>
              </div>
            </FadeIn>
          </div>
          
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground uppercase mb-8">
                Location
              </h2>
            </Reveal>
            
            <FadeIn delay={0.3} className="space-y-6">
              <div>
                <p className="text-foreground font-medium mb-1">Fadehouse Barbershop</p>
                <p className="text-muted">[FADEHOUSE ADDRESS]</p>
              </div>
              
              <div className="h-48 w-full bg-background border border-border flex items-center justify-center rounded-sm">
                <p className="text-muted text-sm">[MAP PLACEHOLDER]</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
