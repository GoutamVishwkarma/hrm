import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String,format: 'email'})
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String,format: 'password'})
    password: string;
  }

    export class AuthSignUpDto {

    userId: string;
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;



    }