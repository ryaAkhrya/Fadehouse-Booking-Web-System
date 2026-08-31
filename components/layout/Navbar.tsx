"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="font-display text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            FADEHOUSE
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLink href="/treatments" current={pathname}>Treatments</NavLink>
            <NavLink href="/location" current={pathname}>Location</NavLink>
            <NavLink href="/manage" current={pathname}>Manage Booking</NavLink>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/booking">Book Appointment</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({ href, current, children }: { href: string; current: string; children: React.ReactNode }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href))
  return (
    <Link 
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-accent",
        isActive ? "text-accent" : "text-muted"
      )}
    >
      {children}
    </Link>
  )
}
