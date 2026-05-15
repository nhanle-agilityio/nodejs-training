import { BOOKING_REMINDER } from './booking-reminder.constants';

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
