import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { AnyExceptionFilter } from './filters/anyException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
