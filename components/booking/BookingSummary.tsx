"use client"

import { useBooking } from "@/lib/booking-context"
import { formatIDR, formatDuration } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function BookingSummary() {
  const { treatmentIds, date, time, totalDuration, totalPrice, services } = useBooking()
  const { t, lang } = useLanguage()
  
  const selectedTreatments = treatmentIds
    .map(id => services.find(srv => srv.id === id))
    .filter(Boolean) as typeof services

  if (treatmentIds.length === 0) {
    return (
      <div className="bg-surface border border-border/50 p-6 rounded-sm">
        <h3 className="font-display text-lg font-bold tracking-wider uppercase mb-4 text-muted">{t.booking.summary.title}</h3>
        <p className="text-muted text-sm">{t.booking.summary.selectTreatment}</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border/50 p-6 rounded-sm">
      <h3 className="font-display text-lg font-bold tracking-wider uppercase mb-6 border-b border-border/30 pb-4">
        {t.booking.summary.title}
      </h3>
      
      <div className="space-y-4 mb-6">
        {selectedTreatments.map(srv => {
          const translation = t.treatments.list[srv.id as keyof typeof t.treatments.list]
          return (
          <div key={srv.id} className="flex justify-between items-start text-sm">
            <span className="text-foreground max-w-[200px]">{translation?.name || srv.name}</span>
            <span className="text-foreground font-medium whitespace-nowrap ml-4">{formatIDR(srv.price)}</span>
          </div>
          )
        })}
      </div>
      
      {(date || time) && (
        <div className="border-t border-border/30 pt-4 mb-6 space-y-2 text-sm">
          {date && (
            <div className="flex justify-between">
              <span className="text-muted">{t.booking.summary.date}</span>
              <span className="text-foreground font-medium">
                {new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))}
              </span>
            </div>
          )}
          {time && (
            <div className="flex justify-between">
              <span className="text-muted">{t.booking.summary.time}</span>
              <span className="text-foreground font-medium">{time}</span>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-border/30 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">{t.booking.summary.duration}</span>
          <span className="text-foreground">{totalDuration} {t.booking.summary.minutes}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2">
          <span className="text-foreground uppercase tracking-wide">{t.booking.summary.price}</span>
          <span className="text-accent">{formatIDR(totalPrice)}</span>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-muted leading-relaxed">
        {t.booking.steps.review.desc}
      </p>
    </div>
  )
}
