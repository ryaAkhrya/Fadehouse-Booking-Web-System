-- 00001_initial_schema.sql

-- Set timezone to UTC for database storage, application logic uses business timezone
SET timezone = 'UTC';

-- CREATE TABLES

CREATE TABLE public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    price integer NOT NULL CHECK (price >= 0),
    duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
    is_active boolean NOT NULL DEFAULT true,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code text UNIQUE NOT NULL,

    customer_name text NOT NULL,
    customer_phone text NOT NULL,
    notes text,

    appointment_date date NOT NULL,
    start_time time NOT NULL,
    end_time time NOT NULL,

    status text NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    total_price integer NOT NULL CHECK (total_price >= 0),
    total_duration integer NOT NULL CHECK (total_duration > 0),

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.booking_services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,

    service_name_snapshot text NOT NULL,
    price_snapshot integer NOT NULL,
    duration_snapshot integer NOT NULL,

    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.business_hours (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week integer UNIQUE NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    open_time time,
    close_time time,
    is_closed boolean NOT NULL DEFAULT false
);

CREATE TABLE public.business_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name text NOT NULL,
    timezone text NOT NULL,
    slot_interval_minutes integer NOT NULL CHECK (slot_interval_minutes > 0),
    max_concurrent_appointments integer NOT NULL CHECK (max_concurrent_appointments > 0),
    cancellation_cutoff_minutes integer NOT NULL CHECK (cancellation_cutoff_minutes >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_bookings_booking_code ON public.bookings(booking_code);
CREATE INDEX idx_bookings_customer_phone ON public.bookings(customer_phone);
CREATE INDEX idx_bookings_appointment_date ON public.bookings(appointment_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_schedule ON public.bookings(appointment_date, start_time, end_time, status);

CREATE INDEX idx_booking_services_booking_id ON public.booking_services(booking_id);
CREATE INDEX idx_booking_services_service_id ON public.booking_services(service_id);

CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_active_sort ON public.services(is_active, sort_order);

-- ROW LEVEL SECURITY (RLS)

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active services and business hours
CREATE POLICY "Allow public read access to active services" ON public.services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to business hours" ON public.business_hours
    FOR SELECT USING (true);

-- bookings, booking_services, business_settings have NO public policies.
-- Public anon users CANNOT select, insert, update, or delete.
-- All interaction with these tables must be done server-side using the service_role key.

-- BOOKING RPC FUNCTION
CREATE OR REPLACE FUNCTION public.create_booking(
    p_customer_name text,
    p_customer_phone text,
    p_notes text,
    p_appointment_date date,
    p_start_time time,
    p_service_ids uuid[]
) RETURNS json AS $$
DECLARE
    v_total_price integer := 0;
    v_total_duration integer := 0;
    v_end_time time;
    v_booking_id uuid;
    v_booking_code text;
    v_service record;
    v_overlap_count integer;
    v_max_capacity integer;
    v_business_hours record;
    v_treatment_names text[];
    v_chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    v_idx integer;
    v_code_unique boolean := false;
BEGIN
    -- Explicitly lock the bookings table to prevent concurrent capacity races
    LOCK TABLE public.bookings IN EXCLUSIVE MODE;

    -- 1. Validate Business Settings
    SELECT max_concurrent_appointments INTO v_max_capacity 
    FROM public.business_settings LIMIT 1;

    IF v_max_capacity IS NULL THEN
        RAISE EXCEPTION 'Business settings not found';
    END IF;

    -- 2. Validate Business Hours
    SELECT * INTO v_business_hours 
    FROM public.business_hours 
    WHERE day_of_week = EXTRACT(DOW FROM p_appointment_date);

    IF v_business_hours IS NULL OR v_business_hours.is_closed THEN
        RAISE EXCEPTION 'Fadehouse is closed on this day';
    END IF;

    -- 3. Calculate Totals and Snapshot Services
    FOR v_service IN 
        SELECT * FROM public.services WHERE id = ANY(p_service_ids) AND is_active = true
    LOOP
        v_total_price := v_total_price + v_service.price;
        v_total_duration := v_total_duration + v_service.duration_minutes;
    END LOOP;

    IF v_total_duration = 0 THEN
        RAISE EXCEPTION 'Invalid or inactive services selected';
    END IF;

    SELECT array_agg(name) INTO v_treatment_names
    FROM public.services
    WHERE id = ANY(p_service_ids);

    -- 4. Calculate End Time
    v_end_time := p_start_time + (v_total_duration || ' minutes')::interval;

    -- 5. Validate against closing time
    IF v_end_time > v_business_hours.close_time THEN
        RAISE EXCEPTION 'Appointment exceeds closing time';
    END IF;
    
    IF p_start_time < v_business_hours.open_time THEN
        RAISE EXCEPTION 'Appointment starts before opening time';
    END IF;

    -- 6. Check Capacity (Overlap logic)
    SELECT COUNT(*) INTO v_overlap_count
    FROM public.bookings
    WHERE status = 'confirmed'
      AND appointment_date = p_appointment_date
      AND p_start_time < end_time
      AND v_end_time > start_time;

    IF v_overlap_count >= v_max_capacity THEN
        RAISE EXCEPTION 'Slot is no longer available';
    END IF;

    -- 7. Generate Unique Booking Code
    WHILE NOT v_code_unique LOOP
        v_booking_code := 'FH-';
        FOR i IN 1..6 LOOP
            v_idx := trunc(random() * length(v_chars) + 1);
            v_booking_code := v_booking_code || substr(v_chars, v_idx, 1);
        END LOOP;

        IF NOT EXISTS (SELECT 1 FROM public.bookings WHERE booking_code = v_booking_code) THEN
            v_code_unique := true;
        END IF;
    END LOOP;

    -- 8. Insert Booking
    INSERT INTO public.bookings (
        booking_code,
        customer_name,
        customer_phone,
        notes,
        appointment_date,
        start_time,
        end_time,
        status,
        total_price,
        total_duration
    ) VALUES (
        v_booking_code,
        p_customer_name,
        p_customer_phone,
        p_notes,
        p_appointment_date,
        p_start_time,
        v_end_time,
        'confirmed',
        v_total_price,
        v_total_duration
    ) RETURNING id INTO v_booking_id;

    -- 9. Insert Booking Services Snapshots
    INSERT INTO public.booking_services (
        booking_id,
        service_id,
        service_name_snapshot,
        price_snapshot,
        duration_snapshot
    )
    SELECT 
        v_booking_id,
        id,
        name,
        price,
        duration_minutes
    FROM public.services
    WHERE id = ANY(p_service_ids);

    -- 10. Return success JSON
    RETURN json_build_object(
        'booking_id', v_booking_id,
        'booking_code', v_booking_code,
        'appointment_date', p_appointment_date,
        'start_time', p_start_time,
        'end_time', v_end_time,
        'total_duration', v_total_duration,
        'total_price', v_total_price,
        'treatments', v_treatment_names
    );
END;
$$ LANGUAGE plpgsql;
