import { Module } from '@nestjs/common';
import { envValidationSchema } from './config/validation';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { loadConfiguration } from './config/configuration';
import { PaymentsModule } from './payments/payments.module';
import { CaslModule } from './casl/casl.module';
import { RedisModule } from './redis/redis.module';
import { EmailQueueModule } from './email-queue/email-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfiguration],
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    RedisModule,
    EmailQueueModule,
    CaslModule,
    AuthModule,
    UsersModule,
    SlotsModule,
    BookingsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
