import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from '../../users/user.entity';

export interface ClerkAttachedUser {
  userId: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  clerkUser?: ClerkAttachedUser;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
