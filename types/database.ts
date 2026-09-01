export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          duration_minutes: number
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          duration_minutes: number
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          duration_minutes?: number
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_code: string
          customer_name: string
          customer_phone: string
          notes: string | null
          appointment_date: string
          start_time: string
          end_time: string
          status: 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          total_duration: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_code: string
          customer_name: string
          customer_phone: string
          notes?: string | null
          appointment_date: string
          start_time: string
          end_time: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          total_duration: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_code?: string
          customer_name?: string
          customer_phone?: string
          notes?: string | null
          appointment_date?: string
          start_time?: string
          end_time?: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          total_duration?: number
          created_at?: string
          updated_at?: string
        }
      }
      booking_services: {
        Row: {
          id: string
          booking_id: string
          service_id: string | null
          service_name_snapshot: string
          price_snapshot: number
          duration_snapshot: number
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          service_id?: string | null
          service_name_snapshot: string
          price_snapshot: number
          duration_snapshot: number
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          service_id?: string | null
          service_name_snapshot?: string
          price_snapshot?: number
          duration_snapshot?: number
          created_at?: string
        }
      }
      business_hours: {
        Row: {
          id: string
          day_of_week: number
          open_time: string | null
          close_time: string | null
          is_closed: boolean
        }
        Insert: {
          id?: string
          day_of_week: number
          open_time?: string | null
          close_time?: string | null
          is_closed?: boolean
        }
        Update: {
          id?: string
          day_of_week?: number
          open_time?: string | null
          close_time?: string | null
          is_closed?: boolean
        }
      }
      business_settings: {
        Row: {
          id: string
          business_name: string
          timezone: string
          slot_interval_minutes: number
          max_concurrent_appointments: number
          cancellation_cutoff_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_name: string
          timezone: string
          slot_interval_minutes: number
          max_concurrent_appointments: number
          cancellation_cutoff_minutes: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string
          timezone?: string
          slot_interval_minutes?: number
          max_concurrent_appointments?: number
          cancellation_cutoff_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
