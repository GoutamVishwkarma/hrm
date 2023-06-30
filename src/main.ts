import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './helpers/filters';
import { TransformResponseInterceptor } from './helpers/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,  logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  const config = new DocumentBuilder() 
    .setTitle('HRM API')
    .setDescription('The hrm API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('HRM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8001);
}
bootstrap();
