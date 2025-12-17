const { createEvent } = require('../services/event');

/**
 * CREATE command handler
 * @param {Array} args - Command arguments [eventName, totalSeats]
 * @returns {Promise<void>}
 */
const handleCreateEvent = async (args) => {
  // Check if we have enough arguments
  if (args.length < 2) {
    throw new Error(
      'Insufficient arguments.\nUsage: ticket-cli create "<event name>" <total seats>'
    );
  }

  const [eventName, totalSeats] = args;

  // Create event
  const event = await createEvent(eventName, totalSeats);

  // Display success message
  console.log('\n✅ Event created successfully!\n');
  console.log(`   -ID:          ${event.id}`);
  console.log(`   -Name:        ${event.name}`);
  console.log(`   -Total Seats: ${event.totalSeats}`);
  console.log(`   -Available:   ${event.availableSeats}`);
  console.log(`   -Created:     ${new Date(event.createdAt).toLocaleString()}`);
};

module.exports = {
  handler: handleCreateEvent,
  description: 'Create a new event',
  usage: 'ticket-cli create "<event name>" <total seats>',
  example: 'ticket-cli create "Tech Conference 2025" 100',
};
