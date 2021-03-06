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
        .setVersion('1.0.0')
        .build(),
    ),
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
