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
