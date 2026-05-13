import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { verifyToken } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import type { AuthenticatedRequest } from 'src/common/decorators/current-user.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { AppConfig } from 'src/config/configuration';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService<AppConfig, true>,
    private users: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // Test: resolve user via header (no Clerk) - only for testing purposes.
    if (process.env.NODE_ENV === 'test') {
      const raw = req.headers['x-test-user-id'];
      const userId = Array.isArray(raw) ? raw[0] : raw;
      if (!userId || typeof userId !== 'string') {
        throw new UnauthorizedException('Missing x-test-user-id header');
      }
      const user = await this.users.findById(userId);
      if (!user) {
        throw new UnauthorizedException('Test user not found');
      }
      req.clerkUser = { userId: user.clerkId, role: user.role };
      req.user = user;
      return true;
    }

    const header = req.headers['authorization'];
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException('Missing bearer token');

    try {
      const clerk = this.config.get('clerk', { infer: true });
      const secretKey = clerk.secretKey;
      const verified = await verifyToken(token, { secretKey });
      const payload = verified as unknown as Record<string, unknown>;
      const sub = payload.sub as string;
      const metadata = payload.metadata as { role?: string } | undefined;
      const role = metadata?.role;

      req.clerkUser = { userId: sub, role };
      req.user = (await this.users.findByClerkId(sub)) ?? undefined;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
