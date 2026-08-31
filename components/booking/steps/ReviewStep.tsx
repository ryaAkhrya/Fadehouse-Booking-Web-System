"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { formatIDR, formatDuration } from "@/lib/utils"
import { treatments as allTreatments } from "@/data/treatments"

export function ReviewStep() {
  const { date, time, totalDuration, totalPrice, details, treatmentIds, setStep } = useBooking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const selectedTreatments = treatmentIds
    .map(id => allTreatments.find(t => t.id === id))
    .filter(Boolean) as typeof allTreatments

  // Calculate end time purely for front-end Phase 4 UI
  let endTime = ""
  if (time) {
    const [h, m] = time.split(":").map(Number)
    const endTotalMins = h * 60 + m + totalDuration
    const endH = Math.floor(endTotalMins / 60)
    const endM = endTotalMins % 60
    endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`
  }

  const handleConfirm = () => {
    setIsSubmitting(true)
    // Simulate network request
    setTimeout(() => {
      // Navigate to success page
      router.push("/booking/success")
    }, 1500)
  }

  return (
    <FadeIn className="space-y-8 pb-12">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Review Your Appointment
        </h2>
        <p className="mt-2 text-muted">
          Please confirm your details before submitting. Payment is made at Fadehouse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border/50 p-6 rounded-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/30 pb-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Time & Date</h3>
            <button onClick={() => setStep(2)} className="text-sm text-accent hover:underline">Edit</button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Date</span>
              <span className="text-foreground font-medium">
                {date ? new Date(date).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Time</span>
              <span className="text-foreground font-medium">{time} — {endTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border/50 p-6 rounded-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/30 pb-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Your Details</h3>
            <button onClick={() => setStep(4)} className="text-sm text-accent hover:underline">Edit</button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Name</span>
              <span className="text-foreground font-medium">{details.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Phone</span>
              <span className="text-foreground font-medium">{details.phone}</span>
            </div>
            {details.notes && (
              <div className="pt-2">
                <span className="text-muted block mb-1">Notes</span>
                <span className="text-foreground block bg-background p-3 rounded-sm mt-1">{details.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border/50 p-6 rounded-sm space-y-6">
        <div className="flex justify-between items-center border-b border-border/30 pb-4">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide">Treatments</h3>
          <button onClick={() => setStep(1)} className="text-sm text-accent hover:underline">Edit</button>
        </div>
        
        <div className="space-y-3">
          {selectedTreatments.map(t => (
            <div key={t.id} className="flex justify-between text-sm">
              <span className="text-foreground">{t.name}</span>
              <span className="text-foreground font-medium">{formatIDR(t.price)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border/30 pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Total Duration</span>
            <span className="text-foreground">{formatDuration(totalDuration)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2">
            <span className="text-foreground uppercase tracking-wide">Estimated Total</span>
            <span className="text-accent">{formatIDR(totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 flex justify-between items-center">
        <Button variant="text" onClick={() => setStep(4)} disabled={isSubmitting} className="px-0 hover:bg-transparent hover:text-accent">
          Back
        </Button>
        <Button size="lg" onClick={handleConfirm} disabled={isSubmitting} className="min-w-[200px]">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Spinner className="w-4 h-4 text-background" />
              Confirming...
            </span>
          ) : (
            "Confirm Appointment"
          )}
        </Button>
      </div>
    </FadeIn>
  )
}
