import { validateEvent, validatePartialUpdateEvent, validateQueryParams } from '../services/validator.js';

/**
 * Validation middleware for event fields
 */
export const validateEventFields = (req, res, next) => {
  const validationResult = validateEvent(req.body);

  if (!validationResult.isValid) {
    const { status, ...errorBody } = validationResult.error;
    return res.status(status).json(errorBody);
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
    const { status, ...errorBody } = validationResult.error;
    return res.status(status).json(errorBody);
  }

  req.body = validationResult.data;
  next();
};

/**
 * Validation middleware for query parameters
 */
export const validateParams = (req, res, next) => {
  const validationResult = validateQueryParams(req.query);

  if (!validationResult.isValid) {
    const { status, ...errorBody } = validationResult.error;
    return res.status(status).json(errorBody);
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
    return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Event ID must be a valid number' });
  }

  next();
};
