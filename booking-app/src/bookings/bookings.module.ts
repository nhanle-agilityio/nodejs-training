import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingReminderScheduler } from './booking-reminder.scheduler';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersModule } from '../users/users.module';
import { EmailQueueModule } from 'src/email-queue/email-queue.module';
import { PendingBookingExpiryScheduler } from './booking-expiry.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), UsersModule, EmailQueueModule],
  providers: [
    BookingsService,
    BookingReminderScheduler,
    PendingBookingExpiryScheduler,
  ],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
