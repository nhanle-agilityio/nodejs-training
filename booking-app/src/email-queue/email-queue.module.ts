import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { REDIS_CLIENT } from '../redis/redis.module';
import type Redis from 'ioredis';
import { QUEUE_EMAIL } from './queue.constants';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, REDIS_CLIENT],
      useFactory: (config: ConfigService<AppConfig, true>, redis: Redis) => {
        const bullmqConfig = config.get('bullmq', { infer: true });
        return {
          connection: redis,
          prefix: `{${bullmqConfig.prefix}}`,
        };
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_EMAIL,
    }),
    BullBoardModule.forFeature({
      name: QUEUE_EMAIL,
      adapter: BullMQAdapter,
    }),
  ],
  exports: [BullModule],
})
export class EmailQueueModule {}
