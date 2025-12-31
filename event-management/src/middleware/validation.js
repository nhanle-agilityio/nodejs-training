import { validateEvent } from '../services/validator.js';

/**
 * Validation middleware for create event request
 */
export const validateCreateEvent = (req, res, next) => {
  const validationResult = validateEvent(req.body);
  if (!validationResult.isValid) {
    return res.status(400).json({ error: validationResult.error });
  }

  next();
};

/**
 * Validation middleware for update event request
 */
export const validateUpdateEvent = (req, res, next) => {
  const validationResult = validateEvent(req.body);
  if (!validationResult.isValid) {
    return res.status(400).json({ error: validationResult.error });
  }

  next();
};

/**
 * Validation middleware for delete event request
 */
export const validateDeleteEvent = (req, res, next) => {
  const eventID = req.params.id;
  console.log('eventID', eventID);
  const numValue = typeof eventID === 'string' ? Number(eventID) : eventID;
  if (isNaN(numValue)) {
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Event ID must be a valid number' });
  }

  next();
};
