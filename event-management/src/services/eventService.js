import { validateQueryParams, validatePartialUpdateEvent } from './validator.js';

/**
 * Create a new event
 * @param {EventRepository} eventRepository - Event repository
 * @param {Object} eventData - Event data
 * @param {string} eventData.name - Event name
 * @param {string} eventData.description - Event description
 * @param {string} eventData.location - Event location
 * @param {string} eventData.date - Event date
 * @param {number} eventData.ticketPrice - Ticket price
 * @param {number} eventData.capacity - Event capacity
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (eventRepository, eventData) => {
  const event = await eventRepository.createEvent(eventData);
  return event;
};

/**
 * Update an event
 * @param {EventRepository} eventRepository - Event repository
 * @param {Object} eventData - Event data
 * @param {string} id - Event id
 * @param {string} eventData.name - Event name
 * @param {string} eventData.description - Event description
 * @param {string} eventData.location - Event location
 * @param {string} eventData.date - Event date
 * @param {number} eventData.ticketPrice - Ticket price
 * @param {number} eventData.capacity - Event capacity
 * @returns {Promise<Object>} Updated event
 */
export const updateEvent = async (eventRepository, eventData, id) => {
  const event = await eventRepository.updateEvent(eventData, id);
  return event;
};

/**
 * Delete an event
 * @param {EventRepository} eventRepository - Event repository
 * @param {string} id - Event id
 * @returns {Promise<Object>} Deleted event
 */
export const deleteEvent = async (eventRepository, id) => {
  const result = await eventRepository.deleteEvent(id);
  return result;
};

export const getEventById = async (eventRepository, id) => {
  const event = await eventRepository.getEventById(id);
  return event;
};

export const getEvents = async (eventRepository, params) => {
  const validationResult = validateQueryParams(params);
  if (!validationResult.isValid) {
    return validationResult.error;
  }
  const results = await eventRepository.getAllEvents(validationResult.data);
  return results;
};

export const partialUpdateEvent = async (eventRepository, eventData, id) => {
  const validationResult = validatePartialUpdateEvent(eventData);
  if (!validationResult.isValid) {
    return validationResult.error;
  }

  const event = await eventRepository.partialUpdateEvent(validationResult.data, id);
  return event;
};
