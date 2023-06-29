import { Global, Module } from "@nestjs/common";
import { getMongooseFeature } from ".";


@Global()
@Module({
    imports: [getMongooseFeature()],
    exports: [getMongooseFeature()]
  })
  export class ModelsModule {}