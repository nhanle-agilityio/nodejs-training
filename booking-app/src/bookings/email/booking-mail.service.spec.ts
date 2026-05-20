import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../../config/configuration';
import { ResendMailService } from '../../mail/resend-mail.service';
import { BookingCancellationReason } from './booking-cancellation-reason';
import type { BookingEmailJobData } from './booking-email.types';
import { BookingMailService } from './booking-mail.service';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 're_1' }, error: null }),
    },
  })),
}));

function requireResendMock(): { Resend: jest.Mock } {
  return jest.requireMock<{ Resend: jest.Mock }>('resend');
}

function cfg(mail: AppConfig['mail']): ConfigService<AppConfig, true> {
  return {
    get: (k: string) => (k === 'mail' ? mail : undefined),
  } as ConfigService<AppConfig, true>;
}

describe('BookingMailService', () => {
  const sampleInput: BookingEmailJobData = {
    to: 'a@b',
    recipientName: 'A',
    bookingId: 'bid',
    slotTitle: 'Yoga',
    slotStartIso: new Date().toISOString(),
    slotEndIso: new Date().toISOString(),
  };

  it('live mode invokes Resend when API key is set', async () => {
    const { Resend } = requireResendMock();
    Resend.mockClear();

    const transport = new ResendMailService(
      cfg({
        mode: 'live',
        resendApiKey: 're_key',
        from: 'F <f@test>',
      }),
    );
    const service = new BookingMailService(transport);

    await expect(
      service.sendBookingConfirmation(sampleInput),
    ).resolves.toBeUndefined();

    const instance = Resend.mock.results[0]?.value as {
      emails: { send: jest.Mock };
    };
    expect(instance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'a@b',
        subject: expect.stringContaining('Yoga') as string,
      }),
    );
  });

  it('noop mode skips network', async () => {
    const { Resend } = requireResendMock();
    Resend.mockClear();

    const transport = new ResendMailService(
      cfg({
        mode: 'noop',
        resendApiKey: '',
        from: 'F <f@test>',
      }),
    );
    const service = new BookingMailService(transport);

    await expect(
      service.sendBookingConfirmation(sampleInput),
    ).resolves.toBeUndefined();
    await expect(
      service.sendBookingReminder(sampleInput),
    ).resolves.toBeUndefined();
    await expect(
      service.sendBookingCancelled({
        ...sampleInput,
        cancellationReason: BookingCancellationReason.UserCancelled,
      }),
    ).resolves.toBeUndefined();

    expect(Resend).not.toHaveBeenCalled();
  });
});
