import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckError } from '@nestjs/terminus';
import { REDIS_CLIENT } from '../redis/redis.module';
import { RedisHealthIndicator } from './redis.health';

describe('RedisHealthIndicator', () => {
  let indicator: RedisHealthIndicator;
  let redis: { ping: jest.Mock };

  beforeEach(async () => {
    redis = { ping: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisHealthIndicator,
        { provide: REDIS_CLIENT, useValue: redis },
      ],
    }).compile();

    indicator = module.get(RedisHealthIndicator);
  });

  describe('isHealthy', () => {
    it('reports healthy status when redis responds with PONG', async () => {
      redis.ping.mockResolvedValue('PONG');

      const result = await indicator.isHealthy('redis');

      expect(result).toMatchObject({ redis: { status: 'up' } });
    });

    it('reports unhealthy status when redis responds with unexpected value', async () => {
      redis.ping.mockResolvedValue('ERROR');

      const result = await indicator.isHealthy('redis');

      expect(result).toMatchObject({ redis: { status: 'down' } });
    });

    it('throws HealthCheckError when redis.ping rejects', async () => {
      redis.ping.mockRejectedValue(new Error('Connection refused'));

      await expect(indicator.isHealthy('redis')).rejects.toBeInstanceOf(
        HealthCheckError,
      );
    });

    it('throws HealthCheckError when redis ping times out', async () => {
      jest.useFakeTimers();
      try {
        redis.ping.mockReturnValue(new Promise(() => {})); // never resolves

        const healthPromise = indicator.isHealthy('redis');
        jest.advanceTimersByTime(3001);

        await expect(healthPromise).rejects.toBeInstanceOf(HealthCheckError);
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
