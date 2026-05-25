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
import { DataSource, Repository } from 'typeorm';
import type { AppConfig } from '../config/configuration';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { BookingCancellationReason } from '../bookings/email/booking-cancellation-reason';
import { loadBookingWithEmailRelations } from '../bookings/email/booking-email-relations.util';
import { BookingLifecycleService } from '../bookings/email/booking-lifecycle.service';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from '../bookings/schedulers/booking-expiry.constants';
import { SlotStatus } from '../slots/slot.entity';
import { Payment, PaymentStatus } from './payment.entity';
import { StripeService } from './stripe.service';
import {
  StripeCheckoutSessionCreateParams,
  type StripeEvent,
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
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly stripe: StripeService,
    private readonly config: ConfigService<AppConfig, true>,
    @Inject(forwardRef(() => BookingLifecycleService))
    private readonly lifecycle: BookingLifecycleService,
  ) {}

  private bookingPaymentExpiresAt(booking: Booking): Date {
    const ttlMs = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;
    return new Date(booking.createdAt.getTime() + ttlMs);
  }

  private isBookingExpired(booking: Booking): boolean {
    return Date.now() >= this.bookingPaymentExpiresAt(booking).getTime();
  }

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
    } catch {
      // Fall through and create a fresh session.
    }
    return null;
  }

  async createCheckoutSession(
    bookingId: string,
    actorUserId: string,
    isAdmin: boolean,
  ): Promise<CheckoutSessionResult> {
    const booking = await this.bookings.findOne({
      where: { id: bookingId },
      relations: ['slot', 'user'],
    });

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

    if (this.isBookingExpired(booking)) {
      throw new BadRequestException('Booking payment window has expired');
    }

    const slot = booking.slot;
    if (!slot || slot.deletedAt || slot.status !== SlotStatus.Open) {
      throw new BadRequestException('Slot is not available');
    }

    const expiresAt = this.bookingPaymentExpiresAt(booking);

    if (booking.stripeSessionId) {
      const existing = await this.tryReuseCheckoutSession(
        booking.stripeSessionId,
      );
      if (existing) {
        return { ...existing, expiresAt };
      }
    }

    const stripeConfig = this.config.get('stripe', { infer: true });
    const price = Number(slot.price);
    const unitAmount = Math.round(price * 100);
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

    booking.stripeSessionId = session.id;
    await this.bookings.save(booking);

    return {
      checkoutUrl: session.url,
      sessionId: session.id,
      expiresAt,
    };
  }

  async handlePaymentIntentSucceeded(event: StripeEvent): Promise<void> {
    const existing = await this.payments.findOne({
      where: { stripeEventId: event.id },
    });

    if (existing) {
      return;
    }

    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata?.bookingId;

    if (!bookingId) {
      this.logger.warn(
        `payment_intent.succeeded missing bookingId metadata: ${paymentIntent.id}`,
      );
      return;
    }

    let shouldConfirm = false;

    await this.dataSource.transaction(async (manager) => {
      const booking = await manager
        .createQueryBuilder(Booking, 'booking')
        .setLock('pessimistic_write')
        .where('booking.id = :id', { id: bookingId })
        .getOne();

      if (!booking) {
        this.logger.warn(`Booking not found for payment: ${bookingId}`);
        return;
      }

      if (booking.status === BookingStatus.Confirmed) {
        return;
      }

      if (booking.status !== BookingStatus.Pending) {
        this.logger.warn(
          `Booking ${bookingId} is not payable, status=${booking.status}`,
        );
        return;
      }

      const amount = paymentIntent.amount_received / 100;
      const payment = manager.create(Payment, {
        bookingId,
        stripeEventId: event.id,
        amount,
        status: PaymentStatus.Succeeded,
      });

      await manager.save(payment);

      booking.status = BookingStatus.Confirmed;
      booking.stripePaymentIntentId = paymentIntent.id;
      await manager.save(booking);
      shouldConfirm = true;
    });

    if (!shouldConfirm) {
      return;
    }

    const currentBooking = await loadBookingWithEmailRelations(
      this.bookings,
      bookingId,
    );
    if (currentBooking) {
      await this.lifecycle.onBookingConfirmed(currentBooking);
    }
  }

  async hasSucceededPayment(bookingId: string): Promise<boolean> {
    return this.payments.exists({
      where: { bookingId, status: PaymentStatus.Succeeded },
    });
  }

  async refundAndCancel(
    bookingId: string,
    reason: BookingCancellationReason,
  ): Promise<Booking> {
    const booking = await this.bookings.findOne({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const payment = await this.payments.findOne({
      where: { bookingId, status: PaymentStatus.Succeeded },
      order: { createdAt: 'DESC' },
    });

    if (!payment || !booking.stripePaymentIntentId) {
      throw new BadRequestException('No succeeded payment to refund');
    }

    await this.stripe.createRefund(
      booking.stripePaymentIntentId,
      `refund-${bookingId}`,
    );

    await this.dataSource.transaction(async (manager) => {
      payment.status = PaymentStatus.Refunded;
      await manager.save(payment);
      booking.status = BookingStatus.Refunded;
      await manager.save(booking);
    });

    const cancelledBooking = await loadBookingWithEmailRelations(
      this.bookings,
      bookingId,
    );
    if (cancelledBooking) {
      await this.lifecycle.onBookingCancelled(cancelledBooking, reason);
    }

    const updated = await this.bookings.findOne({ where: { id: bookingId } });
    if (!updated) {
      throw new NotFoundException('Booking not found');
    }
    return updated;
  }
}
