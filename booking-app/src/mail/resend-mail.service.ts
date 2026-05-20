import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import type { AppConfig } from '../config/configuration';

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

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    logContext?: string,
  ): Promise<void> {
    const mailConfig = this.config.get('mail', { infer: true });
    const context = logContext ?? 'email';

    if (mailConfig.mode === 'noop' || !this.resend) {
      this.logger.debug(`[noop] ${context} to=${to}`);
      return;
    }

    const { error } = await this.resend.emails.send({
      from: mailConfig.from,
      to,
      subject,
      html,
    });

    if (error) {
      this.logger.error(`Resend ${context} failed: ${JSON.stringify(error)}`);
      throw new Error(error.message ?? 'Resend send failed');
    }
  }
}
