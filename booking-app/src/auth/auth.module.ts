import { Module } from '@nestjs/common';
import { ClerkAuthGuard } from './guards/clerk-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ClerkWebhookController } from './webhooks/clerk-webhook.controller';
import { UsersModule } from '../users/users.module';
import { PoliciesGuard } from '../casl/policies.guard';

@Module({
  imports: [UsersModule],
  providers: [
    ClerkAuthGuard,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
  controllers: [ClerkWebhookController],
})
export class AuthModule {}
