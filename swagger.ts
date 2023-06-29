import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import * as path from 'path';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Your App Name')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Exclude specific folders
  document.paths = Object.entries(document.paths).reduce((acc, [path, pathObject]) => {
    // Exclude paths that start with '/models/' or '/database/'
    if (!path.startsWith('/models/') && !path.startsWith('/database/')) {
      acc[path] = pathObject;
    }
    return acc;
  }, {});
  console.log(document.paths);
  SwaggerModule.setup('api', app, document);

  await app.close();
}

generateSwagger();
