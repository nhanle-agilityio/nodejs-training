import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from '../email-queue/email-jobs.types';

export type BookingConfirmationEmailInput = BookingEmailJobData;
export type BookingReminderEmailInput = BookingEmailJobData;
export type BookingCancelledEmailInput = BookingCancelledEmailJobData;
