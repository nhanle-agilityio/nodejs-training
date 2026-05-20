import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QUEUE_EMAIL } from '../../email-queue/queue.constants';
import {
  isEligibleForReminderBooking,
  reminderDelayMs,
} from './booking-reminder.utils';
import type { BookingWithEmailRelations } from './booking-email.types';
import { JOB_BOOKING_REMINDER } from './booking-email.constants';
import {
  bookingEmailJobIds,
  bookingReminderJobOptions,
} from './booking-email-job-options.util';
import { toBookingEmailJobData } from './booking-email-payload.util';
import type { BookingEmailJobData } from './booking-email.types';

@Injectable()
export class BookingReminderQueueService {
  private readonly logger = new Logger(BookingReminderQueueService.name);

  constructor(
    @InjectQueue(QUEUE_EMAIL)
    private readonly emailQueue: Queue<BookingEmailJobData>,
  ) {}

  // Schedules or refreshes the delayed reminder job for a booking.
  async upsertReminderJob(
    booking: BookingWithEmailRelations,
  ): Promise<boolean> {
    if (!isEligibleForReminderBooking(booking)) {
      return false;
    }

    const slotStart = booking.slot.startTime;
    const now = new Date();
    const delayMs = reminderDelayMs(slotStart, now);
    const payload = toBookingEmailJobData(booking);
    const jobId = bookingEmailJobIds.reminder(booking.id);
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
      const reminderJobId = bookingEmailJobIds.reminder(bookingId);
      const job = await this.emailQueue.getJob(reminderJobId);
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
