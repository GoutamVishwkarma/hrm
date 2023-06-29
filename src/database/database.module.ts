import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseFeature } from 'src/models';
import { ModelsModule } from 'src/models/models.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        getMongooseFeature(),
        ModelsModule
    ],
  })
  export class DatabaseModule {}
  