import { BookingStatus } from '../booking.entity';
import { BOOKING_REMINDER } from './booking-reminder.constants';
import {
  isEligibleForReminderBooking,
  reminderDelayMs,
  reminderFireAt,
  reminderLeadMs,
} from './booking-reminder.utils';

describe('booking-reminder.utils', () => {
  it('reminderLeadMs matches BOOKING_REMINDER hours + minutes', () => {
    expect(reminderLeadMs()).toBe(
      (BOOKING_REMINDER.leadHours * 60 + BOOKING_REMINDER.leadMinutes) *
        60 *
        1000,
    );
  });

  it('reminderFireAt subtracts lead from slot start', () => {
    const slotStart = new Date('2026-06-10T12:00:00.000Z');
    expect(reminderFireAt(slotStart).toISOString()).toBe(
      '2026-06-09T12:00:00.000Z',
    );
  });

  it('reminderDelayMs returns millis until fire time', () => {
    const slotStart = new Date('2026-06-10T12:00:00.000Z');
    const now = new Date('2026-06-09T11:00:00.000Z');
    const expected = reminderFireAt(slotStart).getTime() - now.getTime();
    expect(reminderDelayMs(slotStart, now)).toBe(expected);
  });

  it('reminderDelayMs clamps at zero when fire time is past', () => {
    const slotStart = new Date('2026-06-10T12:00:00.000Z');
    const now = new Date('2026-06-10T13:00:00.000Z');
    expect(reminderDelayMs(slotStart, now)).toBe(0);
  });

  it('isEligibleForReminderBooking is false when slot already started', () => {
    const now = new Date('2026-06-10T12:00:00.000Z');
    expect(
      isEligibleForReminderBooking(
        {
          id: 'b1',
          status: BookingStatus.Confirmed,
          reminderSentAt: null,
          user: { email: 'a@b.com' },
          slot: {
            title: 'Slot name 1',
            startTime: new Date('2026-06-10T11:00:00.000Z'),
            endTime: new Date('2026-06-10T12:00:00.000Z'),
          },
        },
        now,
      ),
    ).toBe(false);
  });

  it('isEligibleForReminderBooking is false for PENDING bookings', () => {
    const now = new Date('2026-06-10T12:00:00.000Z');
    expect(
      isEligibleForReminderBooking(
        {
          id: 'b1',
          status: BookingStatus.Pending,
          reminderSentAt: null,
          user: { email: 'a@b.com' },
          slot: {
            title: 'Slot name 1',
            startTime: new Date('2026-06-12T12:00:00.000Z'),
            endTime: new Date('2026-06-12T13:00:00.000Z'),
          },
        },
        now,
      ),
    ).toBe(false);
  });

  it('isEligibleForReminderBooking is false when reminder was already sent', () => {
    const now = new Date('2026-06-10T12:00:00.000Z');
    expect(
      isEligibleForReminderBooking(
        {
          id: 'b1',
          status: BookingStatus.Confirmed,
          reminderSentAt: new Date('2026-06-09T12:00:00.000Z'),
          user: { email: 'a@b.com' },
          slot: {
            title: 'Slot name 1',
            startTime: new Date('2026-06-12T12:00:00.000Z'),
            endTime: new Date('2026-06-12T13:00:00.000Z'),
          },
        },
        now,
      ),
    ).toBe(false);
  });

  it('isEligibleForReminderBooking is false without user email', () => {
    const now = new Date('2026-06-10T12:00:00.000Z');
    expect(
      isEligibleForReminderBooking(
        {
          id: 'b1',
          status: BookingStatus.Confirmed,
          reminderSentAt: null,
          user: { email: '  ' },
          slot: {
            title: 'Slot name 1',
            startTime: new Date('2026-06-12T12:00:00.000Z'),
            endTime: new Date('2026-06-12T13:00:00.000Z'),
          },
        },
        now,
      ),
    ).toBe(false);
  });

  it('isEligibleForReminderBooking is true for CONFIRMED future booking', () => {
    const now = new Date('2026-06-10T12:00:00.000Z');
    expect(
      isEligibleForReminderBooking(
        {
          id: 'b1',
          status: BookingStatus.Confirmed,
          reminderSentAt: null,
          user: { email: 'a@b.com' },
          slot: {
            title: 'Slot name 1',
            startTime: new Date('2026-06-12T12:00:00.000Z'),
            endTime: new Date('2026-06-12T13:00:00.000Z'),
          },
        },
        now,
      ),
    ).toBe(true);
  });
});
