"use client"

import React, { createContext, useContext, useState, useMemo } from "react"
import { treatments as allTreatments } from "@/data/treatments"

export type BookingStep = 1 | 2 | 3 | 4 | 5

export interface CustomerDetails {
  name: string
  phone: string
  notes: string
}

interface BookingState {
  step: BookingStep
  treatmentIds: string[]
  date: string | null
  time: string | null
  details: CustomerDetails
  totalDuration: number
  totalPrice: number
  
  setStep: (step: BookingStep) => void
  toggleTreatment: (id: string) => void
  setDate: (date: string | null) => void
  setTime: (time: string | null) => void
  setDetails: (details: Partial<CustomerDetails>) => void
  resetBooking: () => void
}

const BookingContext = createContext<BookingState | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<BookingStep>(1)
  const [treatmentIds, setTreatmentIds] = useState<string[]>([])
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetailsState] = useState<CustomerDetails>({ name: "", phone: "", notes: "" })

  const { totalDuration, totalPrice } = useMemo(() => {
    return treatmentIds.reduce(
      (acc, id) => {
        const t = allTreatments.find((t) => t.id === id)
        if (t) {
          acc.totalDuration += t.durationMinutes
          acc.totalPrice += t.price
        }
        return acc
      },
      { totalDuration: 0, totalPrice: 0 }
    )
  }, [treatmentIds])

  const toggleTreatment = (id: string) => {
    setTreatmentIds((prev) => 
      prev.includes(id) ? prev.filter((tId) => tId !== id) : [...prev, id]
    )
    // If time was selected and duration changes, we should ideally clear the time
    // to prevent invalid time slots in Phase 5, but for Phase 4 mock we just clear it.
    setTime(null)
  }

  const setDetails = (newDetails: Partial<CustomerDetails>) => {
    setDetailsState((prev) => ({ ...prev, ...newDetails }))
  }

  const resetBooking = () => {
    setStep(1)
    setTreatmentIds([])
    setDate(null)
    setTime(null)
    setDetailsState({ name: "", phone: "", notes: "" })
  }

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        treatmentIds,
        toggleTreatment,
        date,
        setDate,
        time,
        setTime,
        details,
        setDetails,
        totalDuration,
        totalPrice,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
