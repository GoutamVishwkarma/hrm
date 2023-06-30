import {
    ForbiddenException,
    Injectable,
    Logger,
  } from '@nestjs/common';
  import { AuthDto, AuthSignUpDto } from './dto';
  import { UsersService } from '../users';
  import * as argon from 'argon2';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AuthService {
    constructor(
      private user: UsersService,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
  
    async signup(dto: AuthSignUpDto) {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      try {
        const user = await this.user.create( {
            userId: dto.userId,
            name: dto.name,
            email: dto.email,
            password: hash,
        } );
  
        return this.signToken(user.userId, user.email);
      } catch (error) {
        throw new ForbiddenException(error);
      }
    }
  
    async signin(dto: AuthDto) {
      // find the user by email
      const user = await this.user.findOneByEmail(dto.email);
      // if user does not exist throw exception
      if (!user)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
      Logger.log(user);
      // compare password
      const pwMatches = await argon.verify(
        user.password,
        dto.password,
      );
      // if password incorrect throw exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
      return this.signToken(user.userId, user.email);
    }
  
    async signToken(
      userId: string,
      email: string,
    ): Promise<{ access_token: string }> {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(
        payload,
        {
          expiresIn: '15m',
          secret: secret,
        },
      );
  
      return {
        access_token: token,
      };
    }
  }