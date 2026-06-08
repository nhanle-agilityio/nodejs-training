import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { DataSource } from 'typeorm';
import { Booking, BookingStatus } from '../booking.entity';
import { Payment, PaymentStatus } from '../../payments/payment.entity';
import { StripeService } from '../../payments/stripe.service';
import { BookingCancellationReason } from '../email/booking-cancellation-reason';
import { BookingLifecycleService } from '../email/booking-lifecycle.service';
import { BookingsService } from '../bookings.service';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from './booking-expiry.constants';
import { pendingPaymentCutoff } from './booking-payment.util';

@Injectable()
export class PendingBookingExpiryScheduler implements OnModuleInit {
  private readonly logger = new Logger(PendingBookingExpiryScheduler.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly bookingsService: BookingsService,
    private readonly lifecycle: BookingLifecycleService,
    private readonly stripe: StripeService,
  ) {}

  onModuleInit() {
    if (!BOOKING_PAYMENT_PENDING_EXPIRY.enabled) return;

    const job = new CronJob(
      BOOKING_PAYMENT_PENDING_EXPIRY.cronExpression,
      () => void this.expireStalePendingBookings(),
      null,
      false,
      BOOKING_PAYMENT_PENDING_EXPIRY.timezone,
    );
    this.schedulerRegistry.addCronJob('pendingBookingExpiry', job);
    job.start();
  }

  async expireStalePendingBookings(): Promise<void> {
    const cutoff = pendingPaymentCutoff();

    const bookings = await this.dataSource
      .createQueryBuilder()
      .select('b.id', 'id')
      .from(Booking, 'b')
      .leftJoin(Payment, 'p', 'p.booking_id = b.id AND p.status = :succeeded', {
        succeeded: PaymentStatus.Succeeded,
      })
      .where('b.status = :pending', { pending: BookingStatus.Pending })
      .andWhere('b.createdAt < :cutoff', { cutoff })
      .andWhere('b.deletedAt IS NULL')
      .groupBy('b.id')
      .having('COUNT(p.id) = 0')
      .getRawMany<{ id: string }>();

    const bookingIds = bookings.map((booking) => booking.id);
    let expiredCount = 0;

    for (const bookingId of bookingIds) {
      let didExpire = false;
      let stripeSessionId: string | null = null;

      await this.dataSource.transaction(async (manager) => {
        const booking = await manager
          .createQueryBuilder(Booking, 'b')
          .setLock('pessimistic_write')
          .where('b.id = :id', { id: bookingId })
          .getOne();

        if (!booking || booking.status !== BookingStatus.Pending) {
          return;
        }
        if (booking.createdAt >= cutoff) {
          return;
        }

        const succeeded = await manager.exists(Payment, {
          where: { bookingId: bookingId, status: PaymentStatus.Succeeded },
        });
        if (succeeded) return;

        stripeSessionId = booking.stripeSessionId ?? null;
        booking.status = BookingStatus.Cancelled;
        await manager.save(booking);
        didExpire = true;
      });

      if (!didExpire) {
        continue;
      }

      expiredCount += 1;

      if (stripeSessionId) {
        try {
          await this.stripe.expireCheckoutSession(stripeSessionId);
        } catch (err) {
          this.logger.warn(
            `Failed to expire Stripe session ${stripeSessionId as string} for booking ${bookingId}: ${(err as Error).message}`,
          );
        }
      }

      const booking =
        await this.bookingsService.findBookingWithEmailRelations(bookingId);
      if (booking) {
        await this.lifecycle.onBookingCancelled(
          booking,
          BookingCancellationReason.PaymentTimeout,
        );
      }
    }

    if (expiredCount > 0) {
      this.logger.log(
        `Pending booking expiry cancelled ${expiredCount} booking(s)`,
      );
    }
  }
}
