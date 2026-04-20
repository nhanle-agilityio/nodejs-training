import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { Module } from '@nestjs/common';

@Module({
  providers: [RolesGuard, { provide: APP_GUARD, useClass: ClerkAuthGuard }],
  exports: [RolesGuard],
})
export class AuthModule {}
