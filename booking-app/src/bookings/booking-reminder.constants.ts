import { BookingStatus } from './booking.entity';

export const BOOKING_REMINDER = {
  // Master switch for the daily scan cron
  enabled: true,
  // Cron expression for the DB scan (here: 06:00 daily in `timezone`)
  cronExpression: '0 0 6 * * *',
  timezone: 'UTC',
  // Hours before slot start when the reminder should fire
  leadHours: 24,
  // Additional minutes added to lead (0 = use whole hours only)
  leadMinutes: 0,
  // Only consider slots starting within this many days from “now”
  lookaheadDays: 2,
  // Bookings in these statuses may receive a reminder
  statuses: [BookingStatus.Pending, BookingStatus.Confirmed],
};
