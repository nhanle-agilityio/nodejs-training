import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { BookingCancellationReason } from './booking-cancellation-reason';
import { BookingEmailQueueProcessor } from './booking-email-queue.processor';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMED,
  JOB_BOOKING_REMINDER,
} from './booking-email.constants';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './booking-email.types';
import { BookingMailService } from './booking-mail.service';
import { BookingReminderSendService } from './booking-reminder-send.service';

const makeJob = (
  name: string,
  data: BookingEmailJobData | BookingCancelledEmailJobData,
): Job<BookingEmailJobData | BookingCancelledEmailJobData> => {
  return {
    name,
    id: 'job-1',
    data,
  } as Job<BookingEmailJobData | BookingCancelledEmailJobData>;
};

describe('BookingEmailQueueProcessor', () => {
  let processor: BookingEmailQueueProcessor;
  let mail: {
    sendBookingConfirmation: jest.Mock;
    sendBookingCancelled: jest.Mock;
  };
  let reminderSend: { processReminder: jest.Mock };

  const sampleData: BookingEmailJobData = {
    to: 'user@test.com',
    recipientName: 'User',
    bookingId: 'bid-1',
    slotTitle: 'Slot name 1',
    slotStartIso: '2026-01-01T10:00:00.000Z',
    slotEndIso: '2026-01-01T11:00:00.000Z',
  };

  beforeEach(async () => {
    mail = {
      sendBookingConfirmation: jest.fn().mockResolvedValue(undefined),
      sendBookingCancelled: jest.fn().mockResolvedValue(undefined),
    };
    reminderSend = { processReminder: jest.fn().mockResolvedValue(undefined) };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingEmailQueueProcessor,
        { provide: BookingMailService, useValue: mail },
        { provide: BookingReminderSendService, useValue: reminderSend },
      ],
    }).compile();

    processor = moduleRef.get(BookingEmailQueueProcessor);
  });

  it('routes booking-confirmed to sendBookingConfirmation', async () => {
    await processor.process(makeJob(JOB_BOOKING_CONFIRMED, sampleData));

    expect(mail.sendBookingConfirmation).toHaveBeenCalledWith(sampleData);
    expect(reminderSend.processReminder).not.toHaveBeenCalled();
  });

  it('routes booking-cancelled to sendBookingCancelled', async () => {
    const cancelledData: BookingCancelledEmailJobData = {
      ...sampleData,
      cancellationReason: BookingCancellationReason.PaymentTimeout,
    };

    await processor.process(makeJob(JOB_BOOKING_CANCELLED, cancelledData));

    expect(mail.sendBookingCancelled).toHaveBeenCalledWith(cancelledData);
  });

  it('delegates booking-reminder to BookingReminderSendService', async () => {
    await processor.process(makeJob(JOB_BOOKING_REMINDER, sampleData));

    expect(reminderSend.processReminder).toHaveBeenCalledWith(sampleData);
    expect(mail.sendBookingConfirmation).not.toHaveBeenCalled();
  });

  it('throws for unknown job names', async () => {
    await expect(
      processor.process(makeJob('unknown-job', sampleData)),
    ).rejects.toThrow('Unknown email job name: unknown-job');
  });
});
