import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from '../bookings/bookings.module';
import { Payment } from './payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './webhooks/stripe-webhook.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    forwardRef(() => BookingsModule),
  ],
  providers: [StripeService, PaymentsService],
  controllers: [PaymentsController, StripeWebhookController],
  exports: [StripeService, PaymentsService],
})
export class PaymentsModule {}
