import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from 'src/app.controller';
import { DatabaseModule } from 'src/modules/database';
import { AuthModule } from 'src/modules/auth';
import { UsersModule } from 'src/modules/users';
import { LoggerMiddleware } from 'src/helpers';
import { AllExceptionsFilter } from 'src/helpers/filters';

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
  providers: [ {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
  exports: [],
})
export class AppModule {}
