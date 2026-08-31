"use client"

import { useBooking, BookingStep } from "@/lib/booking-context"
import { cn } from "@/lib/utils"

const steps = [
  { num: 1, label: "Treatment" },
  { num: 2, label: "Date" },
  { num: 3, label: "Time" },
  { num: 4, label: "Details" },
  { num: 5, label: "Review" },
]

export function BookingSteps() {
  const { step, setStep, treatmentIds, date, time, details } = useBooking()

  const canNavigateTo = (targetStep: number) => {
    if (targetStep === 1) return true
    if (targetStep === 2) return treatmentIds.length > 0
    if (targetStep === 3) return treatmentIds.length > 0 && date !== null
    if (targetStep === 4) return treatmentIds.length > 0 && date !== null && time !== null
    if (targetStep === 5) return treatmentIds.length > 0 && date !== null && time !== null && details.name !== "" && details.phone !== ""
    return false
  }

  return (
    <div className="flex items-center gap-6 md:gap-10 overflow-x-auto pb-4 no-scrollbar border-b border-border/50">
      {steps.map((s) => {
        const isCurrent = step === s.num
        const isCompleted = step > s.num
        const isClickable = canNavigateTo(s.num)

        return (
          <button
            key={s.num}
            onClick={() => isClickable && setStep(s.num as BookingStep)}
            disabled={!isClickable}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors font-display tracking-wider uppercase",
              isCurrent ? "text-accent" : isCompleted ? "text-foreground hover:text-accent" : "text-muted opacity-40 cursor-not-allowed"
            )}
          >
            <span className="tabular-nums opacity-60">0{s.num}</span>
            <span>{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
