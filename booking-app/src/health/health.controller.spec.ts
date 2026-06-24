import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis.health';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: { check: jest.Mock };
  let dbIndicator: { pingCheck: jest.Mock };
  let redisIndicator: { isHealthy: jest.Mock };

  beforeEach(async () => {
    dbIndicator = {
      pingCheck: jest.fn().mockResolvedValue({ database: { status: 'up' } }),
    };
    redisIndicator = {
      isHealthy: jest.fn().mockResolvedValue({ redis: { status: 'up' } }),
    };

    // Simulate HealthCheckService.check() calling each indicator factory
    healthCheckService = {
      check: jest
        .fn()
        .mockImplementation(
          async (indicators: Array<() => Promise<unknown>>) => {
            for (const fn of indicators) {
              await fn();
            }
            return { status: 'ok', info: {} };
          },
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: healthCheckService },
        { provide: TypeOrmHealthIndicator, useValue: dbIndicator },
        { provide: RedisHealthIndicator, useValue: redisIndicator },
      ],
    }).compile();

    controller = module.get(HealthController);
  });

  describe('check', () => {
    it('invokes both db.pingCheck and redis.isHealthy indicators', async () => {
      await controller.check();

      expect(dbIndicator.pingCheck).toHaveBeenCalledWith('database');
      expect(redisIndicator.isHealthy).toHaveBeenCalledWith('redis');
    });

    it('returns the combined health check result', async () => {
      const result = await controller.check();

      expect(result).toMatchObject({ status: 'ok' });
    });
  });
});
