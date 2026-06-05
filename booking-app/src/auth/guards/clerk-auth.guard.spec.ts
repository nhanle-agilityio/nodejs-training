import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { UsersService } from '../../users/users.service';
import { User, UserRole } from '../../users/user.entity';

jest.mock('@clerk/backend', () => ({
  verifyToken: jest.fn(),
}));

import { verifyToken } from '@clerk/backend';

describe('ClerkAuthGuard', () => {
  let reflector: { getAllAndOverride: jest.Mock };
  let users: { findById: jest.Mock; findByClerkId: jest.Mock };

  const user = {
    id: 'u1111111-1111-1111-1111-111111111111',
    clerkId: 'clerk_user_1',
    role: UserRole.User,
  } as User;

  const makeContext = (headers: Record<string, string | undefined> = {}) => {
    const req = { headers } as Record<string, unknown>;
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(req),
      }),
      req,
    };
  };

  const buildGuard = async (env: 'test' | 'production') => {
    const config = {
      get: jest.fn((key: string) => {
        if (key === 'app.env') return env;
        if (key === 'clerk') return { secretKey: 'sk_test_dummy' };
      }),
    };
    const module = await Test.createTestingModule({
      providers: [
        ClerkAuthGuard,
        { provide: Reflector, useValue: reflector },
        { provide: ConfigService, useValue: config },
        { provide: UsersService, useValue: users },
      ],
    }).compile();
    return module.get(ClerkAuthGuard);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) };
    users = { findById: jest.fn(), findByClerkId: jest.fn() };
  });

  describe('@Public() routes', () => {
    it('bypasses auth and returns true when route is marked public', async () => {
      reflector.getAllAndOverride.mockReturnValue(true);
      const guard = await buildGuard('production');
      const { context } = { context: makeContext() };

      await expect(
        guard.canActivate(context as unknown as ExecutionContext),
      ).resolves.toBe(true);
    });
  });

  describe('test env (x-test-user-id header)', () => {
    let guard: ClerkAuthGuard;

    beforeEach(async () => {
      guard = await buildGuard('test');
    });

    it('throws UnauthorizedException when x-test-user-id header is absent', async () => {
      const ctx = makeContext();
      await expect(
        guard.canActivate(ctx as unknown as ExecutionContext),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws UnauthorizedException when test user is not found in DB', async () => {
      users.findById.mockResolvedValue(null);
      const ctx = makeContext({ 'x-test-user-id': 'unknown-id' });
      await expect(
        guard.canActivate(ctx as unknown as ExecutionContext),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('attaches user to request and returns true for valid test user', async () => {
      users.findById.mockResolvedValue(user);
      const ctx = makeContext({ 'x-test-user-id': user.id });

      const result = await guard.canActivate(
        ctx as unknown as ExecutionContext,
      );

      expect(result).toBe(true);
      expect(users.findById).toHaveBeenCalledWith(user.id);
      expect(ctx.req['user']).toBe(user);
      expect(ctx.req['clerkUser']).toMatchObject({ userId: user.clerkId });
    });
  });

  describe('production env (Bearer JWT)', () => {
    let guard: ClerkAuthGuard;

    beforeEach(async () => {
      guard = await buildGuard('production');
    });

    it('throws UnauthorizedException when authorization header is absent', async () => {
      const ctx = makeContext();
      await expect(
        guard.canActivate(ctx as unknown as ExecutionContext),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws UnauthorizedException when token is not a Bearer token', async () => {
      const ctx = makeContext({ authorization: 'Basic dXNlcjpwYXNz' });
      await expect(
        guard.canActivate(ctx as unknown as ExecutionContext),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws UnauthorizedException when verifyToken rejects (invalid/expired)', async () => {
      (verifyToken as jest.Mock).mockRejectedValue(new Error('invalid token'));
      const ctx = makeContext({ authorization: 'Bearer bad-token' });
      await expect(
        guard.canActivate(ctx as unknown as ExecutionContext),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('attaches clerkUser and user to request for valid Bearer token', async () => {
      (verifyToken as jest.Mock).mockResolvedValue({
        sub: user.clerkId,
        metadata: { role: UserRole.User },
      });
      users.findByClerkId.mockResolvedValue(user);
      const ctx = makeContext({ authorization: 'Bearer valid-token' });

      const result = await guard.canActivate(
        ctx as unknown as ExecutionContext,
      );

      expect(result).toBe(true);
      expect(ctx.req['clerkUser']).toMatchObject({
        userId: user.clerkId,
        role: UserRole.User,
      });
      expect(ctx.req['user']).toBe(user);
    });
  });
});
