# Security Specification

## Security Goal

The website has no customer authentication, therefore every booking-related endpoint must be designed so that customer data is never publicly enumerable.

## Critical Rules

1. Never expose Supabase service-role key to the browser.
2. Never allow unrestricted public `SELECT * FROM bookings`.
3. Never expose a public endpoint that lists bookings.
4. Booking creation must be validated server-side.
5. Manage Booking must require Booking ID + phone number.
6. Cancellation must be validated server-side.
7. Final availability must be rechecked server-side before insert.
8. Client-submitted price and duration must never be trusted.
9. Input must be validated and normalized.
10. Sensitive error messages must not leak customer existence.

## Booking Creation

Client may submit:
- selected service IDs
- desired date
- desired start time
- customer name
- phone
- notes

Server must:
- validate each service ID,
- fetch real service price/duration,
- calculate totals,
- calculate end time,
- check business hours,
- check capacity,
- generate Booking ID,
- create booking.

## Manage Booking

Inputs:
- booking code
- phone number

Both must match.

Bad response:
> This phone number exists, but the booking ID is wrong.

Bad response:
> Booking FH-ABC123 exists but belongs to another phone number.

Preferred generic response:
> We couldn’t find an appointment matching those details.

## Phone Handling

Normalize phone before comparison when possible.

Example:
- trim spaces
- normalize common Indonesian `08...` / `+62...` representation consistently

Do not expose normalized phone values unnecessarily in UI.

## Rate Limiting

Rate-limit:
- booking creation
- Manage Booking lookup
- cancellation endpoint

Particularly important for Manage Booking to reduce brute-force enumeration attempts.

## Booking IDs

Booking IDs:
- must not be sequential,
- should not expose internal DB UUID,
- should have enough randomness.

Example:
`FH-A7K29Q`

Booking ID is still not treated as a secret.
Phone verification is also required.

## Server Boundary

Privileged database operations should happen in:
- Next.js server action,
- route handler,
- or equivalent trusted server environment.

Avoid direct browser writes to sensitive booking tables.

## RLS

Configure Supabase RLS so public/anon users cannot:
- list bookings,
- read arbitrary bookings,
- update arbitrary bookings,
- cancel arbitrary bookings.

Public read access may be allowed only for non-sensitive tables such as active services and business hours if implementation benefits from it.

## Error Handling

Do not return:
- raw SQL errors,
- stack traces,
- Supabase internal errors,
- secret config,
- internal IDs.

User-facing errors should be short and actionable.

Examples:

Slot conflict:
> 15:30 is no longer available. Choose another time.

Manage lookup fail:
> We couldn’t find an appointment matching those details.

Cancellation too late:
> This appointment can no longer be cancelled online.

## Double Booking / Race Conditions

A UI-level availability check is not sufficient.

Final server-side availability check is mandatory.

Where practical, implement database-level protection or transaction-safe logic to reduce race conditions.

## Environment Variables

Never commit secrets.

Expected categories:
- public Supabase URL
- public Supabase anon key if required
- server-only Supabase service-role key

Use clear prefixes so server-only secrets cannot be accidentally bundled into client code.

## Logging

Do not log full customer phone numbers or personal booking notes in production logs unless required for debugging and protected appropriately.

## No Fake Security

Do not add:
- fake lock icons,
- fake "encrypted" badges,
- fake security claims.

Security must be implemented, not marketed.
