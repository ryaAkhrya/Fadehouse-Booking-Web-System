import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { MapPin, Clock } from "lucide-react"
import { getDictionary } from "@/lib/i18n"

export async function LocationInfo() {
  const { t, lang } = await getDictionary()

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-12">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-accent" />
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
                    {t.home.location.hoursTitle}
                  </h2>
                </div>
              </Reveal>
              <FadeIn delay={0.2} className="space-y-4">
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted">{t.home.location.days.monThu}</span>
                  <span className="text-foreground font-medium">10:00 - 21:00</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted">{t.home.location.days.fri}</span>
                  <span className="text-foreground font-medium">13:00 - 21:00</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted">{t.home.location.days.sat}</span>
                  <span className="text-foreground font-medium">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="text-muted">{t.home.location.days.sun}</span>
                  <span className="text-foreground font-medium">09:00 - 20:00</span>
                </div>
              </FadeIn>
            </div>

            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
                    {t.home.location.locTitle}
                  </h2>
                </div>
              </Reveal>
              <FadeIn delay={0.3}>
                <p className="text-lg text-foreground font-medium mb-2">Fadehouse</p>
                <p className="text-muted leading-relaxed max-w-sm">
                  Jakarta, Indonesia<br />
                  {lang === 'id' ? 'Lokasi Demo' : 'Demo Location'}
                </p>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.4} className="h-full min-h-[400px] lg:min-h-[500px] w-full rounded-sm bg-surface border border-border/50 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2 relative z-10 mt-4 lg:mt-8">
              <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground uppercase">
                {t.home.location.panel.city}
              </h3>
              <p className="font-display text-xl lg:text-2xl font-medium tracking-widest text-muted uppercase">
                {t.home.location.panel.country}
              </p>
            </div>
            
            <div className="space-y-12 relative z-10 mb-2">
              <div className="max-w-[280px] space-y-2">
                <p className="text-foreground font-medium uppercase tracking-wider text-sm">
                  {t.home.location.panel.demoTitle}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {t.home.location.panel.demoDesc}
                </p>
              </div>
              
              <div className="flex justify-between items-end border-t border-border/30 pt-6">
                <span className="text-xs text-muted tracking-widest uppercase">{t.home.location.panel.code}</span>
                <span className="text-xs text-muted tracking-widest uppercase">{t.home.location.panel.region}</span>
              </div>
            </div>
            
            {/* Subtle architectural background lines to make it feel intentional */}
            <div className="absolute top-0 right-1/3 w-[1px] h-full bg-border/20 z-0 hidden sm:block" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-border/10 z-0 hidden sm:block" />
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
