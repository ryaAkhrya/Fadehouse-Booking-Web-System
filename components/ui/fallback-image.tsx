"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

export function FallbackImage({ className, alt, ...props }: ImageProps) {
  const [error, setError] = React.useState(false)

  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-surface/30 text-muted", className)}>
        <span className="text-[10px] tracking-widest uppercase opacity-40">Media Pending</span>
      </div>
    )
  }

  return (
    <Image
      className={className}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  )
}
