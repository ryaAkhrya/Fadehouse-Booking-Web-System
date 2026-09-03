"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { formatIDR, formatDuration } from "@/lib/utils"
import { createBooking } from "@/app/actions/booking"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function ReviewStep() {
  const { date, time, totalDuration, totalPrice, details, treatmentIds, setStep, setSuccessData, services } = useBooking()
  const { t, lang } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const selectedTreatments = treatmentIds
    .map(id => services.find(srv => srv.id === id))
    .filter(Boolean) as typeof services

  // Calculate end time purely for front-end Phase 4 UI
  let endTime = ""
  if (time) {
    const [h, m] = time.split(":").map(Number)
    const endTotalMins = h * 60 + m + totalDuration
    const endH = Math.floor(endTotalMins / 60)
    const endM = endTotalMins % 60
    endTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`
  }

  const handleConfirm = async () => {
    if (!date || !time) return
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      const result = await createBooking({
        customerName: details.name,
        customerPhone: details.phone,
        notes: details.notes,
        date,
        time,
        treatmentIds
      })

      if (result.error) {
        setErrorMsg(result.error)
      } else if (result.data) {
        setSuccessData(result.data)
        router.push("/booking/success")
      }
    } catch {
      setErrorMsg(lang === 'id' ? "Kami tidak dapat mengonfirmasi pesanan. Silakan coba lagi." : "We couldn't confirm the appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="space-y-8 pb-12">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          {t.booking.steps.review.title}
        </h2>
        <p className="mt-2 text-muted">
          {t.booking.steps.review.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border/50 p-6 rounded-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/30 pb-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">{t.booking.summary.time} & {t.booking.summary.date}</h3>
            <button onClick={() => setStep(2)} className="text-sm text-accent hover:underline">Edit</button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">{t.booking.summary.date}</span>
              <span className="text-foreground font-medium">
                {date ? new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date)) : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{t.booking.summary.time}</span>
              <span className="text-foreground font-medium">{time} — {endTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border/50 p-6 rounded-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/30 pb-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide">{t.booking.steps.review.details}</h3>
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
          <h3 className="font-display text-lg font-bold uppercase tracking-wide">{t.booking.summary.treatment}</h3>
          <button onClick={() => setStep(1)} className="text-sm text-accent hover:underline">Edit</button>
        </div>
        
        <div className="space-y-3">
          {selectedTreatments.map(srv => {
            const translation = t.treatments.list[srv.id as keyof typeof t.treatments.list]
            return (
            <div key={srv.id} className="flex justify-between text-sm">
              <span className="text-foreground">{translation?.name || srv.name}</span>
              <span className="text-foreground font-medium">{formatIDR(srv.price)}</span>
            </div>
            )
          })}
        </div>
        
        <div className="border-t border-border/30 pt-4 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">{t.booking.summary.duration}</span>
            <span className="text-foreground">{formatDuration(totalDuration)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2">
            <span className="text-foreground uppercase tracking-wide">{t.booking.summary.price}</span>
            <span className="text-accent">{formatIDR(totalPrice)}</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-sm text-sm">
          {errorMsg}
        </div>
      )}

      <div className="pt-8 border-t border-border/50 flex justify-between items-center">
        <Button variant="text" onClick={() => setStep(4)} disabled={isSubmitting} className="px-0 hover:bg-transparent hover:text-accent">
          {t.booking.steps.buttons.back}
        </Button>
        <Button size="lg" onClick={handleConfirm} disabled={isSubmitting} className="min-w-[200px]">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Spinner className="w-4 h-4 text-background" />
              {t.booking.steps.review.submitting}
            </span>
          ) : (
            t.booking.steps.review.confirm
          )}
        </Button>
      </div>
    </FadeIn>
  )
}
