import type { ArgumentsHost } from '@nestjs/common';
import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { GlobalExceptionFilter } from './global-exception.filter';

type ErrorResponseBody = {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
};

type JsonMock = jest.MockedFunction<(body: ErrorResponseBody) => unknown>;

const makeHost = (
  method = 'GET',
  url = '/test',
): {
  host: ArgumentsHost;
  response: { status: jest.Mock; json: JsonMock };
} => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn() as JsonMock,
  };
  const host = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: () => response,
      getRequest: () => ({ method, url }),
    }),
  } as unknown as ArgumentsHost;
  return { host, response };
};

const makeQueryFailedError = (pgCode: string): QueryFailedError => {
  const driverError = Object.assign(new Error('db'), { code: pgCode });
  return new QueryFailedError('SELECT 1', [], driverError);
};

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
  });

  describe('HttpException', () => {
    it('maps status and string message from NotFoundException', () => {
      const { host, response } = makeHost();
      filter.catch(new NotFoundException('Booking not found'), host);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Booking not found',
          path: '/test',
        }),
      );
    });

    it('passes an array message through from a validation exception', () => {
      const { host, response } = makeHost('POST', '/api/slots');
      const exception = new BadRequestException({
        statusCode: 400,
        message: ['field must not be empty', 'field must be a string'],
        error: 'Bad Request',
      });
      filter.catch(exception, host);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      const body = response.json.mock.calls[0][0];
      expect(Array.isArray(body.message)).toBe(true);
      expect(body.message).toContain('field must not be empty');
    });
  });

  describe('QueryFailedError', () => {
    it('maps unique-violation (23505) to 409 Conflict', () => {
      const { host, response } = makeHost('POST', '/api/slots');
      filter.catch(makeQueryFailedError('23505'), host);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'Resource already exists',
        }),
      );
    });

    it('maps foreign-key violation (23503) to 400 Bad Request', () => {
      const { host, response } = makeHost('POST', '/api/bookings');
      filter.catch(makeQueryFailedError('23503'), host);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'BadRequest',
          message: 'Foreign key constraint violated',
        }),
      );
    });

    it('falls through to 500 for an unrecognised DB error code', () => {
      const { host, response } = makeHost();
      filter.catch(makeQueryFailedError('99999'), host);

      expect(response.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  });

  describe('unknown errors', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('hides the error message in production', () => {
      process.env.NODE_ENV = 'production';
      const { host, response } = makeHost();
      filter.catch(new Error('internal secret'), host);

      expect(response.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      const body = response.json.mock.calls[0][0];
      expect(body.message).toBe('Internal server error');
      expect(body.message).not.toContain('internal secret');
    });

    it('exposes the error message outside production', () => {
      process.env.NODE_ENV = 'development';
      const { host, response } = makeHost();
      filter.catch(new Error('something went wrong'), host);

      expect(response.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      const body = response.json.mock.calls[0][0];
      expect(body.message).toBe('something went wrong');
    });
  });
});
