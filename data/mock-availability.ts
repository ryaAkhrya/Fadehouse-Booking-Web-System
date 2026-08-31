// Mock availability for Phase 4.
// Real availability will be implemented in Phase 5 via Supabase.

export const MOCK_BUSINESS_HOURS = {
  // Monday = 1, Sunday = 0
  1: { open: "10:00", close: "21:00" },
  2: { open: "10:00", close: "21:00" },
  3: { open: "10:00", close: "21:00" },
  4: { open: "10:00", close: "21:00" },
  5: { open: "13:00", close: "21:00" }, // Friday
  6: { open: "09:00", close: "22:00" }, // Saturday
  0: { open: "09:00", close: "20:00" }, // Sunday
}

// Predictable mock of unavailable start times for specific dates.
// In reality, this would query existing bookings from Supabase.
export const MOCK_UNAVAILABLE_SLOTS: Record<string, string[]> = {
  // Example specific dates if needed for testing
  "2026-09-02": ["10:00", "10:30", "15:00", "15:30", "18:00"],
  "2026-09-03": ["11:00", "11:30", "14:00"],
  "2026-09-04": ["13:00", "13:30", "14:00", "19:00", "19:30"],
}

export function generateTimeSlots(dateString: string, durationMinutes: number): string[] {
  const date = new Date(dateString)
  const day = date.getDay()
  
  const hours = MOCK_BUSINESS_HOURS[day as keyof typeof MOCK_BUSINESS_HOURS]
  if (!hours) return []

  const [openHour, openMin] = hours.open.split(":").map(Number)
  const [closeHour, closeMin] = hours.close.split(":").map(Number)
  
  const slots: string[] = []
  let currentMinutes = openHour * 60 + openMin
  const closeMinutes = closeHour * 60 + closeMin

  while (currentMinutes + durationMinutes <= closeMinutes) {
    const h = Math.floor(currentMinutes / 60)
    const m = currentMinutes % 60
    const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    slots.push(timeStr)
    currentMinutes += 30 // 30 min intervals
  }

  return slots
}

export function getMockUnavailableSlots(dateString: string): string[] {
  // Return deterministic unavailabilities based on odd/even dates if not in mock map
  if (MOCK_UNAVAILABLE_SLOTS[dateString]) {
    return MOCK_UNAVAILABLE_SLOTS[dateString]
  }

  const d = new Date(dateString)
  if (d.getDate() % 2 === 0) {
    // Even days have a busy lunch
    return ["12:00", "12:30", "13:00", "18:30"]
  } else {
    // Odd days have a busy morning
    return ["10:00", "10:30", "11:00"]
  }
}
