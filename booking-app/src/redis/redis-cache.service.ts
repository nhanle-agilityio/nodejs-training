import { Inject, Injectable, Logger } from '@nestjs/common';
import type Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.tokens';

// Number of keys to scan per iteration
const SCAN_COUNT = 100;

// Build a stable cache key from a prefix plus every provided param
export const buildQueryKey = (
  prefix: string,
  params: Record<string, unknown>,
): string => {
  const suffix =
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${String(value)}`)
      .join('&') || 'all';

  return `${prefix}:${suffix}`;
};

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  // Parse JSON from Redis and return the result
  async getJson<T>(
    key: string,
    revive?: (raw: unknown) => T,
  ): Promise<T | null> {
    try {
      const raw = await this.redis.get(key);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return revive ? revive(parsed) : (parsed as T);
    } catch (err) {
      this.logger.warn(
        `Cache read failed for ${key}: ${(err as Error).message}`,
      );
      return null;
    }
  }

  // Set JSON in Redis with a TTL
  async setJson(key: string, value: unknown, ttlSec: number): Promise<void> {
    try {
      await this.redis.setex(key, ttlSec, JSON.stringify(value));
    } catch (err) {
      this.logger.warn(
        `Cache write failed for ${key}: ${(err as Error).message}`,
      );
    }
  }

  // Invalidate all keys with a given prefix
  async invalidatePrefix(prefix: string): Promise<void> {
    try {
      let cursor = '0';
      do {
        const [next, keys] = await this.redis.scan(
          cursor,
          'MATCH',
          `${prefix}*`,
          'COUNT',
          SCAN_COUNT,
        );
        cursor = next;
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      } while (cursor !== '0');
    } catch (err) {
      this.logger.warn(
        `Cache invalidation failed for ${prefix}: ${(err as Error).message}`,
      );
    }
  }
}
