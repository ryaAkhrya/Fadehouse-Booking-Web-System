"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, CreditCard, X, AlertCircle } from "lucide-react"
import { lookupBooking, cancelBooking, ManagedBooking } from "@/app/actions/manage"

export default function ManageBookingPage() {
  const [bookingCode, setBookingCode] = useState("")
  const [phone, setPhone] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<ManagedBooking | null>(null)
  
  const [isCancelling, setIsCancelling] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setBooking(null)
    
    const res = await lookupBooking(bookingCode, phone)
    
    if (res.error) {
      setError(res.error)
    } else if (res.data) {
      setBooking(res.data)
    }
    
    setLoading(false)
  }

  const handleCancel = async () => {
    setIsCancelling(true)
    setError(null)
    
    const res = await cancelBooking(bookingCode, phone)
    
    if (res.error) {
      setError(res.error)
      setShowCancelModal(false)
    } else if (res.success) {
      const refresh = await lookupBooking(bookingCode, phone)
      if (refresh.data) {
        setBooking(refresh.data)
      }
      setShowCancelModal(false)
    }
    
    setIsCancelling(false)
  }

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative z-0">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-6 text-center">
          Manage Appointment
        </h1>
        
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          View or cancel your upcoming Fadehouse appointment using your Booking ID and phone number.
        </p>

        {/* Lookup Form */}
        {!booking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/50 border border-white/5 p-8 rounded-xl backdrop-blur-sm"
          >
            <form onSubmit={handleLookup} className="space-y-6">
              <div>
                <label htmlFor="bookingCode" className="block text-sm font-medium text-foreground/80 mb-2">
                  Booking ID
                </label>
                <input
                  id="bookingCode"
                  type="text"
                  required
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  placeholder="e.g. FH-A7K29Q"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 08123456789"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !bookingCode || !phone}
                className="w-full bg-foreground text-background font-medium py-4 rounded-lg hover:bg-foreground/90 transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Searching..." : "Find Appointment"}
              </button>
            </form>
          </motion.div>
        )}

        {/* Booking Details View */}
        {booking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setBooking(null)}
              className="text-sm text-muted hover:text-accent transition-colors mb-4 inline-flex items-center gap-2"
            >
              &larr; Back to search
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="bg-surface/50 border border-white/5 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/5">
                <div>
                  <p className="text-sm text-muted mb-1">Booking ID</p>
                  <p className="font-display font-bold text-2xl tracking-wider text-foreground">{booking.bookingCode}</p>
                </div>
                <div>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-white/10 text-muted border border-white/10'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="space-y-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Date</p>
                    <p className="font-medium text-foreground">{formatDate(booking.appointmentDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Time & Duration</p>
                    <p className="font-medium text-foreground">{booking.startTime.slice(0, 5)} - {booking.endTime.slice(0, 5)}</p>
                    <p className="text-sm text-muted mt-0.5">{booking.totalDuration} minutes total</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted mb-3">Treatments</p>
                    <div className="space-y-3">
                      {booking.services.map((s, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-foreground">{s.name}</span>
                          <span className="text-muted">{formatIDR(s.price)}</span>
                        </div>
                      ))}
                      <div className="pt-3 mt-3 border-t border-white/5 flex justify-between items-center font-medium">
                        <span className="text-foreground">Estimated Total</span>
                        <span className="text-accent">{formatIDR(booking.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Only show Cancel button if status is confirmed */}
              {booking.status === 'confirmed' && (
                <div className="pt-8 border-t border-white/5">
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="w-full sm:w-auto px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Cancellation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => !isCancelling && setShowCancelModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-white/10 p-8 rounded-xl max-w-md w-full relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => !isCancelling && setShowCancelModal(false)}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground uppercase tracking-wider mb-3">
                Cancel Appointment?
              </h3>
              
              <p className="text-muted mb-8 text-sm leading-relaxed">
                Are you sure you want to cancel your appointment for <span className="text-foreground font-medium">{booking?.appointmentDate && formatDate(booking.appointmentDate)}</span> at <span className="text-foreground font-medium">{booking?.startTime.slice(0, 5)}</span>? 
                This action cannot be undone and your slot will be released.
              </p>

              <div className="flex gap-3 flex-col-reverse sm:flex-row">
                <button
                  onClick={() => setShowCancelModal(false)}
                  disabled={isCancelling}
                  className="flex-1 py-3 px-4 border border-white/10 text-foreground rounded-lg hover:bg-white/5 transition-colors font-medium text-sm"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
