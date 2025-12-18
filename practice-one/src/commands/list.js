const { getAllEvents } = require('../services/event');

/**
 * LIST command handler
 * @param {Array} _args - Command arguments (unused)
 * @returns {Promise<void>}
 */
const handleListEvents = async (_args) => {
  const events = await getAllEvents();

  // Check if no events exist
  if (events.length === 0) {
    console.log('\nNo events found.');
    console.log('Create an event with: ticket-cli create "<event name>" <seats>');
    return;
  }

  console.log('\nEvents List:');

  const tableData = events.map(event => ({
    'ID': event.id,
    'Event Name': event.name,
    'Total Seats': event.totalSeats,
    'Available': event.availableSeats,
    'Status': event.availableSeats > 0 ? 'Available' : 'Sold Out',
    'Created At': new Date(event.createdAt).toLocaleString(),
  }));

  console.table(tableData);
  console.log(`Total events: ${events.length}\n`);
};

module.exports = {
  handler: handleListEvents,
  description: 'List all events',
  usage: 'ticket-cli list',
  example: 'ticket-cli list',
};
