import { DataSource, Repository } from 'typeorm';
import { Booking } from '../src/bookings/booking.entity';
import { Payment } from '../src/payments/payment.entity';
import { Slot, SlotStatus } from '../src/slots/slot.entity';
import { User } from '../src/users/user.entity';

export const saveOpenSlot = async (
  slotRepo: Repository<Slot>,
  title = 'E2E slot',
): Promise<Slot> => {
  const start = new Date();
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return slotRepo.save(
    slotRepo.create({
      title,
      startTime: start,
      endTime: end,
      price: 25,
      status: SlotStatus.Open,
    }),
  );
};

export const cleanBookingE2eTables = async (dataSource: DataSource) => {
  await dataSource.createQueryBuilder().delete().from(Payment).execute();
  await dataSource.createQueryBuilder().delete().from(Booking).execute();
  await dataSource.createQueryBuilder().delete().from(Slot).execute();
  await dataSource.createQueryBuilder().delete().from(User).execute();
};
