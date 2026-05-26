import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import type { BookingWithEmailRelations } from './booking-email.types';

export const getBookingById = async (
  repo: Repository<Booking>,
  id: string,
): Promise<BookingWithEmailRelations | null> => {
  const booking = await repo.findOne({
    where: { id },
    relations: ['user', 'slot'],
  });
  return booking;
};
