import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { BOOKING_REMINDER } from './booking-reminder.constants';
import type { BookingEmailJobData } from './booking-email.types';
import { BookingMailService } from './booking-mail.service';

@Injectable()
export class BookingReminderSendService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly mail: BookingMailService,
  ) {}

  private async claimReminderSend(bookingId: string): Promise<boolean> {
    const result = await this.bookings
      .createQueryBuilder('booking')
      .update(Booking)
      .set({ reminderSentAt: new Date() })
      .where('booking.id = :bookingId', { bookingId })
      .andWhere('booking.reminderSentAt IS NULL')
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [...BOOKING_REMINDER.statuses],
      })
      .andWhere('booking.deletedAt IS NULL')
      .execute();

    return (result.affected ?? 0) > 0;
  }

  private async releaseReminderSend(bookingId: string): Promise<void> {
    await this.bookings.update({ id: bookingId }, { reminderSentAt: null });
  }

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
}
