// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {  HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User  {
  
  @Prop({required: true,unique: true})
  @ApiProperty()
  userId : string;

  @Prop()
  @ApiProperty()
  name: string;
  
  @Prop()
  @IsEmail()
  @ApiProperty({type: String,format: 'email'})
  email: string;
  
  @Prop()
  @IsNotEmpty()
  @ApiProperty({type: String,format: 'password'})
  password: string;
}

export const UserModel = SchemaFactory.createForClass(User);
