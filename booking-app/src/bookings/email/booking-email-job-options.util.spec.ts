import {
  bookingCancelledJobOptions,
  bookingConfirmedJobOptions,
  bookingEmailJobIds,
  bookingReminderJobOptions,
} from './booking-email-job-options.util';

describe('booking-email-job-options.util', () => {
  const bookingId = 'b1111111-1111-1111-1111-111111111111';

  it('bookingEmailJobIds follow stable naming patterns', () => {
    expect(bookingEmailJobIds.confirmed(bookingId)).toBe(
      `booking-confirmed-${bookingId}`,
    );
    expect(bookingEmailJobIds.cancelled(bookingId)).toBe(
      `booking-cancelled-${bookingId}`,
    );
    expect(bookingEmailJobIds.reminder(bookingId)).toBe(
      `reminder-${bookingId}`,
    );
  });

  it('bookingConfirmedJobOptions includes shared retry settings', () => {
    expect(bookingConfirmedJobOptions(bookingId)).toEqual({
      jobId: `booking-confirmed-${bookingId}`,
      attempts: 5,
      backoff: { type: 'exponential', delay: 30_000 },
    });
  });

  it('bookingReminderJobOptions includes delay', () => {
    expect(bookingReminderJobOptions(bookingId, 60_000)).toEqual({
      jobId: `reminder-${bookingId}`,
      attempts: 5,
      backoff: { type: 'exponential', delay: 30_000 },
      delay: 60_000,
    });
  });

  it('bookingCancelledJobOptions matches cancelled job id', () => {
    expect(bookingCancelledJobOptions(bookingId).jobId).toBe(
      bookingEmailJobIds.cancelled(bookingId),
    );
  });
});
