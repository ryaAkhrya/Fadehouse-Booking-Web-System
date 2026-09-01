"use client"

import React, { createContext, useContext, useState, useMemo, useEffect } from "react"
import { getAvailableServices } from "@/app/actions/booking"
import { Database } from "@/types/database"

export type Service = Database['public']['Tables']['services']['Row']


export type BookingStep = 1 | 2 | 3 | 4 | 5

export interface CustomerDetails {
  name: string
  phone: string
  notes: string
}

export interface BookingSuccessData {
  bookingCode: string
  date: string
  startTime: string
  endTime: string
  totalDuration: number
  totalPrice: number
  treatments: string[]
}

interface BookingState {
  step: BookingStep
  treatmentIds: string[]
  date: string | null
  time: string | null
  details: CustomerDetails
  totalDuration: number
  totalPrice: number
  services: Service[]
  isLoadingServices: boolean
  successData: BookingSuccessData | null

  
  setStep: (step: BookingStep) => void
  toggleTreatment: (id: string) => void
  setDate: (date: string | null) => void
  setTime: (time: string | null) => void
  setDetails: (details: Partial<CustomerDetails>) => void
  setSuccessData: (data: BookingSuccessData | null) => void
  resetBooking: () => void
}

const BookingContext = createContext<BookingState | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<BookingStep>(1)
  const [treatmentIds, setTreatmentIds] = useState<string[]>([])
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetailsState] = useState<CustomerDetails>({ name: "", phone: "", notes: "" })
  const [services, setServices] = useState<Service[]>([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  const [successData, setSuccessData] = useState<BookingSuccessData | null>(null)

  useEffect(() => {
    async function loadServices() {
      setIsLoadingServices(true)
      try {
        const data = await getAvailableServices()
        setServices(data || [])
      } catch (error) {
        console.error("Failed to load services", error)
      } finally {
        setIsLoadingServices(false)
      }
    }
    loadServices()
  }, [])


  const { totalDuration, totalPrice } = useMemo(() => {
    return treatmentIds.reduce(
      (acc, id) => {
        const t = services.find((t) => t.id === id)
        if (t) {
          acc.totalDuration += t.duration_minutes
          acc.totalPrice += t.price
        }
        return acc
      },
      { totalDuration: 0, totalPrice: 0 }
    )
  }, [treatmentIds, services])

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
    setSuccessData(null)
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
        services,
        isLoadingServices,
        successData,
        setSuccessData,
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
