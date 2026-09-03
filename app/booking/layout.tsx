import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Book Appointment | Fadehouse Barbershop',
  description: 'Reserve your time at Fadehouse. Select your treatments, date, and time slot.',
}

import { BookingProvider } from "@/lib/booking-context"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BookingProvider>{children}</BookingProvider>
}
