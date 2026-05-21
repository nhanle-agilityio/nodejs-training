import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { StripeService } from './stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [StripeService],
  exports: [StripeService],
})
export class PaymentsModule {}
