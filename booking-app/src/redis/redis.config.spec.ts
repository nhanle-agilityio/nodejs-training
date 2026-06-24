import { createAppRedisClient } from './redis.config';

describe('createAppRedisClient', () => {
  it('sets maxRetriesPerRequest null for BullMQ compatibility', () => {
    const client = createAppRedisClient({ host: 'localhost', port: 6379 });

    expect(client.options.host).toBe('localhost');
    expect(client.options.port).toBe(6379);
    expect(client.options.maxRetriesPerRequest).toBeNull();

    client.disconnect();
  });
});
