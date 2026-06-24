export const BOOKING_PAYMENT_PENDING_EXPIRY = {
  enabled: true,
  // Cron: every minute at second 0
  cronExpression: '0 * * * * *',
  timezone: 'UTC',
  // Minutes after createdAt before we auto-cancel
  pendingTtlMinutes: 15,
  // Max bookings to process per batch fetch
  batchSize: 50,
  // Max batches per cron tick. At defaults: 20 × 50 = 1000 bookings max per tick;
  maxBatchesPerRun: 20,
};
