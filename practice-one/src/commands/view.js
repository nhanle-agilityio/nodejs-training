const { getEventById } = require('../services/event');
const { validateEventId } = require('../services/validator');

/**
 * VIEW command handler
 * @param {Array} args - Command arguments [eventId]
 * @returns {Promise<void>}
 */
const handleViewEvent = async (args) => {
  // Validate arguments
  if (args.length < 1) {
    throw new Error('Event ID is required.\nUsage: ticket-cli view <event-id>');
  }

  const eventId = args[0];

  validateEventId(eventId);

  const event = await getEventById(eventId);

  if (!event) {
    throw new Error(`Event with ID ${eventId} not found.`);
  }

  // Display event details
  console.log('\n------------------------------------------');
  console.log(`  EVENT DETAILS - ID: ${event.id}`);
  console.log('------------------------------------------');

  console.log(`Name:           ${event.name}`);
  console.log(`Total Seats:    ${event.totalSeats}`);
  console.log(`Available:      ${event.availableSeats}`);
  console.log(`Booked:         ${event.totalSeats - event.availableSeats}`);
  console.log(`Status:         ${event.availableSeats > 0 ? 'Available' : 'Sold Out'}`);
  console.log(`Created:        ${new Date(event.createdAt).toLocaleString()}`);
  console.log(`Last Updated:   ${new Date(event.updatedAt).toLocaleString()}`);

  // Display bookings
  console.log('\n------------------------------------------');
  console.log('  BOOKINGS');
  console.log('------------------------------------------');

  // Filter active and cancelled bookings
  const activeBookings = event.bookedBy.filter((booking) => booking.active);
  const cancelledBookings = event.bookedBy.filter((booking) => !booking.active);

  if (activeBookings.length === 0 && cancelledBookings.length === 0) {
    console.log('No bookings yet.\n');
  } else {
    // Display active bookings
    if (activeBookings.length > 0) {
      console.log(`Active Bookings (${activeBookings.length}):\n`);

      const activeTableData = activeBookings.map((booking) => ({
        'Customer Name': booking.customerName,
        'Email': booking.customerEmail,
        'Booked At': new Date(booking.bookedAt).toLocaleString(),
      }));

      console.table(activeTableData);
    }

    // Display cancelled bookings
    if (cancelledBookings.length > 0) {
      console.log(`\nCancelled Bookings (${cancelledBookings.length}):\n`);

      const cancelledTableData = cancelledBookings.map((booking) => ({
        'Customer Name': booking.customerName,
        'Email': booking.customerEmail,
        'Booked At': new Date(booking.bookedAt).toLocaleString(),
        'Cancelled At': new Date(booking.cancelledAt).toLocaleString(),
      }));

      console.table(cancelledTableData);
    }
  }

  console.log('------------------------------------------\n');
};

module.exports = {
  handler: handleViewEvent,
  description: 'View detailed information about an event',
  usage: 'ticket-cli view <event-id>',
  example: 'ticket-cli view 1',
};
