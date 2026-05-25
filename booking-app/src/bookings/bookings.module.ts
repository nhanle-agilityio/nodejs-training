import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersModule } from '../users/users.module';
import { EmailQueueModule } from '../email-queue/email-queue.module';
import { MailModule } from '../mail/mail.module';
import { PendingBookingExpiryScheduler } from './schedulers/booking-expiry.scheduler';
import { BookingEmailQueueProcessor } from './email/booking-email-queue.processor';
import { BookingLifecycleService } from './email/booking-lifecycle.service';
import { BookingMailService } from './email/booking-mail.service';
import { BookingReminderQueueService } from './email/booking-reminder-queue.service';
import { BookingReminderSendService } from './email/booking-reminder-send.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UsersModule,
    EmailQueueModule,
    MailModule,
    PaymentsModule,
  ],
  providers: [
    BookingsService,
    BookingMailService,
    BookingReminderQueueService,
    BookingReminderSendService,
    BookingLifecycleService,
    BookingEmailQueueProcessor,
    PendingBookingExpiryScheduler,
  ],
  controllers: [BookingsController],
  exports: [BookingsService, BookingLifecycleService],
})
export class BookingsModule {}
