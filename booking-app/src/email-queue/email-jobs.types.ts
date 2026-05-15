export interface BookingEmailJobData {
  to: string;
  recipientName: string | null;
  bookingId: string;
  slotTitle: string;
  slotStartIso: string;
  slotEndIso: string;
}
