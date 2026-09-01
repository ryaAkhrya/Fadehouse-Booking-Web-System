"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useBooking } from "@/lib/booking-context"
import { formatIDR, formatDuration } from "@/lib/utils"

export default function BookingSuccessPage() {
  const [copied, setCopied] = useState(false)
  const { successData, resetBooking } = useBooking()


  const handleCopy = () => {
    if (!successData) return
    navigator.clipboard.writeText(successData.bookingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!successData) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col items-center justify-center">
        <p className="text-muted mb-4">No recent booking found.</p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col items-center">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 w-full text-center">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-6">
            Appointment Confirmed
          </h1>
        </Reveal>
        
        <FadeIn delay={0.1}>
          <p className="text-lg text-muted mb-12">
            Your time is reserved.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2} className="bg-surface border border-border/50 p-8 rounded-sm mb-12 max-w-lg mx-auto w-full">
          <div className="text-center mb-8">
            <p className="text-sm text-muted uppercase tracking-wider mb-2">Booking ID</p>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="font-display text-3xl font-bold tracking-widest text-foreground">
                {successData.bookingCode}
              </span>
              <button 
                onClick={handleCopy}
                className="p-2 border border-border/50 hover:bg-background hover:border-accent transition-colors rounded-sm text-muted hover:text-foreground"
                aria-label="Copy Booking ID"
              >
                {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="h-4">
              {copied && (
                <p className="text-xs text-accent uppercase tracking-widest">Copied to clipboard</p>
              )}
            </div>
          </div>

          <div className="border-t border-border/30 pt-6 space-y-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Date</span>
              <span className="text-foreground font-medium">
                {new Date(successData.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Time</span>
              <span className="text-foreground font-medium">
                {successData.startTime.slice(0, 5)} - {successData.endTime.slice(0, 5)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Duration</span>
              <span className="text-foreground font-medium">{formatDuration(successData.totalDuration)}</span>
            </div>
            
            <div className="pt-2">
              <span className="text-muted text-sm block mb-1">Treatments</span>
              {successData.treatments.map((t, i) => (
                <div key={i} className="text-foreground text-sm font-medium">{t}</div>
              ))}
            </div>

            <div className="flex justify-between text-sm font-bold pt-4 border-t border-border/30 mt-4">
              <span className="text-foreground uppercase tracking-wide">Estimated Total</span>
              <span className="text-accent">{formatIDR(successData.totalPrice)}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted mt-8 text-center px-4">
            Save this ID. You&apos;ll need it together with your phone number to manage the appointment later.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.4} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="min-w-[200px]" onClick={() => resetBooking()}>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="min-w-[200px]">
            <Link href="/manage">Manage Appointment</Link>
          </Button>
        </FadeIn>
      </div>
    </div>
  )
}
