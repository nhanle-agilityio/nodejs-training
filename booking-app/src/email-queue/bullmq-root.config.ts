import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';

export const createBullmqRootOptions = (
  config: ConfigService<AppConfig, true>,
) => {
  const redis = config.get('redis', { infer: true });
  const bullmq = config.get('bullmq', { infer: true });

  return {
    connection: {
      host: redis.host,
      port: redis.port,
    },
    prefix: `{${bullmq.prefix}}`,
  };
};
