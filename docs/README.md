# Fadehouse Barbershop

Fadehouse adalah project portfolio berupa website booking appointment untuk barbershop lokal dengan visual premium, dark, cinematic, modern, dan motion-heavy tanpa terasa seperti template SaaS atau AI-generated landing page.

## Project Goal

Membuat experience booking yang terasa seperti produk bisnis nyata:

- Customer melihat treatment, harga, dan durasi.
- Customer memilih satu atau beberapa treatment.
- Customer memilih tanggal dan time slot yang benar-benar tersedia.
- Customer mengisi nama, nomor HP, dan optional notes.
- Sistem menghitung total durasi dan estimasi harga.
- Booking disimpan ke Neon PostgreSQL.
- Customer menerima Booking ID di success page.
- Customer dapat mengelola booking menggunakan Booking ID + nomor HP.
- Customer dapat membatalkan appointment jika masih memenuhi aturan cancellation.
- Booking memiliki lifecycle: `confirmed`, `cancelled`, `completed`.
- Tidak ada online payment.
- Tidak ada login customer.
- Tidak ada admin dashboard.
- Tidak ada staff/barber selection.
- Tidak ada email sending pada MVP.
- n8n hanya opsional untuk automasi `completed`.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Neon PostgreSQL
- Motion / Framer Motion style motion library sesuai stack yang dipilih
- n8n opsional untuk appointment lifecycle automation

## Required Documentation

AI coding agent wajib membaca dokumen dalam urutan berikut sebelum implementasi:

1. `PRODUCT.md`
2. `DESIGN.md`
3. `ANIMATION.md`
4. `BOOKING_LOGIC.md`
5. `DATABASE.md`
6. `SECURITY.md`
7. `CONTENT.md`
8. `README.md`

Jika ada konflik antar dokumen, prioritaskan:
1. security dan booking correctness,
2. product scope,
3. design/motion rules,
4. implementation convenience.

## Main Routes

```txt
/
 /treatments
 /booking
 /booking/success
 /manage
 /manage/[bookingId]
 /location
```

`/location` boleh digabung ke homepage jika hasil akhirnya lebih kuat dan tidak mengurangi usability.

## Main Asset Locations

Gunakan placeholder terlebih dahulu, lalu beri instruksi jelas kepada pemilik project untuk mengganti aset.

Recommended structure:

```txt
/public/media/hero.mp4
/public/media/hero-mobile.mp4
/public/images/hero-poster.webp
/public/images/treatments/signature-haircut.webp
/public/images/treatments/haircut-beard.webp
/public/images/treatments/scalp-detox.webp
/public/images/treatments/hair-spa.webp
/public/images/barbershop/interior-01.webp
/public/images/barbershop/interior-02.webp
/public/images/og/fadehouse-og.webp
```

Hero visual ideal:
- short cinematic barber footage,
- 5–8 seconds,
- autoplay,
- muted,
- loop,
- playsInline,
- optimized/compressed,
- poster fallback,
- lighter mobile fallback.

AI coding agent boleh memakai temporary placeholder asset selama development, tetapi harus:
- menandai file path yang harus diganti,
- tidak mengandalkan AI-generated human sebagai final asset,
- tidak merusak layout jika video/foto belum tersedia.

## Development Phases

### Phase 1 — Foundation & Documentation
- Next.js + TypeScript + Tailwind setup
- Neon PostgreSQL setup
- environment structure
- folder architecture
- documentation locked

### Phase 2 — Design System & Global UI
- colors
- typography
- spacing
- responsive container
- buttons
- navbar
- mobile menu
- interaction primitives
- loading/error states
- global motion rules

### Phase 3 — Landing Page & Public Pages
- cinematic homepage
- treatments showcase
- Fadehouse Standard / experience section
- booking CTA
- opening hours
- location
- treatments page
- responsive behavior
- homepage animation

### Phase 4 — Booking Experience
- treatment step
- date step
- time step
- details step
- review step
- success state
- front-end interaction polish

### Phase 5 — Neon PostgreSQL & Booking Engine
- schema
- seed data
- service data
- business hours
- capacity logic
- slot generation
- overlap checks
- final availability validation
- real booking creation
- Booking ID generation

### Phase 6 — Manage, Cancel & Lifecycle
- Booking ID + phone verification
- booking detail
- cancel confirmation
- cancellation rules
- slot release
- booking statuses
- optional n8n auto-completed workflow

### Phase 7 — Final Polish & Production Readiness (Completed)
### Phase 7 — Final Polish & Production Readiness
- responsive QA
- accessibility check
- error/empty states
- metadata/SEO
- performance tweaks
- removal of debug logs
- strict separation of client/server boundary
- deployment readiness

## Non-Negotiable Product Decisions

Do not add:
- customer auth,
- signup/signin,
- admin panel,
- staff assignment,
- barber selection,
- online payment,
- email confirmation,
- fake "email sent" messaging,
- unnecessary dashboards,
- fake reviews or statistics.

Do not silently expand scope without an explicit reason.
