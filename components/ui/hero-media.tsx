"use client"

import * as React from "react"
import { FallbackImage } from "./fallback-image"

export function HeroMedia() {
  const [videoError, setVideoError] = React.useState(false)

  return (
    <>
      <div className="absolute inset-0 z-0">
        <FallbackImage 
          src="/images/hero-poster.webp" 
          alt="Fadehouse Hero" 
          fill
          priority
          className="object-cover opacity-40 mix-blend-luminosity"
        />
      </div>
      
      {!videoError && (
        <>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity z-10 hidden md:block"
          >
            <source src="/media/hero.mp4" type="video/mp4" onError={() => setVideoError(true)} />
          </video>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity z-10 md:hidden"
          >
            <source src="/media/hero-mobile.mp4" type="video/mp4" onError={() => setVideoError(true)} />
          </video>
        </>
      )}
    </>
  )
}
