import { validateEvent, validatePartialUpdateEvent, validateQueryParams } from '../services/eventValidator.js';
import { ValidationError } from '../utils/customErrors.js';

/**
 * Validation middleware for event fields
 */
export const validateEventFields = (req, res, next) => {
  const validationResult = validateEvent(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};

/**
 * Validation middleware for partial event update
 */
export const validatePartialEventFields = (req, res, next) => {
  const validationResult = validatePartialUpdateEvent(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};

/**
 * Validation middleware for query parameters
 */
export const validateParams = (req, res, next) => {
  // If no query params are provided, skip validation
  if (!req.query || Object.keys(req.query).length === 0) {
    return next();
  }

  const validationResult = validateQueryParams(req.query);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  // Merge normalized values into req.query
  if (validationResult.data) {
    Object.assign(req.query, validationResult.data);
  }

  next();
};

/**
 * Validation middleware for event id parameter
 */
export const validateEventIdParam = (req, res, next) => {
  const eventID = req.params.id;
  const numValue = typeof eventID === 'string' ? Number(eventID) : eventID;

  if (isNaN(numValue)) {
    throw new ValidationError('Event ID must be a valid number');
  }

  next();
};
