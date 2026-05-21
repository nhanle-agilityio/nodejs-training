import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { AppConfig } from '../config/configuration';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from '../bookings/schedulers/booking-expiry.constants';
import { SlotStatus } from '../slots/slot.entity';
import { StripeService } from './stripe.service';
import { StripeCheckoutSessionCreateParams } from './stripe.types';

export interface CheckoutSessionResult {
  checkoutUrl: string;
  sessionId: string;
  expiresAt?: Date;
}

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly stripe: StripeService,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  private bookingPaymentExpiresAt(booking: Booking): Date {
    const ttlMs = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;
    return new Date(booking.createdAt.getTime() + ttlMs);
  }

  private isBookingExpired(booking: Booking): boolean {
    return Date.now() >= this.bookingPaymentExpiresAt(booking).getTime();
  }

  private assertBookingNotExpired(booking: Booking): void {
    if (this.isBookingExpired(booking)) {
      throw new BadRequestException('Booking payment window has expired');
    }
  }

  private async tryReuseCheckoutSession(
    sessionId: string,
  ): Promise<Omit<CheckoutSessionResult, 'expiresAt'> | null> {
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

    this.assertBookingNotExpired(booking);

    const slot = booking.slot;
    if (!slot || slot.deletedAt) {
      throw new BadRequestException('Slot is not available');
    }
    if (slot.status !== SlotStatus.Open) {
      throw new BadRequestException('Slot is not open for booking');
    }

    const price = Number(slot.price);
    if (!Number.isFinite(price) || price <= 0) {
      throw new BadRequestException('Slot price is invalid for checkout');
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
}
