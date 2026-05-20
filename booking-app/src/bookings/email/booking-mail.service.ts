import { Injectable } from '@nestjs/common';
import { ResendMailService } from '../../mail/resend-mail.service';
import {
  renderBookingCancelledHtml,
  renderBookingConfirmationHtml,
  renderBookingReminderHtml,
} from './booking-email.templates';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './booking-email.types';

@Injectable()
export class BookingMailService {
  constructor(private readonly mail: ResendMailService) {}

  async sendBookingConfirmation(input: BookingEmailJobData): Promise<void> {
    await this.mail.sendEmail(
      input.to,
      `Booking confirmed — ${input.slotTitle}`,
      renderBookingConfirmationHtml(input),
      `confirmation booking=${input.bookingId}`,
    );
  }

  async sendBookingReminder(input: BookingEmailJobData): Promise<void> {
    await this.mail.sendEmail(
      input.to,
      `Reminder: ${input.slotTitle}`,
      renderBookingReminderHtml(input),
      `reminder booking=${input.bookingId}`,
    );
  }

  async sendBookingCancelled(
    input: BookingCancelledEmailJobData,
  ): Promise<void> {
    await this.mail.sendEmail(
      input.to,
      `Booking cancelled — ${input.slotTitle}`,
      renderBookingCancelledHtml(input),
      `cancelled booking=${input.bookingId}`,
    );
  }
}
