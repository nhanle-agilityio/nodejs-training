import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type Redis from 'ioredis';
import { envValidationSchema } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { loadConfiguration, type AppConfig } from './config/configuration';
import { PaymentsModule } from './payments/payments.module';
import { CaslModule } from './casl/casl.module';
import { RedisModule, REDIS_CLIENT } from './redis/redis.module';
import { EmailQueueModule } from './email-queue/email-queue.module';
import { bullBoardRootModule } from './email-queue/bull-board.setup';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfiguration],
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    RedisModule,
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: [ConfigService, REDIS_CLIENT],
      useFactory: (config: ConfigService<AppConfig, true>, redis: Redis) => ({
        throttlers: [
          {
            ttl: config.get('throttle.ttl', { infer: true }),
            limit: config.get('throttle.limit', { infer: true }),
          },
        ],
        storage: new ThrottlerStorageRedisService(redis),
      }),
    }),
    EmailQueueModule,
    bullBoardRootModule(),
    CaslModule,
    AuthModule,
    UsersModule,
    SlotsModule,
    BookingsModule,
    PaymentsModule,
    MailModule,
    HealthModule,
  ],
})
export class AppModule {}
