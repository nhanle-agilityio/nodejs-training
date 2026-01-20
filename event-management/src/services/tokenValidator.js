import { validateFields } from './validationCore.js';

// Refresh token validation rules
const refreshTokenValidation = {
  refreshToken: {
    required: true,
    type: 'string',
    minLength: 1,
  },
};

export const validateRefreshToken = (data) => {
  return validateFields(data, refreshTokenValidation, true);
};
