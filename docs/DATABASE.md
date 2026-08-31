# Database Specification

## Database

Supabase PostgreSQL.

The schema should remain small and explicit for MVP.

## Tables

### `services`

Purpose:
Source of truth for bookable treatments.

Suggested columns:

```txt
id                  uuid primary key
name                text not null
slug                text unique not null
description         text
price               integer not null
duration_minutes    integer not null
is_active           boolean not null default true
sort_order          integer not null default 0
created_at          timestamptz not null default now()
updated_at          timestamptz not null default now()
```

Use integer currency units for IDR, e.g. `75000`, not float.

### `bookings`

Purpose:
One appointment per customer booking.

Suggested columns:

```txt
id                  uuid primary key
booking_code        text unique not null

customer_name       text not null
customer_phone      text not null
notes               text

appointment_date    date not null
start_time          time not null
end_time            time not null

status              text not null
total_price         integer not null
total_duration      integer not null

created_at          timestamptz not null default now()
updated_at          timestamptz not null default now()
```

Status should be constrained to:
- confirmed
- cancelled
- completed

### `booking_services`

Purpose:
Many-to-many relation between bookings and services, with historical snapshots.

Suggested columns:

```txt
id                         uuid primary key
booking_id                 uuid not null references bookings(id)
service_id                 uuid references services(id)

service_name_snapshot      text not null
price_snapshot             integer not null
duration_snapshot          integer not null

created_at                 timestamptz not null default now()
```

Snapshots are required.

Reason:
If a service changes from Rp75.000 to Rp85.000 later, old bookings must still show the original booked price and duration.

### `business_hours`

Purpose:
Recurring weekly opening hours.

Suggested columns:

```txt
id             uuid primary key
day_of_week    integer unique not null
open_time      time
close_time     time
is_closed      boolean not null default false
```

Recommended day convention:
- 0 = Sunday
- 1 = Monday
- ...
- 6 = Saturday

Closed days may use null open/close values.

### `business_settings`

Purpose:
Single-row or key-value business configuration.

Preferred simple single-row structure:

```txt
id                              uuid primary key
business_name                   text not null
timezone                        text not null
slot_interval_minutes           integer not null
max_concurrent_appointments     integer not null
cancellation_cutoff_minutes     integer not null
created_at                      timestamptz not null default now()
updated_at                      timestamptz not null default now()
```

Example values:

```txt
business_name = Fadehouse Barbershop
timezone = Asia/Jakarta
slot_interval_minutes = 30
max_concurrent_appointments = 3
cancellation_cutoff_minutes = 120
```

## Suggested Relations

```txt
services
   ↑
   │
booking_services
   │
   ↓
bookings
```

`business_hours` and `business_settings` are independent configuration sources.

## Indexes

Recommended indexes:

```txt
bookings(booking_code)
bookings(customer_phone)
bookings(appointment_date)
bookings(status)
bookings(appointment_date, start_time, end_time, status)
booking_services(booking_id)
booking_services(service_id)
services(slug)
services(is_active, sort_order)
```

## Constraints

Required:
- unique booking code
- positive service price
- positive service duration
- positive booking total price
- positive booking total duration
- valid booking status
- positive capacity
- positive slot interval
- non-negative cancellation cutoff

## Seed Data

Seed should include realistic treatments such as:

```txt
Signature Haircut
Rp75.000
45 min

Haircut + Wash
Rp90.000
60 min

Haircut + Beard
Rp110.000
75 min

Beard Grooming
Rp55.000
30 min

Hair Spa
Rp85.000
45 min

Scalp Detox
Rp100.000
45 min

Premium Grooming Package
Rp150.000
90 min
```

These values are demo content and can be adjusted later.

Seed opening hours may use:

```txt
Monday      10:00–21:00
Tuesday     10:00–21:00
Wednesday   10:00–21:00
Thursday    10:00–21:00
Friday      13:00–21:00
Saturday    09:00–22:00
Sunday      09:00–20:00
```

## RLS / Access Model

Public browser must not receive unrestricted select/update access to `bookings`.

Preferred:
- public service data can be read safely,
- booking creation goes through server-side code,
- Manage Booking goes through server-side code,
- cancellation goes through server-side code,
- server holds privileged Supabase credentials.

Never expose service-role key in browser code.

## Historical Integrity

Booking totals and service snapshots must be created server-side from current service data at booking time.

Do not calculate historical booking details from current `services` values.

## Migration Files

When implementing Supabase, create SQL migration/seed files in a conventional database folder, for example:

```txt
/supabase/migrations/
/supabase/seed.sql
```

The coding agent should provide clear instructions for running migrations in Supabase.
