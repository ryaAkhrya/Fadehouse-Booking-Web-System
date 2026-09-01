"use client"

import { useBooking } from "@/lib/booking-context"
import { formatIDR, formatDuration } from "@/lib/utils"

export function BookingSummary() {
  const { treatmentIds, date, time, totalDuration, totalPrice, services } = useBooking()
  
  const selectedTreatments = treatmentIds
    .map(id => services.find(t => t.id === id))
    .filter(Boolean) as typeof services

  if (treatmentIds.length === 0) {
    return (
      <div className="bg-surface border border-border/50 p-6 rounded-sm">
        <h3 className="font-display text-lg font-bold tracking-wider uppercase mb-4 text-muted">Summary</h3>
        <p className="text-muted text-sm">Select a treatment to begin.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border/50 p-6 rounded-sm">
      <h3 className="font-display text-lg font-bold tracking-wider uppercase mb-6 border-b border-border/30 pb-4">
        Summary
      </h3>
      
      <div className="space-y-4 mb-6">
        {selectedTreatments.map(t => (
          <div key={t.id} className="flex justify-between items-start text-sm">
            <span className="text-foreground max-w-[200px]">{t.name}</span>
            <span className="text-foreground font-medium whitespace-nowrap ml-4">{formatIDR(t.price)}</span>
          </div>
        ))}
      </div>
      
      {(date || time) && (
        <div className="border-t border-border/30 pt-4 mb-6 space-y-2 text-sm">
          {date && (
            <div className="flex justify-between">
              <span className="text-muted">Date</span>
              <span className="text-foreground font-medium">
                {new Date(date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )}
          {time && (
            <div className="flex justify-between">
              <span className="text-muted">Time</span>
              <span className="text-foreground font-medium">{time}</span>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-border/30 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Total Duration</span>
          <span className="text-foreground">{formatDuration(totalDuration)}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2">
          <span className="text-foreground uppercase tracking-wide">Estimated Total</span>
          <span className="text-accent">{formatIDR(totalPrice)}</span>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-muted leading-relaxed">
        Payment is made directly at Fadehouse after your appointment.
      </p>
    </div>
  )
}
