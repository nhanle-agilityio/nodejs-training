import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5433),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  CLERK_SECRET_KEY: Joi.string().required(),
  CLERK_WEBHOOK_SECRET: Joi.string().required(),
  BULLMQ_PREFIX: Joi.string().required(),
  MAIL_MODE: Joi.string().valid('live', 'noop').default('live'),
  MAIL_FROM: Joi.string().required(),
  RESEND_API_KEY: Joi.string().when('MAIL_MODE', {
    is: 'noop',
    then: Joi.string().allow('').optional(),
    otherwise: Joi.string().required(),
  }),
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  STRIPE_CURRENCY: Joi.string().default('usd'),
  STRIPE_SUCCESS_URL: Joi.string().required(),
  STRIPE_CANCEL_URL: Joi.string().required(),
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(100),
  SLOTS_CACHE_TTL: Joi.number().default(300),
});
