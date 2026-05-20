// Shared BullMQ job options (retries/backoff) for any queue producer.
export const buildJobOptions = (jobId: string, extra?: { delay?: number }) => ({
  jobId,
  attempts: 5,
  backoff: { type: 'exponential' as const, delay: 30_000 },
  ...extra,
});
