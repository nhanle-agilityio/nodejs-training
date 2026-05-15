export type MailDeliveryMode = 'live' | 'noop';

export interface MailConfig {
  mode: MailDeliveryMode;
  from: string;
  resendApiKey: string;
}

export interface AppConfig {
  app: { env: string; port: number };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  redis: { host: string; port: number };
  clerk: { secretKey: string; publishableKey: string; webhookSecret: string };
  bullmq: { prefix: string };
  mail: MailConfig;
}

export const loadConfiguration = (): AppConfig => ({
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5433', 10),
    username: process.env.DATABASE_USERNAME ?? 'booking',
    password: process.env.DATABASE_PASSWORD ?? 'booking',
    name: process.env.DATABASE_NAME ?? 'booking',
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  clerk: {
    secretKey: process.env.CLERK_SECRET_KEY ?? '',
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY ?? '',
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET ?? '',
  },
  bullmq: {
    prefix: process.env.BULLMQ_PREFIX ?? 'booking',
  },
  mail: {
    mode: process.env.MAIL_MODE === 'noop' ? 'noop' : 'live',
    from: process.env.MAIL_FROM ?? 'onboarding@resend.dev',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
  },
});
