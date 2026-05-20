import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { DataSource } from 'typeorm';
import { Booking, BookingStatus } from '../booking.entity';
import { Payment, PaymentStatus } from '../../payments/payment.entity';
import { BookingCancellationReason } from '../email/booking-cancellation-reason';
import { loadBookingWithEmailRelations } from '../email/booking-email-relations.util';
import { BookingLifecycleService } from '../email/booking-lifecycle.service';
import { BOOKING_PAYMENT_PENDING_EXPIRY } from './booking-expiry.constants';

@Injectable()
export class PendingBookingExpiryScheduler implements OnModuleInit {
  private readonly logger = new Logger(PendingBookingExpiryScheduler.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly lifecycle: BookingLifecycleService,
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
    const ttlMs = BOOKING_PAYMENT_PENDING_EXPIRY.pendingTtlMinutes * 60_000;
    const cutoff = new Date(Date.now() - ttlMs);

    // Find candidate IDs only (cheap, no long locks)
    const raw = await this.dataSource
      .createQueryBuilder()
      .select('b.id', 'id')
      .from(Booking, 'b')
      .leftJoin(Payment, 'p', 'p.booking_id = b.id AND p.status = :succeeded', {
        succeeded: PaymentStatus.Succeeded,
      })
      .where('b.status = :pending', { pending: BookingStatus.Pending })
      .andWhere('b.created_at < :cutoff', { cutoff })
      .andWhere('b.deleted_at IS NULL')
      .groupBy('b.id')
      .having('COUNT(p.id) = 0')
      .getRawMany<{ id: string }>();

    const ids = raw.map((r) => r.id);
    let expiredCount = 0;

    for (const id of ids) {
      let didExpire = false;

      await this.dataSource.transaction(async (manager) => {
        const booking = await manager
          .createQueryBuilder(Booking, 'b')
          .setLock('pessimistic_write')
          .where('b.id = :id', { id })
          .getOne();

        if (!booking || booking.status !== BookingStatus.Pending) {
          return;
        }
        if (booking.createdAt >= cutoff) {
          return;
        }

        const succeeded = await manager.exists(Payment, {
          where: { bookingId: id, status: PaymentStatus.Succeeded },
        });
        if (succeeded) return;

        booking.status = BookingStatus.Cancelled;
        await manager.save(booking);
        didExpire = true;
      });

      if (!didExpire) {
        continue;
      }

      expiredCount += 1;

      const full = await loadBookingWithEmailRelations(
        this.dataSource.getRepository(Booking),
        id,
      );
      if (full) {
        await this.lifecycle.onBookingCancelled(
          full,
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
