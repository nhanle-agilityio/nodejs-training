const { createEvent: createEventModel } = require('../models/event');
const { readData, writeData, readDataSync, writeDataSync } = require('./storage');
const {
  validateEventName,
  validateSeatCount,
  validateEventId,
  validateCustomerName,
  validateCustomerEmail,
} = require('./validator');

/**
 * Create a new event
 *
 * @param {string} name - Event name
 * @param {number} totalSeats - Total seat capacity
 * @returns {Promise<Object>} Created event object
 */
const createEvent = async (name, totalSeats) => {
  validateEventName(name);
  validateSeatCount(totalSeats);

  const data = await readData();
  const event = createEventModel(
    data.nextId,
    name.trim(),
    Number(totalSeats)
  );

  // Update data with new event
  data.events.push(event);
  data.nextId++;

  await writeData(data);

  return event;
};

/**
 * Get all events
 *
 * @returns {Promise<Array>} Array of all events
 */
const getAllEvents = async () => {
  const data = await readData();
  return data.events;
};

/**
 * Get event by ID
 *
 * @param {number} eventId - Event ID to find
 * @returns {Promise<Object|null>} Event object or null if not found
 */
const getEventById = async (eventId) => {
  const data = await readData();
  const event = data.events.find(e => e.id === Number(eventId));

  return event || null;
};

/**
 * Book a ticket for an event
 *
 * @param {number} eventId - Event ID
 * @param {string} customerName - Customer name
 * @param {string} customerEmail - Customer email (unique per event)
 * @returns {Object} Updated event with new booking
 * @throws {Error} If event not found, sold out, or email already used
 */
const bookTicket = (eventId, customerName, customerEmail) => {
  validateEventId(eventId);
  validateCustomerName(customerName);
  validateCustomerEmail(customerEmail);

  const data = readDataSync();
  const event = data.events.find(e => e.id === Number(eventId));

  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  // Check if sold out
  if (event.availableSeats <= 0) {
    throw new Error(`Event "${event.name}" is sold out`);
  }

  // Check if email already has an active booking for this event
  const activeBooking = event.bookedBy.find(
    booking => booking.customerEmail === customerEmail.trim().toLowerCase() && booking.active
  );

  if (activeBooking) {
    throw new Error(`Email "${customerEmail}" already has an active booking for this event`);
  }

  const booking = {
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim().toLowerCase(),
    active: true,
    bookedAt: new Date().toISOString(),
    cancelledAt: null,
  };

  // Perform booking
  event.availableSeats--;
  event.bookedBy.push(booking);
  event.updatedAt = new Date().toISOString();

  writeDataSync(data);

  return { event, booking };
};

/**
 * Cancel a ticket booking
 *
 * @param {number} eventId - Event ID
 * @param {string} customerEmail - Customer email to identify booking
 * @returns {Object} Updated event and cancelled booking info
 * @throws {Error} If event not found or no booking found for email
 */
const cancelTicket = (eventId, customerEmail) => {
  validateEventId(eventId);
  validateCustomerEmail(customerEmail);

  const data = readDataSync();
  const event = data.events.find(e => e.id === Number(eventId));

  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  // Find active booking by email
  const booking = event.bookedBy.find(
    booking => booking.customerEmail === customerEmail.trim().toLowerCase() && booking.active
  );

  if (!booking) {
    throw new Error(`No active booking found for email "${customerEmail}" at this event`);
  }

  // Mark booking as cancelled
  booking.active = false;
  booking.cancelledAt = new Date().toISOString();

  // Return seat to available pool
  event.availableSeats++;
  event.updatedAt = new Date().toISOString();

  writeDataSync(data);

  return { event, cancelledBooking: booking };
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  bookTicket,
  cancelTicket,
};

