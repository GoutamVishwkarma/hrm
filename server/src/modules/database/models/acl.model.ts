// user.model.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {HydratedDocument} from 'mongoose';
export type AclDocument = HydratedDocument<Acl>;

@Schema()
export class Acl {
	@Prop({required: true, unique: true})
	@ApiProperty()
	endpoint: string;

	@Prop()
	@ApiProperty()
	roles: string[];
}

export const AclSchema = SchemaFactory.createForClass(Acl);
