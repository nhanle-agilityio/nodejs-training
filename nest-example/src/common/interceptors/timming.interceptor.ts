import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { finalize, Observable, tap } from 'rxjs';
import { Response } from 'express';

export class TimmingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log('TimingInterceptor');
        /* optional: log before response emits */
      }),
      finalize(() => {
        const ms = Date.now() - start;
        res.setHeader('X-Response-Time', `${ms}ms`);
      }),
    );
  }
}
