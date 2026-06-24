import { BookingCancellationReason } from './booking-cancellation-reason';

export const cancellationReasonMessage = (
  reason: BookingCancellationReason,
): string => {
  switch (reason) {
    case BookingCancellationReason.UserCancelled:
      return 'You cancelled this booking.';
    case BookingCancellationReason.PaymentTimeout:
      return 'Payment was not received within 15 minutes, so this booking was automatically cancelled.';
    case BookingCancellationReason.AdminCancelled:
      return 'This booking was cancelled by an administrator.';
    default:
      return 'This booking has been cancelled.';
  }
};
