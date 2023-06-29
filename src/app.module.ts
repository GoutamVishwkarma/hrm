import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

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
  AdminModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
