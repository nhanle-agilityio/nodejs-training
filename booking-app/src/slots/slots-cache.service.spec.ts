import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../redis/redis-cache.service';
import { Slot, SlotStatus } from './slot.entity';
import { SlotsCacheService } from './slots-cache.service';

type GetJsonMock = jest.MockedFunction<
  (
    key: string,
    revive?: (raw: unknown) => Slot[] | null,
  ) => Promise<Slot[] | null>
>;

describe('SlotsCacheService', () => {
  let service: SlotsCacheService;
  let cache: {
    getJson: GetJsonMock;
    setJson: jest.Mock;
    invalidatePrefix: jest.Mock;
  };

  const slot = {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    title: 'Morning slot',
    startTime: new Date('2026-06-01T09:00:00.000Z'),
    endTime: new Date('2026-06-01T10:00:00.000Z'),
    price: 49.99,
    status: SlotStatus.Open,
  } as Slot;

  beforeEach(async () => {
    cache = {
      getJson: jest.fn() as GetJsonMock,
      setJson: jest.fn().mockResolvedValue(undefined),
      invalidatePrefix: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SlotsCacheService,
        { provide: RedisCacheService, useValue: cache },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue(300) },
        },
      ],
    }).compile();

    service = moduleRef.get(SlotsCacheService);
  });

  describe('get', () => {
    it('reads the "all" key when no filter is provided', async () => {
      cache.getJson.mockResolvedValue([slot]);

      const result = await service.get({});

      expect(result).toEqual([slot]);
      expect(cache.getJson).toHaveBeenCalledWith(
        'booking:slots:list:all',
        expect.any(Function),
      );
    });

    it('reads the status-scoped key when filtered', async () => {
      cache.getJson.mockResolvedValue(null);

      await service.get({ status: SlotStatus.Open });

      expect(cache.getJson).toHaveBeenCalledWith(
        'booking:slots:list:status=open',
        expect.any(Function),
      );
    });

    it('revives Date fields via the reviver passed to the cache', async () => {
      cache.getJson.mockResolvedValue(null);
      await service.get({});

      const revive = cache.getJson.mock.calls[0]?.[1];
      expect(revive).toBeDefined();
      const revived = revive!([
        {
          ...slot,
          startTime: slot.startTime.toISOString(),
          endTime: slot.endTime.toISOString(),
          createdAt: new Date('2026-06-01T08:00:00.000Z').toISOString(),
          updatedAt: new Date('2026-06-01T08:00:00.000Z').toISOString(),
          deletedAt: null,
        },
      ])!;

      expect(revived[0].startTime).toBeInstanceOf(Date);
      expect(revived[0].endTime).toBeInstanceOf(Date);
      expect(revived[0].createdAt).toBeInstanceOf(Date);
      expect(revived[0].updatedAt).toBeInstanceOf(Date);
      expect(revived[0].deletedAt).toBeNull();
    });
  });

  describe('set', () => {
    it('writes the status-scoped key with the configured TTL', async () => {
      await service.set([slot], { status: SlotStatus.Closed });

      expect(cache.setJson).toHaveBeenCalledWith(
        'booking:slots:list:status=closed',
        [slot],
        300,
      );
    });

    it('writes the "all" key when no filter is provided', async () => {
      await service.set([slot], {});

      expect(cache.setJson).toHaveBeenCalledWith(
        'booking:slots:list:all',
        [slot],
        300,
      );
    });
  });

  describe('invalidateAll', () => {
    it('invalidates the whole slots list prefix', async () => {
      await service.invalidateAll();

      expect(cache.invalidatePrefix).toHaveBeenCalledWith(
        'booking:slots:list:',
      );
    });
  });
});
