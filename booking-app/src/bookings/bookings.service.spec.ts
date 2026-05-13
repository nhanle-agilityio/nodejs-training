import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { BookingsService } from './bookings.service';
import { REDLOCK } from '../redis/redis.module';
import { Slot, SlotStatus } from '../slots/slot.entity';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingsRepo: jest.Mocked<
    Pick<Repository<Booking>, 'findOne' | 'find' | 'findAndCount' | 'save'>
  >;
  let dataSource: { transaction: jest.Mock };
  let redlock: { acquire: jest.Mock };

  const bookingId = 'b1111111-1111-1111-1111-111111111111';
  const userId = 'u1111111-1111-1111-1111-111111111111';
  const otherUserId = 'u2222222-2222-2222-2222-222222222222';
  const slotId = 's1111111-1111-1111-1111-111111111111';

  const pendingBooking = {
    id: bookingId,
    userId,
    slotId,
    status: BookingStatus.Pending,
  } as Booking;

  const openSlot = {
    id: slotId,
    status: SlotStatus.Open,
    title: 'Slot Title 1',
    startTime: new Date(),
    endTime: new Date(),
  } as Slot;

  const lock = { release: jest.fn().mockResolvedValue(undefined) };

  beforeEach(async () => {
    bookingsRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findAndCount: jest.fn(),
    };

    dataSource = { transaction: jest.fn() };
    redlock = {
      acquire: jest.fn().mockResolvedValue(lock),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: getRepositoryToken(Booking), useValue: bookingsRepo },
        { provide: DataSource, useValue: dataSource },
        { provide: REDLOCK, useValue: redlock },
      ],
    }).compile();

    service = moduleRef.get(BookingsService);
    lock.release.mockClear();
  });

  function mockTransactionManager(overrides: {
    slot?: Slot | null;
    existingBooking?: Booking | null;
    saved?: Booking;
  }) {
    const slot = overrides.slot !== undefined ? overrides.slot : openSlot;
    const qb = {
      setLock: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(slot),
    };
    const created = {
      userId,
      slotId,
      status: BookingStatus.Pending,
    };
    const saved = overrides.saved ?? ({ ...created, id: 'new-bid' } as Booking);

    const manager = {
      createQueryBuilder: jest.fn().mockReturnValue(qb),
      findOne: jest.fn().mockResolvedValue(overrides.existingBooking ?? null),
      create: jest.fn().mockReturnValue(created),
      save: jest.fn().mockResolvedValue(saved),
    };

    dataSource.transaction.mockImplementation(
      async (fn: (m: unknown) => Promise<Booking>) => fn(manager),
    );

    return { manager, qb };
  }

  describe('createBooking', () => {
    it('throws ConflictException when Redlock cannot be acquired', async () => {
      redlock.acquire.mockRejectedValueOnce(new Error('busy'));

      await expect(
        service.createBooking(userId, slotId),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(dataSource.transaction).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when slot row is missing', async () => {
      mockTransactionManager({ slot: null });

      await expect(
        service.createBooking(userId, slotId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws BadRequestException when slot is not open', async () => {
      mockTransactionManager({
        slot: { ...openSlot, status: SlotStatus.Closed },
      });

      await expect(
        service.createBooking(userId, slotId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws ConflictException when an active booking already exists', async () => {
      mockTransactionManager({
        existingBooking: {
          id: 'booking-id-1',
          slotId,
          status: BookingStatus.Pending,
        } as Booking,
      });

      await expect(
        service.createBooking(userId, slotId),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('creates a PENDING booking inside a transaction', async () => {
      const { manager } = mockTransactionManager({});

      const result = await service.createBooking(userId, slotId);

      expect(redlock.acquire).toHaveBeenCalledWith(
        [`booking:slot:${slotId}`],
        5000,
      );
      expect(dataSource.transaction).toHaveBeenCalled();
      expect(manager.create).toHaveBeenCalledWith(Booking, {
        userId,
        slotId,
        status: BookingStatus.Pending,
      });
      expect(result.status).toBe(BookingStatus.Pending);
      expect(lock.release).toHaveBeenCalled();
    });
  });

  describe('getAllBookings', () => {
    it('returns paginated rows from findAndCount', async () => {
      const page = 2;
      const limit = 10;
      bookingsRepo.findAndCount.mockResolvedValue([[pendingBooking], 25]);

      const result = await service.getAllBookings({
        status: BookingStatus.Pending,
        userId,
        slotId,
        page,
        limit,
      });

      expect(bookingsRepo.findAndCount).toHaveBeenCalledWith({
        where: {
          status: BookingStatus.Pending,
          userId,
          slotId,
        },
        relations: ['slot', 'user'],
        order: { createdAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });
      expect(result.items).toEqual([pendingBooking]);
      expect(result.total).toBe(25);
    });

    it('omits optional filters when not provided', async () => {
      bookingsRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.getAllBookings({ page: 1, limit: 20 });

      expect(bookingsRepo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
        }),
      );
    });
  });

  describe('getBookingsByUser', () => {
    it('loads bookings for user with slot relation', async () => {
      bookingsRepo.find.mockResolvedValue([pendingBooking]);

      const result = await service.getBookingsByUser(userId);

      expect(bookingsRepo.find).toHaveBeenCalledWith({
        where: { userId },
        relations: ['slot'],
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([pendingBooking]);
    });
  });

  describe('getBookingById', () => {
    it('throws when booking does not exist', async () => {
      bookingsRepo.findOne.mockResolvedValue(null);

      await expect(service.getBookingById(bookingId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('returns booking with slot relation', async () => {
      bookingsRepo.findOne.mockResolvedValue(pendingBooking);

      const result = await service.getBookingById(bookingId);

      expect(result).toBe(pendingBooking);
      expect(bookingsRepo.findOne).toHaveBeenCalledWith({
        where: { id: bookingId },
        relations: ['slot'],
      });
    });
  });

  describe('cancelBooking', () => {
    it('throws NotFoundException when booking id is unknown', async () => {
      bookingsRepo.findOne.mockResolvedValue(null);

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws NotFoundException when non-admin tries to cancel someone else booking', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        userId: otherUserId,
      });

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws BadRequestException when booking is not PENDING', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Confirmed,
      });

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('allows admin to cancel another user PENDING booking', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        userId: otherUserId,
      });
      bookingsRepo.save.mockImplementation((b) =>
        Promise.resolve(b as Booking),
      );

      const result = await service.cancelBooking(bookingId, userId, true);

      expect(result.status).toBe(BookingStatus.Cancelled);
      expect(bookingsRepo.save).toHaveBeenCalled();
    });

    it('allows owner to cancel own PENDING booking', async () => {
      bookingsRepo.findOne.mockResolvedValue({ ...pendingBooking });
      bookingsRepo.save.mockImplementation((b) =>
        Promise.resolve(b as Booking),
      );

      const result = await service.cancelBooking(bookingId, userId, false);

      expect(result.status).toBe(BookingStatus.Cancelled);
    });
  });
});
