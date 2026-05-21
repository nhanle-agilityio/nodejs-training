import StripeLib from 'stripe';

export type StripeClient = InstanceType<typeof StripeLib>;

export type StripePaymentIntent = {
  id: string;
  metadata?: { bookingId?: string };
  amount_received: number;
};

export type StripeEvent = {
  id: string;
  type: string;
  data: { object: StripePaymentIntent };
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

export { StripeLib };
