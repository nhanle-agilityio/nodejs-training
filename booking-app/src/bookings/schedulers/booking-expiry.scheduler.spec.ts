import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { Booking, BookingStatus } from '../booking.entity';
import { BookingCancellationReason } from '../email/booking-cancellation-reason';
import { BookingLifecycleService } from '../email/booking-lifecycle.service';
import { StripeService } from '../../payments/stripe.service';
import { PendingBookingExpiryScheduler } from './booking-expiry.scheduler';

describe('PendingBookingExpiryScheduler', () => {
  let scheduler: PendingBookingExpiryScheduler;
  let dataSource: {
    createQueryBuilder: jest.Mock;
    transaction: jest.Mock;
    getRepository: jest.Mock;
  };
  let lifecycle: { onBookingCancelled: jest.Mock };
  let stripe: { expireCheckoutSession: jest.Mock };
  let bookingRepo: { findOne: jest.Mock };

  const bookingId = 'b1111111-1111-1111-1111-111111111111';
  const staleCreatedAt = new Date('2026-01-01T00:00:00.000Z');
  const bookingWithRelations = {
    id: bookingId,
    status: BookingStatus.Cancelled,
    user: { email: 'guest@test.com', name: 'Guest' },
    slot: {
      title: 'Yoga',
      startTime: new Date('2026-06-15T14:00:00.000Z'),
      endTime: new Date('2026-06-15T15:00:00.000Z'),
    },
  };

  beforeEach(async () => {
    bookingRepo = { findOne: jest.fn() };
    dataSource = {
      createQueryBuilder: jest.fn(),
      transaction: jest.fn(),
      getRepository: jest.fn().mockReturnValue(bookingRepo),
    };
    lifecycle = { onBookingCancelled: jest.fn().mockResolvedValue(undefined) };
    stripe = {
      expireCheckoutSession: jest.fn().mockResolvedValue({ id: 'cs_expired' }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PendingBookingExpiryScheduler,
        { provide: SchedulerRegistry, useValue: { addCronJob: jest.fn() } },
        { provide: DataSource, useValue: dataSource },
        { provide: BookingLifecycleService, useValue: lifecycle },
        { provide: StripeService, useValue: stripe },
      ],
    }).compile();

    scheduler = moduleRef.get(PendingBookingExpiryScheduler);
  });

  const mockCandidateQuery = (ids: string[]) => {
    const qb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(ids.map((id) => ({ id }))),
    };
    dataSource.createQueryBuilder.mockReturnValue(qb);
    return qb;
  };

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

  it('expires stale pending bookings without succeeded payment', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
      },
    });
    bookingRepo.findOne.mockResolvedValue(bookingWithRelations);

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
    bookingRepo.findOne.mockResolvedValue(bookingWithRelations);

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
    bookingRepo.findOne.mockResolvedValue(bookingWithRelations);
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

  it('skips lifecycle when booking relations cannot be reloaded', async () => {
    mockCandidateQuery([bookingId]);
    mockExpireTransaction({
      booking: {
        id: bookingId,
        status: BookingStatus.Pending,
        createdAt: staleCreatedAt,
      },
    });
    bookingRepo.findOne.mockResolvedValue(null);

    await scheduler.expireStalePendingBookings();

    expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
  });
});
