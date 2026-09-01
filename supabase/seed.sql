-- Seed file for Fadehouse Database

-- 1. Business Settings
-- Using a fixed UUID as a singleton strategy
INSERT INTO public.business_settings (id, business_name, timezone, slot_interval_minutes, max_concurrent_appointments, cancellation_cutoff_minutes)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'Fadehouse Barbershop', 'Asia/Jakarta', 30, 3, 120)
ON CONFLICT (id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    timezone = EXCLUDED.timezone,
    slot_interval_minutes = EXCLUDED.slot_interval_minutes,
    max_concurrent_appointments = EXCLUDED.max_concurrent_appointments,
    cancellation_cutoff_minutes = EXCLUDED.cancellation_cutoff_minutes,
    updated_at = now();

-- 2. Business Hours
-- day_of_week is a UNIQUE constraint, so we can use ON CONFLICT (day_of_week)
INSERT INTO public.business_hours (day_of_week, open_time, close_time, is_closed)
VALUES 
    (1, '10:00:00', '21:00:00', false), -- Monday
    (2, '10:00:00', '21:00:00', false), -- Tuesday
    (3, '10:00:00', '21:00:00', false), -- Wednesday
    (4, '10:00:00', '21:00:00', false), -- Thursday
    (5, '13:00:00', '21:00:00', false), -- Friday
    (6, '09:00:00', '22:00:00', false), -- Saturday
    (0, '09:00:00', '20:00:00', false)  -- Sunday
ON CONFLICT (day_of_week) DO UPDATE SET
    open_time = EXCLUDED.open_time,
    close_time = EXCLUDED.close_time,
    is_closed = EXCLUDED.is_closed;

-- 3. Services
-- slug is a UNIQUE constraint, so we can use ON CONFLICT (slug)
INSERT INTO public.services (name, slug, description, price, duration_minutes, sort_order)
VALUES 
    ('Signature Haircut', 'signature-haircut', 'A clean Fadehouse cut finished with styling.', 75000, 45, 10),
    ('Haircut + Wash', 'haircut-wash', 'Haircut, wash, and finished styling in one appointment.', 90000, 60, 20),
    ('Haircut + Beard', 'haircut-beard', 'Haircut paired with precise beard grooming.', 110000, 75, 30),
    ('Beard Grooming', 'beard-grooming', 'Shape, clean up, and finish for a sharper beard line.', 55000, 30, 40),
    ('Hair Spa', 'hair-spa', 'A relaxing treatment focused on hair condition and comfort.', 85000, 45, 50),
    ('Scalp Detox', 'scalp-detox', 'Deep cleansing treatment for scalp buildup and excess oil.', 100000, 45, 60),
    ('Premium Grooming Package', 'premium-grooming-package', 'A complete grooming session combining core Fadehouse treatments.', 150000, 90, 70)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    duration_minutes = EXCLUDED.duration_minutes,
    sort_order = EXCLUDED.sort_order,
    is_active = EXCLUDED.is_active,
    updated_at = now();
