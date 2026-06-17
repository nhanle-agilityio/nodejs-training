import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import {
  StripeLib,
  type StripeCheckoutSession,
  type StripeCheckoutSessionCreateParams,
  type StripeClient,
  type StripeEvent,
  type StripeRefund,
} from './stripe.types';

@Injectable()
export class StripeService {
  private readonly stripe: StripeClient;

  constructor(private readonly config: ConfigService<AppConfig, true>) {
    const stripeConfig = this.config.get('stripe', { infer: true });
    this.stripe = new StripeLib(stripeConfig.secretKey);
  }

  constructWebhookEvent(
    payload: string | Uint8Array,
    signature: string | string[] | Uint8Array,
  ): StripeEvent {
    const webhookSecret = this.config.get('stripe.webhookSecret', {
      infer: true,
    });
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  async retrieveCheckoutSession(
    sessionId: string,
  ): Promise<StripeCheckoutSession> {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }

  async createCheckoutSession(
    params: StripeCheckoutSessionCreateParams,
    idempotencyKey: string,
  ): Promise<StripeCheckoutSession> {
    return this.stripe.checkout.sessions.create(params, {
      idempotencyKey,
    });
  }

  async createRefund(
    paymentIntentId: string,
    idempotencyKey: string,
    metadata?: Record<string, string>,
  ): Promise<StripeRefund> {
    return this.stripe.refunds.create(
      { payment_intent: paymentIntentId, metadata },
      { idempotencyKey },
    );
  }

  async expireCheckoutSession(
    sessionId: string,
  ): Promise<StripeCheckoutSession> {
    return this.stripe.checkout.sessions.expire(sessionId);
  }
}
