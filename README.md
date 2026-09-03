# Fadehouse — Barbershop Booking

A modern barbershop appointment booking web application built as a portfolio project.

Fadehouse allows customers to browse treatments, check real-time appointment availability, create bookings, manage existing appointments, and cancel bookings without creating an account.

The project focuses on a clean booking experience, responsive design, server-side validation, and safe database operations.

## Live Demo

https://fadehouse-booking-web-system.vercel.app

> Fadehouse is a fictional barbershop created for portfolio and demonstration purposes. It does not represent a real business.

## Features

- Browse available barbershop treatments
- Select multiple treatments in one appointment
- Real-time appointment availability
- Capacity-based booking system
- Multi-step booking flow
- Automatic price and duration calculation
- Unique non-sequential booking ID
- Manage booking using Booking ID + phone number
- Cancel eligible appointments
- Automatic booking lifecycle handling
- English and Indonesian language support
- Responsive desktop and mobile interface
- Reduced-motion accessibility support
- Server-side input validation
- Transaction-safe booking creation
- Graceful media and loading fallbacks

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend**
- Next.js Server Actions
- Neon PostgreSQL
- PostgreSQL transactional booking logic

**Deployment**
- Vercel

## Booking Flow

```text
Choose Treatment
      ↓
Select Date
      ↓
Select Available Time
      ↓
Enter Customer Details
      ↓
Review Appointment
      ↓
Confirm Booking
      ↓
Receive Booking ID

Customers do not need to create an account.

Existing appointments can be accessed through Manage Booking using the combination of:

Booking ID + Phone Number
Booking Architecture

Fadehouse uses a capacity-based appointment system rather than exposing individual barber assignments.

Before a booking is created, the server:

Validates the selected treatments.
Retrieves trusted price and duration data from the database.
Calculates the appointment duration and end time.
Validates business hours.
Checks appointment capacity.
Re-checks availability during booking creation.
Creates the booking and treatment snapshots atomically.

Booking creation is handled through transaction-safe PostgreSQL logic to reduce race conditions and prevent partial bookings.

Booking Lifecycle

Bookings use three states:

confirmed
cancelled
completed

Cancelled appointments no longer consume appointment capacity.

Past confirmed appointments are automatically synchronized to the completed state when relevant booking data is accessed.

Security

Booking data is never publicly enumerable.

Important protections include:

DATABASE_URL remains server-only
No public endpoint for listing customer bookings
Booking management requires Booking ID + phone number
Generic lookup errors prevent customer enumeration
Cancellation is re-validated server-side
Client-provided prices and durations are never trusted
Inputs are normalized and validated server-side
Internal database IDs are not exposed as booking IDs
Database operations use parameterized queries
Booking creation uses atomic PostgreSQL logic
Sensitive database errors are not returned to customers

For additional implementation details, see:

docs/SECURITY.md

Performance & Quality

Production deployment has been tested using Lighthouse / PageSpeed Insights.

Audit	Desktop	Mobile
Performance	99	96
Accessibility	100	100
Best Practices	100	100
SEO	100	100

External website security scanning also returned an A rating during testing.

Audit scores may vary between runs and environments.

Local Development

Clone the repository:

git clone https://github.com/ryaAkhrya/Fadehouse-Booking-Web-System.git
cd Fadehouse-Booking-Web-System

Install dependencies:

npm install

Create a local environment file:

cp .env.example .env.local

Configure the required environment variable:

DATABASE_URL=your_postgresql_connection_string

Then start the development server:

npm run dev

Open:

http://localhost:3000
Environment Variables
Variable	Scope	Description
DATABASE_URL	Server only	PostgreSQL connection string

Never expose DATABASE_URL using a NEXT_PUBLIC_ prefix.

Project Structure
app/            Next.js routes and server actions
components/     Reusable UI and booking components
data/           Static treatment configuration
docs/           Product and engineering documentation
lib/            Database, localization, and shared utilities
public/         Static media and images
supabase/       Historical SQL migrations and seed files
types/          Shared TypeScript types

The project currently uses Neon PostgreSQL. The supabase/ directory is retained for historical SQL migration and seed files only.

Documentation

Additional project documentation is available inside /docs, including:

Product specification
Design system
Animation guidelines
Booking logic
Database architecture
Security specification
Content guidelines
Disclaimer

Fadehouse is a fictional business created as a web development portfolio project.

Names, locations, contact information, treatments, pricing, and other business information displayed in the application are for demonstration purposes only.
