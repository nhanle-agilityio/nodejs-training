import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot, SlotStatus } from './slot.entity';
import { SlotsService } from './slots.service';
import { SlotsCacheService } from './slots-cache.service';

const slotId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

describe('SlotsService', () => {
  let service: SlotsService;
  let cache: {
    get: jest.Mock;
    set: jest.Mock;
    invalidateAll: jest.Mock;
  };
  let slotsRepo: jest.Mocked<
    Pick<
      Repository<Slot>,
      'create' | 'save' | 'findOne' | 'findAndCount' | 'softDelete'
    >
  >;

  const baseSlot = {
    id: slotId,
    title: 'Base Slot Title',
    startTime: new Date('2026-06-01T09:00:00.000Z'),
    endTime: new Date('2026-06-01T10:00:00.000Z'),
    price: 49.99,
    status: SlotStatus.Open,
  } as Slot;

  beforeEach(async () => {
    cache = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      invalidateAll: jest.fn().mockResolvedValue(undefined),
    };

    slotsRepo = {
      create: jest.fn().mockImplementation((x) => x as Slot),
      save: jest.fn().mockImplementation((x) => Promise.resolve(x as Slot)),
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      softDelete: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SlotsService,
        { provide: getRepositoryToken(Slot), useValue: slotsRepo },
        { provide: SlotsCacheService, useValue: cache },
      ],
    }).compile();

    service = moduleRef.get(SlotsService);
  });

  describe('createSlot', () => {
    it('throws when endTime is not after startTime', async () => {
      await expect(
        service.createSlot({
          title: 'Slot Name',
          startTime: '2026-06-01T12:00:00.000Z',
          endTime: '2026-06-01T10:00:00.000Z',
          price: 10,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when startTime is in the past', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-01T12:00:00.000Z'));

      await expect(
        service.createSlot({
          title: 'Slot Name',
          startTime: '2026-06-01T10:00:00.000Z',
          endTime: '2026-06-01T11:00:00.000Z',
          price: 10,
        }),
      ).rejects.toMatchObject({
        response: { message: 'startTime must be in the future' },
      });

      jest.useRealTimers();
    });

    it('persists an OPEN slot with parsed times', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-01T08:00:00.000Z'));
      const dto = {
        title: 'Slot Name',
        startTime: '2026-06-01T10:00:00.000Z',
        endTime: '2026-06-01T11:00:00.000Z',
        price: 15,
      };

      await service.createSlot(dto);

      expect(slotsRepo.create).toHaveBeenCalledWith({
        title: 'Slot Name',
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        price: 15,
        status: SlotStatus.Open,
      });
      expect(slotsRepo.save).toHaveBeenCalled();
      expect(cache.invalidateAll).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('getAllSlots', () => {
    it('returns cached page without querying the database', async () => {
      const cached = {
        items: [baseSlot],
        total: 1,
        page: 1,
        limit: 20,
      };
      cache.get.mockResolvedValue(cached);

      const result = await service.getAllSlots({});

      expect(result).toEqual(cached);
      expect(slotsRepo.findAndCount).not.toHaveBeenCalled();
      expect(cache.set).not.toHaveBeenCalled();
    });

    it('finds paginated rows ordered by startTime when cache misses', async () => {
      slotsRepo.findAndCount.mockResolvedValue([[baseSlot], 1]);

      const result = await service.getAllSlots({ page: 1, limit: 20 });

      expect(slotsRepo.findAndCount).toHaveBeenCalledWith({
        where: {},
        order: { startTime: 'DESC' },
        skip: 0,
        take: 20,
      });
      expect(result).toEqual({
        items: [baseSlot],
        total: 1,
        page: 1,
        limit: 20,
      });
      expect(cache.set).toHaveBeenCalledWith(
        { items: [baseSlot], total: 1, page: 1, limit: 20 },
        { page: 1, limit: 20 },
      );
    });

    it('applies status filter', async () => {
      slotsRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.getAllSlots({
        status: SlotStatus.Closed,
        page: 2,
        limit: 5,
      });

      expect(slotsRepo.findAndCount).toHaveBeenCalledWith({
        where: { status: SlotStatus.Closed },
        order: { startTime: 'DESC' },
        skip: 5,
        take: 5,
      });
    });
  });

  describe('getSlotById', () => {
    it('throws when slot is missing', async () => {
      slotsRepo.findOne.mockResolvedValue(null);

      await expect(service.getSlotById(slotId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns the slot', async () => {
      slotsRepo.findOne.mockResolvedValue(baseSlot);

      const result = await service.getSlotById(slotId);

      expect(result).toBe(baseSlot);
      expect(slotsRepo.findOne).toHaveBeenCalledWith({ where: { id: slotId } });
    });
  });

  describe('updateSlot', () => {
    it('throws when slot id is unknown', async () => {
      slotsRepo.findOne.mockResolvedValue(null);

      await expect(
        service.updateSlot(slotId, { title: 'Slot Name Updated' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when new window is invalid', async () => {
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });

      await expect(
        service.updateSlot(slotId, {
          startTime: '2026-06-01T12:00:00.000Z',
          endTime: '2026-06-01T10:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('merges partial fields and saves', async () => {
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });

      const updated = await service.updateSlot(slotId, {
        title: 'Slot Name Updated',
        price: 99,
        status: SlotStatus.Closed,
      });

      expect(updated.title).toBe('Slot Name Updated');
      expect(updated.price).toBe(99);
      expect(updated.status).toBe(SlotStatus.Closed);
      expect(slotsRepo.save).toHaveBeenCalled();
      expect(cache.invalidateAll).toHaveBeenCalled();
    });

    it('uses existing endTime when only startTime is supplied', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-01T07:00:00.000Z'));
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });
      const newStart = '2026-06-01T08:00:00.000Z';

      const updated = await service.updateSlot(slotId, {
        startTime: newStart,
      });

      expect(updated.startTime).toEqual(new Date(newStart));
      expect(updated.endTime).toEqual(baseSlot.endTime);
      expect(slotsRepo.save).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('uses existing startTime when only endTime is supplied', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-01T07:00:00.000Z'));
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });
      const newEnd = '2026-06-01T12:00:00.000Z';

      const updated = await service.updateSlot(slotId, {
        endTime: newEnd,
      });

      expect(updated.endTime).toEqual(new Date(newEnd));
      expect(updated.startTime).toEqual(baseSlot.startTime);
      expect(slotsRepo.save).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('throws when only startTime is supplied and new window is invalid', async () => {
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });

      await expect(
        service.updateSlot(slotId, {
          startTime: '2026-06-01T11:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when updated window starts in the past', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-01T12:00:00.000Z'));
      slotsRepo.findOne.mockResolvedValue({ ...baseSlot });

      await expect(
        service.updateSlot(slotId, {
          startTime: '2026-06-01T10:00:00.000Z',
          endTime: '2026-06-01T11:00:00.000Z',
        }),
      ).rejects.toMatchObject({
        response: { message: 'startTime must be in the future' },
      });

      jest.useRealTimers();
    });
  });

  describe('deleteSlot', () => {
    it('throws NotFoundException when softDelete affects no rows', async () => {
      slotsRepo.softDelete.mockResolvedValue({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      await expect(service.deleteSlot(slotId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns when softDelete removes a row', async () => {
      slotsRepo.softDelete.mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      });

      await expect(service.deleteSlot(slotId)).resolves.toBeUndefined();
      expect(cache.invalidateAll).toHaveBeenCalled();
    });
  });
});
