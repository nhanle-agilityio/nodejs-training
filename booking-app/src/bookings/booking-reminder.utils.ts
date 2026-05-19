import { BookingStatus } from './booking.entity';
import { BOOKING_REMINDER } from './booking-reminder.constants';

export type BookingForReminder = {
  id: string;
  status: BookingStatus;
  reminderSentAt: Date | null;
  deletedAt?: Date | null;
  user?: { email: string | null; name?: string | null } | null;
  slot?: {
    title: string;
    startTime: Date;
    endTime: Date;
    deletedAt?: Date | null;
  } | null;
};

export const hasReminderEmail = (booking: BookingForReminder): boolean =>
  Boolean(booking.user?.email?.trim());

export const isReminderStatusEligible = (status: BookingStatus): boolean =>
  (BOOKING_REMINDER.statuses as readonly BookingStatus[]).includes(status);

export const isEligibleForReminderBooking = (
  booking: BookingForReminder,
  now: Date = new Date(),
): boolean => {
  if (!BOOKING_REMINDER.enabled) {
    return false;
  }
  if (booking.reminderSentAt) {
    return false;
  }
  if (booking.deletedAt) {
    return false;
  }
  if (!isReminderStatusEligible(booking.status)) {
    return false;
  }
  if (!hasReminderEmail(booking)) {
    return false;
  }
  const slot = booking.slot;
  if (!slot || slot.deletedAt) {
    return false;
  }
  if (slot.startTime <= now) {
    return false;
  }
  return true;
};

export const reminderLeadMs = (): number => {
  return (
    (BOOKING_REMINDER.leadHours * 60 + BOOKING_REMINDER.leadMinutes) * 60_000
  );
};

// Wall-clock time when the reminder should run for a given slot start
export const reminderFireAt = (slotStart: Date): Date => {
  return new Date(slotStart.getTime() - reminderLeadMs());
};

// Milliseconds from `now` until the reminder should run (`0` = run ASAP)
export const reminderDelayMs = (slotStart: Date, now: Date): number => {
  const fireAt = reminderFireAt(slotStart).getTime();
  return Math.max(0, fireAt - now.getTime());
};
