import { BookingProvider } from "@/lib/booking-context"

export const metadata = {
  title: "Book Appointment | Fadehouse Barbershop",
  description: "Reserve your time at Fadehouse.",
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>
}
