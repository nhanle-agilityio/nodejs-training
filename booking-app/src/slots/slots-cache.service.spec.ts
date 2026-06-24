import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../redis/redis-cache.service';
import { Slot, SlotStatus } from './slot.entity';
import { SlotsCacheService } from './slots-cache.service';

type GetJsonMock = jest.MockedFunction<
  (key: string, revive?: (raw: unknown) => unknown) => Promise<unknown>
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

  const page = {
    items: [slot],
    total: 1,
    page: 1,
    limit: 20,
  };

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
    it('reads the default pagination key when no filter is provided', async () => {
      cache.getJson.mockResolvedValue(page);

      const result = await service.get({});

      expect(result).toEqual(page);
      expect(cache.getJson).toHaveBeenCalledWith(
        'booking:slots:list:limit=20&page=1',
        expect.any(Function),
      );
    });

    it('reads a key that includes status and pagination', async () => {
      cache.getJson.mockResolvedValue(null);

      await service.get({
        status: SlotStatus.Open,
        page: 2,
        limit: 10,
      });

      expect(cache.getJson).toHaveBeenCalledWith(
        'booking:slots:list:limit=10&page=2&status=open',
        expect.any(Function),
      );
    });

    it('revives Date fields on cached items', async () => {
      cache.getJson.mockResolvedValue(null);
      await service.get({});

      const revive = cache.getJson.mock.calls[0]?.[1];
      expect(revive).toBeDefined();
      const revived = revive!({
        ...page,
        items: [
          {
            ...slot,
            startTime: slot.startTime.toISOString(),
            endTime: slot.endTime.toISOString(),
            createdAt: new Date('2026-06-01T08:00:00.000Z').toISOString(),
            updatedAt: new Date('2026-06-01T08:00:00.000Z').toISOString(),
            deletedAt: null,
          },
        ],
      }) as typeof page;

      expect(revived.items[0].startTime).toBeInstanceOf(Date);
      expect(revived.items[0].endTime).toBeInstanceOf(Date);
    });
  });

  describe('set', () => {
    it('writes the scoped key with the configured TTL', async () => {
      await service.set(page, { status: SlotStatus.Closed, page: 1, limit: 5 });

      expect(cache.setJson).toHaveBeenCalledWith(
        'booking:slots:list:limit=5&page=1&status=closed',
        page,
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
