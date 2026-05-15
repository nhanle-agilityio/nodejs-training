import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import type { AppConfig } from '../config/configuration';
import type {
  BookingCancelledEmailInput,
  BookingConfirmationEmailInput,
  BookingExpiredEmailInput,
  BookingReminderEmailInput,
} from './email-payloads';

@Injectable()
export class ResendMailService {
  private readonly logger = new Logger(ResendMailService.name);
  private readonly resend: Resend | null;

  constructor(private readonly config: ConfigService<AppConfig, true>) {
    const mail = this.config.get('mail', { infer: true });
    this.resend =
      mail.mode === 'live' && mail.resendApiKey
        ? new Resend(mail.resendApiKey)
        : null;
  }

  async sendBookingConfirmation(
    input: BookingConfirmationEmailInput,
  ): Promise<void> {
    await this.sendEmail(
      input.to,
      `Booking confirmed — ${input.slotTitle}`,
      this.renderConfirmationHtml(input),
      `confirmation booking=${input.bookingId}`,
    );
  }

  async sendBookingReminder(input: BookingReminderEmailInput): Promise<void> {
    await this.sendEmail(
      input.to,
      `Reminder: ${input.slotTitle}`,
      this.renderReminderHtml(input),
      `reminder booking=${input.bookingId}`,
    );
  }

  async sendBookingCancelled(input: BookingCancelledEmailInput): Promise<void> {
    await this.sendEmail(
      input.to,
      `Booking cancelled — ${input.slotTitle}`,
      this.renderCancelledHtml(input),
      `cancelled booking=${input.bookingId}`,
    );
  }

  async sendBookingExpired(input: BookingExpiredEmailInput): Promise<void> {
    await this.sendEmail(
      input.to,
      `Booking expired — ${input.slotTitle}`,
      this.renderExpiredHtml(input),
      `expired booking=${input.bookingId}`,
    );
  }

  private async sendEmail(
    to: string,
    subject: string,
    html: string,
    logContext: string,
  ): Promise<void> {
    const mail = this.config.get('mail', { infer: true });

    if (mail.mode === 'noop' || !this.resend) {
      this.logger.debug(`[noop] ${logContext} to=${to}`);
      return;
    }

    const { error } = await this.resend.emails.send({
      from: mail.from,
      to,
      subject,
      html,
    });

    if (error) {
      this.logger.error(
        `Resend ${logContext} failed: ${JSON.stringify(error)}`,
      );
      throw new Error(error.message ?? 'Resend send failed');
    }
  }

  private renderConfirmationHtml(input: BookingConfirmationEmailInput): string {
    const name = escapeHtml(input.recipientName ?? 'there');
    return `
      <p>Hi ${name},</p>
      <p>Your booking <strong>${escapeHtml(input.bookingId)}</strong> is confirmed for
      <strong>${escapeHtml(input.slotTitle)}</strong>.</p>
      <p>${escapeHtml(input.slotStartIso)} — ${escapeHtml(input.slotEndIso)}</p>
    `.trim();
  }

  private renderReminderHtml(input: BookingReminderEmailInput): string {
    const name = escapeHtml(input.recipientName ?? 'there');
    return `
      <p>Hi ${name},</p>
      <p>Reminder: <strong>${escapeHtml(input.slotTitle)}</strong> starts at
      ${escapeHtml(input.slotStartIso)}.</p>
      <p>Booking ref: ${escapeHtml(input.bookingId)}</p>
    `.trim();
  }

  private renderCancelledHtml(input: BookingCancelledEmailInput): string {
    const name = escapeHtml(input.recipientName ?? 'there');
    return `
      <p>Hi ${name},</p>
      <p>Your booking <strong>${escapeHtml(input.bookingId)}</strong> has been cancelled.</p>
    `.trim();
  }

  private renderExpiredHtml(input: BookingExpiredEmailInput): string {
    const name = escapeHtml(input.recipientName ?? 'there');
    return `
      <p>Hi ${name},</p>
      <p>Your booking <strong>${escapeHtml(input.bookingId)}</strong> for
      <strong>${escapeHtml(input.slotTitle)}</strong> has expired because payment was not received in time.</p>
      <p>You may create a new booking if the slot is still available.</p>
    `.trim();
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
