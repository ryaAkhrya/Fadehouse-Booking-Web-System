"use client"

import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { formatIDR, formatDuration } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function TreatmentStep() {
  const { treatmentIds, toggleTreatment, setStep, services, isLoadingServices } = useBooking()

  return (
    <FadeIn className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Choose Your Treatment
        </h2>
        <p className="mt-2 text-muted">
          Select one or more treatments. We&apos;ll calculate the total time for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoadingServices ? (
          <div className="col-span-1 md:col-span-2 text-center text-muted p-12 border border-border/50 bg-surface">
            Loading treatments...
          </div>
        ) : (
          services.map((t) => {
          const isSelected = treatmentIds.includes(t.id)
          
          return (
            <button
              key={t.id}
              onClick={() => toggleTreatment(t.id)}
              className={`text-left p-6 border transition-all duration-200 rounded-sm ${
                isSelected 
                  ? "border-accent bg-accent/5 ring-1 ring-accent" 
                  : "border-border/50 bg-surface hover:border-accent/50 hover:bg-surface/80"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-xl font-bold">{t.name}</h3>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ml-4 ${
                  isSelected ? "bg-accent border-accent text-background" : "border-muted/30 text-transparent"
                }`}>
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-muted mb-6 h-10">{t.description}</p>
              <div className="flex items-center text-sm font-medium">
                {formatDuration(t.duration_minutes)} <span className="text-muted mx-2">&bull;</span> {formatIDR(t.price)}
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
          Continue to Date
        </Button>
      </div>
    </FadeIn>
  )
}
