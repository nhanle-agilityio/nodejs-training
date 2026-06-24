import { CaslAbilityFactory } from './casl-ability.factory';
import { Action } from './casl.types';
import { User, UserRole } from '../users/user.entity';
import { Slot } from '../slots/slot.entity';
import { Booking } from '../bookings/booking.entity';

describe('CaslAbilityFactory', () => {
  let factory: CaslAbilityFactory;

  const ownerId = 'u1111111-1111-1111-1111-111111111111';
  const otherId = 'u2222222-2222-2222-2222-222222222222';

  const regularUser = Object.assign(new User(), {
    id: ownerId,
    role: UserRole.User,
  });
  const adminUser = Object.assign(new User(), {
    id: ownerId,
    role: UserRole.Admin,
  });

  beforeEach(() => {
    factory = new CaslAbilityFactory();
  });

  describe('admin role', () => {
    it('can manage all resources', () => {
      const ability = factory.createForUser(adminUser);
      expect(ability.can(Action.Manage, 'all')).toBe(true);
    });

    it('can create, update, and delete Slots', () => {
      const ability = factory.createForUser(adminUser);
      expect(ability.can(Action.Create, Slot)).toBe(true);
      expect(ability.can(Action.Update, Slot)).toBe(true);
      expect(ability.can(Action.Delete, Slot)).toBe(true);
    });

    it('can read any Booking regardless of owner', () => {
      const ability = factory.createForUser(adminUser);
      const otherBooking = Object.assign(new Booking(), { userId: otherId });
      expect(ability.can(Action.Read, otherBooking)).toBe(true);
      expect(ability.can(Action.Manage, Booking)).toBe(true);
    });
  });

  describe('regular user role', () => {
    let ability: ReturnType<CaslAbilityFactory['createForUser']>;

    beforeEach(() => {
      ability = factory.createForUser(regularUser);
    });

    it('can read Slots', () => {
      expect(ability.can(Action.Read, Slot)).toBe(true);
    });

    it('cannot create, update, or delete Slots', () => {
      expect(ability.can(Action.Create, Slot)).toBe(false);
      expect(ability.can(Action.Update, Slot)).toBe(false);
      expect(ability.can(Action.Delete, Slot)).toBe(false);
    });

    it('can create a Booking for themselves', () => {
      const own = Object.assign(new Booking(), { userId: ownerId });
      expect(ability.can(Action.Create, own)).toBe(true);
    });

    it('cannot create a Booking for another user', () => {
      const other = Object.assign(new Booking(), { userId: otherId });
      expect(ability.can(Action.Create, other)).toBe(false);
    });

    it('can read their own Booking', () => {
      const own = Object.assign(new Booking(), { userId: ownerId });
      expect(ability.can(Action.Read, own)).toBe(true);
    });

    it('cannot read another user Booking', () => {
      const other = Object.assign(new Booking(), { userId: otherId });
      expect(ability.can(Action.Read, other)).toBe(false);
    });

    it('cannot manage Bookings', () => {
      expect(ability.can(Action.Manage, Booking)).toBe(false);
    });

    it('can read their own User record', () => {
      const self = Object.assign(new User(), { id: ownerId });
      expect(ability.can(Action.Read, self)).toBe(true);
    });

    it('cannot read another user record', () => {
      const other = Object.assign(new User(), { id: otherId });
      expect(ability.can(Action.Read, other)).toBe(false);
    });

    it('cannot update or delete their own User record', () => {
      const self = Object.assign(new User(), { id: ownerId });
      expect(ability.can(Action.Update, self)).toBe(false);
      expect(ability.can(Action.Delete, self)).toBe(false);
    });
  });
});
