import { validateUserRegistration, validateUserLogin, validateUserUpdate } from '../services/userValidator.js';
import { ValidationError } from '../utils/customErrors.js';

/**
 * Validation middleware for user registration
 */
export const validateUserRegistrationFields = (req, res, next) => {
  const validationResult = validateUserRegistration(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};

/**
 * Validation middleware for user login
 */
export const validateUserLoginFields = (req, res, next) => {
  const validationResult = validateUserLogin(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};

/**
 * Validation middleware for user update
 */
export const validateUserUpdateFields = (req, res, next) => {
  const validationResult = validateUserUpdate(req.body);

  if (!validationResult.isValid) {
    throw new ValidationError(validationResult.error.message, validationResult.error.details);
  }

  req.body = validationResult.data;
  next();
};
