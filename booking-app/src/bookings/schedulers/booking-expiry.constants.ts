export const BOOKING_PAYMENT_PENDING_EXPIRY = {
  enabled: true,
  // Cron: every minute at second 0
  cronExpression: '0 * * * * *',
  timezone: 'UTC',
  // Minutes after createdAt before we auto-cancel
  pendingTtlMinutes: 15,
};
