import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './modules';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { AnyExceptionFilter } from './filters/anyException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Trip Analytics API')
        .setDescription(
          'All API endpoints, except "/auth/login", are required to be accessed with JWT access token. You need to get your JWT access token by logging in the system, and set it to "Authorization" header',
        )
        .setVersion('1.0.0')
        .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'Authorization',
        )
        .build(),
    ),
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
