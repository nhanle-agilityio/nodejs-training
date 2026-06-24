import { Slot } from '../slots/slot.entity';
import { Booking } from '../bookings/booking.entity';
import { User } from '../users/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | typeof Slot
  | typeof Booking
  | typeof User
  | Slot
  | Booking
  | User
  | 'all';
