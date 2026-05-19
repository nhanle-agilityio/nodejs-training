import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { toBookingEmailJobData } from '../email-queue/email-job-payload.util';
import {
  bookingReminderJobOptions,
  emailJobIds,
} from '../email-queue/email-job-options.util';
import type { BookingEmailJobData } from '../email-queue/email-jobs.types';
import {
  JOB_BOOKING_REMINDER,
  QUEUE_EMAIL,
} from '../email-queue/queue.constants';
import { Booking } from './booking.entity';
import {
  isEligibleForReminderBooking,
  reminderDelayMs,
} from './booking-reminder.utils';

@Injectable()
export class BookingReminderQueueService {
  private readonly logger = new Logger(BookingReminderQueueService.name);

  constructor(
    @InjectQueue(QUEUE_EMAIL)
    private readonly emailQueue: Queue<BookingEmailJobData, unknown, string>,
  ) {}

  // Schedules or refreshes the delayed reminder job for a booking.
  async upsertReminderJob(
    booking: Booking & {
      user?: { email: string; name: string | null } | null;
      slot?: {
        title: string;
        startTime: Date;
        endTime: Date;
        deletedAt?: Date | null;
      } | null;
    },
  ): Promise<boolean> {
    if (!isEligibleForReminderBooking(booking)) {
      return false;
    }

    const slotStart = booking.slot.startTime;
    const now = new Date();
    const delayMs = reminderDelayMs(slotStart, now);
    const payload = toBookingEmailJobData(booking);
    const jobId = emailJobIds.bookingReminder(booking.id);
    const opts = bookingReminderJobOptions(booking.id, delayMs);

    try {
      const existing = await this.emailQueue.getJob(jobId);
      if (existing) {
        const state = await existing.getState();
        if (state === 'active') {
          return true;
        }
        if (state === 'completed' || state === 'failed') {
          await existing.remove();
        } else {
          await existing.updateData(payload);
          await existing.changeDelay(delayMs);
          return true;
        }
      }

      await this.emailQueue.add(JOB_BOOKING_REMINDER, payload, opts);
      return true;
    } catch (err) {
      this.logger.warn(
        `Could not upsert reminder for booking=${booking.id}: ${err}`,
      );
      return false;
    }
  }

  // Removes a scheduled reminder when the booking is cancelled or expires.
  async removeReminderJob(bookingId: string): Promise<void> {
    try {
      const job = await this.emailQueue.getJob(
        emailJobIds.bookingReminder(bookingId),
      );
      if (!job) {
        return;
      }
      const state = await job.getState();
      if (state === 'active') {
        return;
      }
      await job.remove();
    } catch (err) {
      this.logger.warn(
        `Could not remove reminder job for booking=${bookingId}: ${err}`,
      );
    }
  }
}
