// user.model.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {HydratedDocument, Types} from 'mongoose';
import {IsEmail, IsNotEmpty} from 'class-validator';
import {Role} from './';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({required: true, unique: true})
	@ApiProperty()
	userId: string;

	@Prop()
	@ApiProperty()
	name: string;

	@Prop()
	@IsEmail()
	@ApiProperty({type: String, format: 'email'})
	email: string;

	@Prop()
	@IsNotEmpty()
	@ApiProperty({type: String, format: 'password'})
	password: string;

	@Prop({type: [{type: Types.ObjectId, ref: 'Role'}]})
	roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
