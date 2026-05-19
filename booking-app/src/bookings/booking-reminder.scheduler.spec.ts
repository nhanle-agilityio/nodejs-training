import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Booking, BookingStatus } from './booking.entity';
import { BookingReminderScheduler } from './booking-reminder.scheduler';
import { Slot, SlotStatus } from '../slots/slot.entity';
import {
  JOB_BOOKING_REMINDER,
  QUEUE_EMAIL,
} from 'src/email-queue/queue.constants';

describe('BookingReminderScheduler', () => {
  let scheduler: BookingReminderScheduler;
  let emailQueue: { add: jest.Mock };
  let getMany: jest.Mock;
  let createQueryBuilder: jest.Mock;

  const slotId = 's1111111-1111-1111-1111-111111111111';
  const userId = 'u1111111-1111-1111-1111-111111111111';
  const bookingId = 'b1111111-1111-1111-1111-111111111111';

  beforeEach(async () => {
    getMany = jest.fn();
    createQueryBuilder = jest.fn().mockReturnValue({
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany,
    });

    emailQueue = { add: jest.fn().mockResolvedValue(undefined) };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingReminderScheduler,
        { provide: SchedulerRegistry, useValue: { addCronJob: jest.fn() } },
        {
          provide: getRepositoryToken(Booking),
          useValue: { createQueryBuilder },
        },
        { provide: getQueueToken(QUEUE_EMAIL), useValue: emailQueue },
      ],
    }).compile();

    scheduler = moduleRef.get(BookingReminderScheduler);
  });

  it('enqueueUpcomingReminderJobs adds delayed reminder jobs', async () => {
    const slotStart = new Date('2026-06-15T14:00:00.000Z');
    const slotEnd = new Date('2026-06-15T15:00:00.000Z');
    const now = new Date('2026-06-10T12:00:00.000Z');
    jest.useFakeTimers({ now });

    const booking = {
      id: bookingId,
      status: BookingStatus.Confirmed,
      reminderSentAt: null,
      user: {
        id: userId,
        email: 'guest@test.com',
        name: 'Guest',
      },
      slot: {
        id: slotId,
        title: 'Yoga',
        startTime: slotStart,
        endTime: slotEnd,
        status: SlotStatus.Open,
      },
    } as Booking;

    getMany.mockResolvedValue([booking]);

    await scheduler.enqueueUpcomingReminderJobs();

    expect(emailQueue.add).toHaveBeenCalledTimes(1);
    const [name, payload, opts] = emailQueue.add.mock.calls[0];
    expect(name).toBe(JOB_BOOKING_REMINDER);
    expect(payload).toMatchObject({
      to: 'guest@test.com',
      bookingId,
      slotTitle: 'Yoga',
    });
    expect(opts.jobId).toBe(`reminder-${bookingId}`);
    expect(typeof opts.delay).toBe('number');
    expect(opts.delay).toBeGreaterThan(0);

    jest.useRealTimers();
  });
});
