# Booking Logic Specification

## Core Principle

Booking correctness is more important than visual convenience.

All critical availability and booking rules must be validated server-side.

## Treatment Selection

Customer can select one or multiple active services.

For selected services:

```txt
total_price = SUM(service.price)
total_duration = SUM(service.duration_minutes)
```

At least one treatment is required.

Inactive services cannot be booked.

## Appointment Time

Booking has:
- appointment date
- start time
- end time

`end_time = start_time + total_duration`

Example:

```txt
Start: 15:30
Duration: 90 minutes
End: 17:00
```

## Slot Interval

Controlled by:

```txt
business_settings.slot_interval_minutes
```

Example:
- 30 minutes

Possible start times:
- 10:00
- 10:30
- 11:00
- etc.

A slot may start only when the complete appointment duration fits within opening hours and capacity.

## Business Hours

Availability is based on `business_hours`.

Rules:
- closed days have no availability,
- past dates cannot be selected,
- past time slots cannot be selected,
- appointment must fully end before closing time.

Example:
- closes at 21:00
- 90-minute appointment cannot begin at 20:00.

## Capacity Model

There is no barber/staff allocation.

Use:

```txt
max_concurrent_appointments
```

Example:
`max_concurrent_appointments = 3`

The system must ensure the maximum number of overlapping `confirmed` appointments never exceeds this value.

Cancelled appointments do not consume capacity.
Completed appointments in the past do not block future availability.

## Overlap Rule

Two time ranges overlap when:

```txt
new_start < existing_end
AND
new_end > existing_start
```

Use this overlap rule when evaluating every candidate time slot.

## Capacity Example

Capacity: 3

Existing:
- A: 15:00–16:00
- B: 15:30–17:00

A new booking at 15:30 may still be accepted if its overlap count remains below 3 for the full requested interval.

If adding the booking would produce more than 3 concurrent appointments at any point in its requested interval, reject it.

## Availability Generation

For a selected date and selected treatment duration:

1. Load business hours.
2. Reject if closed.
3. Generate candidate start times by `slot_interval_minutes`.
4. Calculate candidate end time.
5. Reject if candidate end exceeds closing time.
6. Load existing relevant `confirmed` bookings.
7. Evaluate overlap/capacity.
8. Return only valid candidate slots.

## Final Booking Validation

Availability must be checked twice:

### First check
When customer views/selects a slot.

### Final check
Immediately before booking is inserted.

Reason:
Two customers may see the same available time at nearly the same moment.

Never trust an availability result fetched several seconds earlier.

## Booking Creation

Server-side flow:

```txt
Receive booking request
→ Validate input
→ Validate selected services
→ Recalculate price/duration server-side
→ Recalculate end time
→ Recheck availability/capacity
→ Generate Booking ID
→ Insert booking
→ Insert booking_services snapshots
→ Return confirmation
```

Do not trust price or duration submitted by client.

## Booking ID

Generate a non-sequential, human-readable ID.

Example:

```txt
FH-A7K29Q
```

It should:
- be easy enough to read/copy,
- not expose database primary keys,
- not be trivially sequential.

Booking ID is a reference, not authentication.

## Manage Booking Verification

Customer must provide:
- Booking ID
- Phone Number

Both must match.

Do not return customer data when only one matches.

Do not expose whether a specific phone number exists in the database.

## Cancellation

Only `confirmed` bookings can be cancelled.

Optional business setting:

```txt
cancellation_cutoff_minutes
```

Example:
`120`

Meaning:
customer may cancel only if current time is more than 120 minutes before appointment start.

If cancellation is no longer allowed:
- show clear message,
- do not modify booking.

When cancelled:
- status = `cancelled`
- update `updated_at`
- release capacity immediately

## Completion

Preferred MVP lifecycle rule (Lazy synchronization):

A confirmed booking becomes `completed` automatically when a customer looks it up via Manage Booking AND its end time has passed.

```txt
Find booking:
status = confirmed
AND (appointment_date + end_time) AT TIME ZONE 'Asia/Jakarta' <= current_timestamp

Update:
status = completed
```

This lazy approach avoids external crons/n8n and safely keeps historical bookings accurate when viewed.

## Status Rules

Allowed statuses:

```txt
confirmed
cancelled
completed
```

Invalid:
- cancelled → confirmed
- completed → confirmed
- completed → cancelled
- cancelled → completed

unless future product scope explicitly adds administrative overrides.

## Booking Review

Before final confirmation show:
- date
- start/end time
- treatments
- individual prices
- total duration
- estimated total
- customer name
- phone
- notes if present
- offline payment statement

Allow editing previous steps before confirm.

## Timezone

All booking calculations must use a single configured business timezone.

Store timezone in:

```txt
business_settings.timezone
```

Do not rely on browser timezone for business rules.
