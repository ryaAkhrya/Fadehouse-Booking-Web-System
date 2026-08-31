"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal } from "@/components/motion/Reveal"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function BookingSuccessPage() {
  const [copied, setCopied] = useState(false)
  
  // Phase 4 Demo ID
  const MOCK_BOOKING_ID = "FH-DEMO-A7K29Q"

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_BOOKING_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        
        <FadeIn delay={0.2} className="bg-surface border border-border/50 p-8 rounded-sm mb-12 max-w-lg mx-auto">
          <p className="text-sm text-muted uppercase tracking-wider mb-2">Booking ID</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-display text-3xl font-bold tracking-widest text-foreground">
              {MOCK_BOOKING_ID}
            </span>
            <button 
              onClick={handleCopy}
              className="p-2 border border-border/50 hover:bg-background hover:border-accent transition-colors rounded-sm text-muted hover:text-foreground"
              aria-label="Copy Booking ID"
            >
              {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          
          <p className="text-sm text-muted">
            Save this ID. You&apos;ll need it together with your phone number to manage the appointment later.
          </p>
          <div className="h-4 mt-2">
            {copied && (
              <p className="text-xs text-accent uppercase tracking-widest">Copied to clipboard</p>
            )}
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="min-w-[200px]">
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
