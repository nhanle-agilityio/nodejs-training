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
import { BookingCancellationReason } from './email/booking-cancellation-reason';
import { BookingLifecycleService } from './email/booking-lifecycle.service';
import { PaymentsService } from '../payments/payments.service';
import { SlotsCacheService } from '../slots/slots-cache.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingsRepo: jest.Mocked<
    Pick<Repository<Booking>, 'findOne' | 'find' | 'findAndCount' | 'save'>
  >;
  let dataSource: { transaction: jest.Mock };
  let redlock: { acquire: jest.Mock };
  let lifecycle: {
    onBookingCancelled: jest.Mock;
  };
  let paymentsService: {
    hasRefundablePayment: jest.Mock;
    refundAndCancel: jest.Mock;
  };
  let slotsCache: {
    invalidateAll: jest.Mock;
  };

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
    startTime: new Date('2026-12-01T10:00:00.000Z'),
    endTime: new Date('2026-12-01T11:00:00.000Z'),
  } as Slot;

  const bookingRowForEmail = {
    ...pendingBooking,
    user: { email: 'user@test.com', name: 'Test User' },
    slot: openSlot,
  } as Booking & {
    user: { email: string; name: string };
    slot: Slot;
  };

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
    lifecycle = {
      onBookingCancelled: jest.fn().mockResolvedValue(undefined),
    };
    paymentsService = {
      hasRefundablePayment: jest.fn().mockResolvedValue(false),
      refundAndCancel: jest.fn().mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Refunded,
      }),
    };
    slotsCache = {
      invalidateAll: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: getRepositoryToken(Booking), useValue: bookingsRepo },
        { provide: DataSource, useValue: dataSource },
        { provide: REDLOCK, useValue: redlock },
        { provide: BookingLifecycleService, useValue: lifecycle },
        { provide: PaymentsService, useValue: paymentsService },
        { provide: SlotsCacheService, useValue: slotsCache },
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

    it('throws BadRequestException when slot startTime is in the past', async () => {
      mockTransactionManager({
        slot: {
          ...openSlot,
          startTime: new Date('2020-01-01T10:00:00.000Z'),
        },
      });

      await expect(service.createBooking(userId, slotId)).rejects.toMatchObject(
        {
          response: { message: 'Cannot book a slot that has already started' },
        },
      );
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
      expect(slotsCache.invalidateAll).toHaveBeenCalled();
      expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
      expect(lock.release).toHaveBeenCalled();
    });
  });

  describe('getBookingsByUser', () => {
    it('returns paginated rows for user with optional status filter', async () => {
      bookingsRepo.findAndCount.mockResolvedValue([[pendingBooking], 1]);

      const result = await service.getBookingsByUser({
        userId,
        status: BookingStatus.Pending,
        page: 2,
        limit: 10,
      });

      expect(bookingsRepo.findAndCount).toHaveBeenCalledWith({
        where: { userId, status: BookingStatus.Pending },
        relations: ['slot'],
        order: { createdAt: 'DESC' },
        skip: 10,
        take: 10,
      });
      expect(result).toEqual({
        items: [pendingBooking],
        total: 1,
        page: 2,
        limit: 10,
      });
    });

    it('returns empty page when user has no bookings', async () => {
      bookingsRepo.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.getBookingsByUser({
        userId,
        page: 1,
        limit: 20,
      });

      expect(result).toEqual({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
      });
    });
  });

  describe('getAllBookings', () => {
    it('returns paginated rows from findAndCount', async () => {
      bookingsRepo.findAndCount.mockResolvedValue([[pendingBooking], 1]);

      const result = await service.getAllBookings({
        page: 1,
        limit: 10,
      });

      expect(bookingsRepo.findAndCount).toHaveBeenCalledWith({
        where: {},
        relations: ['slot', 'user'],
        order: { createdAt: 'DESC' },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        items: [pendingBooking],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('getBookingById', () => {
    it('throws NotFoundException when booking id is unknown', async () => {
      bookingsRepo.findOne.mockResolvedValue(null);

      await expect(service.getBookingById(bookingId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
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

    it('throws BadRequestException when confirmed booking has no payment', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Confirmed,
      });
      paymentsService.hasRefundablePayment.mockResolvedValue(false);

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('refunds confirmed booking with succeeded payment', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Confirmed,
      });
      paymentsService.hasRefundablePayment.mockResolvedValue(true);

      const result = await service.cancelBooking(bookingId, userId, false);

      expect(paymentsService.refundAndCancel).toHaveBeenCalledWith(
        bookingId,
        BookingCancellationReason.UserCancelled,
      );
      expect(result.status).toBe(BookingStatus.Refunded);
    });

    it('delegates to refundAndCancel and skips direct save when pending booking has a refundable payment', async () => {
      bookingsRepo.findOne.mockResolvedValue({ ...pendingBooking });
      paymentsService.hasRefundablePayment.mockResolvedValue(true);

      await service.cancelBooking(bookingId, userId, false);

      expect(paymentsService.refundAndCancel).toHaveBeenCalledWith(
        bookingId,
        BookingCancellationReason.UserCancelled,
      );
      expect(bookingsRepo.save).not.toHaveBeenCalled();
    });

    it('throws BadRequestException when booking is already cancelled', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Cancelled,
      });

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when booking is already Refunded', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Refunded,
      });
      paymentsService.hasRefundablePayment.mockResolvedValue(false);

      await expect(
        service.cancelBooking(bookingId, userId, false),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('allows admin to refund a cancelled booking with refundable payment', async () => {
      bookingsRepo.findOne.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Cancelled,
      });
      paymentsService.hasRefundablePayment.mockResolvedValue(true);
      paymentsService.refundAndCancel.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Cancelled,
      });

      const result = await service.cancelBooking(bookingId, userId, true);

      expect(paymentsService.refundAndCancel).toHaveBeenCalledWith(
        bookingId,
        BookingCancellationReason.AdminCancelled,
      );
      expect(result.status).toBe(BookingStatus.Cancelled);
    });

    it('allows admin to cancel another user PENDING booking', async () => {
      bookingsRepo.findOne
        .mockResolvedValueOnce({
          ...pendingBooking,
          userId: otherUserId,
        })
        .mockResolvedValueOnce(bookingRowForEmail);
      bookingsRepo.save.mockImplementation((b) =>
        Promise.resolve(b as Booking),
      );

      const result = await service.cancelBooking(bookingId, userId, true);

      expect(result.status).toBe(BookingStatus.Cancelled);
      expect(lifecycle.onBookingCancelled).toHaveBeenCalledWith(
        bookingRowForEmail,
        BookingCancellationReason.AdminCancelled,
      );
    });

    it('allows owner to cancel own PENDING booking', async () => {
      bookingsRepo.findOne
        .mockResolvedValueOnce({ ...pendingBooking })
        .mockResolvedValueOnce(bookingRowForEmail);
      bookingsRepo.save.mockImplementation((b) =>
        Promise.resolve(b as Booking),
      );

      const result = await service.cancelBooking(bookingId, userId, false);

      expect(result.status).toBe(BookingStatus.Cancelled);
      expect(lifecycle.onBookingCancelled).toHaveBeenCalledWith(
        bookingRowForEmail,
        BookingCancellationReason.UserCancelled,
      );
    });

    it('skips lifecycle when reload lacks relations', async () => {
      bookingsRepo.findOne
        .mockResolvedValueOnce({ ...pendingBooking })
        .mockResolvedValueOnce(null);
      bookingsRepo.save.mockImplementation((b) =>
        Promise.resolve(b as Booking),
      );

      await service.cancelBooking(bookingId, userId, false);

      expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
    });
  });
});
