import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [  DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
