import { ERROR_CODES } from '../constants/index.js';

const validateString = (value, rule, fieldName) => {
  const errors = [];

  if (typeof value !== 'string') {
    errors.push({ field: fieldName, message: `${fieldName} must be a string` });
    return { errors, value: null };
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length === 0 && rule.required) {
    errors.push({ field: fieldName, message: `${fieldName} cannot be empty` });
    return { errors, value: null };
  }

  if (rule.minLength !== undefined && trimmedValue.length < rule.minLength) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at least ${rule.minLength} characters`,
    });
  }

  if (rule.maxLength !== undefined && trimmedValue.length > rule.maxLength) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must not exceed ${rule.maxLength} characters`,
    });
  }

  if (rule.pattern && !rule.pattern.test(trimmedValue)) {
    errors.push({
      field: fieldName,
      message: `${fieldName} format is invalid`,
    });
  }

  return { errors, value: trimmedValue };
};

const validateFields = (data, validationRules, isFullValidation = true) => {
  const errors = [];
  const normalized = {};

  if (!!data === false || Object.keys(data).length === 0) {
    return {
      isValid: false,
      error: { status: 400, code: ERROR_CODES.VALIDATION_ERROR, message: 'No data provided' },
    };
  }

  const unknownFields = Object.keys(data).filter((key) => !validationRules[key]);
  if (unknownFields.length > 0) {
    errors.push({
      field: 'unknown',
      message: `Unknown fields: ${unknownFields.join(', ')}`,
    });
  }

  const fieldsToValidate = isFullValidation
    ? Object.keys(validationRules)
    : Object.keys(data).filter((key) => validationRules[key]);

  for (const key of fieldsToValidate) {
    const rule = validationRules[key];
    const rawValue = data[key];
    const isFieldPresent = !!rawValue;

    if (rule.required) {
      if (!isFieldPresent || (typeof rawValue === 'string' && rawValue.trim().length === 0)) {
        errors.push({ field: key, message: `${key} is required` });
        continue;
      }
    }

    if (!isFieldPresent && !isFullValidation) {
      continue;
    }

    let validationResult = null;

    if (rule.type === 'string') {
      validationResult = validateString(rawValue, rule, key);
    }

    if (validationResult && validationResult.errors.length > 0) {
      errors.push(...validationResult.errors);
    } else if (validationResult && validationResult.value !== null) {
      normalized[key] = validationResult.value;
    }
  }

  return errors.length > 0
    ? {
        isValid: false,
        error: { status: 400, code: ERROR_CODES.VALIDATION_ERROR, message: 'Validation failed', details: errors },
      }
    : { isValid: true, data: normalized };
};

// Email validation pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User registration validation rules
const userRegistrationValidation = {
  name: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
  email: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 255,
    pattern: emailPattern,
  },
  password: {
    required: true,
    type: 'string',
    minLength: 6,
    maxLength: 255,
  },
};

// User login validation rules
const userLoginValidation = {
  email: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 255,
    pattern: emailPattern,
  },
  password: {
    required: true,
    type: 'string',
    minLength: 1,
  },
};

// User update validation rules (all fields optional)
const userUpdateValidation = {
  name: {
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
  email: {
    required: false,
    type: 'string',
    minLength: 5,
    maxLength: 255,
    pattern: emailPattern,
  },
  password: {
    required: false,
    type: 'string',
    minLength: 6,
    maxLength: 255,
  },
};

export const validateUserRegistration = (userData) => {
  return validateFields(userData, userRegistrationValidation, true);
};

export const validateUserLogin = (userData) => {
  return validateFields(userData, userLoginValidation, true);
};

export const validateUserUpdate = (userData) => {
  return validateFields(userData, userUpdateValidation, false);
};
