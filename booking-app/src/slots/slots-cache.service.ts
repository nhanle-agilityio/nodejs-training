import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { PaginatedResult } from '../common/pagination/map-paginated-items';
import { resolvePagination } from '../common/pagination/resolve-pagination';
import { RedisCacheService, buildQueryKey } from '../redis/redis-cache.service';
import { Slot } from './slot.entity';
import { SlotsQueryDto } from './dto/slots-query.dto';

const CACHE_KEY_PREFIX = 'booking:slots:list';

const slotsKey = (query: SlotsQueryDto): string => {
  const { page, limit } = resolvePagination(query);

  return buildQueryKey(CACHE_KEY_PREFIX, {
    status: query.status,
    page,
    limit,
  });
};

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

const revivePaginatedSlots = (raw: unknown): PaginatedResult<Slot> => {
  const data = raw as PaginatedResult<Slot>;

  return {
    ...data,
    items: reviveSlots(data.items),
  };
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

  get(query: SlotsQueryDto): Promise<PaginatedResult<Slot> | null> {
    return this.cache.getJson<PaginatedResult<Slot>>(
      slotsKey(query),
      revivePaginatedSlots,
    );
  }

  set(result: PaginatedResult<Slot>, query: SlotsQueryDto): Promise<void> {
    return this.cache.setJson(slotsKey(query), result, this.ttlSec);
  }

  invalidateAll(): Promise<void> {
    return this.cache.invalidatePrefix(`${CACHE_KEY_PREFIX}:`);
  }
}
