import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../../users/user.entity';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: { getAllAndOverride: jest.Mock };

  const makeContext = (clerkUserRole?: string) => {
    const req = {
      clerkUser: clerkUserRole ? { role: clerkUserRole } : undefined,
    };
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(req),
      }),
    } as unknown as ExecutionContext;
  };

  beforeEach(async () => {
    reflector = { getAllAndOverride: jest.fn() };

    const module = await Test.createTestingModule({
      providers: [RolesGuard, { provide: Reflector, useValue: reflector }],
    }).compile();

    guard = module.get(RolesGuard);
  });

  it('allows when no roles are required on the route', () => {
    reflector.getAllAndOverride.mockReturnValue(null);
    expect(guard.canActivate(makeContext())).toBe(true);
  });

  it('allows when required roles list is empty', () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    expect(guard.canActivate(makeContext())).toBe(true);
  });

  it('allows when user role matches a required role', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.Admin]);
    expect(guard.canActivate(makeContext(UserRole.Admin))).toBe(true);
  });

  it('denies when user role does not match any required role', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.Admin]);
    expect(guard.canActivate(makeContext(UserRole.User))).toBe(false);
  });

  it('denies when there is no clerkUser on the request', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.Admin]);
    expect(guard.canActivate(makeContext())).toBe(false);
  });
});
