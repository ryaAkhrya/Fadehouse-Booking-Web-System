"use client"

import React, { useState, useEffect } from "react"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { getAvailability } from "@/app/actions/booking"

export function TimeStep() {
  const { date, time, setTime, treatmentIds, setStep } = useBooking()
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSlots() {
      if (!date || treatmentIds.length === 0) return
      setLoading(true)
      setErrorMsg(null)
      try {
        const result = await getAvailability(date, treatmentIds)
        if (result.error) {
          setErrorMsg(result.error)
          setSlots([])
        } else {
          setSlots(result.slots)
        }
      } catch {
        setErrorMsg("Failed to check availability.")
      } finally {
        setLoading(false)
      }
    }
    fetchSlots()
  }, [date, treatmentIds])

  return (
    <FadeIn className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Choose a Time
        </h2>
        <p className="mt-2 text-muted">
          Only times that can fit your full treatment duration are shown.
        </p>
      </div>

      {!date ? (
        <div className="bg-surface border border-border/50 p-6 text-center text-muted">
          Please select a date first.
        </div>
      ) : loading ? (
        <div className="bg-surface border border-border/50 p-6 text-center text-muted">
          Checking available times...
        </div>
      ) : errorMsg ? (
        <div className="bg-surface border border-border/50 p-6 text-center text-muted">
          {errorMsg}
        </div>
      ) : slots.length === 0 ? (
        <div className="bg-surface border border-border/50 p-6 text-center text-muted">
          No times are available for this treatment on the selected date.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {slots.map((slotTime) => {
            const isSelected = time === slotTime

            return (
              <button
                key={slotTime}
                onClick={() => setTime(slotTime)}
                className={`
                  py-4 flex items-center justify-center rounded-sm font-medium transition-all duration-200 border text-sm
                  border-border/50 bg-surface hover:border-accent text-foreground hover:bg-surface/80
                  ${isSelected ? "bg-accent border-accent text-background hover:bg-accent hover:text-background" : ""}
                `}
              >
                {slotTime}
              </button>
            )
          })}
        </div>
      )}

      <div className="pt-8 border-t border-border/50 flex justify-between">
        <Button variant="text" onClick={() => setStep(2)} className="px-0 hover:bg-transparent hover:text-accent">
          Back
        </Button>
        <Button size="lg" onClick={() => setStep(4)} disabled={!time}>
          Continue to Details
        </Button>
      </div>
    </FadeIn>
  )
}
