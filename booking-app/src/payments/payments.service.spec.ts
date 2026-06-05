import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { BookingCancellationReason } from '../bookings/email/booking-cancellation-reason';
import { BookingsService } from '../bookings/bookings.service';
import { BookingLifecycleService } from '../bookings/email/booking-lifecycle.service';
import { SlotStatus } from '../slots/slot.entity';
import { Payment, PaymentStatus } from './payment.entity';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import type { StripeEvent } from './stripe.types';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentsRepo: jest.Mocked<
    Pick<Repository<Payment>, 'findOne' | 'exists'>
  >;
  let bookingsService: {
    findBookingWithDetails: jest.Mock;
    setStripeSessionId: jest.Mock;
    findBookingWithEmailRelations: jest.Mock;
    findBookingRaw: jest.Mock;
  };
  let dataSource: { transaction: jest.Mock };
  let stripe: {
    createCheckoutSession: jest.Mock;
    retrieveCheckoutSession: jest.Mock;
    createRefund: jest.Mock;
  };
  let lifecycle: {
    onBookingConfirmed: jest.Mock;
    onBookingCancelled: jest.Mock;
  };

  const bookingId = 'b1111111-1111-1111-1111-111111111111';
  const userId = 'u1111111-1111-1111-1111-111111111111';

  const booking = {
    id: bookingId,
    userId,
    slotId: 's1111111-1111-1111-1111-111111111111',
    status: BookingStatus.Pending,
    createdAt: new Date(),
    stripeSessionId: null,
    slot: {
      id: 's1111111-1111-1111-1111-111111111111',
      title: 'Slot Title Name',
      price: 25,
      status: SlotStatus.Open,
      deletedAt: null,
    },
    user: { email: 'guest@test.com', name: 'Guest' },
  } as Booking;

  beforeEach(async () => {
    paymentsRepo = {
      findOne: jest.fn(),
      exists: jest.fn().mockResolvedValue(false),
    };
    bookingsService = {
      findBookingWithDetails: jest.fn(),
      setStripeSessionId: jest.fn().mockResolvedValue(undefined),
      findBookingWithEmailRelations: jest.fn(),
      findBookingRaw: jest.fn(),
    };
    dataSource = { transaction: jest.fn() };
    stripe = {
      createCheckoutSession: jest.fn().mockResolvedValue({
        id: 'cs_test_1',
        url: 'https://checkout.stripe.test/cs_test_1',
      }),
      retrieveCheckoutSession: jest.fn(),
      createRefund: jest.fn().mockResolvedValue({ id: 're_1' }),
    };
    lifecycle = {
      onBookingConfirmed: jest.fn().mockResolvedValue(undefined),
      onBookingCancelled: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: getRepositoryToken(Payment), useValue: paymentsRepo },
        { provide: BookingsService, useValue: bookingsService },
        { provide: DataSource, useValue: dataSource },
        { provide: StripeService, useValue: stripe },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'stripe') {
                return {
                  currency: 'usd',
                  successUrl: 'http://localhost/success',
                  cancelUrl: 'http://localhost/cancel',
                };
              }
              return undefined;
            }),
          },
        },
        { provide: BookingLifecycleService, useValue: lifecycle },
      ],
    }).compile();

    service = moduleRef.get(PaymentsService);
  });

  it('creates a checkout session for a pending booking', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue(booking);

    const result = await service.createCheckoutSession(
      bookingId,
      userId,
      false,
    );

    expect(stripe.createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'payment',
        metadata: { bookingId },
        payment_intent_data: { metadata: { bookingId } },
      }),
      `checkout-${bookingId}`,
    );
    expect(bookingsService.setStripeSessionId).toHaveBeenCalledWith(
      bookingId,
      'cs_test_1',
    );
    expect(result.checkoutUrl).toContain('checkout.stripe.test');
  });

  it('reuses an open checkout session', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      stripeSessionId: 'cs_existing',
    });
    stripe.retrieveCheckoutSession.mockResolvedValue({
      id: 'cs_existing',
      url: 'https://checkout.stripe.test/cs_existing',
      status: 'open',
    });

    const result = await service.createCheckoutSession(
      bookingId,
      userId,
      false,
    );

    expect(stripe.createCheckoutSession).not.toHaveBeenCalled();
    expect(result.sessionId).toBe('cs_existing');
  });

  it('throws when booking is not pending', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      status: BookingStatus.Confirmed,
    });

    await expect(
      service.createCheckoutSession(bookingId, userId, false),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when caller does not own the booking', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue(booking);

    await expect(
      service.createCheckoutSession(bookingId, 'other-user', false),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws when booking payment window has expired', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      createdAt: new Date(Date.now() - 20 * 60_000),
    });

    await expect(
      service.createCheckoutSession(bookingId, userId, false),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(stripe.createCheckoutSession).not.toHaveBeenCalled();
  });

  // H3 — slot unavailability guards
  it('throws when slot is null', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      slot: null,
    });

    await expect(
      service.createCheckoutSession(bookingId, userId, false),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(stripe.createCheckoutSession).not.toHaveBeenCalled();
  });

  it('throws when slot is soft-deleted', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      slot: { ...booking.slot, deletedAt: new Date() },
    });

    await expect(
      service.createCheckoutSession(bookingId, userId, false),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(stripe.createCheckoutSession).not.toHaveBeenCalled();
  });

  it('throws when slot is not open', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue({
      ...booking,
      slot: { ...booking.slot, status: SlotStatus.Closed },
    });

    await expect(
      service.createCheckoutSession(bookingId, userId, false),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(stripe.createCheckoutSession).not.toHaveBeenCalled();
  });

  // H4 — admin bypass
  it('allows admin to create checkout for another user booking', async () => {
    bookingsService.findBookingWithDetails.mockResolvedValue(booking);

    const result = await service.createCheckoutSession(
      bookingId,
      'admin-user-id',
      true,
    );

    expect(result.checkoutUrl).toContain('checkout.stripe.test');
    expect(stripe.createCheckoutSession).toHaveBeenCalled();
  });

  describe('handlePaymentIntentSucceeded', () => {
    const event: StripeEvent = {
      id: 'evt_1',
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_1',
          metadata: { bookingId },
          amount_received: 2500,
          currency: 'usd',
        },
      },
    };

    const mockPaymentTransaction = (options: {
      booking: Booking;
      duplicatePayment?: Payment | null;
    }) => {
      const txSave = jest
        .fn()
        .mockImplementation((row: Payment | Booking) => Promise.resolve(row));

      dataSource.transaction.mockImplementation(
        async (fn: (manager: unknown) => Promise<unknown>) => {
          const manager = {
            findOne: jest
              .fn()
              .mockResolvedValue(options.duplicatePayment ?? null),
            createQueryBuilder: jest.fn().mockReturnValue({
              setLock: jest.fn().mockReturnThis(),
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue(options.booking),
            }),
            create: jest.fn((_entity, data) => data as unknown as Payment),
            save: txSave,
          };
          return fn(manager);
        },
      );

      return { txSave };
    };

    it('skips duplicate stripe events inside transaction', async () => {
      mockPaymentTransaction({
        booking,
        duplicatePayment: {
          id: 'pay_1',
          stripeEventId: 'evt_1',
        } as Payment,
      });

      await service.handlePaymentIntentSucceeded(event);

      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
      expect(stripe.createRefund).not.toHaveBeenCalled();
    });

    it('confirms booking and runs lifecycle', async () => {
      const txBooking = { ...booking, slot: { ...booking.slot } };
      const { txSave } = mockPaymentTransaction({ booking: txBooking });

      bookingsService.findBookingWithEmailRelations.mockResolvedValue({
        ...booking,
        status: BookingStatus.Confirmed,
        stripePaymentIntentId: 'pi_1',
      });

      await service.handlePaymentIntentSucceeded(event);

      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({
          bookingId,
          stripeEventId: 'evt_1',
          status: PaymentStatus.Succeeded,
        }),
      );
      expect(lifecycle.onBookingConfirmed).toHaveBeenCalled();
    });

    it('rejects late payment for cancelled booking and records payment intent', async () => {
      const cancelledBooking = {
        ...booking,
        status: BookingStatus.Cancelled,
        slot: { ...booking.slot },
      } as Booking;
      const { txSave } = mockPaymentTransaction({ booking: cancelledBooking });

      await service.handlePaymentIntentSucceeded(event);

      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({
          stripePaymentIntentId: 'pi_1',
        }),
      );
      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({
          bookingId,
          stripeEventId: 'evt_1',
          status: PaymentStatus.Failed,
        }),
      );
      expect(stripe.createRefund).not.toHaveBeenCalled();
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    it('rejects when payment amount does not match slot price and records payment intent', async () => {
      const txBooking = { ...booking, slot: { ...booking.slot } };
      const { txSave } = mockPaymentTransaction({ booking: txBooking });

      const mismatchEvent: StripeEvent = {
        ...event,
        data: {
          object: {
            ...event.data.object,
            amount_received: 100,
          },
        },
      };

      await service.handlePaymentIntentSucceeded(mismatchEvent);

      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({ stripePaymentIntentId: 'pi_1' }),
      );
      expect(stripe.createRefund).not.toHaveBeenCalled();
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    it('rejects when payment currency does not match configured currency', async () => {
      const txBooking = { ...booking, slot: { ...booking.slot } };
      const { txSave } = mockPaymentTransaction({ booking: txBooking });

      const mismatchEvent: StripeEvent = {
        ...event,
        data: {
          object: {
            ...event.data.object,
            currency: 'eur',
          },
        },
      };

      await service.handlePaymentIntentSucceeded(mismatchEvent);

      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({
          bookingId,
          stripeEventId: 'evt_1',
          status: PaymentStatus.Failed,
        }),
      );
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    it('rejects late payment for expired pending booking', async () => {
      const expiredBooking = {
        ...booking,
        createdAt: new Date(Date.now() - 20 * 60_000),
        slot: { ...booking.slot },
      };
      const { txSave } = mockPaymentTransaction({ booking: expiredBooking });

      await service.handlePaymentIntentSucceeded(event);

      expect(txSave).toHaveBeenCalledWith(
        expect.objectContaining({
          bookingId,
          status: PaymentStatus.Failed,
        }),
      );
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    it('returns early when bookingId metadata is missing', async () => {
      const missingMetadataEvent: StripeEvent = {
        ...event,
        data: {
          object: {
            ...event.data.object,
            metadata: {},
          },
        },
      };

      await service.handlePaymentIntentSucceeded(missingMetadataEvent);

      expect(dataSource.transaction).not.toHaveBeenCalled();
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    // H5 — already-Confirmed / Refunded idempotency
    it('skips payment save when booking is already Confirmed', async () => {
      const { txSave } = mockPaymentTransaction({
        booking: {
          ...booking,
          status: BookingStatus.Confirmed,
          slot: { ...booking.slot },
        },
      });

      await service.handlePaymentIntentSucceeded(event);

      expect(txSave).not.toHaveBeenCalled();
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });

    it('skips payment save when booking is already Refunded', async () => {
      const { txSave } = mockPaymentTransaction({
        booking: {
          ...booking,
          status: BookingStatus.Refunded,
          slot: { ...booking.slot },
        },
      });

      await service.handlePaymentIntentSucceeded(event);

      expect(txSave).not.toHaveBeenCalled();
      expect(lifecycle.onBookingConfirmed).not.toHaveBeenCalled();
    });
  });

  describe('refundAndCancel', () => {
    it('refunds rejected payment on cancelled booking without changing status', async () => {
      const cancelledBooking = {
        ...booking,
        status: BookingStatus.Cancelled,
        stripePaymentIntentId: 'pi_1',
      } as Booking;

      bookingsService.findBookingRaw
        .mockResolvedValueOnce(cancelledBooking)
        .mockResolvedValueOnce(cancelledBooking);
      paymentsRepo.findOne.mockResolvedValue({
        id: 'pay_1',
        bookingId,
        status: PaymentStatus.Failed,
      } as Payment);

      dataSource.transaction.mockImplementation(
        async (fn: (manager: unknown) => Promise<void>) => {
          const manager = {
            save: jest.fn().mockImplementation((row) => Promise.resolve(row)),
          };
          await fn(manager);
        },
      );

      const result = await service.refundAndCancel(
        bookingId,
        BookingCancellationReason.AdminCancelled,
      );

      expect(stripe.createRefund).toHaveBeenCalledWith(
        'pi_1',
        `refund-${bookingId}`,
      );
      expect(result.status).toBe(BookingStatus.Cancelled);
      expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
    });

    it('issues refund and marks booking refunded', async () => {
      const paidBooking = {
        ...booking,
        status: BookingStatus.Confirmed,
        stripePaymentIntentId: 'pi_1',
      } as Booking;

      bookingsService.findBookingRaw
        .mockResolvedValueOnce(paidBooking)
        .mockResolvedValueOnce({
          ...paidBooking,
          status: BookingStatus.Refunded,
        });
      bookingsService.findBookingWithEmailRelations.mockResolvedValue({
        ...paidBooking,
        status: BookingStatus.Refunded,
        user: paidBooking.user,
        slot: paidBooking.slot,
      });
      paymentsRepo.findOne.mockResolvedValue({
        id: 'pay_1',
        bookingId,
        status: PaymentStatus.Succeeded,
      } as Payment);

      dataSource.transaction.mockImplementation(
        async (fn: (manager: unknown) => Promise<void>) => {
          const manager = {
            save: jest.fn().mockImplementation((row) => Promise.resolve(row)),
          };
          await fn(manager);
        },
      );

      const result = await service.refundAndCancel(
        bookingId,
        BookingCancellationReason.UserCancelled,
      );

      expect(stripe.createRefund.mock.invocationCallOrder[0]).toBeLessThan(
        dataSource.transaction.mock.invocationCallOrder[0],
      );
      expect(stripe.createRefund).toHaveBeenCalledWith(
        'pi_1',
        `refund-${bookingId}`,
      );
      expect(lifecycle.onBookingCancelled).toHaveBeenCalled();
      expect(result.status).toBe(BookingStatus.Refunded);
    });

    it('throws when no refundable payment exists', async () => {
      bookingsService.findBookingRaw.mockResolvedValue(booking);
      paymentsRepo.findOne.mockResolvedValue(null);

      await expect(
        service.refundAndCancel(
          bookingId,
          BookingCancellationReason.UserCancelled,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    // H7 — booking not found
    it('throws NotFoundException when booking does not exist', async () => {
      bookingsService.findBookingRaw.mockResolvedValue(null);

      await expect(
        service.refundAndCancel(
          bookingId,
          BookingCancellationReason.UserCancelled,
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    // H6 — Pending booking refund path
    it('issues refund for pending booking without updating its status', async () => {
      const pendingWithIntent = {
        ...booking,
        status: BookingStatus.Pending,
        stripePaymentIntentId: 'pi_1',
      } as Booking;

      bookingsService.findBookingRaw
        .mockResolvedValueOnce(pendingWithIntent)
        .mockResolvedValueOnce(pendingWithIntent);
      paymentsRepo.findOne.mockResolvedValue({
        id: 'pay_1',
        bookingId,
        status: PaymentStatus.Failed,
      } as Payment);
      dataSource.transaction.mockImplementation(
        async (fn: (manager: unknown) => Promise<void>) => {
          const manager = {
            save: jest.fn().mockImplementation((row) => Promise.resolve(row)),
          };
          await fn(manager);
        },
      );

      const result = await service.refundAndCancel(
        bookingId,
        BookingCancellationReason.AdminCancelled,
      );

      expect(stripe.createRefund).toHaveBeenCalledWith(
        'pi_1',
        `refund-${bookingId}`,
      );
      expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
      expect(result.status).toBe(BookingStatus.Pending);
    });

    it('throws when Stripe refund fails', async () => {
      const paidBooking = {
        ...booking,
        status: BookingStatus.Confirmed,
        stripePaymentIntentId: 'pi_1',
      } as Booking;

      bookingsService.findBookingRaw.mockResolvedValueOnce(paidBooking);
      paymentsRepo.findOne.mockResolvedValue({
        id: 'pay_1',
        bookingId,
        status: PaymentStatus.Succeeded,
      } as Payment);
      stripe.createRefund.mockRejectedValue(new Error('stripe unavailable'));

      await expect(
        service.refundAndCancel(
          bookingId,
          BookingCancellationReason.UserCancelled,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(lifecycle.onBookingCancelled).not.toHaveBeenCalled();
      expect(dataSource.transaction).not.toHaveBeenCalled();
      expect(stripe.createRefund).toHaveBeenCalledWith(
        'pi_1',
        `refund-${bookingId}`,
      );
    });
  });

  describe('hasRefundablePayment', () => {
    it('returns true when a succeeded or failed payment exists for the booking', async () => {
      paymentsRepo.exists.mockResolvedValue(true);

      const result = await service.hasRefundablePayment(bookingId);

      expect(result).toBe(true);
      expect(paymentsRepo.exists).toHaveBeenCalledWith({
        where: expect.arrayContaining([
          { bookingId, status: PaymentStatus.Succeeded },
          { bookingId, status: PaymentStatus.Failed },
        ]) as unknown[],
      });
    });

    it('returns false when no refundable payment exists', async () => {
      paymentsRepo.exists.mockResolvedValue(false);

      const result = await service.hasRefundablePayment(bookingId);

      expect(result).toBe(false);
    });
  });
});
