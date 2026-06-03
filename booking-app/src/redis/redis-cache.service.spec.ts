import { Test, TestingModule } from '@nestjs/testing';
import { REDIS_CLIENT } from './redis.tokens';
import { RedisCacheService, buildQueryKey } from './redis-cache.service';

describe('buildQueryKey', () => {
  it('falls back to "all" when no params are present', () => {
    expect(buildQueryKey('p', {})).toBe('p:all');
  });

  it('ignores null/undefined params', () => {
    expect(buildQueryKey('p', { status: undefined, foo: null })).toBe('p:all');
  });

  it('sorts params for a stable key regardless of insertion order', () => {
    expect(buildQueryKey('p', { b: 2, a: 1 })).toBe(
      buildQueryKey('p', { a: 1, b: 2 }),
    );
    expect(buildQueryKey('p', { a: 1, b: 2 })).toBe('p:a=1&b=2');
  });
});

describe('RedisCacheService', () => {
  let service: RedisCacheService;
  let redis: {
    get: jest.Mock;
    setex: jest.Mock;
    del: jest.Mock;
    scan: jest.Mock;
  };

  beforeEach(async () => {
    redis = {
      get: jest.fn(),
      setex: jest.fn().mockResolvedValue('OK'),
      del: jest.fn().mockResolvedValue(1),
      scan: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RedisCacheService,
        { provide: REDIS_CLIENT, useValue: redis },
      ],
    }).compile();

    service = moduleRef.get(RedisCacheService);
  });

  describe('getJson', () => {
    it('returns null on cache miss', async () => {
      redis.get.mockResolvedValue(null);

      await expect(service.getJson('k')).resolves.toBeNull();
    });

    it('parses JSON on cache hit', async () => {
      redis.get.mockResolvedValue(JSON.stringify({ a: 1 }));

      await expect(service.getJson('k')).resolves.toEqual({ a: 1 });
    });

    it('applies the reviver when provided', async () => {
      redis.get.mockResolvedValue(JSON.stringify({ n: 1 }));

      const result = await service.getJson('k', (raw) => ({
        doubled: (raw as { n: number }).n * 2,
      }));

      expect(result).toEqual({ doubled: 2 });
    });

    it('falls back to null when Redis read fails', async () => {
      redis.get.mockRejectedValue(new Error('connection lost'));

      await expect(service.getJson('k')).resolves.toBeNull();
    });
  });

  describe('setJson', () => {
    it('stores serialized value with the given TTL', async () => {
      await service.setJson('k', { a: 1 }, 120);

      expect(redis.setex).toHaveBeenCalledWith(
        'k',
        120,
        JSON.stringify({ a: 1 }),
      );
    });

    it('swallows Redis write errors', async () => {
      redis.setex.mockRejectedValue(new Error('connection lost'));

      await expect(service.setJson('k', {}, 60)).resolves.toBeUndefined();
    });
  });

  describe('invalidatePrefix', () => {
    it('scans the prefix and deletes matched keys across batches', async () => {
      redis.scan
        .mockResolvedValueOnce(['5', ['p:a', 'p:b']])
        .mockResolvedValueOnce(['0', ['p:c']]);

      await service.invalidatePrefix('p:');

      expect(redis.scan).toHaveBeenNthCalledWith(
        1,
        '0',
        'MATCH',
        'p:*',
        'COUNT',
        100,
      );
      expect(redis.del).toHaveBeenNthCalledWith(1, 'p:a', 'p:b');
      expect(redis.del).toHaveBeenNthCalledWith(2, 'p:c');
    });

    it('skips DEL when a scan batch is empty', async () => {
      redis.scan.mockResolvedValueOnce(['0', []]);

      await service.invalidatePrefix('p:');

      expect(redis.del).not.toHaveBeenCalled();
    });

    it('swallows Redis errors during invalidation', async () => {
      redis.scan.mockRejectedValue(new Error('connection lost'));

      await expect(service.invalidatePrefix('p:')).resolves.toBeUndefined();
    });
  });
});
