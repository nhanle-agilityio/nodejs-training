import type { BullRootModuleOptions } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import type Redis from 'ioredis';
import type { AppConfig } from '../config/configuration';

export const createBullmqRootOptions = (
  redis: Redis,
  config: ConfigService<AppConfig, true>,
): BullRootModuleOptions => {
  const bullmq = config.get('bullmq', { infer: true });

  return {
    connection: redis,
    prefix: `{${bullmq.prefix}}`,
  };
};
