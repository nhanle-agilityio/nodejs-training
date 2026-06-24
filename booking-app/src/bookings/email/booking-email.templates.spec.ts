import { BookingCancellationReason } from './booking-cancellation-reason';
import {
  renderBookingCancelledHtml,
  renderBookingConfirmationHtml,
  renderBookingReminderHtml,
} from './booking-email.templates';
import type { BookingEmailJobData } from './booking-email.types';

const sampleInput: BookingEmailJobData = {
  to: 'user@test.com',
  recipientName: 'Alice',
  bookingId: 'b1111111-1111-1111-1111-111111111111',
  slotTitle: 'Slot Title Name',
  slotStartIso: '2026-06-15T09:00:00.000Z',
  slotEndIso: '2026-06-15T10:00:00.000Z',
};

describe('booking-email.templates', () => {
  describe('renderBookingConfirmationHtml', () => {
    it('includes recipient name, booking id, and slot title', () => {
      const html = renderBookingConfirmationHtml(sampleInput);

      expect(html).toContain('Alice');
      expect(html).toContain(sampleInput.bookingId);
      expect(html).toContain('Slot Title Name');
    });

    it('falls back to "there" when recipientName is null', () => {
      const html = renderBookingConfirmationHtml({
        ...sampleInput,
        recipientName: null as unknown as string,
      });

      expect(html).toContain('there');
    });

    it('escapes HTML special characters in slot title', () => {
      const html = renderBookingConfirmationHtml({
        ...sampleInput,
        slotTitle: '<script>alert("xss")</script>',
      });

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes HTML special characters in recipient name', () => {
      const html = renderBookingConfirmationHtml({
        ...sampleInput,
        recipientName: '<b>Bob</b>',
      });

      expect(html).not.toContain('<b>Bob</b>');
      expect(html).toContain('&lt;b&gt;Bob&lt;/b&gt;');
    });
  });

  describe('renderBookingReminderHtml', () => {
    it('includes recipient name, slot title, and booking id', () => {
      const html = renderBookingReminderHtml(sampleInput);

      expect(html).toContain('Alice');
      expect(html).toContain('Slot Title Name');
      expect(html).toContain(sampleInput.bookingId);
    });

    it('escapes HTML special characters in slot title', () => {
      const html = renderBookingReminderHtml({
        ...sampleInput,
        slotTitle: '& <special> "chars"',
      });

      expect(html).not.toContain('<special>');
      expect(html).toContain('&amp;');
      expect(html).toContain('&lt;special&gt;');
      expect(html).toContain('&quot;chars&quot;');
    });
  });

  describe('renderBookingCancelledHtml', () => {
    it('includes the slot title and cancellation reason message', () => {
      const html = renderBookingCancelledHtml({
        ...sampleInput,
        cancellationReason: BookingCancellationReason.UserCancelled,
      });

      expect(html).toContain('Slot Title Name');
      expect(html).toContain('You cancelled');
    });

    it('includes the PaymentTimeout reason copy', () => {
      const html = renderBookingCancelledHtml({
        ...sampleInput,
        cancellationReason: BookingCancellationReason.PaymentTimeout,
      });

      expect(html).toContain('15 minutes');
    });

    it('includes the AdminCancelled reason copy', () => {
      const html = renderBookingCancelledHtml({
        ...sampleInput,
        cancellationReason: BookingCancellationReason.AdminCancelled,
      });

      expect(html).toContain('administrator');
    });

    it('escapes HTML in slot title', () => {
      const html = renderBookingCancelledHtml({
        ...sampleInput,
        slotTitle: '<img src=x onerror=alert(1)>',
        cancellationReason: BookingCancellationReason.UserCancelled,
      });

      expect(html).not.toContain('<img');
      expect(html).toContain('&lt;img');
    });
  });
});
