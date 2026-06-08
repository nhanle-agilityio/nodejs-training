import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import type { AppConfig } from '../config/configuration';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { BookingCancellationReason } from '../bookings/email/booking-cancellation-reason';
import { BookingsService } from '../bookings/bookings.service';
import { BookingLifecycleService } from '../bookings/email/booking-lifecycle.service';
import {
  bookingPaymentExpiresAt,
  isBookingPaymentExpired,
} from '../bookings/schedulers/booking-payment.util';
import { SlotStatus } from '../slots/slot.entity';
import { fromStripeCents, toStripeCents } from './payment.util';
import { Payment, PaymentStatus } from './payment.entity';
import { StripeService } from './stripe.service';
import {
  StripeCheckoutSessionCreateParams,
  type StripeEvent,
  type StripePaymentIntent,
} from './stripe.types';

export interface CheckoutSessionResult {
  checkoutUrl: string;
  sessionId: string;
  expiresAt?: Date;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly stripe: StripeService,
    private readonly config: ConfigService<AppConfig, true>,
    @Inject(forwardRef(() => BookingLifecycleService))
    private readonly lifecycle: BookingLifecycleService,
    @Inject(forwardRef(() => BookingsService))
    private readonly bookingsService: BookingsService,
  ) {}

  private async tryReuseCheckoutSession(
    sessionId: string,
  ): Promise<CheckoutSessionResult | null> {
    try {
      const session = await this.stripe.retrieveCheckoutSession(sessionId);
      if (session.status === 'open' && session.url) {
        return {
          checkoutUrl: session.url,
          sessionId: session.id,
        };
      }
    } catch (err) {
      this.logger.warn(
        `Could not reuse checkout session ${sessionId}: ${(err as Error).message}`,
      );
    }
    return null;
  }

  private async tryConfirmBookingFromPayment(
    manager: EntityManager,
    event: StripeEvent,
    bookingId: string,
    paymentIntent: StripePaymentIntent,
  ): Promise<boolean> {
    const existingPayment = await manager.findOne(Payment, {
      where: { stripeEventId: event.id },
    });
    if (existingPayment) {
      return false;
    }

    const booking = await manager
      .createQueryBuilder(Booking, 'booking')
      .setLock('pessimistic_write')
      .innerJoinAndSelect('booking.slot', 'slot')
      .where('booking.id = :id', { id: bookingId })
      .getOne();

    if (!booking) {
      this.logger.warn(`Booking ${bookingId} not found for payment`);
      return false;
    }

    if (
      booking.status === BookingStatus.Confirmed ||
      booking.status === BookingStatus.Refunded
    ) {
      return false;
    }

    const rejectionReason = this.getPaymentRejectionReason(
      booking,
      paymentIntent,
    );
    if (rejectionReason) {
      this.logger.warn(rejectionReason);
      await this.recordRejectedPayment(manager, booking, event, paymentIntent);
      return false;
    }

    const payment = manager.create(Payment, {
      bookingId,
      stripeEventId: event.id,
      amount: fromStripeCents(paymentIntent.amount_received),
      status: PaymentStatus.Succeeded,
    });
    await manager.save(payment);

    booking.status = BookingStatus.Confirmed;
    booking.stripePaymentIntentId = paymentIntent.id;
    await manager.save(booking);

    return true;
  }

  // Money was collected but booking was not confirmed — keep refs for API refund.
  private async recordRejectedPayment(
    manager: EntityManager,
    booking: Booking,
    event: StripeEvent,
    paymentIntent: StripePaymentIntent,
  ): Promise<void> {
    booking.stripePaymentIntentId = paymentIntent.id;
    await manager.save(booking);

    const payment = manager.create(Payment, {
      bookingId: booking.id,
      stripeEventId: event.id,
      amount: fromStripeCents(paymentIntent.amount_received),
      status: PaymentStatus.Failed,
    });
    await manager.save(payment);
  }

  private getPaymentRejectionReason(
    booking: Booking,
    paymentIntent: StripePaymentIntent,
  ): string | null {
    const slot = booking.slot;
    if (!slot) {
      return `Booking ${booking.id} has no slot for payment validation`;
    }

    const stripeConfig = this.config.get('stripe', { infer: true });
    const expectedAmount = toStripeCents(slot.price);
    const expectedCurrency = stripeConfig.currency.toLowerCase();
    const receivedCurrency = paymentIntent.currency?.toLowerCase();

    if (paymentIntent.amount_received !== expectedAmount) {
      return `Payment amount mismatch for booking ${booking.id}: expected ${expectedAmount}, received ${paymentIntent.amount_received}`;
    }

    if (receivedCurrency && receivedCurrency !== expectedCurrency) {
      return `Payment currency mismatch for booking ${booking.id}: expected ${expectedCurrency}, received ${receivedCurrency}`;
    }

    if (booking.status === BookingStatus.Cancelled) {
      return `Late payment for booking ${booking.id} (cancelled). Refund via API if needed.`;
    }

    if (
      booking.status === BookingStatus.Pending &&
      isBookingPaymentExpired(booking)
    ) {
      return `Late payment for booking ${booking.id} (expired). Refund via API if needed.`;
    }

    if (booking.status !== BookingStatus.Pending) {
      return `Booking ${booking.id} is not payable, status=${booking.status}`;
    }

    return null;
  }

  async hasRefundablePayment(bookingId: string): Promise<boolean> {
    return this.payments.exists({
      where: [
        { bookingId, status: PaymentStatus.Succeeded },
        { bookingId, status: PaymentStatus.Failed },
      ],
    });
  }

  async createCheckoutSession(
    bookingId: string,
    actorUserId: string,
    isAdmin: boolean,
  ): Promise<CheckoutSessionResult> {
    const booking =
      await this.bookingsService.findBookingWithEmailRelations(bookingId);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (!isAdmin && booking.userId !== actorUserId) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.Pending) {
      throw new BadRequestException(
        `Cannot pay for a booking with status ${booking.status}`,
      );
    }

    if (isBookingPaymentExpired(booking)) {
      throw new BadRequestException('Booking payment window has expired');
    }

    const slot = booking.slot;
    if (!slot || slot.deletedAt || slot.status !== SlotStatus.Open) {
      throw new BadRequestException('Slot is not available');
    }

    const expiresAt = bookingPaymentExpiresAt(booking);

    if (booking.stripeSessionId) {
      const existing = await this.tryReuseCheckoutSession(
        booking.stripeSessionId,
      );
      if (existing) {
        return { ...existing, expiresAt };
      }
    }

    const stripeConfig = this.config.get('stripe', { infer: true });
    const unitAmount = toStripeCents(slot.price);
    const sessionParams: StripeCheckoutSessionCreateParams = {
      mode: 'payment',
      success_url: stripeConfig.successUrl,
      cancel_url: stripeConfig.cancelUrl,
      client_reference_id: booking.id,
      metadata: { bookingId: booking.id },
      payment_intent_data: {
        metadata: { bookingId: booking.id },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: stripeConfig.currency,
            unit_amount: unitAmount,
            product_data: {
              name: slot.title,
              description: `Booking ${booking.id}`,
            },
          },
        },
      ],
    };
    const idempotencyKey = `checkout-${booking.id}`;
    const session = await this.stripe.createCheckoutSession(
      sessionParams,
      idempotencyKey,
    );

    if (!session.url) {
      throw new BadRequestException('Stripe did not return a checkout URL');
    }

    await this.bookingsService.setStripeSessionId(booking.id, session.id);

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
      expiresAt,
    };
  }

  async handlePaymentIntentSucceeded(event: StripeEvent): Promise<void> {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata?.bookingId;

    if (!bookingId) {
      this.logger.warn(
        `payment_intent.succeeded missing bookingId metadata: ${paymentIntent.id}`,
      );
      return;
    }

    const confirmed = await this.dataSource.transaction(async (manager) =>
      this.tryConfirmBookingFromPayment(
        manager,
        event,
        bookingId,
        paymentIntent,
      ),
    );

    if (!confirmed) {
      return;
    }

    const currentBooking =
      await this.bookingsService.findBookingWithEmailRelations(bookingId);
    if (currentBooking) {
      await this.lifecycle.onBookingConfirmed(currentBooking);
    }
  }

  async refundAndCancel(
    bookingId: string,
    reason: BookingCancellationReason,
  ): Promise<Booking> {
    const booking = await this.bookingsService.findBookingRaw(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const payment = await this.payments.findOne({
      where: [
        { bookingId, status: PaymentStatus.Succeeded },
        { bookingId, status: PaymentStatus.Failed },
      ],
      order: { createdAt: 'DESC' },
    });

    if (!payment || !booking.stripePaymentIntentId) {
      throw new BadRequestException('No refundable payment for this booking');
    }

    try {
      await this.stripe.createRefund(
        booking.stripePaymentIntentId,
        `refund-${bookingId}`,
      );
    } catch (err) {
      this.logger.error(
        `Stripe refund failed for booking ${bookingId}: ${(err as Error).message}`,
      );

      throw new BadRequestException('Stripe refund failed');
    }

    const wasConfirmed = booking.status === BookingStatus.Confirmed;

    await this.dataSource.transaction(async (manager) => {
      payment.status = PaymentStatus.Refunded;
      if (wasConfirmed) {
        booking.status = BookingStatus.Refunded;
      }
      await manager.save(payment);
      await manager.save(booking);
    });

    if (wasConfirmed) {
      const cancelledBooking =
        await this.bookingsService.findBookingWithEmailRelations(bookingId);
      if (cancelledBooking) {
        await this.lifecycle.onBookingCancelled(cancelledBooking, reason);
      }
    }

    const bookingUpdated = await this.bookingsService.findBookingRaw(bookingId);
    if (!bookingUpdated) {
      throw new NotFoundException('Booking not found');
    }
    return bookingUpdated;
  }
}
