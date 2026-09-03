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

          <FadeIn delay={0.4} className="h-full min-h-[400px] lg:min-h-[500px] w-full rounded-sm overflow-hidden bg-background relative border border-border/50">
            {/* Using a Google Maps embed for demo purposes, pointing to Jakarta generally */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d126920.24089454174!2d106.75871143891461!3d-6.229740058564027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
            />
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
