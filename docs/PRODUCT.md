# Product Specification

## Product

**Fadehouse Barbershop — Booking / Appointment Website**

A premium local-business website focused on treatment-based appointment booking.

The customer does **not** choose:
- hairstyle/model haircut,
- barber,
- staff member.

The customer chooses:
- treatment(s),
- date,
- available time,
- personal booking details.

## Primary User Goal

Book an appointment quickly without creating an account.

## Core User Flow

```txt
Homepage
→ Browse Treatments
→ Book Appointment
→ Select Treatment(s)
→ Choose Date
→ Choose Available Time
→ Enter Customer Details
→ Review Appointment
→ Confirm Booking
→ Booking Stored
→ Booking Success
→ Save/Copy Booking ID
```

## Booking Data Collected

Required:
- Full Name
- Phone Number

Optional:
- Notes

Email is not required for MVP because the website does not send confirmation emails.

## Treatment Selection

- Customer can select one or multiple treatments.
- Each treatment has price and duration.
- Total price = sum of selected treatment prices.
- Total duration = sum of selected treatment durations.
- Total price is presented as an estimated payable amount at Fadehouse.
- Payment happens offline/directly at Fadehouse.

## Success Page

Must show:
- `Appointment Confirmed`
- Booking ID
- appointment date
- start time
- end time
- selected treatments
- total duration
- estimated total
- payment information
- `Copy Booking ID`
- reminder to save Booking ID

Do not claim an email was sent.

Suggested message:
> Save your Booking ID. You will need it together with your phone number to manage this appointment later.

## Booking Management

Customer can access `Manage Booking`.

Inputs:
- Booking ID
- Phone Number

Both values must match before booking details are shown.

Booking ID alone is not enough.
Phone number alone is not enough.

## Manage Booking Detail

Display:
- Booking ID
- date
- start/end time
- treatments
- duration
- estimated total
- booking status
- cancellation action when allowed

Never display other customers' bookings.

## Cancellation

A customer can cancel a `confirmed` appointment if it is still inside the allowed cancellation window.

Flow:

```txt
Manage Booking
→ Cancel Appointment
→ Confirmation Modal
→ Confirm Cancellation
→ Booking status = cancelled
→ Capacity becomes available again
```

Cancellation modal must clearly show appointment date/time and explain that the reserved time will be released.

Cancellation is not reversible in the MVP.

## Booking Statuses

Only:

- `confirmed`
- `cancelled`
- `completed`

Lifecycle:

```txt
confirmed → cancelled
confirmed → completed
```

Do not introduce `pending` unless product scope changes.

## Completed Status

Preferred behavior:
- appointment has `start_time` and calculated `end_time`,
- after `end_time` has passed, booking can automatically become `completed`.

Optional MVP automation:
- n8n scheduled workflow finds `confirmed` bookings where `end_time < now`,
- updates them to `completed`.

If n8n is not deployed 24/7, core booking must continue functioning normally.

n8n must never be required for:
- creating bookings,
- checking availability,
- viewing bookings,
- cancelling bookings.

## Capacity Model

There is no staff/barber assignment.

Fadehouse instead has:

```txt
max_concurrent_appointments
```

Example:
- capacity = 3
- three overlapping confirmed bookings means no further appointment can overlap that period.

This setting represents how many customers Fadehouse can handle at the same time.

## Public Pages

### Homepage `/`
Purpose:
- brand impression
- treatment discovery
- premium visual experience
- direct booking CTA
- opening hours
- location

Suggested section order:
1. Navbar
2. Cinematic Hero
3. Treatment Highlight
4. Fadehouse Standard / Experience
5. Treatment / Pricing Preview
6. Booking CTA
7. Opening Hours + Location
8. Footer

### Treatments `/treatments`
- full list
- price
- duration
- short treatment description
- treatment interactions
- direct booking CTA

### Booking `/booking`
Multi-step experience:
1. Treatment
2. Date
3. Time
4. Details
5. Review

Avoid traditional long form layout.

### Booking Success `/booking/success`
Confirmation and Booking ID.

### Manage `/manage`
Booking ID + phone lookup.

### Appointment Detail `/manage/[bookingId]`
Protected booking view after successful verification.

### Location `/location`
Optional separate page.
May be merged into homepage if stronger UX.

## Out of Scope

Explicitly excluded from MVP:

- authentication
- customer account
- signup/signin
- admin dashboard
- staff dashboard
- staff selection
- barber assignment
- customer selecting haircut style
- payment gateway
- online checkout
- email sending
- SMS/WhatsApp automation
- fake email success
- loyalty points
- review system
- membership
- coupons
- search
- ecommerce
- inventory
- analytics dashboard

## Product Tone

The website must feel:
- high-class,
- modern,
- controlled,
- confident,
- premium,
- physical/local-business focused.

It must not feel like:
- a SaaS dashboard,
- an AI startup,
- a template marketplace theme,
- a generic barber landing page.
