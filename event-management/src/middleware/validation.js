import { validateEvent } from '../services/validator.js';

/**
 * Validation middleware for event fields
 */
export const validateEventFields = (req, res, next) => {
  const validationResult = validateEvent(req.body);
  if (!validationResult.isValid) {
    return res.status(400).json({ error: validationResult.error });
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
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Event ID must be a valid number' });
  }

  next();
};
