import type { BookingCancellationReason } from '../bookings/booking-cancellation-reason';

export interface BookingEmailJobData {
  to: string;
  recipientName: string | null;
  bookingId: string;
  slotTitle: string;
  slotStartIso: string;
  slotEndIso: string;
}

export interface BookingCancelledEmailJobData extends BookingEmailJobData {
  cancellationReason: BookingCancellationReason;
}
