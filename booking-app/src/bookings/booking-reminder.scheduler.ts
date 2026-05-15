import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';
import { toBookingEmailJobData } from 'src/email-queue/email-job-payload.util';
import type { BookingEmailJobData } from 'src/email-queue/email-jobs.types';
import {
  JOB_BOOKING_REMINDER,
  QUEUE_EMAIL,
} from 'src/email-queue/queue.constants';
import { Booking } from './booking.entity';
import { BOOKING_REMINDER } from './booking-reminder.constants';
import { reminderDelayMs } from './booking-reminder.utils';

@Injectable()
export class BookingReminderScheduler implements OnModuleInit {
  private readonly logger = new Logger(BookingReminderScheduler.name);

  private static readonly CRON_NAME = 'bookingReminderDailyScan';

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    @InjectQueue(QUEUE_EMAIL)
    private readonly emailQueue: Queue<BookingEmailJobData, unknown, string>,
  ) {}

  onModuleInit(): void {
    if (!BOOKING_REMINDER.enabled) {
      this.logger.log('Booking reminder daily scan is disabled');
      return;
    }

    const job = new CronJob(
      BOOKING_REMINDER.cronExpression,
      () => {
        void this.enqueueUpcomingReminderJobs();
      },
      null,
      false,
      BOOKING_REMINDER.timezone,
    );

    this.schedulerRegistry.addCronJob(BookingReminderScheduler.CRON_NAME, job);
    job.start();
    this.logger.log(
      `Booking reminder scan registered (${BOOKING_REMINDER.cronExpression}, ${BOOKING_REMINDER.timezone})`,
    );
  }

  // Finds eligible future bookings and enqueues delayed reminder jobs so each
  // runs at `slot.startTime - lead`.
  async enqueueUpcomingReminderJobs(): Promise<void> {
    if (!BOOKING_REMINDER.enabled) {
      return;
    }

    const now = new Date();
    const horizon = new Date(
      now.getTime() + BOOKING_REMINDER.lookaheadDays * 24 * 60 * 60 * 1000,
    );

    const withSlots = await this.bookings
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.slot', 'slot')
      .innerJoinAndSelect('booking.user', 'user')
      .where('booking.status IN (:...statuses)', {
        statuses: [...BOOKING_REMINDER.statuses],
      })
      .andWhere('booking.reminderSentAt IS NULL')
      .andWhere('booking.deletedAt IS NULL')
      .andWhere('slot.deletedAt IS NULL')
      .andWhere('slot.startTime > :now', { now })
      .andWhere('slot.startTime <= :horizon', { horizon })
      .andWhere("NULLIF(TRIM(user.email), '') IS NOT NULL")
      .getMany();

    let enqueued = 0;
    for (const booking of withSlots) {
      const slotStart = booking.slot?.startTime;

      if (
        !slotStart ||
        !booking.user?.email ||
        !booking.slot ||
        !booking.user
      ) {
        continue;
      }

      const delayMs = reminderDelayMs(slotStart, now);
      const payload = toBookingEmailJobData(booking);

      try {
        await this.emailQueue.add(JOB_BOOKING_REMINDER, payload, {
          jobId: `reminder-${booking.id}`,
          delay: delayMs,
          removeOnComplete: true,
          attempts: 5,
          backoff: { type: 'exponential', delay: 30_000 },
        });
        enqueued += 1;
      } catch (err) {
        this.logger.warn(
          `Could not enqueue reminder for booking=${booking.id}: ${err}`,
        );
      }
    }

    this.logger.log(
      `Booking reminder scan: ${withSlots.length} candidate(s), ${enqueued} enqueue attempt(s)`,
    );
  }
}
