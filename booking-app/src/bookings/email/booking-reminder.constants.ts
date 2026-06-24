import { BookingStatus } from '../booking.entity';

export const BOOKING_REMINDER = {
  enabled: true,
  leadHours: 24,
  leadMinutes: 0,
  statuses: [BookingStatus.Confirmed],
};
