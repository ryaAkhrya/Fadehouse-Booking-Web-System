"use client"

import * as React from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  width?: "fit-content" | "100%"
  delay?: number
}

export function Reveal({ children, className, width = "fit-content", delay = 0 }: RevealProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const mainControls = useAnimation()

  React.useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <div ref={ref} style={{ width }} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
