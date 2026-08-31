export interface Treatment {
  id: string
  name: string
  price: number
  durationMinutes: number
  description: string
  image: string
}

export const treatments: Treatment[] = [
  {
    id: "signature-haircut",
    name: "Signature Haircut",
    price: 75000,
    durationMinutes: 45,
    description: "A clean Fadehouse cut finished with styling.",
    image: "/images/treatments/signature-haircut.webp"
  },
  {
    id: "haircut-wash",
    name: "Haircut + Wash",
    price: 90000,
    durationMinutes: 60,
    description: "Haircut, wash, and finished styling in one appointment.",
    image: "/images/treatments/signature-haircut.webp" // fallback
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    price: 110000,
    durationMinutes: 75,
    description: "Haircut paired with precise beard grooming.",
    image: "/images/treatments/haircut-beard.webp"
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming",
    price: 55000,
    durationMinutes: 30,
    description: "Shape, clean up, and finish for a sharper beard line.",
    image: "/images/treatments/haircut-beard.webp" // fallback
  },
  {
    id: "hair-spa",
    name: "Hair Spa",
    price: 85000,
    durationMinutes: 45,
    description: "A relaxing treatment focused on hair condition and comfort.",
    image: "/images/treatments/hair-spa.webp"
  },
  {
    id: "scalp-detox",
    name: "Scalp Detox",
    price: 100000,
    durationMinutes: 45,
    description: "Deep cleansing treatment for scalp buildup and excess oil.",
    image: "/images/treatments/scalp-detox.webp"
  },
  {
    id: "premium-package",
    name: "Premium Grooming Package",
    price: 150000,
    durationMinutes: 90,
    description: "A complete grooming session combining core Fadehouse treatments.",
    image: "/images/treatments/signature-haircut.webp" // fallback
  }
]
