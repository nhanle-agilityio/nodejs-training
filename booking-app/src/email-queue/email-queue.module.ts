import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import type { AppConfig } from '../config/configuration';
import { MailModule } from '../mail/mail.module';
import { QUEUE_EMAIL } from './queue.constants';
import { EmailQueueProcessor } from './email-queue.processor';
import { bullBoardFeatureModule } from './bull-board.setup';
import { createBullmqRootOptions } from './bullmq-root.config';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Booking]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) =>
        createBullmqRootOptions(config),
    }),
    BullModule.registerQueue({
      name: QUEUE_EMAIL,
    }),
    bullBoardFeatureModule(),
  ],
  providers: [EmailQueueProcessor],
  exports: [BullModule],
})
export class EmailQueueModule {}
