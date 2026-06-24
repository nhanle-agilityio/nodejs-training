import { BOOKING_PAYMENT_PENDING_EXPIRY } from './booking-expiry.constants';
import {
  bookingPaymentExpiresAt,
  isBookingPaymentExpired,
  pendingPaymentCutoff,
} from './booking-payment.util';
import type { Booking } from '../booking.entity';

const TTL_MS = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;

describe('booking-payment.util', () => {
  const createdAt = new Date('2026-06-01T10:00:00.000Z');
  const booking = { createdAt } as Booking;

  describe('bookingPaymentExpiresAt', () => {
    it('returns createdAt plus the pending TTL', () => {
      const expected = new Date(createdAt.getTime() + TTL_MS);
      expect(bookingPaymentExpiresAt(booking)).toEqual(expected);
    });
  });

  describe('isBookingPaymentExpired', () => {
    it('returns false when still inside the payment window', () => {
      const now = createdAt.getTime() + TTL_MS - 1;
      expect(isBookingPaymentExpired(booking, now)).toBe(false);
    });

    it('returns true exactly at the expiry instant', () => {
      const now = createdAt.getTime() + TTL_MS;
      expect(isBookingPaymentExpired(booking, now)).toBe(true);
    });

    it('returns true after the expiry instant', () => {
      const now = createdAt.getTime() + TTL_MS + 60_000;
      expect(isBookingPaymentExpired(booking, now)).toBe(true);
    });
  });

  describe('pendingPaymentCutoff', () => {
    it('returns a date equal to now minus the pending TTL', () => {
      const fixedNow = new Date('2026-06-01T10:15:00.000Z').getTime();
      const cutoff = pendingPaymentCutoff(fixedNow);
      expect(cutoff).toEqual(new Date(fixedNow - TTL_MS));
    });

    it('uses Date.now() when no argument is provided', () => {
      const before = Date.now() - TTL_MS;
      const cutoff = pendingPaymentCutoff();
      const after = Date.now() - TTL_MS;

      expect(cutoff.getTime()).toBeGreaterThanOrEqual(before);
      expect(cutoff.getTime()).toBeLessThanOrEqual(after);
    });
  });
});
