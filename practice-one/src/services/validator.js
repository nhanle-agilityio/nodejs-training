// Constants
const SEAT_COUNT_LIMIT = 1000;
const EVENT_NAME_MIN = 1;
const EVENT_NAME_MAX = 200;
const CUSTOMER_NAME_MIN = 1;
const CUSTOMER_NAME_MAX = 200;

/**
 * Validate that a value is not empty
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of field
 * @throws {Error} If value is null, undefined, or empty string
 */
const required = (value, fieldName) => {
  if (!value || value === '') {
    throw new Error(`${fieldName} is required`);
  }
};

/**
 * Validate that a value is a positive integer
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of field
 * @throws {Error} If value is not a positive integer
 */
const isPositiveInteger = (value, fieldName) => {
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }
};

/**
 * Validate string length
 * @param {string} value - String to validate
 * @param {string} fieldName - Name of field
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @throws {Error} If string length is out of range
 */
const validateStringLength = (value, fieldName, min, max) => {
  const length = value.trim().length;

  if (length < min) {
    throw new Error(`${fieldName} must be at least ${min} characters`);
  }
  if (length > max) {
    throw new Error(`${fieldName} must be at most ${max} characters`);
  }
};

/**
 * Validate event ID
 * @param {any} eventId - Event ID to validate
 * @throws {Error} If event ID is invalid
 */
const validateEventId = (eventId) => {
  required(eventId, 'Event ID');
  isPositiveInteger(eventId, 'Event ID');
};

/**
 * Validate event name
 * @param {string} eventName - Event name to validate
 * @throws {Error} If event name is invalid
 */
const validateEventName = (eventName) => {
  required(eventName, 'Event name');
  validateStringLength(eventName, 'Event name', EVENT_NAME_MIN, EVENT_NAME_MAX);
};

/**
 * Validate customer name
 * @param {string} customerName - Customer name to validate
 * @throws {Error} If customer name is invalid
 */
const validateCustomerName = (customerName) => {
  required(customerName, 'Customer name');
  validateStringLength(customerName, 'Customer name', CUSTOMER_NAME_MIN, CUSTOMER_NAME_MAX);
};

/**
 * Validate seat count
 * @param {any} seats - Number of seats to validate
 * @throws {Error} If seat count is invalid
 */
const validateSeatCount = (seats) => {
  required(seats, 'Seat count');
  isPositiveInteger(seats, 'Seat count');

  if (Number(seats) > SEAT_COUNT_LIMIT) {
    throw new Error(`Seat count cannot exceed ${SEAT_COUNT_LIMIT}`);
  }
};

/**
 * Validate customer email
 * @param {string} email - Customer email to validate
 * @throws {Error} If customer email is invalid
 */
const validateCustomerEmail = (email) => {
  required(email, 'Customer email');

  const trimmed = email.trim();

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    throw new Error('Customer email must be a valid email address');
  }
};

module.exports = {
  required,
  isPositiveInteger,
  validateEventId,
  validateEventName,
  validateCustomerName,
  validateCustomerEmail,
  validateSeatCount,
};
