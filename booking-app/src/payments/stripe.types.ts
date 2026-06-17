import StripeLib from 'stripe';

export type StripeClient = InstanceType<typeof StripeLib>;

export type StripePaymentIntent = {
  id: string;
  metadata?: { bookingId?: string };
  amount_received: number;
  currency?: string;
};

export type StripeEvent<T = unknown> = {
  id: string;
  type: string;
  data: { object: T };
};

export type StripeCheckoutSession = {
  id: string;
  url: string | null;
  status: string | null;
};

export type StripeCheckoutSessionCreateParams = Parameters<
  StripeClient['checkout']['sessions']['create']
>[0];

export type StripeRefund = {
  id: string;
};

export type StripeRefundObject = {
  id: string;
  status: string;
  payment_intent: string | null;
  metadata?: { bookingId?: string; cancellationReason?: string };
};

export { StripeLib };
