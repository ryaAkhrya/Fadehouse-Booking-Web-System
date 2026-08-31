"use client"

import React, { useState } from "react"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DetailsStep() {
  const { details, setDetails, setStep } = useBooking()
  const [errors, setErrors] = useState<{name?: string, phone?: string}>({})

  const handleContinue = () => {
    const newErrors: {name?: string, phone?: string} = {}
    
    if (!details.name.trim()) {
      newErrors.name = "Enter your name."
    }
    
    // Very basic phone validation for Phase 4 mock
    if (!details.phone.trim() || details.phone.trim().length < 8) {
      newErrors.phone = "Enter a valid phone number."
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
          Your Details
        </h2>
        <p className="mt-2 text-muted">
          We need these details to confirm and manage your appointment.
        </p>
      </div>

      <div className="max-w-xl space-y-6 bg-surface border border-border/50 p-6 rounded-sm">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel"
            placeholder="081234567890" 
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
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea 
            id="notes" 
            placeholder="Any specific requests?" 
            value={details.notes}
            onChange={(e) => setDetails({ notes: e.target.value })}
            className="h-24 resize-none"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 flex justify-between">
        <Button variant="text" onClick={() => setStep(3)} className="px-0 hover:bg-transparent hover:text-accent">
          Back
        </Button>
        <Button size="lg" onClick={handleContinue}>
          Review Appointment
        </Button>
      </div>
    </FadeIn>
  )
}
