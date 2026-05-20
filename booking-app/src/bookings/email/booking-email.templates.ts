import { cancellationReasonMessage } from './booking-cancellation-message.util';
import type {
  BookingCancelledEmailJobData,
  BookingEmailJobData,
} from './booking-email.types';

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

export const renderBookingConfirmationHtml = (
  input: BookingEmailJobData,
): string => {
  return `
      <p>Hi ${escapeHtml(input.recipientName ?? 'there')},</p>
      <p>Your booking <strong>${escapeHtml(input.bookingId)}</strong> is confirmed for
      <strong>${escapeHtml(input.slotTitle)}</strong>.</p>
      <p>${escapeHtml(input.slotStartIso)} — ${escapeHtml(input.slotEndIso)}</p>
    `.trim();
};

export const renderBookingReminderHtml = (
  input: BookingEmailJobData,
): string => {
  return `
      <p>Hi ${escapeHtml(input.recipientName ?? 'there')},</p>
      <p>Reminder: <strong>${escapeHtml(input.slotTitle)}</strong> starts at
      ${escapeHtml(input.slotStartIso)}.</p>
      <p>Booking ref: ${escapeHtml(input.bookingId)}</p>
    `.trim();
};

export const renderBookingCancelledHtml = (
  input: BookingCancelledEmailJobData,
): string => {
  const reasonText = cancellationReasonMessage(input.cancellationReason);
  return `
      <p>Hi ${escapeHtml(input.recipientName ?? 'there')},</p>
      <p>Your booking <strong>${escapeHtml(input.bookingId)}</strong> for
      <strong>${escapeHtml(input.slotTitle)}</strong> has been cancelled.</p>
      <p>${escapeHtml(reasonText)}</p>
      <p>${escapeHtml(input.slotStartIso)} — ${escapeHtml(input.slotEndIso)}</p>
    `.trim();
};
