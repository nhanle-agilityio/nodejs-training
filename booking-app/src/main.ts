import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { BULL_BOARD_PREFIX_EXCLUSIONS } from './email-queue/bull-board.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api', {
    exclude: ['webhooks/(.*)', 'health', ...BULL_BOARD_PREFIX_EXCLUSIONS],
  });
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = app.get(ConfigService<AppConfig, true>);
  const env = config.get('app.env', { infer: true });
  const port = config.get('app.port', { infer: true });

  app.useGlobalFilters(new GlobalExceptionFilter(env));

  if (env !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Booking Platform API')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'clerk-jwt',
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port, '0.0.0.0');
}
void bootstrap();
