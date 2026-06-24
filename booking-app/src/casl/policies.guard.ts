import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policies.decorator';
import type { AuthenticatedRequest } from '../common/decorators/current-user.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers = this.reflector.getAllAndOverride<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No policy decorator → allow (auth guard already ran)
    if (!handlers || handlers.length === 0) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;
    if (!user) throw new ForbiddenException('User not resolved');

    const ability = this.caslAbilityFactory.createForUser(user);
    const allowed = handlers.every((handler) => handler(ability));

    if (!allowed) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
