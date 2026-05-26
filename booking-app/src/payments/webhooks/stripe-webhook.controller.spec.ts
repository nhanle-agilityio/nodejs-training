import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../payments.service';
import { StripeService } from '../stripe.service';
import { StripeWebhookController } from './stripe-webhook.controller';

describe('StripeWebhookController', () => {
  let controller: StripeWebhookController;
  let paymentsService: { handlePaymentIntentSucceeded: jest.Mock };
  let stripeService: { constructWebhookEvent: jest.Mock };

  beforeEach(async () => {
    paymentsService = {
      handlePaymentIntentSucceeded: jest.fn().mockResolvedValue(undefined),
    };
    stripeService = {
      constructWebhookEvent: jest.fn().mockReturnValue({
        id: 'evt_1',
        type: 'payment_intent.succeeded',
        data: { object: { id: 'pi_1', metadata: { bookingId: 'b1' } } },
      }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StripeWebhookController],
      providers: [
        { provide: PaymentsService, useValue: paymentsService },
        { provide: StripeService, useValue: stripeService },
      ],
    }).compile();

    controller = moduleRef.get(StripeWebhookController);
  });

  it('processes payment_intent.succeeded events', async () => {
    const result = await controller.handle(
      { rawBody: Buffer.from('{}') } as never,
      'sig_test',
    );

    expect(stripeService.constructWebhookEvent).toHaveBeenCalled();
    expect(paymentsService.handlePaymentIntentSucceeded).toHaveBeenCalled();
    expect(result).toEqual({
      received: true,
      type: 'payment_intent.succeeded',
    });
  });

  it('accepts unhandled event types without error', async () => {
    stripeService.constructWebhookEvent.mockReturnValue({
      id: 'evt_2',
      type: 'customer.created',
      data: { object: {} },
    });

    const result = await controller.handle(
      { rawBody: Buffer.from('{}') } as never,
      'sig_test',
    );

    expect(paymentsService.handlePaymentIntentSucceeded).not.toHaveBeenCalled();
    expect(result.type).toBe('customer.created');
  });

  it('rejects requests without stripe-signature header', async () => {
    await expect(
      controller.handle({ rawBody: Buffer.from('{}') } as never, undefined),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects requests without raw body', async () => {
    await expect(
      controller.handle({} as never, 'sig_test'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects invalid signatures', async () => {
    stripeService.constructWebhookEvent.mockImplementation(() => {
      throw new Error('bad signature');
    });

    await expect(
      controller.handle({ rawBody: Buffer.from('{}') } as never, 'sig_test'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
