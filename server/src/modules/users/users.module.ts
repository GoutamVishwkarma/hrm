import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {AclService} from 'src/helpers/service';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService, AclService],
})
export class UsersModule {}
