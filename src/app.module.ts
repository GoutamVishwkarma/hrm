import { AllExceptionsFilter } from './helpers/filters/exception.filter';
import {  Module, } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from 'src/app.controller';
import { DatabaseModule } from 'src/modules/database';
import { AuthModule } from 'src/modules/auth';
import { UsersModule } from 'src/modules/users';
import { TransformResponseInterceptor } from './helpers/interceptor';
@Module({
  imports: [  DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  UsersModule,
  DatabaseModule,
  AuthModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
