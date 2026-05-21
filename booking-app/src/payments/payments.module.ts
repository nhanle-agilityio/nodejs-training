import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import { Payment } from './payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Booking])],
  providers: [StripeService, PaymentsService],
  controllers: [PaymentsController],
  exports: [StripeService, PaymentsService],
})
export class PaymentsModule {}
