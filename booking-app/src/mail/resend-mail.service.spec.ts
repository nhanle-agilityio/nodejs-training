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

const requireResendMock = (): { Resend: jest.Mock } => {
  return jest.requireMock<{ Resend: jest.Mock }>('resend');
};

const cfg = (mail: AppConfig['mail']): ConfigService<AppConfig, true> => {
  return {
    get: (k: string) => (k === 'mail' ? mail : undefined),
  } as ConfigService<AppConfig, true>;
};

describe('ResendMailService', () => {
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
      service.sendEmail('a@b', 'Subject', '<p>Hi</p>', 'test'),
    ).resolves.toBeUndefined();

    const instance = Resend.mock.results[0]?.value as {
      emails: { send: jest.Mock };
    };
    expect(instance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'a@b',
        subject: 'Subject',
        html: '<p>Hi</p>',
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
      service.sendEmail('a@b', 'Subject', '<p>Hi</p>'),
    ).resolves.toBeUndefined();

    expect(Resend).not.toHaveBeenCalled();
  });

  it('throws when Resend returns an error', async () => {
    const { Resend } = requireResendMock();
    Resend.mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'rate limited' },
        }),
      },
    }));

    const service = new ResendMailService(
      cfg({
        mode: 'live',
        resendApiKey: 're_key',
        from: 'F <f@test>',
      }),
    );

    await expect(
      service.sendEmail('a@b', 'Subject', '<p>Hi</p>'),
    ).rejects.toThrow('rate limited');
  });
});
