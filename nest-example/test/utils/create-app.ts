import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception';
import { TransformInterceptor } from '../../src/common/interceptors/transform.interceptor';

export interface E2eContext {
  app: INestApplication;
  dataSource: DataSource;
}

jest.mock('@clerk/backend', () => ({
  verifyToken: jest.fn(),
}));

export const createE2eApp = async (
  customize?: (builder: TestingModuleBuilder) => TestingModuleBuilder,
): Promise<E2eContext> => {
  let builder = Test.createTestingModule({ imports: [AppModule] });

  if (customize) builder = customize(builder);

  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.init();

  const dataSource = app.get(DataSource);
  return { app, dataSource };
};
