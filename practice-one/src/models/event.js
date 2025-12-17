/**
 * Event Data Model
 *
 * Defines the structure event objects
 */

/**
 * Booking object
 *
 * @typedef {Object} Booking
 * @property {string} customerName - Customer name
 * @property {string} customerEmail - Customer email (unique identifier)
 * @property {boolean} active - Booking status (true=active, false=cancelled)
 * @property {string} bookedAt - Timestamp when booking was made
 * @property {string|null} cancelledAt - Timestamp when cancelled (null if active)
 */

/**
 * Event object
 *
 * @typedef {Object} Event
 * @property {number} id - Unique event identifier
 * @property {string} name - Event name
 * @property {number} totalSeats - Total seat capacity
 * @property {number} availableSeats - Current available seats (decrements on booking)
 * @property {string[]} bookedBy - Array of booking objects
 * @property {string} createdAt - timestamp when event was created
 * @property {string} updatedAt - timestamp of last update
 */

/**
 * Create a new event object with default values
 *
 * @param {number} id - Event ID
 * @param {string} name - Event name
 * @param {number} totalSeats - Total seat capacity
 * @returns {Event} New event object
 */
const createEvent = (id, name, totalSeats) => {
  const now = new Date().toISOString();

  return {
    id,
    name,
    totalSeats,
    availableSeats: totalSeats,
    bookedBy: [],
    createdAt: now,
    updatedAt: now,
  };
};

module.exports = {
  createEvent,
};
