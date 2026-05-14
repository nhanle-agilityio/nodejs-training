import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { QUEUE_EMAIL } from './queue.constants';

@Module({
  imports: [
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
  exports: [BullModule],
})
export class EmailQueueModule {}
