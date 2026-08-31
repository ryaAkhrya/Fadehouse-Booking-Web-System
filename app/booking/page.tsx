"use client"

import { useBooking } from "@/lib/booking-context"
import { BookingSteps } from "@/components/booking/BookingSteps"
import { BookingSummary } from "@/components/booking/BookingSummary"
import { TreatmentStep } from "@/components/booking/steps/TreatmentStep"
import { DateStep } from "@/components/booking/steps/DateStep"
import { TimeStep } from "@/components/booking/steps/TimeStep"
import { DetailsStep } from "@/components/booking/steps/DetailsStep"
import { ReviewStep } from "@/components/booking/steps/ReviewStep"

export default function BookingPage() {
  const { step } = useBooking()

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-12">
          Reserve Your Time
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 flex-col-reverse lg:flex-row">
          <div className="lg:col-span-8 flex flex-col order-2 lg:order-1">
            <BookingSteps />
            
            <div className="mt-12 relative min-h-[500px]">
              {step === 1 && <TreatmentStep />}
              {step === 2 && <DateStep />}
              {step === 3 && <TimeStep />}
              {step === 4 && <DetailsStep />}
              {step === 5 && <ReviewStep />}
            </div>
          </div>
          
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-24">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
