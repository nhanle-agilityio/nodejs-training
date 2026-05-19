import { Global, Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type Redis from 'ioredis';
import Redlock from 'redlock';
import type { AppConfig } from '../config/configuration';
import { createAppRedisClient } from './redis.config';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
export const REDLOCK = Symbol('REDLOCK');

const redlockSettings = {
  retryCount: 5,
  retryDelay: 150,
  retryJitter: 75,
  driftFactor: 0.01,
};

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => {
        const redis = config.get('redis', { infer: true });
        return createAppRedisClient(redis);
      },
    },
    {
      provide: REDLOCK,
      inject: [REDIS_CLIENT],
      useFactory: (redis: Redis) => new Redlock([redis], redlockSettings),
    },
  ],
  exports: [REDIS_CLIENT, REDLOCK],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
