'use server';

import { sql } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';

export type ManagedBooking = {
  bookingCode: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  appointmentDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  totalDuration: number;
  customerName: string;
  customerPhone: string;
  notes: string | null;
  services: {
    name: string;
    price: number;
    duration: number;
  }[];
};

export async function lookupBooking(bookingCode: string, phone: string): Promise<{ data?: ManagedBooking; error?: string }> {
  if (!bookingCode || !phone) {
    return { error: 'Appointment not found. Check your Booking ID and phone number.' };
  }

  const nPhone = normalizePhone(phone);
  const code = bookingCode.trim().toUpperCase();

  try {
    // 1. Lazy lifecycle update: Mark as completed if end_time has passed in Jakarta timezone
    await sql`
      UPDATE public.bookings
      SET status = 'completed', updated_at = now()
      WHERE booking_code = ${code}
        AND customer_phone = ${nPhone}
        AND status = 'confirmed'
        AND (appointment_date + end_time) AT TIME ZONE 'Asia/Jakarta' <= current_timestamp
    `;

    // 2. Fetch booking details along with services snapshots
    const rows = await sql`
      SELECT
        b.booking_code,
        b.appointment_date,
        b.start_time,
        b.end_time,
        b.status,
        b.total_price,
        b.total_duration,
        b.customer_name,
        b.customer_phone,
        b.notes,
        COALESCE(
          json_agg(
            json_build_object(
              'name', s.service_name_snapshot,
              'price', s.price_snapshot,
              'duration', s.duration_snapshot
            )
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) as services
      FROM public.bookings b
      LEFT JOIN public.booking_services s ON s.booking_id = b.id
      WHERE b.booking_code = ${code} AND b.customer_phone = ${nPhone}
      GROUP BY b.id
    `;

    if (rows.length === 0) {
      return { error: 'Appointment not found. Check your Booking ID and phone number.' };
    }

    const row = rows[0];

    // Format safely to view model
    const data: ManagedBooking = {
      bookingCode: row.booking_code,
      status: row.status,
      appointmentDate: row.appointment_date instanceof Date ? row.appointment_date.toISOString().split('T')[0] : String(row.appointment_date),
      startTime: row.start_time,
      endTime: row.end_time,
      totalPrice: row.total_price,
      totalDuration: row.total_duration,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      notes: row.notes,
      services: row.services || []
    };

    return { data };
  } catch (err) {
    console.error('Lookup Error:', err);
    return { error: 'Appointment not found. Check your Booking ID and phone number.' };
  }
}

export async function cancelBooking(bookingCode: string, phone: string): Promise<{ success?: boolean; error?: string }> {
  if (!bookingCode || !phone) {
    return { error: 'Invalid details provided.' };
  }

  const nPhone = normalizePhone(phone);
  const code = bookingCode.trim().toUpperCase();

  try {
    // Attempt an atomic conditional update
    const resultRows = await sql`
      UPDATE public.bookings
      SET status = 'cancelled', updated_at = now()
      WHERE booking_code = ${code}
        AND customer_phone = ${nPhone}
        AND status = 'confirmed'
        AND (appointment_date + start_time) AT TIME ZONE 'Asia/Jakarta' > current_timestamp
      RETURNING booking_code
    `;

    if (resultRows.length === 0) {
      // 0 rows updated could mean: wrong phone, already cancelled, already started, or completed.
      // We return a safe generic message without leaking exact state unless they do a lookup.
      return { error: 'This appointment cannot be cancelled online.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Cancellation Error:', err);
    return { error: 'Failed to cancel appointment. Please try again or contact us.' };
  }
}
