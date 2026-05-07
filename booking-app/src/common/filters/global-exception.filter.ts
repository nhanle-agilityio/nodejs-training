import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, error, message } = this.classify(exception);

    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} -> ${status}`,
        exception as Error,
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} -> ${status} ${String(message)}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private classify(exception: unknown): {
    status: number;
    error: string;
    message: string | string[];
  } {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      const status = exception.getStatus();
      const message =
        typeof res === 'string'
          ? res
          : ((res as { message?: string | string[] }).message ??
            exception.message);
      const error =
        typeof res === 'object' && res !== null && 'error' in res
          ? String(res.error)
          : exception.name;
      return { status, error, message };
    }

    if (exception instanceof QueryFailedError) {
      const code = (exception.driverError as { code?: string } | undefined)
        ?.code;

      if (code === '23505') {
        return {
          status: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'Resource already exists',
        };
      }
      if (code === '23503') {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'BadRequest',
          message: 'Foreign key constraint violated',
        };
      }
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'InternalServerError',
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : ((exception as Error)?.message ?? 'Unknown error'),
    };
  }
}
