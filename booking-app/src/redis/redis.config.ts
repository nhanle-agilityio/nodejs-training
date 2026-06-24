import Redis from 'ioredis';
import type { AppConfig } from '../config/configuration';

// Shared ioredis client for Redlock, BullMQ, and other app Redis usage.
export const createAppRedisClient = (redis: AppConfig['redis']): Redis => {
  return new Redis({
    host: redis.host,
    port: redis.port,
    maxRetriesPerRequest: null,
  });
};
