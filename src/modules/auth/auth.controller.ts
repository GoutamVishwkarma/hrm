import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignUpDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../database/models';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: User) {
    return await this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}