"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function MobileMenu() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground" onClick={closeMenu}>
                FADEHOUSE
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 px-6 pt-12 pb-24 h-full overflow-y-auto">
              <MobileNavLink href="/treatments" current={pathname} onClick={closeMenu}>{t.nav.treatments}</MobileNavLink>
              <MobileNavLink href="/location" current={pathname} onClick={closeMenu}>{t.nav.location}</MobileNavLink>
              <MobileNavLink href="/manage" current={pathname} onClick={closeMenu}>{t.nav.manage}</MobileNavLink>
              <div className="mt-auto pt-6 flex flex-col gap-6">
                <div className="flex justify-center">
                  <LanguageSwitcher className="text-base" />
                </div>
                <Link 
                  href="/booking"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center bg-foreground px-6 py-4 text-center text-sm font-medium text-background transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t.nav.book}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MobileNavLink({ href, current, onClick, children }: { href: string; current: string; onClick: () => void; children: React.ReactNode }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href))
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-3xl font-display font-medium tracking-tight transition-colors ${
        isActive ? "text-accent" : "text-foreground"
      }`}
    >
      {children}
    </Link>
  )
}
