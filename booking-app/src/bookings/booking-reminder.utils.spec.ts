import { BOOKING_REMINDER } from './booking-reminder.constants';
import {
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
});
