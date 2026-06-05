import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor;

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  it('wraps response payload in { data }', async () => {
    const mockNext: CallHandler = { handle: () => of({ hello: 'world' }) };

    const result = await firstValueFrom(
      interceptor.intercept({} as ExecutionContext, mockNext),
    );

    expect(result).toEqual({ data: { hello: 'world' } });
  });

  it('wraps null response in { data: null }', async () => {
    const mockNext: CallHandler = { handle: () => of(null) };

    const result = await firstValueFrom(
      interceptor.intercept({} as ExecutionContext, mockNext),
    );

    expect(result).toEqual({ data: null });
  });

  it('wraps array response in { data: [...] }', async () => {
    const mockNext: CallHandler = { handle: () => of([1, 2, 3]) };

    const result = await firstValueFrom(
      interceptor.intercept({} as ExecutionContext, mockNext),
    );

    expect(result).toEqual({ data: [1, 2, 3] });
  });
});
