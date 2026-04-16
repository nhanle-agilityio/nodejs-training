import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = (req.headers['x-request-id'] as string) || randomUUID();
    req['correlationId'] = id;
    res.setHeader('x-request-id', id);
    console.log(
      `[${new Date().toISOString()}] [${id}] ${req.method} ${req.originalUrl} - ${res.statusCode}`,
    );
    next();
  }
}
