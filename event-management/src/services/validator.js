import { EVENT_STATUS, ERROR_CODES } from '../constants/index.js';

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

  return { errors, value: trimmedValue };
};

const validateNumber = (value, rule, fieldName) => {
  const errors = [];
  const numValue = typeof value === 'string' ? Number(value) : value;

  if (typeof numValue !== 'number' || isNaN(numValue)) {
    errors.push({ field: fieldName, message: `${fieldName} must be a valid number` });
    return { errors, value: null };
  }

  if (rule.min !== undefined && numValue < rule.min) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at least ${rule.min}`,
    });
  }

  if (rule.max !== undefined && numValue > rule.max) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must not exceed ${rule.max}`,
    });
  }

  return { errors, value: numValue };
};

const validateInteger = (value, rule, fieldName) => {
  const errors = [];
  const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    errors.push({ field: fieldName, message: `${fieldName} must be a valid integer` });
    return { errors, value: null };
  }

  if (rule.min !== undefined && numValue < rule.min) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at least ${rule.min}`,
    });
  }

  if (rule.max !== undefined && numValue > rule.max) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must not exceed ${rule.max}`,
    });
  }

  return { errors, value: numValue };
};

const validateDate = (value, rule, fieldName) => {
  const errors = [];
  const dateObj = new Date(value);

  if (isNaN(dateObj.getTime())) {
    errors.push({ field: fieldName, message: `${fieldName} must be a valid date` });
    return { errors, value: null };
  }

  // Check if date is not in past
  if (rule.notInPast && dateObj < new Date()) {
    errors.push({
      field: fieldName,
      message: `${fieldName} cannot be in the past`,
    });
  }

  return { errors, value };
};

const validateEnum = (value, rule, fieldName) => {
  const errors = [];

  if (!rule.values.includes(value)) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be one of: ${rule.values.join(', ')}`,
    });
    return { errors, value: null };
  }

  return { errors, value };
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

  // Determine which fields to validate
  const fieldsToValidate = isFullValidation
    ? Object.keys(validationRules)
    : Object.keys(data).filter((key) => validationRules[key]);

  for (const key of fieldsToValidate) {
    const rule = validationRules[key];
    const rawValue = data[key];
    const isFieldPresent = !!rawValue;

    // Check required fields
    if (rule.required) {
      if (!isFieldPresent || (typeof rawValue === 'string' && rawValue.trim().length === 0)) {
        errors.push({ field: key, message: `${key} is required` });
        continue;
      }
    }

    // Skip validation if field is not present in partial mode
    if (!isFieldPresent && !isFullValidation) {
      continue;
    }

    let validationResult = null;

    switch (rule.type) {
      case 'string':
        validationResult = validateString(rawValue, rule, key);
        break;
      case 'number':
        validationResult = validateNumber(rawValue, rule, key);
        break;
      case 'integer':
        validationResult = validateInteger(rawValue, rule, key);
        break;
      case 'date':
        validationResult = validateDate(rawValue, rule, key);
        break;
      case 'enum':
        validationResult = validateEnum(rawValue, rule, key);
        break;
      default:
        if (isFieldPresent) {
          validationResult = { errors: [{ field: key, message: `Value for ${key} is invalid type` }], value: rawValue };
        }
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

const eventValidation = {
  name: {
    required: true,
    type: 'string',
    maxLength: 200,
    minLength: 1,
  },
  description: {
    required: false,
    type: 'string',
    maxLength: 2000,
  },
  location: {
    required: true,
    type: 'string',
    maxLength: 200,
  },
  date: {
    required: true,
    type: 'date',
    notInPast: true,
  },
  ticketPrice: {
    required: true,
    type: 'number',
    min: 0,
  },
  capacity: {
    required: true,
    type: 'number',
    min: 1,
  },
};

export const validateEvent = (eventData) => {
  return validateFields(eventData, eventValidation);
};

export const validatePartialUpdateEvent = (eventData) => {
  return validateFields(eventData, eventValidation, false);
};

const queryParamsValidation = {
  location: {
    type: 'string',
    maxLength: 200,
    minLength: 1,
  },
  status: {
    type: 'enum',
    values: Object.values(EVENT_STATUS),
  },
  min_price: {
    type: 'number',
    min: 0,
  },
  max_price: {
    type: 'number',
    min: 0,
  },
  page: {
    type: 'integer',
    min: 1,
  },
  limit: {
    type: 'integer',
    min: 1,
    max: 100,
  },
  sort: {
    type: 'string',
    maxLength: 500,
    minLength: 1,
  },
};

export const validateQueryParams = (queryParams) => {
  const validateResult = validateFields(queryParams, queryParamsValidation, false);

  if (!validateResult.isValid) {
    return validateResult;
  }

  // handle validate for min_price and max_price
  if (
    validateResult.data.min_price &&
    validateResult.data.max_price &&
    validateResult.data.min_price > validateResult.data.max_price
  ) {
    return {
      isValid: false,
      error: { status: 400, code: ERROR_CODES.VALIDATION_ERROR, message: 'min_price must be less than max_price' },
    };
  }

  return validateResult;
};
