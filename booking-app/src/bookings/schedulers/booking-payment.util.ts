import { Booking } from '../booking.entity';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from './booking-expiry.constants';

export const bookingPaymentExpiresAt = (booking: Booking): Date => {
  const ttlMs = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;
  return new Date(booking.createdAt.getTime() + ttlMs);
};

export const isBookingPaymentExpired = (
  booking: Booking,
  now = Date.now(),
): boolean => {
  return now >= bookingPaymentExpiresAt(booking).getTime();
};

export const pendingPaymentCutoff = (now = Date.now()): Date => {
  const ttlMs = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;
  return new Date(now - ttlMs);
};
