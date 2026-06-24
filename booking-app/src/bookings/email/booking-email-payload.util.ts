import type { BookingCancellationReason } from './booking-cancellation-reason';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
  BookingWithEmailRelations,
} from './booking-email.types';

export const toBookingEmailJobData = (
  booking: BookingWithEmailRelations,
): BookingEmailJobData => ({
  to: booking.user.email,
  recipientName: booking.user.name ?? 'there',
  bookingId: booking.id,
  slotTitle: booking.slot.title,
  slotStartIso: booking.slot.startTime.toISOString(),
  slotEndIso: booking.slot.endTime.toISOString(),
});

export const toBookingCancelledEmailJobData = (
  booking: BookingWithEmailRelations,
  reason: BookingCancellationReason,
): BookingCancelledEmailJobData => ({
  ...toBookingEmailJobData(booking),
  cancellationReason: reason,
});
