export const PAGE_SIZE = 5;
export const PAGE_NUMBER = 1;

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  PAST: 'past',
};

export const SORTABLE_FIELDS = ['name', 'ticketPrice', 'location', 'capacity', 'date', 'createdAt', 'updatedAt'];

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

// Token expiration values (in seconds)
export const ACCESS_TOKEN_EXPIRES_IN = 300; // 5 minutes
export const REFRESH_TOKEN_EXPIRES_IN = 604800; // 7 days
