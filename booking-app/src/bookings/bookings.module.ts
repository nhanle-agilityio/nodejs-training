import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingReminderQueueService } from './booking-reminder-queue.service';
import { BookingReminderSendService } from './booking-reminder-send.service';
import { BookingEmailQueueProcessor } from './booking-email-queue.processor';
import { BookingLifecycleService } from './booking-lifecycle.service';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersModule } from '../users/users.module';
import { EmailQueueModule } from '../email-queue/email-queue.module';
import { MailModule } from '../mail/mail.module';
import { PendingBookingExpiryScheduler } from './booking-expiry.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UsersModule,
    EmailQueueModule,
    MailModule,
  ],
  providers: [
    BookingsService,
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
