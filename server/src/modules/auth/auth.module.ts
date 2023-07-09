import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/modules/users';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AclService } from 'src/helpers/service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtStrategy,AclService]
})
export class AuthModule {}
