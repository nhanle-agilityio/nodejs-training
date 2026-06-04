import { DataSource, Repository } from 'typeorm';
import type Redis from 'ioredis';
import { Booking } from '../src/bookings/booking.entity';
import { Payment } from '../src/payments/payment.entity';
import { Slot, SlotStatus } from '../src/slots/slot.entity';
import { User } from '../src/users/user.entity';
import { REDIS_CLIENT } from '../src/redis/redis.tokens';

export const SLOTS_LIST_CACHE_KEY = 'booking:slots:list:limit=20&page=1';

export const saveOpenSlot = async (
  slotRepo: Repository<Slot>,
  title = 'E2E slot',
): Promise<Slot> => {
  const start = new Date(Date.now() + 60 * 60 * 1000);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return slotRepo.save(
    slotRepo.create({
      title,
      startTime: start,
      endTime: end,
      price: 25,
      status: SlotStatus.Open,
    }),
  );
};

export const cleanBookingE2eTables = async (dataSource: DataSource) => {
  await dataSource.createQueryBuilder().delete().from(Payment).execute();
  await dataSource.createQueryBuilder().delete().from(Booking).execute();
  await dataSource.createQueryBuilder().delete().from(Slot).execute();
  await dataSource.createQueryBuilder().delete().from(User).execute();
};

export const flushRedisTestKeys = async (redis: Redis): Promise<void> => {
  let cursor = '0';
  do {
    const [next, keys] = await redis.scan(
      cursor,
      'MATCH',
      'booking:*',
      'COUNT',
      100,
    );
    cursor = next;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
};

export const getTestRedis = (app: { get: (token: symbol) => Redis }): Redis =>
  app.get(REDIS_CLIENT);
