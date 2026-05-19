import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { ResendMailService } from './resend-mail.service';

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

describe('ResendMailService', () => {
  const sampleInput = {
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

    const service = new ResendMailService(
      cfg({
        mode: 'live',
        resendApiKey: 're_key',
        from: 'F <f@test>',
      }),
    );

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

    const service = new ResendMailService(
      cfg({
        mode: 'noop',
        resendApiKey: '',
        from: 'F <f@test>',
      }),
    );
    await expect(
      service.sendBookingConfirmation(sampleInput),
    ).resolves.toBeUndefined();
    await expect(
      service.sendBookingReminder(sampleInput),
    ).resolves.toBeUndefined();

    expect(Resend).not.toHaveBeenCalled();
  });
});
