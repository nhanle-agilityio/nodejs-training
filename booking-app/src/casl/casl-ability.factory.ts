import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action, Subjects } from './casl.types';
import { User, UserRole } from '../users/user.entity';
import { Slot } from '../slots/slot.entity';
import { Booking } from '../bookings/booking.entity';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === UserRole.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, Slot);
      can(Action.Create, Booking, { userId: user.id });
      can(Action.Read, Booking, { userId: user.id });
      can(Action.Delete, Booking, { userId: user.id });
      can(Action.Read, User, { id: user.id });
    }

    return build();
  }
}
