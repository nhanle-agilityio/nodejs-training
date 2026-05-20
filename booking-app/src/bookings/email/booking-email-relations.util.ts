import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import type { BookingWithEmailRelations } from './booking-email.types';

export const loadBookingWithEmailRelations = async (
  repo: Repository<Booking>,
  id: string,
): Promise<BookingWithEmailRelations | null> => {
  const row = await repo.findOne({
    where: { id },
    relations: ['user', 'slot'],
  });
  return row;
};
