export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';

export interface Treatment {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
}
