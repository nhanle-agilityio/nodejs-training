import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { BookingEmailJobData } from '../email-queue/email-jobs.types';
import { ResendMailService } from '../mail/resend-mail.service';
import { Booking } from './booking.entity';
import { BOOKING_REMINDER } from './booking-reminder.constants';

@Injectable()
export class BookingReminderSendService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly mail: ResendMailService,
  ) {}

  // Claims the reminder slot, sends using enqueued payload.
  async processReminder(jobData: BookingEmailJobData): Promise<void> {
    const claimed = await this.claimReminderSend(jobData.bookingId);
    if (!claimed) {
      return;
    }

    try {
      await this.mail.sendBookingReminder(jobData);
    } catch (err) {
      await this.releaseReminderSend(jobData.bookingId);
      throw err;
    }
  }

  private async claimReminderSend(bookingId: string): Promise<boolean> {
    const result = await this.bookings
      .createQueryBuilder()
      .update(Booking)
      .set({ reminderSentAt: new Date() })
      .where('id = :bookingId', { bookingId })
      .andWhere('reminder_sent_at IS NULL')
      .andWhere('status IN (:...statuses)', {
        statuses: [...BOOKING_REMINDER.statuses],
      })
      .andWhere('deleted_at IS NULL')
      .execute();

    return (result.affected ?? 0) > 0;
  }

  private async releaseReminderSend(bookingId: string): Promise<void> {
    await this.bookings.update({ id: bookingId }, { reminderSentAt: null });
  }
}
