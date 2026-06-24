import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PoliciesGuard } from './policies.guard';
import { CaslAbilityFactory, AppAbility } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { User, UserRole } from '../users/user.entity';

describe('PoliciesGuard', () => {
  let guard: PoliciesGuard;
  let reflector: { getAllAndOverride: jest.Mock };
  let caslAbilityFactory: { createForUser: jest.Mock };

  const user = {
    id: 'u1111111-1111-1111-1111-111111111111',
    role: UserRole.User,
  } as User;
  const mockAbility = {} as AppAbility;

  const makeContext = (reqUser?: User) => {
    const req = { user: reqUser };
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
    caslAbilityFactory = {
      createForUser: jest.fn().mockReturnValue(mockAbility),
    };

    const module = await Test.createTestingModule({
      providers: [
        PoliciesGuard,
        { provide: Reflector, useValue: reflector },
        { provide: CaslAbilityFactory, useValue: caslAbilityFactory },
      ],
    }).compile();

    guard = module.get(PoliciesGuard);
  });

  it('allows when no @CheckPolicies handlers are registered', () => {
    reflector.getAllAndOverride.mockReturnValue(null);
    expect(guard.canActivate(makeContext())).toBe(true);
  });

  it('allows when handlers list is empty', () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    expect(guard.canActivate(makeContext(user))).toBe(true);
  });

  it('throws ForbiddenException when user is not resolved on the request', () => {
    reflector.getAllAndOverride.mockReturnValue([() => true]);
    expect(() => guard.canActivate(makeContext(undefined))).toThrow(
      ForbiddenException,
    );
  });

  it('allows when all policy handlers return true', () => {
    reflector.getAllAndOverride.mockReturnValue([() => true, () => true]);

    expect(guard.canActivate(makeContext(user))).toBe(true);
    expect(caslAbilityFactory.createForUser).toHaveBeenCalledWith(user);
  });

  it('throws ForbiddenException when any policy handler returns false', () => {
    reflector.getAllAndOverride.mockReturnValue([() => true, () => false]);

    expect(() => guard.canActivate(makeContext(user))).toThrow(
      ForbiddenException,
    );
  });

  it('passes the reflector key and context handler/class to Reflector', () => {
    reflector.getAllAndOverride.mockReturnValue(null);
    const ctx = makeContext(user);
    guard.canActivate(ctx);

    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
      CHECK_POLICIES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
  });
});
