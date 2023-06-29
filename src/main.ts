import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,  logger: ['error', 'warn', 'debug', 'log'],
  });

  const config = new DocumentBuilder()
    .setTitle('HRM API')
    .setDescription('The hrm API description')
    .setVersion('1.0')
    .addTag('HRM')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8001);
}
bootstrap();
