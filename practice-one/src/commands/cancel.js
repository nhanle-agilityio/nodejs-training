const { cancelTicket } = require('../services/event');
const { withLock } = require('../services/lock');
const { validateEventId, validateCustomerEmail } = require('../services/validator');
const { LOCK_FILE } = require('../services/storage');

/**
 * CANCEL command handler
 * @param {Array} args - Command arguments [eventId, customerEmail]
 * @returns {Promise<void>}
 */
const handleCancelTicket = async (args) => {
  if (args.length < 2) {
    throw new Error(
      'Insufficient arguments.\nUsage: ticket-cli cancel <event-id> "<customer-email>"'
    );
  }

  const [eventId, customerEmail] = args;

  validateEventId(eventId);
  validateCustomerEmail(customerEmail);

  // Cancel ticket with file locking to prevent race conditions
  const result = await withLock(LOCK_FILE, () => cancelTicket(eventId, customerEmail));

  // Display success message
  console.log('\n✅ Booking cancelled successfully!\n');
  console.log(`Event:          ${result.event.name} (ID: ${result.event.id})`);
  console.log(`Customer:       ${result.cancelledBooking.customerName}`);
  console.log(`Email:          ${result.cancelledBooking.customerEmail}`);
  console.log(`Booked At:      ${new Date(result.cancelledBooking.bookedAt).toLocaleString()}`);
  console.log(`Cancelled At:   ${new Date(result.cancelledBooking.cancelledAt).toLocaleString()}`);
  console.log(`Seats Now:      ${result.event.availableSeats} / ${result.event.totalSeats}`);
  console.log();
};

module.exports = {
  handler: handleCancelTicket,
  description: 'Cancel a ticket booking',
  usage: 'ticket-cli cancel <event-id> "<customer-email>"',
  example: 'ticket-cli cancel 1 "john@gmail.com"',
};

