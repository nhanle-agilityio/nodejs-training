import type { BookingEmailJobData } from '../email-queue/email-jobs.types';

export type BookingConfirmationEmailInput = BookingEmailJobData;
export type BookingReminderEmailInput = BookingEmailJobData;
export type BookingExpiredEmailInput = BookingEmailJobData;
export type BookingCancelledEmailInput = BookingEmailJobData;
