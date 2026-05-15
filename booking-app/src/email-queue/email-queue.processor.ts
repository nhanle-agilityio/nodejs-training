import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { BOOKING_REMINDER } from '../bookings/booking-reminder.constants';
import { ResendMailService } from '../mail/resend-mail.service';
import { toBookingEmailJobData } from './email-job-payload.util';
import type { BookingEmailJobData } from './email-jobs.types';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMATION,
  JOB_BOOKING_EXPIRED,
  JOB_BOOKING_REMINDER,
  QUEUE_EMAIL,
} from './queue.constants';

@Processor(QUEUE_EMAIL, { concurrency: 5 })
export class EmailQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailQueueProcessor.name);

  constructor(
    private readonly mail: ResendMailService,
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
  ) {
    super();
  }

  async process(job: Job<BookingEmailJobData, unknown, string>): Promise<void> {
    this.logger.log(
      `Email job ${job.name} id=${job.id} booking=${job.data.bookingId}`,
    );

    switch (job.name) {
      case JOB_BOOKING_CONFIRMATION:
        await this.mail.sendBookingConfirmation(job.data);
        return;
      case JOB_BOOKING_CANCELLED:
        await this.mail.sendBookingCancelled(job.data);
        return;
      case JOB_BOOKING_EXPIRED:
        await this.mail.sendBookingExpired(job.data);
        return;
      case JOB_BOOKING_REMINDER: {
        await this.processBookingReminder(job.data);
        return;
      }
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async processBookingReminder(
    jobData: BookingEmailJobData,
  ): Promise<void> {
    const booking = await this.bookings.findOne({
      where: { id: jobData.bookingId },
      relations: ['user', 'slot'],
    });

    if (!booking?.user?.email?.trim() || !booking.slot) {
      return;
    }

    const allowed = (
      BOOKING_REMINDER.statuses as readonly BookingStatus[]
    ).includes(booking.status);
    if (!allowed) {
      return;
    }

    if (booking.reminderSentAt) {
      return;
    }

    await this.mail.sendBookingReminder(toBookingEmailJobData(booking));
    booking.reminderSentAt = new Date();
    await this.bookings.save(booking);
  }
}
