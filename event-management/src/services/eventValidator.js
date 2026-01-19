import { EVENT_STATUS, ERROR_CODES } from '../constants/index.js';
import { validateFields } from './validationCore.js';

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
