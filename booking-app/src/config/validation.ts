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
  CLERK_SECRET_KEY: Joi.string().required(),
  CLERK_PUBLISHABLE_KEY: Joi.string().required(),
  CLERK_WEBHOOK_SECRET: Joi.string().required(),
  BULLMQ_PREFIX: Joi.string().required(),
});
