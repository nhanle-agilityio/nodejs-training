import { cancellationReasonMessage } from './booking-cancellation-message.util';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './booking-email.types';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatTime = (iso: string): string => {
  return new Date(iso).toLocaleTimeString();
};

export const renderBookingConfirmationHtml = (
  input: BookingEmailJobData,
): string => {
  const name = escapeHtml(input.recipientName ?? 'there');
  const bookingId = escapeHtml(input.bookingId);
  const slotTitle = escapeHtml(input.slotTitle);
  return `
      <p>Hi ${name},</p>
      <p>Your booking <strong>${bookingId}</strong> is confirmed for
      <strong>${slotTitle}</strong>.</p>
      <p>${formatTime(input.slotStartIso)} — ${formatTime(input.slotEndIso)}</p>
    `.trim();
};

export const renderBookingReminderHtml = (
  input: BookingEmailJobData,
): string => {
  const name = escapeHtml(input.recipientName ?? 'there');
  const bookingId = escapeHtml(input.bookingId);
  const slotTitle = escapeHtml(input.slotTitle);
  return `
      <p>Hi ${name},</p>
      <p>Reminder: <strong>${slotTitle}</strong> starts at
      ${formatTime(input.slotStartIso)}.</p>
      <p>Booking ref: ${bookingId}</p>
    `.trim();
};

export const renderBookingCancelledHtml = (
  input: BookingCancelledEmailJobData,
): string => {
  const reasonText = cancellationReasonMessage(input.cancellationReason);
  const name = escapeHtml(input.recipientName ?? 'there');
  const bookingId = escapeHtml(input.bookingId);
  const slotTitle = escapeHtml(input.slotTitle);
  return `
      <p>Hi ${name},</p>
      <p>Your booking <strong>${bookingId}</strong> for
      <strong>${slotTitle}</strong> has been cancelled.</p>
      <p>${reasonText}</p>
      <p>${formatTime(input.slotStartIso)} — ${formatTime(input.slotEndIso)}</p>
    `.trim();
};
