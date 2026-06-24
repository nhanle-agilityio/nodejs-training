import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from '../booking.entity';
import type { BookingEmailJobData } from './booking-email.types';
import { BookingMailService } from './booking-mail.service';
import { BookingReminderSendService } from './booking-reminder-send.service';

describe('BookingReminderSendService', () => {
  let service: BookingReminderSendService;
  let mail: { sendBookingReminder: jest.Mock };
  let claimExecute: jest.Mock;
  let update: jest.Mock;

  const jobData: BookingEmailJobData = {
    to: 'user@test.com',
    recipientName: 'User',
    bookingId: 'bid-1',
    slotTitle: 'Slot name 1',
    slotStartIso: '2026-01-01T10:00:00.000Z',
    slotEndIso: '2026-01-01T11:00:00.000Z',
  };

  beforeEach(async () => {
    claimExecute = jest.fn().mockResolvedValue({ affected: 1 });
    update = jest.fn().mockResolvedValue({ affected: 1 });
    mail = { sendBookingReminder: jest.fn().mockResolvedValue(undefined) };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingReminderSendService,
        { provide: BookingMailService, useValue: mail },
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            update,
            createQueryBuilder: jest.fn().mockReturnValue({
              update: jest.fn().mockReturnThis(),
              set: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              execute: claimExecute,
            }),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(BookingReminderSendService);
  });

  it('sends reminder from job payload after successful claim', async () => {
    await service.processReminder(jobData);

    expect(mail.sendBookingReminder).toHaveBeenCalledWith(jobData);
    expect(update).not.toHaveBeenCalled();
  });

  it('skips send when claim affects zero rows', async () => {
    claimExecute.mockResolvedValue({ affected: 0 });

    await service.processReminder(jobData);

    expect(mail.sendBookingReminder).not.toHaveBeenCalled();
  });

  it('releases claim when send fails', async () => {
    mail.sendBookingReminder.mockRejectedValue(new Error('Resend down'));

    await expect(service.processReminder(jobData)).rejects.toThrow(
      'Resend down',
    );

    expect(update).toHaveBeenCalledWith(
      { id: 'bid-1' },
      { reminderSentAt: null },
    );
  });
});
