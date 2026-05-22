import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { PaymentsService } from '../payments.service';
import { StripeService } from '../stripe.service';
import type { StripeEvent } from '../stripe.types';

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

@ApiExcludeController()
@Controller('webhooks/stripe')
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Req() req: RawBodyRequest,
    @Headers('stripe-signature') signature: string | undefined,
  ): Promise<{ received: true; type: string }> {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    if (!req.rawBody) {
      throw new BadRequestException('Raw request body unavailable');
    }

    let event: StripeEvent;
    try {
      event = this.stripeService.constructWebhookEvent(req.rawBody, signature);
    } catch (err) {
      this.logger.warn(
        `Stripe webhook signature failed: ${(err as Error).message}`,
      );
      throw new BadRequestException('Invalid signature');
    }

    this.logger.log(`Stripe event ${event.type} id=${event.id}`);

    if (event.type === 'payment_intent.succeeded') {
      await this.paymentsService.handlePaymentIntentSucceeded(event);
    }

    return { received: true, type: event.type };
  }
}
