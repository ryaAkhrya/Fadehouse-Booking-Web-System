# Security Policy

## About This Project

Fadehouse is a fictional barbershop booking application created as a portfolio and demonstration project.

Although this is not a production business, the application implements security practices for handling booking data, server-side validation, and database access.

## Reporting a Vulnerability

If you discover a security issue in this project, please avoid publicly disclosing sensitive details through a GitHub issue.

Instead, contact the repository owner privately through the contact information available on the GitHub profile.

Please include:

- A description of the issue
- Steps to reproduce it
- The affected page or feature
- Potential security impact

## Security Architecture

The application is designed around several core principles:

- Database credentials remain server-side.
- Customer bookings cannot be publicly enumerated.
- Booking management requires both Booking ID and phone number.
- Booking creation and cancellation are validated server-side.
- Client-provided pricing and duration are never trusted.
- Database queries use parameterized inputs.
- Booking creation uses transaction-safe PostgreSQL logic.
- Sensitive internal database errors are not exposed to users.

Detailed implementation notes are available in:

`docs/SECURITY.md`

## Scope

This repository is a portfolio project and does not currently operate as a real commercial barbershop service.

No real customer information should be submitted to the public demo.
