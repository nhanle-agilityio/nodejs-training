import { buildJobOptions } from '../../email-queue/job-options.util';

export const bookingEmailJobIds = {
  confirmed: (bookingId: string) => `booking-confirmed-${bookingId}`,
  cancelled: (bookingId: string) => `booking-cancelled-${bookingId}`,
  reminder: (bookingId: string) => `reminder-${bookingId}`,
};

export const bookingConfirmedJobOptions = (bookingId: string) =>
  buildJobOptions(bookingEmailJobIds.confirmed(bookingId));

export const bookingCancelledJobOptions = (bookingId: string) =>
  buildJobOptions(bookingEmailJobIds.cancelled(bookingId));

export const bookingReminderJobOptions = (bookingId: string, delayMs: number) =>
  buildJobOptions(bookingEmailJobIds.reminder(bookingId), { delay: delayMs });
