import { validateFields } from './validationCore.js';

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
