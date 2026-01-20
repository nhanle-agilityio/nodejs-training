import { validateRefreshToken } from '../services/tokenValidator.js';
import { ValidationError } from '../utils/customErrors.js';

/**
 * Validation middleware for refresh token
 */
export const validateRefreshTokenFields = (req, res, next) => {
  const validationResult = validateRefreshToken(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};
