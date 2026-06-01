import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { RedisCacheService, buildQueryKey } from '../redis/redis-cache.service';
import { Slot } from './slot.entity';
import { SlotsQueryDto } from './dto/slots-query.dto';

const CACHE_KEY_PREFIX = 'booking:slots:list';

// Build a stable cache key from a prefix plus every provided param
const slotsKey = (query: SlotsQueryDto): string => {
  return buildQueryKey(CACHE_KEY_PREFIX, { ...query });
};

// Parse ISO strings to Date objects
const reviveSlots = (raw: unknown): Slot[] => {
  const toDate = (value: unknown): Date | null =>
    value == null ? (value as null) : new Date(value as string);

  return (raw as Record<string, unknown>[]).map((slot) => ({
    ...slot,
    startTime: toDate(slot.startTime),
    endTime: toDate(slot.endTime),
    createdAt: toDate(slot.createdAt),
    updatedAt: toDate(slot.updatedAt),
    deletedAt: toDate(slot.deletedAt),
  })) as Slot[];
};

@Injectable()
export class SlotsCacheService {
  private readonly ttlSec: number;

  constructor(
    private readonly cache: RedisCacheService,
    config: ConfigService<AppConfig, true>,
  ) {
    this.ttlSec = config.get('slotsCache.ttl', { infer: true });
  }

  get(query: SlotsQueryDto): Promise<Slot[] | null> {
    return this.cache.getJson<Slot[]>(slotsKey(query), reviveSlots);
  }

  set(slots: Slot[], query: SlotsQueryDto): Promise<void> {
    return this.cache.setJson(slotsKey(query), slots, this.ttlSec);
  }

  invalidateAll(): Promise<void> {
    return this.cache.invalidatePrefix(`${CACHE_KEY_PREFIX}:`);
  }
}
