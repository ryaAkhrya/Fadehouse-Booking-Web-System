import Link from "next/link"
import { FadeIn } from "@/components/motion/FadeIn"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
              FADEHOUSE
            </Link>
            <p className="mt-4 text-sm text-muted max-w-xs">
              Modern grooming, considered down to the detail. Precision without compromise.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Appointments</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/booking" className="text-sm text-muted hover:text-accent transition-colors">Book Appointment</Link>
                </li>
                <li>
                  <Link href="/treatments" className="text-sm text-muted hover:text-accent transition-colors">Treatments</Link>
                </li>
                <li>
                  <Link href="/manage" className="text-sm text-muted hover:text-accent transition-colors">Manage Booking</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Location</h3>
              <ul className="space-y-3">
                <li className="text-sm text-muted">
                  [FADEHOUSE ADDRESS]
                </li>
                <li className="text-sm text-muted">
                  [FADEHOUSE PHONE]
                </li>
                <li>
                  <a href="#" className="text-sm text-muted hover:text-accent transition-colors">[FADEHOUSE INSTAGRAM]</a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2} className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Fadehouse Barbershop. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
