import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { GlobalExceptionFilter } from '../src/common/filters/global-exception.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { BULL_BOARD_PREFIX_EXCLUSIONS } from '../src/email-queue/bull-board.constants';
import { StripeService } from '../src/payments/stripe.service';
import {
  createStripeMock,
  type StripeMock,
  type StripeServiceOverrides,
} from './stripe-mock';

export type CreateTestAppOptions = {
  stripe?: StripeServiceOverrides;
};

export type TestAppContext = {
  app: INestApplication;
  stripeMock: StripeMock;
};

export const createTestApp = async (
  options: CreateTestAppOptions = {},
): Promise<TestAppContext> => {
  const stripeMock = createStripeMock(options.stripe);

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(StripeService)
    .useValue(stripeMock)
    .compile();

  const app = moduleFixture.createNestApplication({ rawBody: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api', {
    exclude: ['webhooks/(.*)', 'health', ...BULL_BOARD_PREFIX_EXCLUSIONS],
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter('test'));

  await app.init();

  await app.listen(0);

  return { app, stripeMock };
};
