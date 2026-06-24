import { BookingStatus } from '../booking.entity';
import { BookingCancellationReason } from './booking-cancellation-reason';
import {
  toBookingCancelledEmailJobData,
  toBookingEmailJobData,
} from './booking-email-payload.util';
import type { BookingWithEmailRelations } from './booking-email.types';

describe('booking-email-payload.util', () => {
  const booking = {
    id: 'b1111111-1111-1111-1111-111111111111',
    status: BookingStatus.Confirmed,
    user: { email: 'guest@test.com', name: 'Guest' },
    slot: {
      title: 'Slot name 1',
      startTime: new Date('2026-06-15T14:00:00.000Z'),
      endTime: new Date('2026-06-15T15:00:00.000Z'),
    },
  } as BookingWithEmailRelations;

  it('toBookingEmailJobData maps booking relations to queue payload', () => {
    expect(toBookingEmailJobData(booking)).toEqual({
      to: 'guest@test.com',
      recipientName: 'Guest',
      bookingId: booking.id,
      slotTitle: 'Slot name 1',
      slotStartIso: '2026-06-15T14:00:00.000Z',
      slotEndIso: '2026-06-15T15:00:00.000Z',
    });
  });

  it('toBookingEmailJobData falls back recipient name', () => {
    expect(
      toBookingEmailJobData({
        ...booking,
        user: {
          email: 'guest@test.com',
          name: null,
        } as BookingWithEmailRelations['user'],
      }),
    ).toMatchObject({ recipientName: 'there' });
  });

  it('toBookingCancelledEmailJobData includes cancellation reason', () => {
    expect(
      toBookingCancelledEmailJobData(
        booking,
        BookingCancellationReason.PaymentTimeout,
      ),
    ).toEqual({
      ...toBookingEmailJobData(booking),
      cancellationReason: BookingCancellationReason.PaymentTimeout,
    });
  });
});
