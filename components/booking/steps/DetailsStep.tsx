"use client"

import React, { useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function DetailsStep() {
  const { details, setDetails, setStep } = useBooking()
  const { t, lang } = useLanguage()
  const [errors, setErrors] = useState<{name?: string, phone?: string}>({})

  const handleContinue = () => {
    const newErrors: {name?: string, phone?: string} = {}
    
    if (!details.name.trim()) {
      newErrors.name = lang === 'id' ? "Masukkan nama Anda." : "Enter your name."
    }
    
    // Very basic phone validation for Phase 4 mock
    if (!details.phone.trim() || details.phone.trim().length < 8) {
      newErrors.phone = lang === 'id' ? "Masukkan nomor telepon yang valid." : "Enter a valid phone number."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStep(5)
  }

  return (
    <FadeIn className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          {t.booking.steps.details.title}
        </h2>
        <p className="mt-2 text-muted">
          {t.booking.steps.details.desc}
        </p>
      </div>

      <div className="max-w-xl space-y-6 bg-surface border border-border/50 p-6 rounded-sm">
        <div className="space-y-2">
          <Label htmlFor="name">{t.booking.steps.details.firstName}</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            maxLength={50}
            value={details.name}
            onChange={(e) => {
              setDetails({ name: e.target.value })
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
            }}
            className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t.booking.steps.details.phone}</Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="081234567890" 
            maxLength={20}
            value={details.phone}
            onChange={(e) => {
              setDetails({ phone: e.target.value })
              if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
            }}
            className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes {t.booking.steps.details.optional}</Label>
          <Textarea 
            id="notes" 
            placeholder="" 
            maxLength={500}
            value={details.notes}
            onChange={(e) => setDetails({ notes: e.target.value })}
            className="h-24 resize-none"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 flex justify-between">
        <Button variant="text" onClick={() => setStep(3)} className="px-0 hover:bg-transparent hover:text-accent">
          {t.booking.steps.buttons.back}
        </Button>
        <Button size="lg" onClick={handleContinue}>
          {t.booking.steps.buttons.continueToReview}
        </Button>
      </div>
    </FadeIn>
  )
}
