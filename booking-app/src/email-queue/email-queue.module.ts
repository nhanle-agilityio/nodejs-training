import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/booking.entity';
import type { AppConfig } from '../config/configuration';
import { MailModule } from '../mail/mail.module';
import { QUEUE_EMAIL } from './queue.constants';
import { EmailQueueProcessor } from './email-queue.processor';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Booking]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => {
        const redis = config.get('redis', { infer: true });
        const bullmq = config.get('bullmq', { infer: true });

        return {
          connection: {
            host: redis.host,
            port: redis.port,
          },
          prefix: `{${bullmq.prefix}}`,
        };
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_EMAIL,
    }),
  ],
  providers: [EmailQueueProcessor],
  exports: [BullModule],
})
export class EmailQueueModule {}
