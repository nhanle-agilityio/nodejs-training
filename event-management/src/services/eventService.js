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
