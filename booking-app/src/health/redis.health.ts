import { Inject, Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  type HealthIndicatorResult,
} from '@nestjs/terminus';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.module';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const TIMEOUT_MS = 3000;

    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Redis ping timed out')), TIMEOUT_MS),
      );
      const result = await Promise.race([this.redis.ping(), timeout]);
      const isHealthy = result === 'PONG';

      return this.getStatus(key, isHealthy);
    } catch (err) {
      const result = this.getStatus(key, false, {
        message: (err as Error).message,
      });
      throw new HealthCheckError('Redis check failed', result);
    }
  }
}
