import type { Slot } from '../src/slots/slot.entity';
import { toStripeCents } from '../src/payments/payment.util';
import type {
  StripeEvent,
  StripePaymentIntent,
} from '../src/payments/stripe.types';

export type StripeMock = {
  constructWebhookEvent: jest.Mock;
  retrieveCheckoutSession: jest.Mock;
  createCheckoutSession: jest.Mock;
  createRefund: jest.Mock;
  expireCheckoutSession: jest.Mock;
};

export type StripeServiceOverrides = Partial<StripeMock>;

export const buildPaymentIntentSucceededEvent = (options: {
  bookingId: string;
  slot: Pick<Slot, 'price'>;
  eventId?: string;
  paymentIntentId?: string;
  currency?: string;
}): StripeEvent<StripePaymentIntent> => ({
  id: options.eventId ?? `evt_${Date.now()}`,
  type: 'payment_intent.succeeded',
  data: {
    object: {
      id: options.paymentIntentId ?? `pi_${Date.now()}`,
      metadata: { bookingId: options.bookingId },
      amount_received: toStripeCents(options.slot.price),
      currency: options.currency ?? 'usd',
    },
  },
});

export const createStripeMock = (
  overrides: Partial<StripeMock> = {},
): StripeMock => ({
  constructWebhookEvent: jest.fn(),
  retrieveCheckoutSession: jest.fn(),
  createCheckoutSession: jest.fn().mockResolvedValue({
    id: 'cs_test_e2e',
    url: 'https://checkout.stripe.test/cs_test_e2e',
    status: 'open',
  }),
  createRefund: jest.fn().mockResolvedValue({ id: 're_test_e2e' }),
  expireCheckoutSession: jest.fn().mockResolvedValue({ id: 'cs_test_e2e' }),
  ...overrides,
});
