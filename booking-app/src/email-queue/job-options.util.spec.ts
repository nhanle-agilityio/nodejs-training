import { buildJobOptions } from './job-options.util';

describe('buildJobOptions', () => {
  it('sets jobId, attempts, and exponential backoff', () => {
    expect(buildJobOptions('job-1')).toEqual({
      jobId: 'job-1',
      attempts: 5,
      backoff: { type: 'exponential', delay: 30_000 },
    });
  });

  it('merges optional delay', () => {
    expect(buildJobOptions('job-2', { delay: 60_000 })).toEqual({
      jobId: 'job-2',
      attempts: 5,
      backoff: { type: 'exponential', delay: 30_000 },
      delay: 60_000,
    });
  });
});
