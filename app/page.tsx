import { Hero } from "@/components/sections/Hero"
import { TreatmentShowcase } from "@/components/sections/TreatmentShowcase"
import { Experience } from "@/components/sections/Experience"
import { BookingCTA } from "@/components/sections/BookingCTA"
import { LocationInfo } from "@/components/sections/LocationInfo"

export default function Home() {
  return (
    <>
      <Hero />
      <TreatmentShowcase />
      <Experience />
      <BookingCTA />
      <LocationInfo />
    </>
  )
}
