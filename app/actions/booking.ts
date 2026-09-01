'use server';

import { sql } from '@/lib/db';
import { Database } from '@/types/database';

import { normalizePhone } from '@/lib/phone';
export async function getAvailableServices() {
  try {
    const data = await sql`
      SELECT * FROM public.services
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;
    return data as Database['public']['Tables']['services']['Row'][];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getAvailability(dateString: string, treatmentIds: string[]): Promise<{ error: string | null; slots: string[] }> {
  if (!dateString || treatmentIds.length === 0) return { error: 'Invalid input', slots: [] };

  try {
    // 1. Load services to calculate total duration
    const services = await sql`
      SELECT id, duration_minutes
      FROM public.services
      WHERE id = ANY(${treatmentIds}::uuid[])
    `;

    if (!services || services.length !== treatmentIds.length) {
      return { error: 'Failed to load selected treatments', slots: [] };
    }

  const totalDuration = services.reduce((acc, s) => acc + s.duration_minutes, 0);

    // 2. Load business hours
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)
    
    const businessHoursRows = await sql`
      SELECT *
      FROM public.business_hours
      WHERE day_of_week = ${dayOfWeek}
      LIMIT 1
    `;
    const businessHours = businessHoursRows[0];

    if (!businessHours || businessHours.is_closed || !businessHours.open_time || !businessHours.close_time) {
      return { error: 'Fadehouse is closed on this day.', slots: [] };
    }

    // 3. Load business settings
    const settingsRows = await sql`
      SELECT *
      FROM public.business_settings
      LIMIT 1
    `;
    const settings = settingsRows[0];

    if (!settings) {
      return { error: 'Failed to load business settings.', slots: [] };
    }

  const slotInterval = settings.slot_interval_minutes;
  const maxCapacity = settings.max_concurrent_appointments;

  // 4. Generate candidate slots
  const slots: string[] = [];
  const openDate = new Date(`1970-01-01T${businessHours.open_time}Z`);
  const closeDate = new Date(`1970-01-01T${businessHours.close_time}Z`);
  
  let currentMs = openDate.getTime();
  const closeMs = closeDate.getTime();
  
  // Note: time comparisons are done on a dummy date (1970-01-01).
  while (currentMs + (totalDuration * 60000) <= closeMs) {
    const d = new Date(currentMs);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    currentMs += slotInterval * 60000;
  }

  if (slots.length === 0) {
    return { error: 'No times are available for this treatment on the selected date.', slots: [] };
  }

    // 5. Load existing confirmed bookings for this date
    const existingBookings = await sql`
      SELECT start_time, end_time
      FROM public.bookings
      WHERE appointment_date = ${dateString}
        AND status = 'confirmed'
    `;

  // 6. Check capacity
  const validSlots: string[] = [];

  for (const slot of slots) {
    const slotStartMs = new Date(`1970-01-01T${slot}:00Z`).getTime();
    const slotEndMs = slotStartMs + (totalDuration * 60000);

    // To properly check max capacity during this slot, we can check a few sample points
    // or just count how many existing bookings overlap this entire range. 
    // Wait, overlap rule: new_start < existing_end AND new_end > existing_start
    let overlapCount = 0;
    for (const b of (existingBookings || [])) {
        const bStart = new Date(`1970-01-01T${b.start_time}Z`).getTime();
        const bEnd = new Date(`1970-01-01T${b.end_time}Z`).getTime();
        if (slotStartMs < bEnd && slotEndMs > bStart) {
            overlapCount++;
        }
    }

      if (overlapCount < maxCapacity) {
          validSlots.push(slot);
      }
    }

    return { slots: validSlots, error: null };
  } catch (error) {
    console.error('Error in getAvailability:', error);
    return { error: 'Failed to check availability', slots: [] };
  }
}

export type BookingInput = {
    customerName: string;
    customerPhone: string;
    notes: string;
    date: string;
    time: string;
    treatmentIds: string[];
};

export async function createBooking(input: BookingInput) {
    // 1. Validate inputs
    if (!input.customerName || !input.customerPhone || !input.date || !input.time || input.treatmentIds.length === 0) {
        return { error: 'Missing required fields.' };
    }

    const phone = normalizePhone(input.customerPhone);

    try {
        // 2. Call RPC to insert atomically
        const resultRows = await sql`
            SELECT public.create_booking(
                ${input.customerName},
                ${phone},
                ${input.notes || ''},
                ${input.date}::date,
                ${`${input.time}:00`}::time,
                ${input.treatmentIds}::uuid[]
            ) AS result
        `;

        const data = resultRows[0]?.result;

        if (!data) {
            return { error: 'We couldn’t confirm the appointment. Please try again.' };
        }

        // 3. Return success data securely
        return {
            success: true,
            data: {
                bookingCode: data.booking_code,
                date: data.appointment_date,
                startTime: data.start_time,
                endTime: data.end_time,
                totalDuration: data.total_duration,
                totalPrice: data.total_price,
                treatments: data.treatments
            }
        };
    } catch (error: unknown) {
        console.error('RPC Booking Error:', error);
        const msg = error instanceof Error ? error.message : 'We couldn’t confirm the appointment. Please try again.';
        return { error: msg };
    }
}
