// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {  HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User  {
  
  @Prop({required: true,unique: true})
  userId : string;
  @Prop()
  name: string;
  
  @Prop()
  email: string;
}

export const UserModel = SchemaFactory.createForClass(User);
