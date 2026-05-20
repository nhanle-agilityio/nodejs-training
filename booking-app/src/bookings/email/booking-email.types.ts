import type { Booking } from '../booking.entity';
import type { BookingCancellationReason } from './booking-cancellation-reason';

// Booking row with relations required to build email jobs.
export type BookingWithEmailRelations = Booking & {
  user: { email: string; name: string | null };
  slot: {
    title: string;
    startTime: Date;
    endTime: Date;
    deletedAt?: Date | null;
  };
};

export interface BookingEmailJobData {
  to: string;
  recipientName: string;
  bookingId: string;
  slotTitle: string;
  slotStartIso: string;
  slotEndIso: string;
}

export interface BookingCancelledEmailJobData extends BookingEmailJobData {
  cancellationReason: BookingCancellationReason;
}
