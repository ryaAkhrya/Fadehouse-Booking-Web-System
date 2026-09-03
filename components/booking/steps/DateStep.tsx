"use client"

import React, { useState, useMemo } from "react"
import { useBooking } from "@/lib/booking-context"
import { FadeIn } from "@/components/motion/FadeIn"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function DateStep() {
  const { date, setDate, setStep } = useBooking()
  const { t, lang } = useLanguage()
  
  // Start calendar at currently selected date or today
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (date) {
      const d = new Date(date)
      d.setDate(1)
      return d
    }
    const d = new Date()
    d.setDate(1)
    return d
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const startingDayOfWeek = firstDay.getDay() // 0 = Sunday
    
    const days = []
    
    // Add empty slots for days before the 1st
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add real days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i)
      days.push(d)
    }
    
    return days
  }, [currentMonth])

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleDateSelect = (d: Date) => {
    // format as YYYY-MM-DD
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    setDate(dateString)
  }

  return (
    <FadeIn className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          {t.booking.steps.date.title}
        </h2>
        <p className="mt-2 text-muted">
          {t.booking.steps.date.desc}
        </p>
      </div>

      <div className="max-w-md bg-surface border border-border/50 p-6 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-lg tracking-wide">
            {new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={prevMonth}
              disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
              className="p-2 border border-border/50 hover:bg-background hover:border-accent disabled:opacity-30 transition-colors rounded-sm text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 border border-border/50 hover:bg-background hover:border-accent transition-colors rounded-sm text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-medium text-muted uppercase tracking-wider">
          {t.booking.steps.date.days.map(day => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((d, i) => {
            if (!d) return <div key={`empty-${i}`} className="p-2" />

            const isPast = d < today
            const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            const isSelected = date === dateString

            return (
              <button
                key={dateString}
                disabled={isPast}
                onClick={() => handleDateSelect(d)}
                className={`
                  aspect-square flex items-center justify-center rounded-sm text-sm font-medium transition-all duration-200
                  ${isPast ? "text-muted/30 cursor-not-allowed" : "hover:border-accent border border-transparent bg-background text-foreground hover:bg-accent/10"}
                  ${isSelected ? "bg-accent text-background font-bold border-accent hover:bg-accent hover:text-background" : ""}
                `}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-8 border-t border-border/50 flex justify-between">
        <Button variant="text" onClick={() => setStep(1)} className="px-0 hover:bg-transparent hover:text-accent">
          {t.booking.steps.buttons.back}
        </Button>
        <Button size="lg" onClick={() => setStep(3)} disabled={!date}>
          {t.booking.steps.buttons.continueToTime}
        </Button>
      </div>
    </FadeIn>
  )
}
