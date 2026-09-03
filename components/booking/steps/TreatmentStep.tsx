"use client"

import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { formatIDR, formatDuration } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function TreatmentStep() {
  const { treatmentIds, toggleTreatment, setStep, services, isLoadingServices } = useBooking()
  const { t } = useLanguage()

  return (
    <FadeIn className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          {t.booking.steps.treatment.title}
        </h2>
        <p className="mt-2 text-muted">
          {t.booking.steps.treatment.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoadingServices ? (
          <div className="col-span-1 md:col-span-2 text-center text-muted p-12 border border-border/50 bg-surface">
            Loading treatments...
          </div>
        ) : (
          services.map((srv) => {
          const isSelected = treatmentIds.includes(srv.id)
          const translation = t.treatments.list[srv.id as keyof typeof t.treatments.list]
          
          return (
            <button
              key={srv.id}
              onClick={() => toggleTreatment(srv.id)}
              className={`text-left p-6 border transition-all duration-200 rounded-sm ${
                isSelected 
                  ? "border-accent bg-accent/5 ring-1 ring-accent" 
                  : "border-border/50 bg-surface hover:border-accent/50 hover:bg-surface/80"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl font-bold">{translation?.name || srv.name}</h3>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ml-4 ${
                  isSelected ? "bg-accent border-accent text-background" : "border-muted/30 text-transparent"
                }`}>
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-muted mb-6 h-10">{translation?.desc || srv.description}</p>
              <div className="flex items-center text-sm font-medium">
                {formatDuration(srv.duration_minutes)} <span className="text-muted mx-2">&bull;</span> {formatIDR(srv.price)}
              </div>
            </button>
          )
        }))}
      </div>

      <div className="pt-8 border-t border-border/50 flex justify-end">
        <Button 
          size="lg" 
          onClick={() => setStep(2)} 
          disabled={treatmentIds.length === 0}
        >
          {t.booking.steps.buttons.continueToDate}
        </Button>
      </div>
    </FadeIn>
  )
}
