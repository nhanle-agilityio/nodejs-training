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

export const validateEvent = (eventData, isFullValidation = true) => {
  const errors = [];

  // Determine which fields to validate
  const fieldsToValidate = isFullValidation
    ? Object.keys(eventValidation)
    : Object.keys(eventData).filter((key) => eventValidation[key]);

  // Check for unknown fields in partial mode
  if (!isFullValidation) {
    const unknownFields = Object.keys(eventData).filter((key) => !eventValidation[key]);
    if (unknownFields.length > 0) {
      errors.push({
        field: 'unknown',
        message: `Unknown fields: ${unknownFields.join(', ')}`,
      });
    }
  }

  for (const key of fieldsToValidate) {
    const rule = eventValidation[key];
    const rawValue = eventData[key];
    const isFieldPresent = rawValue !== undefined && rawValue !== null;

    if (rule.required) {
      if (isFullValidation) {
        if (!isFieldPresent || (typeof rawValue === 'string' && rawValue.trim().length === 0)) {
          errors.push({ field: key, message: `${key} is required` });
          continue;
        }
      } else {
        if (isFieldPresent && typeof rawValue === 'string' && rawValue.trim().length === 0) {
          errors.push({ field: key, message: `${key} cannot be empty` });
          continue;
        }
      }
    }

    // Skip validation if field is not present in partial mode
    if (!isFieldPresent && !isFullValidation) {
      continue;
    }

    if (rule.type === 'string') {
      if (typeof rawValue !== 'string') {
        errors.push({ field: key, message: `${key} must be a string` });
        continue;
      }
      const trimmedValue = rawValue.trim();

      if (rule.minLength && trimmedValue.length < rule.minLength) {
        errors.push({ field: key, message: `${key} must be at least ${rule.minLength} characters` });
      }
      if (rule.maxLength && trimmedValue.length > rule.maxLength) {
        errors.push({ field: key, message: `${key} must not exceed ${rule.maxLength} characters` });
      }
    }

    if (rule.type === 'number') {
      const numValue = typeof rawValue === 'string' ? Number(rawValue) : rawValue;
      if (typeof numValue !== 'number' || isNaN(numValue)) {
        errors.push({ field: key, message: `${key} must be a valid number` });
        continue;
      }

      if (rule.min !== undefined && numValue < rule.min) {
        errors.push({ field: key, message: `${key} must be at least ${rule.min}` });
      }
    }

    if (rule.type === 'date') {
      const dateObj = new Date(rawValue);
      if (isNaN(dateObj.getTime())) {
        errors.push({ field: key, message: `${key} must be a valid date` });
        continue;
      }

      // Date constraint validations
      if (rule.notInPast && dateObj < new Date()) {
        errors.push({ field: key, message: `${key} cannot be in the past` });
      }
    }
  }

  return errors.length > 0
    ? {
        isValid: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors,
        },
      }
    : { isValid: true };
};
