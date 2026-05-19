export const emailJobIds = {
  bookingConfirmed: (bookingId: string) => `booking-confirmed-${bookingId}`,
  bookingCancelled: (bookingId: string) => `booking-cancelled-${bookingId}`,
  bookingReminder: (bookingId: string) => `reminder-${bookingId}`,
} as const;

export const buildEmailJobOptions = (
  jobId: string,
  extra?: { delay?: number },
) => ({
  jobId,
  attempts: 5,
  backoff: { type: 'exponential' as const, delay: 30_000 },
  ...extra,
});

export const bookingConfirmedJobOptions = (bookingId: string) =>
  buildEmailJobOptions(emailJobIds.bookingConfirmed(bookingId));

export const bookingCancelledJobOptions = (bookingId: string) =>
  buildEmailJobOptions(emailJobIds.bookingCancelled(bookingId));

export const bookingReminderJobOptions = (bookingId: string, delayMs: number) =>
  buildEmailJobOptions(emailJobIds.bookingReminder(bookingId), {
    delay: delayMs,
  });
