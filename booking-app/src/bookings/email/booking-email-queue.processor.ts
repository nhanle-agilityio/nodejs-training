import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_EMAIL } from '../../email-queue/queue.constants';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMED,
  JOB_BOOKING_REMINDER,
} from './booking-email.constants';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './booking-email.types';
import { BookingMailService } from './booking-mail.service';
import { BookingReminderSendService } from './booking-reminder-send.service';

type EmailJobPayload = BookingEmailJobData | BookingCancelledEmailJobData;

@Processor(QUEUE_EMAIL, { concurrency: 5 })
export class BookingEmailQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(BookingEmailQueueProcessor.name);

  constructor(
    private readonly mail: BookingMailService,
    private readonly reminderSend: BookingReminderSendService,
  ) {
    super();
  }

  async process(job: Job<EmailJobPayload, unknown, string>): Promise<void> {
    this.logger.log(
      `Email job ${job.name} id=${job.id} booking=${job.data.bookingId}`,
    );

    switch (job.name) {
      case JOB_BOOKING_CONFIRMED:
        await this.mail.sendBookingConfirmation(job.data);
        return;
      case JOB_BOOKING_CANCELLED:
        await this.mail.sendBookingCancelled(
          job.data as BookingCancelledEmailJobData,
        );
        return;
      case JOB_BOOKING_REMINDER:
        await this.reminderSend.processReminder(job.data);
        return;
      default:
        throw new Error(`Unknown email job name: ${job.name}`);
    }
  }
}
