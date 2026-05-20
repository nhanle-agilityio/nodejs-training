import { BookingCancellationReason } from './booking-cancellation-reason';
import { cancellationReasonMessage } from './booking-cancellation-message.util';

describe('cancellationReasonMessage', () => {
  it('returns user-facing copy for each reason', () => {
    expect(
      cancellationReasonMessage(BookingCancellationReason.UserCancelled),
    ).toContain('You cancelled');
    expect(
      cancellationReasonMessage(BookingCancellationReason.PaymentTimeout),
    ).toContain('15 minutes');
    expect(
      cancellationReasonMessage(BookingCancellationReason.AdminCancelled),
    ).toContain('administrator');
  });
});
