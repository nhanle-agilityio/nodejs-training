import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { REDIS_CLIENT } from '../redis/redis.module';
import type Redis from 'ioredis';
import { QUEUE_EMAIL } from './queue.constants';
import { bullBoardFeatureModule } from './bull-board.setup';
import { createBullmqRootOptions } from './bullmq-root.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, REDIS_CLIENT],
      useFactory: (config: ConfigService<AppConfig, true>, redis: Redis) =>
        createBullmqRootOptions(redis, config),
    }),
    BullModule.registerQueue({
      name: QUEUE_EMAIL,
    }),
    bullBoardFeatureModule(),
  ],
  exports: [BullModule],
})
export class EmailQueueModule {}
