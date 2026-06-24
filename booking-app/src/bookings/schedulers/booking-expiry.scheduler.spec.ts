import { CronJob } from 'cron';
import { Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Booking, BookingStatus } from '../booking.entity';
import { BookingCancellationReason } from '../email/booking-cancellation-reason';
import { BookingLifecycleService } from '../email/booking-lifecycle.service';
import { StripeService } from '../../payments/stripe.service';
import { BookingsService } from '../bookings.service';
import { PendingBookingExpiryScheduler } from './booking-expiry.scheduler';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from './booking-expiry.constants';

jest.mock('cron', () => ({
  CronJob: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
  })),
}));

describe('PendingBookingExpiryScheduler', () => {
  let scheduler: PendingBookingExpiryScheduler;
  let schedulerRegistry: { addCronJob: jest.Mock };
  let dataSource: {
    createQueryBuilder: jest.Mock;
    transaction: jest.Mock;
  };
  let lifecycle: { onBookingCancelled: jest.Mock };
  let stripe: { expireCheckoutSession: jest.Mock };
  let bookingsService: { findBookingWithEmailRelations: jest.Mock };

  const bookingId = 'b1111111-1111-1111-1111-111111111111';
  const staleCreatedAt = new Date('2026-01-01T00:00:00.000Z');
  const bookingWithRelations = {
    id: bookingId,
    status: BookingStatus.Cancelled,
    user: { email: 'guest@test.com', name: 'Guest' },
    slot: {
      title: 'Slot Title Name',
      startTime: new Date('2026-06-15T14:00:00.000Z'),
      endTime: new Date('2026-06-15T15:00:00.000Z'),
    },
  };

  beforeEach(async () => {
    bookingsService = { findBookingWithEmailRelations: jest.fn() };
    schedulerRegistry = { addCronJob: jest.fn() };
    dataSource = {
      createQueryBuilder: jest.fn(),
      transaction: jest.fn(),
    };
    lifecycle = { onBookingCancelled: jest.fn().mockResolvedValue(undefined) };
    stripe = {
      expireCheckoutSession: jest.fn().mockResolvedValue({ id: 'cs_expired' }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PendingBookingExpiryScheduler,
        { provide: SchedulerRegistry, useValue: schedulerRegistry },
        { provide: DataSource, useValue: dataSource },
        { provide: BookingsService, useValue: bookingsService },
        { provide: BookingLifecycleService, useValue: lifecycle },
        { provide: StripeService, useValue: stripe },
      ],
    }).compile();

    scheduler = moduleRef.get(PendingBookingExpiryScheduler);
  });

  // Returns a qb mock whose getRawMany yields each batch in sequence.
  // Pass a single array for single-batch tests; pass multiple for loop tests.
  const mockCandidateQueries = (batchResults: string[][]) => {
    const getRawMany = jest.fn();
    for (const ids of batchResults) {
      getRawMany.mockResolvedValueOnce(ids.map((id) => ({ id })));
    }
    const qb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany,
    };
    dataSource.createQueryBuilder.mockReturnValue(qb);
    return qb;
  };

  const mockCandidateQuery = (ids: string[]) => mockCandidateQueries([ids]);

  const mockExpireTransaction = (options: {
    booking?: Partial<Booking> | null;
    succeededPayment?: boolean;
  }) => {
    const exists = jest
      .fn()
      .mockResolvedValue(options.succeededPayment ?? false);
    const save = jest
      .fn()
      .mockImplementation((booking: Booking) => Promise.resolve(booking));
    const getOne = jest.fn().mockResolvedValue(options.booking ?? null);
    const txQb = {
      setLock: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne,
    };

    dataSource.transaction.mockImplementation(
      async (fn: (manager: unknown) => Promise<void>) =>
        fn({
          createQueryBuilder: jest.fn().mockReturnValue(txQb),
          exists,
          save,
        }),
    );

    return { exists, save, getOne };
  };

  // Lightweight transaction mock: booking not found → every booking is skipped.
  // Use this when testing loop / batch behaviour rather than per-booking logic.
  const mockSkipTransaction = () => {
    dataSource.transaction.mockImplementation(
      async (fn: (manager: unknown) => Promise<void>) =>
        fn({
          createQueryBuilder: jest.fn().mockReturnValue({
            setLock: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(null),
          }),
          exists: jest.fn(),
          save: jest.fn(),
        }),
    );
  };

  it('expires stale pending bookings without succeeded payment', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
      },
    });
    bookingsService.findBookingWithEmailRelations.mockResolvedValue(
      bookingWithRelations,
    );

    await scheduler.expireStalePendingBookings();

    expect(lifecycle.onBookingCancelled).toHaveBeenCalledWith(
      expect.objectContaining({ id: bookingId }),
      BookingCancellationReason.PaymentTimeout,
    );
    expect(stripe.expireCheckoutSession).not.toHaveBeenCalled();
  });

  it('expires Stripe checkout session when booking had an open session', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
        stripeSessionId: 'cs_stale',
      },
    });
    bookingsService.findBookingWithEmailRelations.mockResolvedValue(
      bookingWithRelations,
    );

    await scheduler.expireStalePendingBookings();

    expect(stripe.expireCheckoutSession).toHaveBeenCalledWith('cs_stale');
    expect(lifecycle.onBookingCancelled).toHaveBeenCalled();
  });

  it('continues when Stripe session expire fails', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
        stripeSessionId: 'cs_stale',
      },
    });
    bookingsService.findBookingWithEmailRelations.mockResolvedValue(
      bookingWithRelations,
    );
    stripe.expireCheckoutSession.mockRejectedValue(new Error('stripe down'));

    await scheduler.expireStalePendingBookings();

    expect(lifecycle.onBookingCancelled).toHaveBeenCalled();
  });

  it('skips expiry when a succeeded payment exists', async () => {
    mockCandidateQuery([bookingId]);
    const { save } = mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
      },
      succeededPayment: true,
    });

    await scheduler.expireStalePendingBookings();

    expect(save).not.toHaveBeenCalled();
    expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
    expect(stripe.expireCheckoutSession).not.toHaveBeenCalled();
  });

  it('skips booking inside the transaction when createdAt is within the payment window', async () => {
    mockCandidateQuery([bookingId]);
    const { save } = mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: new Date(), // just created — not yet stale
      },
    });

    await scheduler.expireStalePendingBookings();

    expect(save).not.toHaveBeenCalled();
    expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
  });

  it('skips lifecycle when booking relations cannot be reloaded', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
      },
    });
    bookingsService.findBookingWithEmailRelations.mockResolvedValue(null);

    await scheduler.expireStalePendingBookings();

    expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
  });

  it('applies batchSize limit to the candidate query', async () => {
    const qb = mockCandidateQuery([]);

    await scheduler.expireStalePendingBookings();

    expect(qb.limit).toHaveBeenCalledWith(
      BOOKING_PAYMENT_PENDING_EXPIRY.batchSize,
    );
  });

  it('does nothing when there are no stale candidates', async () => {
    mockCandidateQuery([]);

    await scheduler.expireStalePendingBookings();

    expect(dataSource.transaction).not.toHaveBeenCalled();
    expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
  });

  it('fetches the next batch immediately when the previous batch was full', async () => {
    const { batchSize } = BOOKING_PAYMENT_PENDING_EXPIRY;
    const fullBatch = Array.from({ length: batchSize }, (_, i) => `id-${i}`);

    const qb = mockCandidateQueries([
      fullBatch, // batch 1: full → continue
      [], // batch 2: empty → stop
    ]);
    mockSkipTransaction();

    await scheduler.expireStalePendingBookings();

    expect(qb.getRawMany).toHaveBeenCalledTimes(2);
  });

  it('stops after a partial batch without fetching again', async () => {
    // 1 id returned → batch not full (1 < batchSize) → loop exits after first fetch
    const qb = mockCandidateQuery([bookingId]);
    mockSkipTransaction();

    await scheduler.expireStalePendingBookings();

    expect(qb.getRawMany).toHaveBeenCalledTimes(1);
  });

  it('stops at maxBatchesPerRun and logs a warning when backlog is large', async () => {
    const { batchSize, maxBatchesPerRun } = BOOKING_PAYMENT_PENDING_EXPIRY;
    const fullBatch = Array.from({ length: batchSize }, (_, i) => `id-${i}`);

    // Every fetch returns a full batch — simulates an unbounded backlog
    const qb = mockCandidateQueries(
      Array.from({ length: maxBatchesPerRun }, () => fullBatch),
    );
    mockSkipTransaction();

    const warnSpy = jest
      .spyOn((scheduler as unknown as { logger: Logger }).logger, 'warn')
      .mockImplementation(() => undefined);

    await scheduler.expireStalePendingBookings();

    expect(qb.getRawMany).toHaveBeenCalledTimes(maxBatchesPerRun);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('maxBatchesPerRun'),
    );
  });

  describe('onModuleInit', () => {
    it('registers the pending expiry cron job when enabled', () => {
      schedulerRegistry.addCronJob.mockClear();

      scheduler.onModuleInit();

      expect(schedulerRegistry.addCronJob).toHaveBeenCalledTimes(1);
      expect(schedulerRegistry.addCronJob).toHaveBeenCalledWith(
        'pendingBookingExpiry',
        expect.any(Object),
      );
    });

    it('skips cron registration when disabled', () => {
      schedulerRegistry.addCronJob.mockClear();
      (BOOKING_PAYMENT_PENDING_EXPIRY as { enabled: boolean }).enabled = false;

      try {
        scheduler.onModuleInit();
        expect(schedulerRegistry.addCronJob).not.toHaveBeenCalled();
      } finally {
        (BOOKING_PAYMENT_PENDING_EXPIRY as { enabled: boolean }).enabled = true;
      }
    });

    it('CronJob tick callback invokes expireStalePendingBookings', () => {
      const MockCronJob = CronJob as unknown as jest.Mock;
      MockCronJob.mockClear();
      const spy = jest
        .spyOn(scheduler, 'expireStalePendingBookings')
        .mockResolvedValue(undefined);

      scheduler.onModuleInit();

      const [, tickCallback] = MockCronJob.mock.calls[0] as [
        unknown,
        () => void,
      ];
      tickCallback();

      expect(spy).toHaveBeenCalled();
    });
  });
});
