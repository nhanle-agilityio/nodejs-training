import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUE_EMAIL } from '../../email-queue/queue.constants';
import { BookingCancellationReason } from './booking-cancellation-reason';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMED,
} from './booking-email.constants';
import {
  bookingCancelledJobOptions,
  bookingConfirmedJobOptions,
} from './booking-email-job-options.util';
import {
  toBookingCancelledEmailJobData,
  toBookingEmailJobData,
} from './booking-email-payload.util';
import type { BookingWithEmailRelations } from './booking-email.types';
import { BookingReminderQueueService } from './booking-reminder-queue.service';

@Injectable()
export class BookingLifecycleService {
  private readonly logger = new Logger(BookingLifecycleService.name);

  constructor(
    @InjectQueue(QUEUE_EMAIL)
    private readonly emailQueue: Queue,
    private readonly reminderQueue: BookingReminderQueueService,
  ) {}

  async onBookingCreated(booking: BookingWithEmailRelations): Promise<void> {
    // TODO: Stop sending confirmation here; enqueue only from onBookingConfirmed.
    await this.enqueueConfirmationEmail(booking);
  }

  // Call when payment succeeds and booking status becomes CONFIRMED.
  async onBookingConfirmed(booking: BookingWithEmailRelations): Promise<void> {
    await this.enqueueConfirmationEmail(booking);
    await this.reminderQueue.upsertReminderJob(booking);
  }

  async onBookingCancelled(
    booking: BookingWithEmailRelations,
    reason: BookingCancellationReason,
  ): Promise<void> {
    await this.reminderQueue.removeReminderJob(booking.id);

    if (!booking.user?.email?.trim() || !booking.slot) {
      return;
    }

    try {
      await this.emailQueue.add(
        JOB_BOOKING_CANCELLED,
        toBookingCancelledEmailJobData(booking, reason),
        bookingCancelledJobOptions(booking.id),
      );
    } catch (err) {
      this.logger.warn(
        `Could not enqueue cancellation email for booking=${booking.id}: ${err}`,
      );
    }
  }

  async enqueueConfirmationEmail(
    booking: BookingWithEmailRelations,
  ): Promise<void> {
    if (!booking.user?.email?.trim() || !booking.slot) {
      return;
    }

    try {
      await this.emailQueue.add(
        JOB_BOOKING_CONFIRMED,
        toBookingEmailJobData(booking),
        bookingConfirmedJobOptions(booking.id),
      );
    } catch (err) {
      this.logger.warn(
        `Could not enqueue confirmation email for booking=${booking.id}: ${err}`,
      );
    }
  }
}
