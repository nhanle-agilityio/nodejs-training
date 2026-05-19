import type { BookingCancellationReason } from '../bookings/booking-cancellation-reason';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './email-jobs.types';

export const toBookingEmailJobData = (booking: {
  id: string;
  user: { email: string; name: string | null };
  slot: { title: string; startTime: Date; endTime: Date };
}): BookingEmailJobData => {
  return {
    to: booking.user.email,
    recipientName: booking.user.name,
    bookingId: booking.id,
    slotTitle: booking.slot.title,
    slotStartIso: booking.slot.startTime.toISOString(),
    slotEndIso: booking.slot.endTime.toISOString(),
  };
};

export const toBookingCancelledEmailJobData = (
  booking: {
    id: string;
    user: { email: string; name: string | null };
    slot: { title: string; startTime: Date; endTime: Date };
  },
  reason: BookingCancellationReason,
): BookingCancelledEmailJobData => ({
  ...toBookingEmailJobData(booking),
  cancellationReason: reason,
});
