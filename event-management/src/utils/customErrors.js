import { ERROR_CODES } from '../constants/index.js';

export class CustomError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends CustomError {
  constructor(message, details) {
    super(message, 400, ERROR_CODES.VALIDATION_ERROR, details);
  }
}

export class NotFoundError extends CustomError {
  constructor(message, details) {
    super(message, 404, ERROR_CODES.NOT_FOUND, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message, details) {
    super(message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR, details);
  }
}
