"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeIn({ children, className, delay = 0, duration = 0.5 }: FadeInProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
