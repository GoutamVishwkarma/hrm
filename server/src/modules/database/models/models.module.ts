import {Global, Module} from '@nestjs/common';
import {getMongooseFeature} from '.';
import {UsersController} from 'src/modules/users/users.controller';
import {UsersService} from 'src/modules/users/users.service';
import {AclService} from 'src/helpers/service';

@Global()
@Module({
	imports: [getMongooseFeature()],
	exports: [getMongooseFeature()],
	controllers: [UsersController],
	providers: [UsersService, AclService],
})
export class ModelsModule {}
