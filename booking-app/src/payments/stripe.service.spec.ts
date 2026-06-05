import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import type { StripeCheckoutSessionCreateParams } from './stripe.types';

describe('StripeService', () => {
  let service: StripeService;
  const mockConstructEvent = jest.fn();
  const mockSessionsRetrieve = jest.fn();
  const mockSessionsCreate = jest.fn();
  const mockSessionsExpire = jest.fn();
  const mockRefundsCreate = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();

    const config = {
      get: jest.fn((key: string) => {
        if (key === 'stripe') return { secretKey: 'sk_test_dummy_key' };
        if (key === 'stripe.webhookSecret') return 'whsec_test_dummy';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeService, { provide: ConfigService, useValue: config }],
    }).compile();

    service = module.get(StripeService);

    // Replace internal Stripe client methods with our mock functions.
    // Assigning own properties shadows prototype methods, so no real network calls are made.
    const client = (service as unknown as { stripe: Record<string, unknown> })
      .stripe as {
      webhooks: { constructEvent: jest.Mock };
      checkout: {
        sessions: { retrieve: jest.Mock; create: jest.Mock; expire: jest.Mock };
      };
      refunds: { create: jest.Mock };
    };

    client.webhooks.constructEvent = mockConstructEvent;
    client.checkout.sessions.retrieve = mockSessionsRetrieve;
    client.checkout.sessions.create = mockSessionsCreate;
    client.checkout.sessions.expire = mockSessionsExpire;
    client.refunds.create = mockRefundsCreate;
  });

  describe('constructWebhookEvent', () => {
    it('passes payload, signature, and webhook secret to stripe.webhooks.constructEvent', () => {
      const payload = Buffer.from('{}');
      const signature = 'v1,test_signature';
      const mockEvent = {
        id: 'evt_1',
        type: 'payment_intent.succeeded',
        data: { object: {} },
      };
      mockConstructEvent.mockReturnValue(mockEvent);

      const result = service.constructWebhookEvent(payload, signature);

      expect(mockConstructEvent).toHaveBeenCalledWith(
        payload,
        signature,
        'whsec_test_dummy',
      );
      expect(result).toBe(mockEvent);
    });

    it('propagates errors thrown by the Stripe SDK (e.g. invalid signature)', () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error(
          'No signatures found matching the expected signature for payload',
        );
      });

      expect(() => service.constructWebhookEvent('bad', 'bad_sig')).toThrow(
        'No signatures found',
      );
    });
  });

  describe('retrieveCheckoutSession', () => {
    it('delegates to stripe.checkout.sessions.retrieve with the session id', async () => {
      const session = {
        id: 'cs_1',
        url: 'https://checkout.stripe.com/cs_1',
        status: 'open',
      };
      mockSessionsRetrieve.mockResolvedValue(session);

      const result = await service.retrieveCheckoutSession('cs_1');

      expect(mockSessionsRetrieve).toHaveBeenCalledWith('cs_1');
      expect(result).toBe(session);
    });
  });

  describe('createCheckoutSession', () => {
    it('passes params and idempotency key to stripe.checkout.sessions.create', async () => {
      const params = {
        mode: 'payment',
        success_url: 'https://example.com/success',
        line_items: [],
      } as unknown as StripeCheckoutSessionCreateParams;
      const session = {
        id: 'cs_new',
        url: 'https://checkout.stripe.com/cs_new',
        status: 'open',
      };
      mockSessionsCreate.mockResolvedValue(session);

      const result = await service.createCheckoutSession(
        params,
        'idem_key_abc',
      );

      expect(mockSessionsCreate).toHaveBeenCalledWith(params, {
        idempotencyKey: 'idem_key_abc',
      });
      expect(result).toBe(session);
    });
  });

  describe('createRefund', () => {
    it('passes payment_intent id and idempotency key to stripe.refunds.create', async () => {
      const refund = { id: 're_1' };
      mockRefundsCreate.mockResolvedValue(refund);

      const result = await service.createRefund(
        'pi_payment_1',
        'refund_idem_key',
      );

      expect(mockRefundsCreate).toHaveBeenCalledWith(
        { payment_intent: 'pi_payment_1' },
        { idempotencyKey: 'refund_idem_key' },
      );
      expect(result).toBe(refund);
    });
  });

  describe('expireCheckoutSession', () => {
    it('delegates to stripe.checkout.sessions.expire with the session id', async () => {
      const session = { id: 'cs_1', url: null, status: 'expired' };
      mockSessionsExpire.mockResolvedValue(session);

      const result = await service.expireCheckoutSession('cs_1');

      expect(mockSessionsExpire).toHaveBeenCalledWith('cs_1');
      expect(result).toBe(session);
    });
  });
});
