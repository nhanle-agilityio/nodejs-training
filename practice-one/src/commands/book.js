const { bookTicket } = require('../services/event');
const { withLock } = require('../services/lock');
const { validateEventId, validateCustomerName, validateCustomerEmail } = require('../services/validator');
const { LOCK_FILE } = require('../services/storage');

/**
 * BOOK command handler
 * @param {Array} args - Command arguments [eventId, customerName, customerEmail]
 * @returns {Promise<void>}
 */
const handleBookTicket = async (args) => {
  if (args.length < 3) {
    throw new Error(
      'Insufficient arguments.\nUsage: ticket-cli book <event-id> "<customer-name>" "<customer-email>"'
    );
  }

  const [eventId, customerName, customerEmail] = args;

  validateEventId(eventId);
  validateCustomerName(customerName);
  validateCustomerEmail(customerEmail);

  // Book ticket with file locking to prevent race conditions
  const result = await withLock(LOCK_FILE, () => bookTicket(eventId, customerName, customerEmail));

  // Display success message
  console.log('\n✅ Ticket booked successfully!\n');
  console.log(`Event:          ${result.event.name} (ID: ${result.event.id})`);
  console.log(`Customer:       ${result.booking.customerName}`);
  console.log(`Email:          ${result.booking.customerEmail}`);
  console.log(`Booked At:      ${new Date(result.booking.bookedAt).toLocaleString()}`);
  console.log(`Seats Left:     ${result.event.availableSeats} / ${result.event.totalSeats}`);
  console.log();
};

module.exports = {
  handler: handleBookTicket,
  description: 'Book a ticket for an event',
  usage: 'ticket-cli book <event-id> "<customer-name>" "<customer-email>"',
  example: 'ticket-cli book 1 "John Doe" "john@gmail.com"',
};
